/**
 * cf-getipd - Cloudflare worker for showing ip address
*/

import { Router } from 'itty-router'
import getIP from './handlers/getIP'
import getIPJSON from './handlers/getIPJSON'
const router = Router()

router.get('/', getIP)
router.get('/json', getIPJSON)

// 404 for everything else
router.all('*', () => new Response('Not Found.', { status: 404 }))

// attach the router "handle" to the event handler
addEventListener('fetch', event =>
  event.respondWith(router.handle(event.request))
)