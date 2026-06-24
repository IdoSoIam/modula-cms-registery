import type { ModuleContext } from "./types"

export async function handleGmailSyncModule(context: ModuleContext) {
  const { request, url } = context

  if (!url.pathname.startsWith("/v1/gmail-sync")) {
    return null
  }

  if (request.method === "GET" && url.pathname === "/v1/gmail-sync/health") {
    return new Response(JSON.stringify({
      ok: true,
      module: "gmail-sync",
      status: "skeleton",
      message: "Gmail sync module is scaffolded but not implemented yet."
    }), {
      headers: {
        "content-type": "application/json; charset=utf-8"
      }
    })
  }

  return new Response(JSON.stringify({
    message: "Gmail sync module is not implemented yet."
  }), {
    status: 501,
    headers: {
      "content-type": "application/json; charset=utf-8"
    }
  })
}
