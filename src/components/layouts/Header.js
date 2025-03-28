import { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, Popover, Transition } from "@headlessui/react";
import { SearchIcon } from "@heroicons/react/solid";
import { BellIcon, MenuIcon, XIcon } from "@heroicons/react/outline";
import Logout from "../accounts/Logout";
import SearchRecipes from "../recipe/SearchRecipes";
import { useAuthStore } from "../../zustand/useAuthStore";
import { img as userImg } from '../assets/userImg'
const userNavigation = [{ name: "Dashboard", to: "/dashboard/myRecipes" }];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Header() {
  const {logged_in, user} = useAuthStore()
  const avatar = user ? process.env.HOST || "http://localhost:3415/media/" + user.image : (userImg)

  const [modal, setModal] = useState(false);


 

  return (
    <>
      {/* When the mobile menu is open, add `overflow-hidden` to the `body` element to prevent double scrollbars */}
      <Popover
        as="header"
        className={({ open }) =>
          classNames(
            open ? "fixed inset-0 z-40 overflow-y-auto" : "",
            "bg-white shadow-sm lg:static lg:overflow-y-visible"
          )
        }
      >
        {({ open }) => (
          <>
            <div className="max-w-[85vw] mx-auto px-4 sm:px-6 lg:px-8">
              <div className="relative flex justify-between xl:grid xl:grid-cols-12 lg:gap-8">
                <div className="flex md:absolute md:left-0 md:inset-y-0 lg:static xl:col-span-2">
                  <div className="flex-shrink-0 flex items-center">
                    <Link to="/" className="text-xl inline-flex font-bold text-teal-700">
                      <p className=" text-orange-400">Meal</p>Time
                    </Link>
                  </div>
                </div>
                <div className="min-w-0 flex-1 md:px-8 lg:px-0 xl:col-span-5">
                  <div className="flex items-center px-6 py-4 xl:max-w-3xl md:mx-auto ">
                    <SearchRecipes/>
                  </div>
                </div>
                <div className="flex items-center md:absolute md:right-0 md:inset-y-0 lg:hidden">
                  {/* Mobile menu button */}
                  <Popover.Button className="-mx-2 rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-teal-500">
                    <span className="sr-only">Open menu</span>
                    {open ? (
                      <XIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Popover.Button>
                </div>
                <div className="hidden lg:flex lg:items-center lg:col-span-5 z-[1000] gap-2">
                  {/* <a
                    href="/"
                    className="ml-5 flex-shrink-0 bg-white rounded-full p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                  >
                    <span className="sr-only">View notifications</span>
                    <BellIcon className="h-6 w-6" aria-hidden="true" />
                  </a> */}

                  {/* Profile dropdown */}
                  
                  {!logged_in && (
                    <Link
                      to="/login"
                      className="inline-flex items-center px-4 py-2 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-teal-400 hover:bg-teal-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-200"
                    >
                      Sign in
                    </Link>
                  )}

                  {!logged_in && (
                    <Link
                      to="/register"
                      className="inline-flex items-center px-4 py-2 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                    >
                      Sign Up
                    </Link>
                  )}
                  {logged_in && (
                    <Link
                      to="/recipe/create"
                      className={`relative px-4 py-2 text-sm font-medium text-gray-700 transition duration-300 ease-in-out 
             hover:text-teal-600 
             after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 after:bg-teal-600 
             after:transition-all after:duration-300 after:ease-in-out hover:after:w-full`}
                    >
                      Create Recipe
                    </Link>
                  )}
                  <Link
                      to="/recipe"
                      className={`relative px-4 py-2 text-sm font-medium text-gray-700 transition duration-300 ease-in-out 
             hover:text-teal-600 
             after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 after:bg-teal-600 
             after:transition-all after:duration-300 after:ease-in-out hover:after:w-full`}
                    >
                      Recipes
                    </Link>
                    <Link
                      to="/mealPlans"
                      className={`relative px-4 py-2 text-sm font-medium text-gray-700 transition duration-300 ease-in-out 
             hover:text-teal-600 
             after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 after:bg-teal-600 
             after:transition-all after:duration-300 after:ease-in-out hover:after:w-full`}
                    >
                      Meal Plans
                    </Link>
                    {logged_in && (
                    <Menu as="div" className="flex-shrink-0 relative">
                        <Menu.Button className="bg-white rounded-full flex gap-2 items-center p-2 ring-1 ring-black/50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500">
                          <span className="sr-only">Open user menu</span>
                          <img
                            className="h-8 w-8 rounded-full"
                            src={
                              avatar
                                ? avatar
                                : "https://res.cloudinary.com/dmtc1wlgq/image/upload/v1641911896/media/avatar/default_zrdbiq.png"
                            }
                            alt=""
                          />
                          <p className="font-normal">Hi {user && user.first_name} !</p>
                        </Menu.Button>
                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items className="origin-top-right absolute z-10 right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 py-1 focus:outline-none">
                          {userNavigation.map((item) => (
                            <Menu.Item key={item.name}>
                              {({ active }) => (
                                <Link
                                  to={item.to}
                                  className={classNames(
                                    active ? "bg-gray-100" : "",
                                    "block py-2 px-4 text-sm text-gray-700"
                                  )}
                                >
                                  {item.name}
                                </Link>
                              )}
                            </Menu.Item>
                          ))}
                          <Menu.Item>
                            <button
                              className="block py-2 px-4 text-sm text-gray-700 hover:bg-red-400"
                              onClick={() => setModal(true)}
                            >
                              {" "}
                              Logout
                            </button>
                          </Menu.Item>
                        </Menu.Items>
                      </Transition>
                    </Menu>
                  )}
                </div>
              </div>
            </div>

            <Popover.Panel as="nav" className="lg:hidden" aria-label="Global">
              <div className="max-w-3xl mx-auto px-2 pt-2 pb-3 space-y-1 sm:px-4">
                {!logged_in && (
                  <Link
                    to="/login"
                    className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-teal-600 hover:bg-teal-700"
                  >
                    Sign in
                  </Link>
                )}

                {!logged_in && (
                  <Link
                    to="/register"
                    className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-teal-600 hover:bg-teal-700"
                  >
                    Sign Up
                  </Link>
                )}
                {logged_in && (
                  <Link
                    to="/recipe/create"
                    className="w-full inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-teal-600 hover:bg-teal-700"
                  >
                    Create Recipe
                  </Link>
                )}
                <Link
                    to="/recipe"
                    className="w-full inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-teal-600 hover:bg-teal-700"
                  >
                    Explore Recipes
                  </Link>

                  <Link
                    to="/mealPlans"
                    className="w-full inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-teal-600 hover:bg-teal-700"
                  >
                    Explore Meal Plans
                  </Link>
                {/* {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    aria-current={item.current ? 'page' : undefined}
                    className={classNames(
                      item.current ? 'bg-gray-100 text-gray-900' : 'hover:bg-gray-50',
                      'block rounded-md py-2 px-3 text-base font-medium'
                    )}
                  >
                    {item.name}
                  </a>
                ))} */}
              </div>
              {logged_in && (
                <div className="border-t border-gray-200 pt-4 pb-3">
                  <div className="max-w-3xl mx-auto px-4 flex items-center sm:px-6">
                    <div className="flex-shrink-0 px-3 py-2 ring rounded-full ">
                      <img
                        className="h-10 w-10 rounded-full"
                        src={
                          avatar
                            ? avatar
                            : "https://res.cloudinary.com/dmtc1wlgq/image/upload/v1641911896/media/avatar/default_zrdbiq.png"
                        }
                        alt=""
                      />

                    </div>
                    <div className="ml-3">
                      <div className="text-base font-medium text-gray-800">
                        {user && user.first_name} {user && user.last_name}
                      </div>
                      <div className="text-sm font-medium text-gray-500">
                        {user && user.email}
                      </div>
                    </div>
                    {/* <button
                    type="button"
                    className="ml-auto flex-shrink-0 bg-white rounded-full p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                  >
                    <span className="sr-only">View notifications</span>
                    <BellIcon className="h-6 w-6" aria-hidden="true" />
                  </button> */}
                  </div>
                  <div className="mt-3 max-w-3xl mx-auto px-2 space-y-1 sm:px-4 z-1000">
                    {userNavigation.map((item) => (
                      <Link
                        key={item.name}
                        to={item.to}
                        className="block rounded-md py-2 px-3 text-base font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                      >
                        {item.name}
                      </Link>
                    ))}
                    <button
                      className="block rounded-md py-2 px-3 text-base font-medium text-gray-500 hover:bg-red-400 hover:text-gray-900"
                      onClick={() => setModal(true)}
                    >
                      {" "}
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </Popover.Panel>
          </>
        )}
      </Popover>
      {modal && <Logout modal={modal} setModal={setModal} />}
    </>
  );
}
