(function ($) {

  // Unique instance id
  var INSTANCE_ID = 1;

  // Set the plugin name
  var PLUGIN_NAME = "magicPopup";

  // Set the plugin defaults
  var PLUGIN_DEFAULTS = {
    id: '',
    title: '',
    content: '',
    buttonEnabled: false,
    buttonLabel: '',
    buttonURL: '',
    buttonBackgroundColor: '#000000',
    buttonTextColor: '#ffffff',
    backdropColor: '#000000',
    backdropOpacity: 70,
    maxWidth: 600,
    roundedCornersEnabled: false,
  };

  // Plugin constructor
  function Plugin(options) {
    this.element = $('body');
    this.container = null;
    this.instanceID = INSTANCE_ID++;
    this.settings = $.extend({}, PLUGIN_DEFAULTS, options);
    this.init();
  }

  // Avoid Plugin.prototype conflicts
  $.extend(Plugin.prototype, {
    init: function () {
      var that = this;
      
      // Create general markup
      this.popupEl = this.createBaseMarkup();

      // Append content if given
      if (this.settings.content) {
        this.popupEl.find('.magic-popups-popup__inner').append('<div class="magic-popups-popup__content">' + this.settings.content + '</div>');
      }

      // Append button if enabled
      if (this.settings.buttonEnabled) {
        this.popupEl.find('.magic-popups-popup__inner').append('<div class="magic-popups-popup__btn-wrapper"><a href="' + this.settings.buttonURL + '" class="magic-popups-popup__btn" style="background-color: ' + this.settings.buttonBackgroundColor + '!important; color: ' + this.settings.buttonTextColor + '!important;">' + this.settings.buttonLabel + '</a></div>');
      }

      // Append to body
      this.element.append(this.popupEl);


      // Add click event to close button
      this.popupEl.find('.magic-popups-popup__close-btn').on('click', function () {
        that.close();
      });

      // Add keyboard event to window to close popup with escape key
      $(window).on("keyup.magicPopup" + this.instanceID, function (e) {
        if (e.keyCode === 27) {
          e.preventDefault();
          that.close();
        }
      });

    },

    createBaseMarkup: function() {
      return $(`
        <div class="magic-popups-popup ${this.settings.roundedCornersEnabled ? 'magic-popups-popup--rounded-corners' : ''}" role="dialog">
          <div class="magic-popups-popup__backdrop" style="background-color:${this.settings.backdropColor};opacity:${this.settings.backdropOpacity/100}"></div>
          <div class="magic-popups-popup__inner" style="max-width:${this.settings.maxWidth}px">
            <button class="magic-popups-popup__close-btn" aria-label="Close popup">
              <svg class="magic-popups-popup__close-btn__svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
              </svg>
            </button>
            <div class="magic-popups-popup__title">${this.settings.title}</div>
          </div>
        </div>
      `);
    },

    close: function () {
      $(window).off("keyup.magicPopup" + this.instanceID);
      var that = this;
      that.popupEl.addClass('magic-popups-popup--hide');
      setTimeout(function () {
        that.popupEl.remove();
      }, 500);
    },

  });

  // You don't need to change anything below:
  $[PLUGIN_NAME] = function (options) {
    return new Plugin(options)
  };

  // Make sure config exists
  var plugin_config = window.magic_popups;
  if (!plugin_config) {
    return;
  }
  
  // Get popups
  var popups = plugin_config.popups || [];

  // Iterate through popups
  for (var i = 0; i < popups.length; i++) {

    // Get this popup
    var popup = popups[i];

    // If popup is deactivated, skip
    if (popup.deactivated) 
      continue;

    // If the user has manually selected pages, make sure the current page
    // is included in that selection. If not then skip.
    if (!popup.showOnAllPages) {
      var pageId = parseInt(plugin_config.page_id) || 0;
      if (popup.showOnThesePages.indexOf(pageId) === -1) {
        continue;
      }
    }

    // When test mode is enabled, only show popup is user is also logged in.
    if (popup.testModeEnabled) {
      if (plugin_config.is_logged_in !== '1') {
        continue;
      }
    }


    // If display frquency is session, make sure popup hasn't already been shown
    if (!popup.testModeEnabled && popup.displayFrequency === "session") {
      if (window.sessionStorage.getItem('plugin_name_session_' + popup.id)) {
        continue;
      } else {
        window.sessionStorage.setItem('plugin_name_session_' + popup.id, 'true');
      }
    }

    // If display frequency is daily, use local storage with timestamps to determine if popup has been shown
    if (!popup.testModeEnabled && popup.displayFrequency === "daily") {
      var today = new Date();
      var timestamp = window.localStorage.getItem('plugin_name_daily_timestamp_' + popup.id);
      if (timestamp) {
        var lastShown = new Date(parseInt(timestamp));
        if (today.getDate() !== lastShown.getDate()) {
          window.localStorage.setItem('plugin_name_daily_timestamp_' + popup.id, today.getTime());
        } else {
          continue;
        }
      } else {
        window.localStorage.setItem('plugin_name_daily_timestamp_' + popup.id, today.getTime());
      }
    }

    // Do the same as above but weekly
    if (!popup.testModeEnabled && popup.displayFrequency === "weekly") {
      var today = new Date();
      var timestamp = window.localStorage.getItem('plugin_name_weekly_timestamp_' + popup.id);
      if (timestamp) {
        var lastShown = new Date(parseInt(timestamp));
        if (today.getDate() - lastShown.getDate() > 7) {
          window.localStorage.setItem('plugin_name_weekly_timestamp_' + popup.id, today.getTime());
        } else {
          continue;
        }
      } else {
        window.localStorage.setItem('plugin_name_weekly_timestamp_' + popup.id, today.getTime());
      }
    }


    // Should show popup
    (function(p){ 
      setTimeout(function() {
        $.magicPopup({
          id: p.id,
          title: p.title,
          content: p.content,
          buttonEnabled: p.buttonEnabled,
          buttonLabel: p.buttonLabel,
          buttonURL: p.buttonURL,
          buttonBackgroundColor: p.buttonBackgroundColor,
          buttonTextColor: p.buttonTextColor,
          backdropColor: p.backdropColor,
          backdropOpacity: p.backdropOpacity,
          maxWidth: p.maxWidth,
          roundedCornersEnabled: p.roundedCornersEnabled,
        })
      }, p.openingDelay * 1000);
    })(popup);

  }



})(jQuery);
