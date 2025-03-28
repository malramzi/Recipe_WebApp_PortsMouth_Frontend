import { Fragment, useState, useEffect } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { Dialog, Transition } from "@headlessui/react";
import {
  MenuAlt1Icon,
  BookmarkIcon,
  XIcon,
  LogoutIcon,
  MenuIcon,
  UserIcon,
  CubeIcon,
  SearchCircleIcon,
  GlobeAltIcon,
  DatabaseIcon,
  ClipboardListIcon,
  CubeTransparentIcon
  
} from "@heroicons/react/outline";
import { MailIcon } from "@heroicons/react/solid";
import { useAuthStore } from "../../zustand/useAuthStore";

const navigation = [
  { name: "Profile", icon: UserIcon, to: "profile", current: false },
  { name: "My Recipes", icon: MenuIcon, to: "myRecipes", current: false },
  {
    name: "Saved Recipes",
    icon: BookmarkIcon,
    to: "savedRecipes",
    current: false,
  },
  { name: "My Meals", icon: CubeTransparentIcon, to: "myMeals", current: false },
  { name: "My Meal Plans", icon: DatabaseIcon, to: "myMealPlans", current: false },
  { name: "My Food Categories", icon: DatabaseIcon, to: "myCategories", current: false },
  { name: "Categories Around The World", icon: GlobeAltIcon, to: "categories", current: false },
  { name: "Smart Recipe Finder", icon: SearchCircleIcon, to: "recipeMaker", current: false },
  { name: "Create a Meal", icon: CubeIcon, to: "meal-create", current: false },
  { name: "Generate Meal Plan", icon: ClipboardListIcon, to: "mealplan-create", current: false },
  
];

