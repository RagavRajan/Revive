let successAudio: HTMLAudioElement | null = null
let failureAudio: HTMLAudioElement | null = null

export function preloadSounds() {
  successAudio = new Audio('/sounds/success.wav')
  failureAudio = new Audio('/sounds/failure.wav')
}

export function playSuccess() {
  if (successAudio) {
    successAudio.currentTime = 0
    successAudio.play().catch(() => {})
  }
}

export function playFailure() {
  if (failureAudio) {
    failureAudio.currentTime = 0
    failureAudio.play().catch(() => {})
  }
}
