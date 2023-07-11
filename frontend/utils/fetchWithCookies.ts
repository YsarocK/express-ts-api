import { appendResponseHeader, H3Event } from 'h3'

export const fetchWithCookie = async (event: H3Event, url: string, options: object) => {
  const res = await fetch(url, options)
  const cookies = (res.headers.get('set-cookie') || '').split(',')
  for (const cookie of cookies) {
    appendResponseHeader(event, 'set-cookie', cookie)
  }
  return res._data
