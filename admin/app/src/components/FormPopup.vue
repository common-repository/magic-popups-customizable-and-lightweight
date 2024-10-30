<script lang="ts" setup>
import axios from 'axios'
import type { PropType } from 'vue'
import { computed, onMounted, reactive, ref, watch } from 'vue'
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/vue'
import WPInput from '../components/WPInput.vue'
import type { PopupDetails } from '../models/PopupDetails'
import WPFormGroup from './WPFormGroup.vue'
import WPTextarea from './WPTextarea.vue'
import WPCheckbox from './WPCheckbox.vue'
import WPSelect from './WPSelect.vue'
import WPNotice from './WPNotice.vue'

interface WordpressPage {
  ID: number
  post_title: string
  post_type: string
}

const magicPopupsAjax = (window as any).magic_popups_ajax as { url: string; nonce: string }

const props = defineProps({
  popupDetails: {
    type: Object as PropType<PopupDetails>,
    required: true,
  },
  busy: {
    type: Boolean as PropType<boolean>,
    required: false,
    default: false,
  },
})

const emit = defineEmits<{
  (event: 'change', popupDetails: PopupDetails): void
}>()

const popupDetails = reactive<PopupDetails>({ ...props.popupDetails })

const isLoadingPages = ref(false)
const pages = ref<WordpressPage[]>([])

// Watch popupDetails
watch(popupDetails, (newVal, oldVal) => {
  emit('change', newVal)
})

onMounted(async() => {
  isLoadingPages.value = true
  const formData = new FormData()
  formData.append('action', 'magic_popups_get_pages')
  formData.append('nonce', magicPopupsAjax.nonce)
  try {
    const resp = await axios.post<WordpressPage[]>(
      magicPopupsAjax.url,
      formData,
    )
    pages.value = resp.data
  }
  catch (err) {
    console.log(err)
  }
  finally {
    isLoadingPages.value = false
  }
})

const displayFrequencyLabelComputed = computed(() => {
  if (popupDetails.displayFrequency === 'page-load')
    return 'Every Page Load'
  else if (popupDetails.displayFrequency === 'session')
    return 'Once Per Session (Recommended)'
  else if (popupDetails.displayFrequency === 'daily')
    return 'Once Per Day'
  else if (popupDetails.displayFrequency === 'weekly')
    return 'Once Per Week'

  return ''
})

const openingDelayLabelComputed = computed(() => {
  if (popupDetails.openingDelay === 0)
    return '0 Second Delay'
  else if (popupDetails.openingDelay === 1)
    return '1 Second Delay'
  else if (popupDetails.openingDelay === 2)
    return '2 Second Delay'
  else if (popupDetails.openingDelay === 3)
    return '3 Second Delay'
  else if (popupDetails.openingDelay === 4)
    return '4 Second Delay'
  else if (popupDetails.openingDelay === 5)
    return '5 Second Delay (Recommended)'
  else if (popupDetails.openingDelay === 10)
    return '10 Second Delay'
  else if (popupDetails.openingDelay === 15)
    return '15 Second Delay'
  else if (popupDetails.openingDelay === 20)
    return '20 Second Delay'
  else if (popupDetails.openingDelay === 25)
    return '25 Second Delay'
  else if (popupDetails.openingDelay === 30)
    return '30 Second Delay'

  return ''
})

const backDropOpacityLabelComputed = computed(() => {
  if (popupDetails.backdropOpacity === 0)
    return '0% Opacity'
  else if (popupDetails.backdropOpacity === 10)
    return '10% Opacity'
  else if (popupDetails.backdropOpacity === 20)
    return '20% Opacity'
  else if (popupDetails.backdropOpacity === 30)
    return '30% Opacity'
  else if (popupDetails.backdropOpacity === 40)
    return '40% Opacity'
  else if (popupDetails.backdropOpacity === 50)
    return '50% Opacity'
  else if (popupDetails.backdropOpacity === 60)
    return '60% Opacity'
  else if (popupDetails.backdropOpacity === 70)
    return '70% Opacity (Recommended)'
  else if (popupDetails.backdropOpacity === 80)
    return '80% Opacity'
  else if (popupDetails.backdropOpacity === 90)
    return '90% Opacity'
  else if (popupDetails.backdropOpacity === 100)
    return '100% Opacity'

  return ''
})

