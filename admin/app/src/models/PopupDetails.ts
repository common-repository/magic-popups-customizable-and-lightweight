interface PopupDetails {
  id: string
  title: string
  content: string
  displayFrequency: string
  openingDelay: number
  buttonEnabled: boolean
  buttonLabel: string
  buttonURL: string
  buttonBackgroundColor: string
  buttonTextColor: string
  backdropColor: string
  backdropOpacity: number
  maxWidth: number
  roundedCornersEnabled: boolean
  showOnAllPages: boolean
  showOnThesePages: number[]
  testModeEnabled: boolean
  deactivated: boolean
}

export type { PopupDetails }
