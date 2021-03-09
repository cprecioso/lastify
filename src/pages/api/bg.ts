import type { NextApiHandler } from "next"
import sharp from "sharp"

type Query = { url: string }

const DOWNSIZE_PIXELS = 20

const isSpotifyCdn = (url: URL) =>
  url.hostname === "scdn.co" || url.hostname.endsWith(".scdn.co")

const handler: NextApiHandler<Buffer> = async (req, res) => {
  const url = (req.query as Query).url
  if (!url || !isSpotifyCdn(new URL(url))) {
    res.status(400)
    return
  }

  const buf = await sharp(Buffer.from(await (await fetch(url)).arrayBuffer()))
    .resize(DOWNSIZE_PIXELS, DOWNSIZE_PIXELS)
    .png()
    .toBuffer()

  res.setHeader("Content-Type", "image/png")
  res.setHeader("Cache-Control", "max-age=31536000, public, immutable")
  res.send(buf)
}

export default handler
