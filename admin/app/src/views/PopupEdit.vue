<script lang="ts" setup>
import { useRoute, useRouter } from 'vue-router'
import { onMounted, reactive, ref } from 'vue'
import axios from 'axios'
import WPMetaBox from '../components/WPMetaBox.vue'
import WPButton from '../components/WPButton.vue'
import WPMetaBoxDonate from '../components/WPMetaBoxDonate.vue'
import FormPopup from '../components/FormPopup.vue'
import type { PopupDetails } from '../models/PopupDetails'
import WPLoadingBar from '../components/WPLoadingBar.vue'

const magicPopupsAjax = (window as any).magic_popups_ajax as { url: string; nonce: string }

const router = useRouter()
const route = useRoute()
const popupId = route.params.id as string

const isPopupSaving = ref(false)
const isPopupLoading = ref(false)
const doesPopupExist = ref(true)

const popupDetails = reactive({
  id: '',
  title: '',
  content: '',
  displayFrequency: 'session',
  openingDelay: 5,
  buttonEnabled: false,
  buttonLabel: '',
  buttonURL: '',
  buttonBackgroundColor: '#6f47e5',
  buttonTextColor: '#FFFFFF',
  backdropColor: '#000000',
  backdropOpacity: 70,
  maxWidth: 600,
  roundedCornersEnabled: true,
  showOnAllPages: true,
  showOnThesePages: [] as number[],
  testModeEnabled: false,
  deactivated: false,
})

onMounted(async() => {
  isPopupLoading.value = true
  const formData = new FormData()
  formData.append('action', 'magic_popups_get_popup_by_id')
  formData.append('nonce', magicPopupsAjax.nonce)
  formData.append('id', popupId)
  try {
    const { data } = await axios.post<{ success: boolean; message: string; popupDetails: PopupDetails }>(
      magicPopupsAjax.url,
      formData,
    )
    doesPopupExist.value = data.success
    if (!data.success)
      return

    popupDetails.id = data.popupDetails.id
    popupDetails.title = data.popupDetails.title
    popupDetails.content = data.popupDetails.content
    popupDetails.displayFrequency = data.popupDetails.displayFrequency
    popupDetails.openingDelay = data.popupDetails.openingDelay
    popupDetails.buttonEnabled = data.popupDetails.buttonEnabled
    popupDetails.buttonLabel = data.popupDetails.buttonLabel
    popupDetails.buttonURL = data.popupDetails.buttonURL
    popupDetails.buttonBackgroundColor = data.popupDetails.buttonBackgroundColor
    popupDetails.buttonTextColor = data.popupDetails.buttonTextColor
    popupDetails.backdropColor = data.popupDetails.backdropColor
    popupDetails.backdropOpacity = data.popupDetails.backdropOpacity
    popupDetails.maxWidth = data.popupDetails.maxWidth
    popupDetails.roundedCornersEnabled = data.popupDetails.roundedCornersEnabled
    popupDetails.showOnAllPages = data.popupDetails.showOnAllPages
    popupDetails.showOnThesePages = data.popupDetails.showOnThesePages
    popupDetails.testModeEnabled = data.popupDetails.testModeEnabled
    popupDetails.deactivated = data.popupDetails.deactivated
  }
  catch (err) {
    console.log(err)
  }
  finally {
    isPopupLoading.value = false
  }
})

async function onChange(newPopupDetails: PopupDetails) {
  popupDetails.id = newPopupDetails.id
  popupDetails.title = newPopupDetails.title
  popupDetails.content = newPopupDetails.content
  popupDetails.displayFrequency = newPopupDetails.displayFrequency
  popupDetails.openingDelay = newPopupDetails.openingDelay
  popupDetails.buttonEnabled = newPopupDetails.buttonEnabled
  popupDetails.buttonLabel = newPopupDetails.buttonLabel
  popupDetails.buttonURL = newPopupDetails.buttonURL
  popupDetails.buttonBackgroundColor = newPopupDetails.buttonBackgroundColor
  popupDetails.buttonTextColor = newPopupDetails.buttonTextColor
  popupDetails.backdropColor = newPopupDetails.backdropColor
  popupDetails.backdropOpacity = newPopupDetails.backdropOpacity
  popupDetails.maxWidth = newPopupDetails.maxWidth
  popupDetails.roundedCornersEnabled = newPopupDetails.roundedCornersEnabled
  popupDetails.showOnAllPages = newPopupDetails.showOnAllPages
  popupDetails.showOnThesePages = newPopupDetails.showOnThesePages
  popupDetails.testModeEnabled = newPopupDetails.testModeEnabled
  popupDetails.deactivated = newPopupDetails.deactivated
}

async function onSave() {
  const details = { ...popupDetails }

  if (!details.title)
    return alert('Please enter a title before saving.')

  isPopupSaving.value = true

  const formData = new FormData()
  formData.append('action', 'magic_popups_update_popup')
  formData.append('nonce', magicPopupsAjax.nonce)
  formData.append('popup', JSON.stringify({ ...details }))
  try {
    const { data } = await axios.post<{
      success: boolean
      message: string
      popupDetails: PopupDetails
    }>(
      magicPopupsAjax.url,
      formData,
    )
    console.log(data)
    if (!data.success) {
      alert('Sorry, there was an problem saving the popup. Please try again.')
      return
    }
    alert('Saved successfully!')
  }
  catch (err) {
    console.log(err)
  }
  finally {
    isPopupSaving.value = false
  }
}

function onBack() {
  router.push('/')
}

</script>
<template>
  <div class="tw-flex tw-gap-4">
    <div class="tw-flex-1">
      <WPMetaBox>
        <template #title>
          <div>
            <WPButton variant="secondary" @click="onBack">
              <svg
                xmlns="http://www.w3.org/2000/svg" class="tw-h-5 tw-w-5" fill="none" viewBox="0 0 24 24"
                stroke="currentColor" stroke-width="1"
              >
                <path stroke-linecap="round" stroke-linejoin="round" d="M11 17l-5-5m0 0l5-5m-5 5h12" />
              </svg>
              Back
            </WPButton>
          </div>
          <div>
            <h2 class="!tw-p-0">
              Edit Popup
            </h2>
          </div>
          <div class="tw-ml-auto">
            <WPButton :disabled="isPopupSaving || isPopupLoading || !doesPopupExist" @click="onSave">
              Save Changes
            </WPButton>
          </div>
        </template>
        <template #content>
          <div class="!tw-absolute tw-top-0 tw-left-0 tw-w-full tw-z-10">
            <WPLoadingBar v-if="isPopupSaving || isPopupLoading" />
          </div>
          <div class="tw-relative tw-block tw-p-4 tw-min-h-[400px]">
            <div v-if="!isPopupLoading && doesPopupExist" class="tw-block">
              <FormPopup :popup-details="popupDetails" :busy="isPopupSaving || isPopupLoading" @change="onChange" />
            </div>
            <div v-if="!isPopupLoading && !doesPopupExist" class="tw-block">
              <div class="tw-text-center tw-font-semibold tw-my-6 tw-mb-3">
                Sorry, this popup no longer exists.
              </div>
              <div class="tw-text-center">
                <WPButton variant="primary" @click="onBack">
                  Go Back
                </WPButton>
              </div>
            </div>
          </div>
        </template>
      </WPMetaBox>
    </div>
    <div class="tw-w-full md:tw-w-[350px]">
      <WPMetaBoxDonate />
    </div>
  </div>
</template>
