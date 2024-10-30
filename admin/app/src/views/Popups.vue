<script lang="ts" setup>
import { useRouter } from 'vue-router'
import { onMounted, ref } from 'vue'
import axios from 'axios'
import WPMetaBox from '../components/WPMetaBox.vue'
import WPButton from '../components/WPButton.vue'
import WPMetaBoxDonate from '../components/WPMetaBoxDonate.vue'
import type { PopupDetails } from '../models/PopupDetails'
import WPLoadingBar from '../components/WPLoadingBar.vue'
import WPDropdown from '../components/WPDropdown.vue'
import WPDropdownOption from '../components/WPDropdownOption.vue'

const magicPopupsAjax = (window as any).magic_popups_ajax as { url: string; nonce: string }

const router = useRouter()

const isLoading = ref(false)

const popups = ref<PopupDetails[]>([])

function onCreatePopupClick() {
  router.push('/create')
}

onMounted(async() => {
  isLoading.value = true
  const formData = new FormData()
  formData.append('action', 'magic_popups_get_popups')
  formData.append('nonce', magicPopupsAjax.nonce)
  try {
    const { data } = await axios.post<PopupDetails[]>(
      magicPopupsAjax.url,
      formData,
    )
    popups.value = data
  }
  catch (err) {
    console.log(err)
  }
  finally {
    isLoading.value = false
  }
})

async function handleDeleteClick(popup: PopupDetails) {
  const confirmed = window.confirm('Are you sure you want to delete this popup?')
  if (!confirmed)
    return

  // Remove this popup from array
  popups.value = popups.value.filter(p => p.id !== popup.id)

  // Delete quietly
  const formData = new FormData()
  formData.append('action', 'magic_popups_delete_popup')
  formData.append('nonce', magicPopupsAjax.nonce)
  formData.append('id', popup.id)
  try {
    await axios.post<{ success: boolean; message: string }>(
      magicPopupsAjax.url,
      formData,
    )
  }
  catch (err) {
    console.log(err)
  }
}

function handleEditClick(popup: PopupDetails) {
  router.push(`/popups/${popup.id}`)
}

</script>
<template>
  <div class="tw-flex tw-gap-4">
    <div class="tw-flex-1">
      <WPMetaBox>
        <template #title>
          <div>
            <div class="tw-w-8 tw-h-8 tw-rounded-full tw-bg-primary-500 tw-text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg" class="tw-h-4 tw-w-4 tw-ml-2 tw-mt-2" viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z"
                />
              </svg>
            </div>
          </div>
          <div>
            <h2 class="!tw-p-0">
              My Popups
            </h2>
          </div>
          <div class="tw-ml-auto">
            <WPButton @click="onCreatePopupClick">
              Create Popup
            </WPButton>
          </div>
        </template>
        <template #content>
          <div class="tw-relative tw-block tw-w-full tw-min-h-[400px]">
            <div v-if="isLoading" class="!tw-absolute tw-top-0 tw-left-0 tw-w-full tw-z-10">
              <WPLoadingBar />
            </div>
            <table
              v-if="!isLoading && popups.length > 0"
              class="tw-table-auto tw-w-full tw-border-b tw-border-b-gray-300"
            >
              <thead class="tw-bg-gray-50 tw-text-xs tw-font-semibold tw-uppercase tw-border-b tw-border-b-gray-300">
                <tr>
                  <th class="tw-p-4 tw-whitespace-nowrap">
                    <div class="tw-font-semibold tw-text-left">
                      Title
                    </div>
                  </th>
                  <th class="tw-p-4 tw-whitespace-nowrap tw-w-[150px]">
                    <div class="tw-font-semibold tw-text-left">
                      Test Mode
                    </div>
                  </th>
                  <th class="tw-p-4 tw-whitespace-nowrap tw-w-[150px]">
                    <div class="tw-font-semibold tw-text-left">
                      Status
                    </div>
                  </th>
                  <th class="tw-p-4 tw-whitespace-nowrap tw-w-[100px]">
                    <div class="tw-font-semibold tw-text-left">
                      Action
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody class="tw-divide-y tw-divide-gray-300">
                <tr v-for="popup in popups" :key="popup.id" class="tw-bg-white hover:tw-bg-gray-50">
                  <td class="tw-p-4">
                    <div
                      class="tw-text-left tw-font-semibold hover:tw-underline focus:tw-underline active:tw-underline"
                    >
                      <router-link :to="`/popups/${popup.id}`">
                        {{ popup.title }}
                      </router-link>
                    </div>
                  </td>
                  <td class="tw-p-4 tw-whitespace-nowrap">
                    <span
                      v-if="popup.testModeEnabled"
                      class="tw-bg-orange-200 tw-text-orange-600 tw-text-center tw-rounded-md tw-text-xs tw-px-2 tw-py-1"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg" class="tw-h-5 tw-w-4" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor" stroke-width="2"
                      >
                        <path
                          stroke-linecap="round" stroke-linejoin="round"
                          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                        />
                      </svg>
                      Active
                    </span>
                    <span
                      v-if="!popup.testModeEnabled"
                      class="tw-bg-gray-200 tw-text-gray-600 tw-text-center tw-rounded-md tw-text-xs tw-px-2 tw-py-1"
                    >
                      Off
                    </span>
                  </td>
                  <td class="tw-p-4 tw-whitespace-nowrap">
                    <span
                      v-if="popup.deactivated"
                      class="tw-rounded-md tw-bg-red-200 tw-text-red-600 tw-px-2 tw-py-1 tw-text-xs tw-font-semibold"
                    >Deactivated</span>
                    <span
                      v-else
                      class="tw-rounded-md tw-bg-green-200 tw-text-green-600 tw-px-2 tw-py-1 tw-text-xs tw-font-semibold"
                    >Active</span>
                  </td>
                  <td class="tw-p-4 tw-whitespace-nowrap">
                    <WPDropdown width="120px">
                      <template #trigger>
                        <a href="#" class="tw-cursor-pointer">
                          <svg
                            xmlns="http://www.w3.org/2000/svg" class="tw-h-5 tw-w-5" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor" stroke-width="2"
                          >
                            <path
                              stroke-linecap="round" stroke-linejoin="round"
                              d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
                            />
                          </svg>
                        </a>
                      </template>
                      <template #options>
                        <WPDropdownOption @click="handleEditClick(popup)">
                          <svg
                            xmlns="http://www.w3.org/2000/svg" class="tw-h-4 tw-w-5 tw-mr-2" viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"
                            />
                          </svg>
                          Edit
                        </WPDropdownOption>
                        <WPDropdownOption @click="handleDeleteClick(popup)">
                          <svg
                            xmlns="http://www.w3.org/2000/svg" class="tw-h-4 tw-w-5 tw-mr-2" viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fill-rule="evenodd"
                              d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                              clip-rule="evenodd"
                            />
                          </svg>
                          Delete
                        </WPDropdownOption>
                      </template>
                    </WPDropdown>
                  </td>
                </tr>
              </tbody>
            </table>
            <div v-if="!isLoading && popups.length == 0" class="tw-relative tw-block tw-p-6">
              <div class="tw-text-center tw-font-semibold tw-my-4">
                Create your first popup!
              </div>
              <div class="tw-text-center">
                <WPButton variant="primary" @click="onCreatePopupClick">
                  Create Popup
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
