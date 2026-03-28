import { useRef, useCallback, useState, useEffect } from 'react'
import { Html5Qrcode } from 'html5-qrcode'

interface UseScannerOptions {
  onScan: (decodedText: string) => void
  elementId: string
}

const scanConfig = {
  fps: 10,
  qrbox: { width: 280, height: 140 },
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

      const successCb = (decodedText: string) => { onScanRef.current(decodedText) }
      const errorCb = () => {}

      const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent)
      const preferredFacing = isMobile ? 'environment' : 'user'

      // Try preferred camera first, fall back to any available camera
      try {
        await scanner.start(
          { facingMode: preferredFacing },
          scanConfig,
          successCb,
          errorCb,
        )
      } catch {
        // Preferred camera failed — try listing cameras and using the first one
        const cameras = await Html5Qrcode.getCameras()
        if (cameras.length === 0) {
          setError('No camera found')
          scannerRef.current = null
          return
        }
        await scanner.start(cameras[0].id, scanConfig, successCb, errorCb)
      }

      // Try to enable continuous autofocus
      try {
        const videoEl = document.querySelector(`#${elementId} video`) as HTMLVideoElement | null
        if (videoEl?.srcObject) {
          const track = (videoEl.srcObject as MediaStream).getVideoTracks()[0]
          const caps = track.getCapabilities?.()
          if (caps && 'focusMode' in caps) {
            await track.applyConstraints({
              // @ts-expect-error -- focusMode not in TS types
              advanced: [{ focusMode: 'continuous' }],
            })
          }
        }
      } catch {
        // not supported — fine
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
