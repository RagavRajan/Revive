import { useRef, useCallback, useState, useEffect } from 'react'
import { Html5Qrcode } from 'html5-qrcode'

interface UseScannerOptions {
  onScan: (decodedText: string) => void
  elementId: string
}

export function useScanner({ onScan, elementId }: UseScannerOptions) {
  const scannerRef = useRef<Html5Qrcode | null>(null)
  const onScanRef = useRef(onScan)
  const [isRunning, setIsRunning] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    onScanRef.current = onScan
  }, [onScan])

  const start = useCallback(async () => {
    if (scannerRef.current) return

    try {
      const scanner = new Html5Qrcode(elementId)
      scannerRef.current = scanner

      // Use back camera on mobile (better autofocus), front on desktop
      const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent)
      const cameraConfig: MediaTrackConstraints = {
        facingMode: isMobile ? 'environment' : 'user',
        // @ts-expect-error -- advanced constraints not in TS types but supported by browsers
        advanced: [{ focusMode: 'continuous' }],
      }

      await scanner.start(
        cameraConfig,
        {
          fps: 10,
          qrbox: { width: 280, height: 140 },
          aspectRatio: isMobile ? 1.0 : undefined,
        },
        (decodedText) => {
          onScanRef.current(decodedText)
        },
        () => {}
      )

      // Try to enable continuous autofocus on the active video track
      try {
        const videoElement = document.querySelector(`#${elementId} video`) as HTMLVideoElement | null
        if (videoElement?.srcObject) {
          const track = (videoElement.srcObject as MediaStream).getVideoTracks()[0]
          const capabilities = track.getCapabilities?.()
          if (capabilities && 'focusMode' in capabilities) {
            await track.applyConstraints({
              // @ts-expect-error -- focusMode not in TS types
              advanced: [{ focusMode: 'continuous' }],
            })
          }
        }
      } catch {
        // autofocus constraint not supported — that's ok
      }

      setIsRunning(true)
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to start camera')
      scannerRef.current = null
    }
  }, [elementId])

  const stop = useCallback(async () => {
    if (scannerRef.current) {
      try {
        await scannerRef.current.stop()
        scannerRef.current.clear()
      } catch {
        // ignore cleanup errors
      }
      scannerRef.current = null
      setIsRunning(false)
    }
  }, [])

  return { start, stop, isRunning, error }
}
