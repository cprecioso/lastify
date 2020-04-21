import PQueue from "p-queue"
import React from "react"

const pQueue = new PQueue({ concurrency: 1 })

const DOWNSIZE_PIXELS = 10

const { createCanvas, toBlob } = globalThis.OffscreenCanvas
  ? {
      createCanvas() {
        return new OffscreenCanvas(DOWNSIZE_PIXELS, DOWNSIZE_PIXELS)
      },
      toBlob(canvas: OffscreenCanvas) {
        return canvas.convertToBlob({ type: "image/png" })
      },
    }
  : {
      createCanvas() {
        const canvas = document.createElement("canvas")
        canvas.width = DOWNSIZE_PIXELS
        canvas.height = DOWNSIZE_PIXELS
        return canvas
      },
      toBlob(canvas: HTMLCanvasElement) {
        return new Promise((fulfill) => canvas.toBlob(fulfill, "image/png"))
      },
    }

export const useImageColor = () => {
  const [ref, setRef] = React.useState<HTMLImageElement | null>(null)
  const [bgImage, setBgImage] = React.useState("")

  const listener = React.useCallback(async () => {
    if (!ref) return
    pQueue.add(async () => {
      const canvas = createCanvas()
      const ctx = canvas.getContext("2d")!
      ctx.drawImage(ref, 0, 0, DOWNSIZE_PIXELS, DOWNSIZE_PIXELS)
      // @ts-expect-error
      const blob = await toBlob(canvas)
      setBgImage(URL.createObjectURL(blob))
    })
  }, [ref])

  React.useEffect(() => {
    if (ref) {
      ref.addEventListener("load", listener, { once: true })
      return () => ref.removeEventListener("load", listener)
    }
  }, [ref])

  return { setRef, bgImage }
}
