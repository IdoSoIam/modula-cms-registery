import type { ModuleContext, UpdateModuleHandlers } from "./types"

export async function handleUpdateModule(
  context: ModuleContext,
  handlers: UpdateModuleHandlers
) {
  const { request, url, env } = context

  if (url.pathname === "/admin/api/releases" && request.method === "GET") {
    return await handlers.adminListReleases(request, env)
  }

  const adminReleaseMetaMatch = url.pathname.match(/^\/admin\/api\/releases\/([^/]+)\/meta$/)
  if (adminReleaseMetaMatch && request.method === "PATCH") {
    return await handlers.adminUpdateReleaseMeta(request, env, decodeURIComponent(adminReleaseMetaMatch[1]!))
  }

  if (url.pathname === "/v1/releases" && request.method === "GET") {
    return await handlers.listReleases(request, env)
  }

  if (url.pathname === "/v1/releases" && request.method === "POST") {
    await handlers.authorize(request, env)
    return await handlers.createRelease(request, env)
  }

  const releaseArtifactMatch = url.pathname.match(/^\/v1\/releases\/([^/]+)\/artifact$/)
  if (releaseArtifactMatch) {
    return await handlers.downloadReleaseArtifact(env, decodeURIComponent(releaseArtifactMatch[1]!))
  }

  const releaseMatch = url.pathname.match(/^\/v1\/releases\/([^/]+)$/)
  if (releaseMatch && request.method === "GET") {
    return await handlers.getRelease(request, env, decodeURIComponent(releaseMatch[1]!))
  }

  if (url.pathname === "/v1/deployments" && request.method === "POST") {
    await handlers.authorize(request, env)
    return await handlers.createDeployment(request, env)
  }

  if (url.pathname === "/v1/deployments" && request.method === "GET") {
    await handlers.authorize(request, env)
    return await handlers.listDeployments(request, env)
  }

  const deploymentMatch = url.pathname.match(/^\/v1\/deployments\/([^/]+)$/)
  if (deploymentMatch && request.method === "GET") {
    await handlers.authorize(request, env)
    return await handlers.getDeployment(env, decodeURIComponent(deploymentMatch[1]!))
  }

  if (deploymentMatch && request.method === "PATCH") {
    await handlers.authorize(request, env)
    return await handlers.updateDeployment(request, env, decodeURIComponent(deploymentMatch[1]!))
  }

  return null
}
