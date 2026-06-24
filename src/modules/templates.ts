import type { ModuleContext, TemplateModuleHandlers } from "./types"

export async function handleTemplatesModule(
  context: ModuleContext,
  handlers: TemplateModuleHandlers
) {
  const { request, url, env } = context

  if (url.pathname === "/admin/api/templates" && request.method === "GET") {
    return await handlers.adminListTemplates(request, env)
  }

  const adminTemplateMetaMatch = url.pathname.match(/^\/admin\/api\/templates\/([^/]+)\/meta$/)
  if (adminTemplateMetaMatch && request.method === "PATCH") {
    return await handlers.adminUpdateTemplateMeta(request, env, decodeURIComponent(adminTemplateMetaMatch[1]!))
  }

  if (url.pathname === "/v1/template-assets" && request.method === "POST") {
    await handlers.authorize(request, env)
    return await handlers.createTemplateAsset(request, env)
  }

  if (url.pathname === "/v1/template-assets/by-source" && request.method === "GET") {
    return await handlers.getTemplateAssetBySource(request, env)
  }

  const templateAssetMatch = url.pathname.match(/^\/v1\/template-assets\/([^/]+)\/download$/)
  if (templateAssetMatch) {
    return await handlers.downloadTemplateAsset(request, env, templateAssetMatch[1]!)
  }

  const publicTemplateAssetMatch = url.pathname.match(/^\/public\/template-assets\/([^/]+)$/)
  if (publicTemplateAssetMatch && request.method === "GET") {
    return await handlers.publicTemplateAsset(env, decodeURIComponent(publicTemplateAssetMatch[1]!))
  }

  if (url.pathname === "/v1/auth/introspect" && request.method === "GET") {
    return await handlers.introspectAuth(request, env)
  }

  if (url.pathname === "/v1/templates" && request.method === "GET") {
    return await handlers.listTemplates(request, env)
  }

  if (url.pathname === "/v1/templates" && request.method === "POST") {
    const capabilities = await handlers.authorize(request, env)
    return await handlers.createTemplate(request, env, capabilities)
  }

  const versionMatch = url.pathname.match(/^\/v1\/templates\/([^/]+)\/versions$/)
  if (versionMatch && request.method === "POST") {
    const capabilities = await handlers.authorize(request, env)
    return await handlers.createTemplateVersion(request, env, decodeURIComponent(versionMatch[1]!), capabilities)
  }

  const deleteVersionMatch = url.pathname.match(/^\/v1\/templates\/([^/]+)\/versions\/([^/]+)$/)
  if (deleteVersionMatch && request.method === "DELETE") {
    const capabilities = await handlers.authorize(request, env)
    return await handlers.deleteTemplateVersion(
      request,
      env,
      decodeURIComponent(deleteVersionMatch[1]!),
      decodeURIComponent(deleteVersionMatch[2]!),
      capabilities
    )
  }

  const publishMatch = url.pathname.match(/^\/v1\/templates\/([^/]+)\/publish\/([^/]+)$/)
  if (publishMatch && request.method === "POST") {
    const capabilities = await handlers.authorize(request, env)
    return await handlers.publishTemplateVersion(
      request,
      env,
      decodeURIComponent(publishMatch[1]!),
      decodeURIComponent(publishMatch[2]!),
      capabilities
    )
  }

  const templateMatch = url.pathname.match(/^\/v1\/templates\/([^/]+)$/)
  if (templateMatch && request.method === "GET") {
    return await handlers.getTemplate(request, env, decodeURIComponent(templateMatch[1]!))
  }

  if (templateMatch && request.method === "DELETE") {
    const capabilities = await handlers.authorize(request, env)
    return await handlers.deleteTemplate(env, decodeURIComponent(templateMatch[1]!), capabilities)
  }

  return null
}