const secondaryNavigation = [{ name: "Logout", icon: LogoutIcon }];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation()
  const user = useAuthStore(state => state.user)
  const avatar = process.env.HOST || "http://localhost:3415/media/" + user.image

  return (
    <>
      <div className="min-h-full">
        <Transition.Root show={sidebarOpen} as={Fragment}>
          <Dialog
            as="div"
            className="fixed inset-0 flex z-40 lg:hidden"
            onClose={setSidebarOpen}
          >
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-gray-600 bg-opacity-75" />
            </Transition.Child>
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <div className="relative flex-1 flex flex-col max-w-xs w-full pt-5 pb-4 bg-teal-800">
                <Transition.Child
                  as={Fragment}
                  enter="ease-in-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in-out duration-300"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="absolute top-0 right-0 -mr-12 pt-2">
                    <button
                      type="button"
                      className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                      onClick={() => setSidebarOpen(false)}
                    >
                      <span className="sr-only">Close sidebar</span>
                      <XIcon
                        className="h-6 w-6 text-white"
                        aria-hidden="true"
                      />
                    </button>
                  </div>
                </Transition.Child>
                <div className="px-4">
                  <Link
                    to="/"
                    className="text-xl inline-flex font-bold text-teal-700"
                  >
                    <p className=" text-orange-400">Meal</p>Time
                  </Link>
                </div>
                <nav
                  className="mt-5 flex-shrink-0 h-full divide-y divide-teal-800 overflow-y-auto"
                  aria-label="Sidebar"
                >
                  <div className="px-2 space-y-1">
                    {navigation.map((item,idx) => (
                      <Link
                        key={item.name}
                        to={item.to}
                        className={classNames(
                          item.current || location.pathname.includes(item.to)
                            ? "bg-orange-500 text-white"
                            : "text-teal-100 hover:text-white hover:bg-teal-600",
                          "group flex items-center w-full px-2 py-2 text-sm leading-6 font-medium rounded-md"
                        )}
                        aria-current={item.current ? "page" : undefined}
                      >
                        <item.icon
                          className="mr-4 flex-shrink-0 h-6 w-6 text-teal-200"
                          aria-hidden="true"
                        />
                        {item.name}
                      </Link>
                    ))}
                  </div>
                  <div className="mt-6 pt-6">
                    <div className="px-2 space-y-1">
                      {secondaryNavigation.map((item) => (
                        <button
                          key={item.name}
                          className="group flex items-center w-full px-2 py-2 text-base font-medium rounded-md text-teal-100 hover:text-white hover:bg-teal-600"
                        >
                          <item.icon
                            className="mr-4 h-6 w-6 text-teal-200"
                            aria-hidden="true"
                          />
                          {item.name}
                        </button>
                      ))}
                    </div>
                  </div>
                </nav>
              </div>
            </Transition.Child>
            <div className="flex-shrink-0 w-14" aria-hidden="true">
              {/* Dummy element to force sidebar to shrink to fit close icon */}
            </div>
          </Dialog>
        </Transition.Root>

        {/* Static sidebar for desktop */}
        <div className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0">
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className="flex flex-col flex-grow bg-teal-800 pt-5 pb-4 overflow-y-auto">
            <div className="px-4">
              <Link
                to="/"
                className="text-xl inline-flex font-bold text-white"
              >
                <p className=" text-orange-400">Meal</p>Time
              </Link>
            </div>
            <nav
              className="mt-5 flex-1 flex flex-col divide-y divide-teal-800 overflow-y-auto"
              aria-label="Sidebar"
            >
              <div className="px-2 space-y-1">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.to}
                    className={classNames(
                      item.current || location.pathname.includes(item.to)
                        ? "bg-orange-400 text-white"
                        : "text-teal-100 hover:text-white hover:bg-teal-600",
                      "group flex items-center w-full px-2 py-2 text-sm leading-6 font-medium rounded-md"
                    )}
                    aria-current={item.current ? "page" : undefined}
                  >
                    <item.icon
                      className={`mr-4 flex-shrink-0 h-6 w-6 ${item.current ?"text-white":"text-teal-200"}`}
                      aria-hidden="true"
                    />
                    {item.name}
                  </Link>
                ))}
              </div>
              <div className="mt-6 pt-6">
                <div className="px-2 space-y-1">
                  {secondaryNavigation.map((item) => (
                    <button
                      key={item.name}
                      className="group flex items-center w-full px-2 py-2 text-sm leading-6 font-medium rounded-md text-teal-100 hover:text-white hover:bg-teal-600"
                    >
                      <item.icon
                        className="mr-4 h-6 w-6 text-teal-200"
                        aria-hidden="true"
                      />
                      {item.name}
                    </button>
                  ))}
                </div>
              </div>
            </nav>
          </div>
        </div>

        <div className="lg:pl-64 flex flex-col flex-1">
          <div className="relative z-10 flex-shrink-0 flex items-center bg-white border-b border-gray-200 lg:border-none">
            <button
              type="button"
              className="px-4 border-r border-gray-200 text-gray-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-teal-500 lg:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <span className="sr-only">Open sidebar</span>
              <MenuAlt1Icon className="h-6 w-6" aria-hidden="true" />
            </button>
            <div className="flex items-center py-4 px-4 sm:px-6 lg:px-8">
              <img
                className="h-16 w-16 rounded-full block"
                src={
                  avatar 
                    ? avatar
                    : "https://res.cloudinary.com/dmtc1wlgq/image/upload/v1641911896/media/avatar/default_zrdbiq.png"
                }
                alt=""
              />
              <div>
                <div className="flex items-center">
                  <h1 className="ml-3 text-2xl font-bold leading-7 text-gray-900 sm:leading-9 sm:truncate">
                    Welcome back, {user && user.first_name + " " +  user.last_name}  
                  </h1>
                </div>
                <dl className="flex flex-col ml-3 sm:mt-1 sm:flex-row sm:flex-wrap">
                  <dt className="sr-only">Email</dt>
                  <dd className="flex items-center text-sm text-gray-500 font-medium sm:mr-6">
                    <MailIcon
                      className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                    {user && user.email}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
          <main className="flex-1 pb-8">
            {/* Page header */}
            <Outlet />
          </main>
        </div>
      </div>
    </>
  );
}
