import type { InstancesModuleHandlers, ModuleContext } from "./types"

export async function handleInstancesModule(
  context: ModuleContext,
  handlers: InstancesModuleHandlers
) {
  const { request, url, env } = context

  if (url.pathname === "/v1/instances/register" && request.method === "POST") {
    await handlers.authorize(request, env)
    return await handlers.registerInstance(request, env)
  }

  return null
}
