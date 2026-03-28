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

  // Keep the ref in sync so the scanner always calls the latest callback
  useEffect(() => {
    onScanRef.current = onScan
  }, [onScan])

  const start = useCallback(async () => {
    if (scannerRef.current) return

    try {
      const scanner = new Html5Qrcode(elementId)
      scannerRef.current = scanner

      const cameras = await Html5Qrcode.getCameras()
      if (cameras.length === 0) {
        setError('No camera found')
        return
      }

      await scanner.start(
        cameras[0].id,
        {
          fps: 10,
          qrbox: { width: 300, height: 150 },
        },
        (decodedText) => {
          onScanRef.current(decodedText)
        },
        () => {}
      )

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
