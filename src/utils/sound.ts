let successAudio: HTMLAudioElement | null = null
let failureAudio: HTMLAudioElement | null = null

export function preloadSounds() {
  const base = import.meta.env.BASE_URL
  successAudio = new Audio(`${base}sounds/success.wav`)
  failureAudio = new Audio(`${base}sounds/failure.wav`)
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
