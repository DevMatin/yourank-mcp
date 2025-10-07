import { list, del } from '@vercel/blob';
import { VercelRequest, VercelResponse } from '@vercel/node';

interface BlobInfo {
  pathname: string;
  url: string;
}

interface CleanupResponse {
  deleted: number;
  scanned: number;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    const cutoff = Date.now() - 24*60*60*1000;
    const { blobs } = await list({ prefix: 'business-data/listings/' });
    
    const toDelete = blobs.filter((b: BlobInfo) => {
      const parts = b.pathname.split('/');
      const file = parts[parts.length - 1] || '';
      const ts = Number(file.split('-')[0]);
      return Number.isFinite(ts) && ts < cutoff;
    });
    
    await Promise.allSettled(toDelete.map((b: BlobInfo) => del(b.url)));
    res.json({ deleted: toDelete.length, scanned: blobs.length });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
}