</script>
<template>
  <div class="tw-relative tw-block tw-overflow-hidden">
    <div class="tw-relative tw-block tw-w-full tw-overflow-hidden">
      <TabGroup vertical as="div" class="tw-flex tw-items-start">
        <!-- Tab titles -->
        <TabList
          as="div"
          class="tw-flex-none tw-w-60 tw-bg-gray-50 tw-border tw-border-gray-300 tw-border-r-0 tw-overflow-hidden"
        >
          <Tab v-slot="{ selected }" as="template">
            <button
              class="tw-block tw-w-full tw-text-left tw-p-4 tw-border-b tw-border-b-gray-300 tw-transition-all"
              :class="{
                'tw-bg-white tw-text-primary-500 tw-font-semibold tw-border-l-4 tw-border-l-primary-500': selected,
                'tw-bg-transparent tw-font-semibold': !selected,
              }"
            >
              Content
            </button>
          </Tab>
          <Tab v-slot="{ selected }" as="template">
            <button
              class="tw-block tw-w-full tw-text-left tw-p-4 tw-border-b tw-border-b-gray-300 tw-transition-all"
              :class="{
                'tw-bg-white tw-text-primary-500 tw-font-semibold tw-border-l-4 tw-border-l-primary-500': selected,
                'tw-bg-transparent tw-font-semibold': !selected,
              }"
            >
              Behaviour
            </button>
          </Tab>
          <Tab v-slot="{ selected }" as="template">
            <button
              class="tw-block tw-w-full tw-text-left tw-p-4 tw-border-b tw-border-b-gray-300 tw-transition-all"
              :class="{
                'tw-bg-white tw-text-primary-500 tw-font-semibold tw-border-l-4 tw-border-l-primary-500': selected,
                'tw-bg-transparent tw-font-semibold': !selected,
              }"
            >
              Appearance
            </button>
          </Tab>
          <Tab v-slot="{ selected }" as="template">
            <button
              class="tw-block tw-w-full tw-text-left tw-p-4 tw-transition-all" :class="{
                'tw-bg-white tw-text-primary-500 tw-font-semibold tw-border-l-4 tw-border-l-primary-500': selected,
                'tw-bg-transparent tw-font-semibold': !selected,
              }"
            >
              Other
            </button>
          </Tab>
        </TabList>
        <!-- /Tab titles -->

        <!-- Tab panels -->
        <TabPanels as="div" class="tw-shrink tw-w-full tw-border tw-border-gray-300 tw-p-6">
          <!-- Content -->
          <TabPanel as="div" class="tw-block tw-w-full">
            <WPFormGroup
              title="Title"
              description="Please provide a title for your popup. E.g. 'Check out our latest offers!'"
              for="popup-title"
              required
            >
              <WPInput
                id="popup-title"
                type="text"
                :disabled="busy"
                placeholder="Popup Title..."
                :value="popupDetails.title"
                @change="(val) => (popupDetails.title = val)"
              />
            </WPFormGroup>
            <WPFormGroup
              class="tw-mt-6"
              title="Content"
              description="Please enter the main body of text within this popup. (Shortcodes are allowed)"
              for="popup-content"
              required
            >
              <WPTextarea
                id="popup-content"
                :rows="12"
                :disabled="busy"
                placeholder="Popup Content..."
                :value="popupDetails.content"
                @change="(val) => (popupDetails.content = val)"
              />
            </WPFormGroup>
            <WPFormGroup
              class="tw-mt-6"
              title="Show Button"
              description="Add a button to your popup"
              for="popup-show-button"
            >
              <WPCheckbox
                id="popup-show-button"
                :disabled="busy"
                :checked="popupDetails.buttonEnabled"
                @change="(val) => (popupDetails.buttonEnabled = val)"
              />
            </WPFormGroup>
            <WPFormGroup
              v-if="popupDetails.buttonEnabled"
              class="tw-mt-6"
              title="Button Label"
              description="E.g. 'See More'"
              for="popup-button-label"
            >
              <WPInput
                id="popup-button-label"
                type="text"
                :disabled="busy"
                :value="popupDetails.buttonLabel"
                @change="(val) => (popupDetails.buttonLabel = val)"
              />
            </WPFormGroup>
            <WPFormGroup
              v-if="popupDetails.buttonEnabled"
              class="tw-mt-6"
              title="Button URL"
              description="E.g. 'https://www.example.com/my-page'"
              for="popup-button-url"
            >
              <WPInput
                id="popup-button-url"
                type="text"
                :disabled="busy"
                :value="popupDetails.buttonURL"
                @change="(val) => (popupDetails.buttonURL = val)"
              />
            </WPFormGroup>
          </TabPanel>
          <!-- /Content -->

          <!-- Behaviour -->
          <TabPanel as="div" class="tw-block tw-w-full">
            <WPFormGroup
              title="Display Frequency"
              description="How often should this popup be displayed to the end user?"
              required
              for="popup-display-frequency"
            >
              <WPSelect
                id="popup-display-frequency"
                :disabled="busy"
                :value="popupDetails.displayFrequency"
                :options="[
                  { label: 'Every Page Load', value: 'page-load' },
                  { label: 'Once Per Session (Recommended)', value: 'session' },
                  { label: 'Once Per Day', value: 'daily' },
                  { label: 'Once Per Week', value: 'weekly' },
                ]"
                @change="(val) => (popupDetails.displayFrequency = val)"
              />
              <WPNotice
                v-if="popupDetails.displayFrequency === 'page-load'"
                variant="warning"
                class="!tw-mt-2"
                content="The popup will be displayed everytime the user navigates to a new page. This is not recommended as it will be annoying for the end-user."
              />
              <WPNotice
                v-else-if="popupDetails.displayFrequency === 'session'"
                variant="info"
                class="!tw-mt-2"
                content="This will only display the popup once during a users session on your website. Once they close the browser and revisit your website, it'll appear again."
              />
              <WPNotice
                v-else-if="popupDetails.displayFrequency === 'daily'"
                variant="info"
                class="!tw-mt-2"
                content="The popup will appear to the user at a maximum of once a day."
              />
              <WPNotice
                v-else-if="popupDetails.displayFrequency === 'weekly'"
                variant="info"
                class="!tw-mt-2"
                content="The popup will appear to the user at a maximum of once a week."
              />
            </WPFormGroup>
            <WPFormGroup
              class="tw-mt-6"
              title="Opening Delay"
              description="How many seconds delay before the popup should appear?"
              for="popup-opening-delay"
              required
            >
              <WPSelect
                id="popup-opening-delay"
                :disabled="busy"
                :value="popupDetails.openingDelay.toString()"
                :options="[
                  { label: '0 seconds', value: '0' },
                  { label: '1 second', value: '1' },
                  { label: '2 seconds', value: '2' },
                  { label: '3 seconds', value: '3' },
                  { label: '4 seconds', value: '4' },
                  { label: '5 seconds (Recommended)', value: '5' },
                  { label: '10 seconds', value: '10' },
                  { label: '15 seconds', value: '15' },
                  { label: '20 seconds', value: '20' },
                  { label: '25 seconds', value: '25' },
                  { label: '30 seconds', value: '30' },
                ]"
                @change="(val) => (popupDetails.openingDelay = Number(val))"
              />
            </WPFormGroup>
            <WPFormGroup
              class="tw-mt-6"
              title="Show Popup on all pages"
              description="If you disable this option, you can manually select which pages the popup should appear on."
              for="popup-show-all-pages"
            >
              <WPCheckbox
                id="popup-show-all-pages"
                :disabled="busy"
                :checked="popupDetails.showOnAllPages"
                @change="(val) => (popupDetails.showOnAllPages = val)"
              />
            </WPFormGroup>
            <WPFormGroup
              v-if="!popupDetails.showOnAllPages"
              class="tw-mt-6"
              title="Page Selection"
              description="Please select which pages the popup should appear on."
            >
              <div class="tw-block tw-rounded-sm tw-w-full tw-overflow-x-hidden tw-overflow-y-auto tw-h-60 tw-border tw-border-gray-400">
                <p v-if="isLoadingPages" class="tw-p-2">
                  Loading pages...
                </p>
                <WPCheckbox
                  v-for="page in pages"
                  :id="`popup-page-${page.ID}`"
                  :key="page.ID"
                  :checked="popupDetails.showOnThesePages.includes(page.ID)"
                  :disabled="busy"
                  :label="page.post_title"
                  class="tw-p-2 tw-border-b tw-border-b-gray-400"
                  @change="(val) => (popupDetails.showOnThesePages = val ? [...popupDetails.showOnThesePages, page.ID] : popupDetails.showOnThesePages.filter((id) => id !== page.ID))"
                />
              </div>
            </WPFormGroup>
          </TabPanel>
          <!-- /Behaviour -->

          <!-- Appearance -->
          <TabPanel as="div" class="tw-block tw-w-full">
            <WPFormGroup
              title="Backdrop Color"
              description="The color of the backdrop behind the popup"
              required
            >
              <WPInput
                type="color"
                placeholder="Select"
                :disabled="busy"
                :value="popupDetails.backdropColor"
                @change="(val) => (popupDetails.backdropColor = val)"
              />
            </WPFormGroup>
            <WPFormGroup
              class="tw-mt-6"
              title="Backdrop Opacity"
              description="How solid should the backdrop appear? Lower opacity means you'll see the content behind the popup more."
              for="popup-backdrop-opacity"
              required
            >
              <WPSelect
                id="popup-backdrop-opacity"
                :disabled="busy"
                :value="popupDetails.backdropOpacity.toString()"
                :options="[
                  { label: '0%', value: '0' },
                  { label: '10%', value: '10' },
                  { label: '20%', value: '20' },
                  { label: '30%', value: '30' },
                  { label: '40%', value: '40' },
                  { label: '50%', value: '50' },
                  { label: '60%', value: '60' },
                  { label: '70% (Recommended)', value: '70' },
                  { label: '80%', value: '80' },
                  { label: '90%', value: '90' },
                  { label: '100%', value: '100' },
                ]"
                @change="(val) => (popupDetails.backdropOpacity = Number(val))"
              />
            </WPFormGroup>
            <WPFormGroup
              class="tw-mt-6"
              title="Maximum Width (px)"
              description="This is relevant mainly for larger screens. We recommended around 600px."
              for="popup-max-width"
              required
            >
              <WPInput
                id="popup-max-width"
                type="number"
                placeholder="Maximum Width..."
                :disabled="busy"
                :value="popupDetails.maxWidth.toString()"
                @change="(val) => (popupDetails.maxWidth = Number(val))"
              />
            </WPFormGroup>
            <WPFormGroup
              class="tw-mt-6"
              title="Rounded Corners"
              description="Adds rounded corners to your popup"
              for="popup-rounded-corners"
            >
              <WPCheckbox
                id="popup-rounded-corners"
                :disabled="busy"
                :checked="popupDetails.roundedCornersEnabled"
                @change="(val) => (popupDetails.roundedCornersEnabled = val)"
              />
            </WPFormGroup>
            <WPFormGroup
              v-if="popupDetails.buttonEnabled"
              class="tw-mt-6"
              title="Button Background Color"
              description="Set the background color of the button. You should use a colour that matches your theme."
              for="popup-button-background-color"
            >
              <WPInput
                id="popup-button-background-color"
                type="color"
                :disabled="busy"
                :value="popupDetails.buttonBackgroundColor"
                @change="(val) => (popupDetails.buttonBackgroundColor = val)"
              />
            </WPFormGroup>
            <WPFormGroup
              v-if="popupDetails.buttonEnabled"
              class="tw-mt-6"
              title="Button Text Color"
              description="Pick a colour that is readable on your Button Background Color."
              for="popup-button-text-color"
            >
              <WPInput
                id="popup-button-text-color"
                type="color"
                :disabled="busy"
                :value="popupDetails.buttonTextColor"
                @change="(val) => (popupDetails.buttonTextColor = val)"
              />
            </WPFormGroup>
          </TabPanel>
          <!-- /Appearance -->

          <!-- Other -->
          <TabPanel as="div" class="tw-block tw-w-full">
            <WPFormGroup
              title="Deactivate"
              description="Deactive the popup. It will no longer appear anywhere."
              for="popup-deactivated"
            >
              <WPCheckbox
                id="popup-deactivated"
                :disabled="busy"
                :checked="popupDetails.deactivated"
                @change="(val) => (popupDetails.deactivated = val)"
              />
            </WPFormGroup>
            <WPFormGroup
              class="tw-mt-6"
              title="Test Mode"
              description="Enabling test mode will only show the popup to logged in users (like yourself). It will also ignore the display frequency and show it to you every time the page loads. This is good for testing your popup, but don't forget to disabled it when you're finished!"
              for="popup-test-mode"
            >
              <WPCheckbox
                id="popup-test-mode"
                :disabled="busy"
                :checked="popupDetails.testModeEnabled"
                @change="(val) => (popupDetails.testModeEnabled = val)"
              />
            </WPFormGroup>
          </TabPanel>
          <!-- /Other -->
        </TabPanels>
        <!-- /Tab panels -->
      </TabGroup>
    </div>
  </div>
</template>
