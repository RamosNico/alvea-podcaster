import { createRootRoute, Link, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'

export const Route = createRootRoute({
  component: () => (
    <>
      <div className="p-2 flex gap-2">
        <nav className='container mx-auto'>
          <Link to="/" className="font-medium text-lg">
            Podcaster
          </Link>
        </nav>
      </div>
      <hr />
      <Outlet />
      <TanStackRouterDevtools position="bottom-right" />
    </>
  ),
})