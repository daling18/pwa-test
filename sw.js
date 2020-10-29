const V = 'v3'
self.addEventListener('install', async (e) => {
    //dddddddddd  ppppppppppppp
    console.log('--------------------')
    const cache = await caches.open(V)
    await cache.addAll([
    ])
    
    await self.skipWaiting()
})

self.addEventListener('activate', async (e) => {
    console.log('-------activate---')
    const cachsKeys = await caches.keys()
    console.log(cachsKeys)
    cachsKeys.forEach((key) => {
        if (key === V) return
        console.log('----------')
        caches.delete(key)
    })
    clients.claim() //
})

self.addEventListener('fetch', (e) => {
    // console.log(e.request.url)
    // caches.match(e.request)
    if (e.request.url.includes('/api')) {
        
        e.respondWith(netFirst(e.request))
    } else {
        e.respondWith(cachsFirst(e.request))
    }
})
// self.addEventListener('install', (e) => {
    
// })
async function cachsFirst(req) {
    const cache = await caches.open(V)
    const res = await cache.match(req)
    if (res) {
        return res
    } else {
        const res = await fetch(req)
        await cache.put(req, res.clone())
        return res
    }
    // try {
    //     const res = await cache.match(req)
    //     console.log(res)
    //     return res
    // } catch (error) {
    //     const res = await fetch(req)
    //     await cache.put(req, res.clone())
    //     return res
    // }
}
async function netFirst(req) {
    const cache = await caches.open(V)
    try {
        const res = await fetch(req)
        await cache.put(req, res.clone())
        return res
    } catch (error) {
        const res = await cache.match(req)
        return res
    }
    
}