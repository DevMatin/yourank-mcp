import { list, del } from '@vercel/blob'

export default async function handler(req, res) {
  try {
    const cutoff = Date.now() - 24*60*60*1000
    const { blobs } = await list({ prefix: 'business-data/listings/' })
    const toDelete = blobs.filter(b => {
      const parts = b.pathname.split('/')
      const file = parts[parts.length - 1] || ''
      const ts = Number(file.split('-')[0])
      return Number.isFinite(ts) && ts < cutoff
    })
    await Promise.allSettled(toDelete.map(b => del(b.url)))
    res.json({ deleted: toDelete.length, scanned: blobs.length })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}


