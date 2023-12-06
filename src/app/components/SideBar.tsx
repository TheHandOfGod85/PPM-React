import { ReactNode } from 'react'
import {
  FaAlignJustify,
  FaHome,
  FaQuestion,
  FaTools,
  FaUserFriends,
} from 'react-icons/fa'
import { FaArrowRightFromBracket } from 'react-icons/fa6'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { logout } from '../../lib/data/user.data'

export default function SideBar() {
  //   const { user } = useAuthenticatedUser()
  const { pathname } = useLocation()
  const navigate = useNavigate()

  const onLogout = async () => {
    try {
      await logout()
      navigate('/')
    } catch (error) {
      console.error(error)
    }
  }
  return (
    <>
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          <label
            htmlFor="my-drawer-2"
            className="btn btn-ghost btn-lg drawer-button lg:hidden relative left-0"
          >
            <FaAlignJustify size={30} />
          </label>
          {/* Page content here */}
          <main className="lg:mt-4">
            <Outlet />
          </main>
        </div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer-2"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu p-4 w-60 min-h-full bg-base-200 text-base-content font-semibold text-lg gap-2">
            {/* Sidebar content here */}

            {/* {user && (
              <h1 className="font-bold text-secondary">
                Hello, {user.displayName}
              </h1>
            )} */}

            <li>
              <a
                href={'/dashboard'}
                className={pathname == '/dashboard' ? 'active' : ''}
              >
                <FaHome /> Home
              </a>
            </li>
            {/* {user?.role === 'admin' && ( */}
            <li>
              <a
                href={'/dashboard/users'}
                className={pathname == '/dshboard/users' ? 'active' : ''}
              >
                <FaUserFriends /> Users
              </a>
            </li>
            {/* )} */}

            <div className="dropdown dropdown-hover">
              <label tabIndex={0} className="btn text-[1.1rem] normal-case">
                <FaTools /> Asset
              </label>
              <ul
                tabIndex={0}
                className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
              >
                <li>
                  <a
                    href={'/dashboard/assets'}
                    className={pathname == '/dashboard/assets' ? 'active' : ''}
                  >
                    Assets List
                  </a>
                </li>
                {/* {user?.role === 'admin' && ( */}
                <li>
                  <a
                    href={'/dashboard/assets/new-asset'}
                    className={
                      pathname == '/dashboard/assets/new-asset' ? 'active' : ''
                    }
                  >
                    New Asset
                  </a>
                </li>
                {/* )} */}
              </ul>
            </div>
            <li className="absolute bottom-0 mb-4">
              <a
                href={'/dashboard/about'}
                className={pathname == '/dashboard/about' ? 'active' : ''}
              >
                <FaQuestion /> About
              </a>
            </li>
            <li className="absolute bottom-8 mb-4">
              <button type="button" onClick={onLogout}>
                <FaArrowRightFromBracket /> Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </>
  )
}
