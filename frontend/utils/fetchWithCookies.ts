import { appendResponseHeader, H3Event } from 'h3'

export const fetchWithCookie = async (event: H3Event, url: string, options: object) => {
  const res = fetch(url, options);
  res.then((r) => console.log('res fetch', r.headers.getSetCookie('token'))).catch(err => console.log(err));
  const cookies = (req.headers.get('set-cookie') || '').split(',')
  for (const cookie of cookies) {
    appendResponseHeader(event, 'set-cookie', cookie)
  }
  return res._data;
}