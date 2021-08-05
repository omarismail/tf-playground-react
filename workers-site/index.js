//import { getAssetFromKV, serveSinglePageApp } from '@cloudflare/kv-asset-handler';
import { getAssetFromKV } from "@cloudflare/kv-asset-handler";


/**
 * The DEBUG flag will do two things that help during development:
 * 1. we will skip caching on the edge, which makes it easier to
 *    debug.
 * 2. we will return an error message on exception in your Response rather
 *    than the default 404.html page.
 */
const DEBUG = false

//async function handleEvent(event) {
//  const asset = await getAssetFromKV(event, { mapRequestToAsset: serveSinglePageApp });
//  try {
//    return asset;
//  } catch (e) {
//    let pathname = new URL(event.request.url).pathname;
//    return new Response(`"${pathname}" not found`, {
//      status: 404,
//      statusText: "not found"
//    });
//  }
//}


async function handleEvent(event) {
  try {
    const assets = await getAssetFromKV(event);
    return assets
  } catch (e) {
    let pathname = new URL(event.request.url).pathname;
    return new Response(`"${pathname}" not found`, {
      status: 404,
      statusText: "not found"
    });
  }
}

addEventListener("fetch", event => {
  event.respondWith(handleEvent(event));
});

//async function handleEvent(event) {
//  const url = new URL(event.request.url)
//  let options = {}
//
//  try {
//    const page = await getAssetFromKV(event, options);
//
//    // allow headers to be altered
//    const response = new Response(page.body, page);
//
//    response.headers.set("X-XSS-Protection", "1; mode=block");
//    response.headers.set("X-Content-Type-Options", "nosniff");
//    response.headers.set("X-Frame-Options", "DENY");
//    response.headers.set("Referrer-Policy", "unsafe-url");
//    response.headers.set("Feature-Policy", "none");
//
//    return response;
//
//  } catch (e) {
//    // if an error is thrown try to serve the asset at 404.html
//    if (!DEBUG) {
//      try {
//        let notFoundResponse = await getAssetFromKV(event, {
//          mapRequestToAsset: req => new Request(`${new URL(req.url).origin}/404.html`, req),
//        })
//
//        return new Response(notFoundResponse.body, { ...notFoundResponse, status: 404 })
//      } catch (e) {}
//    }
//
//    return new Response(e.message || e.toString(), { status: 500 })
//  }
//}
