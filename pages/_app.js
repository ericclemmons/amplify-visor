import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { QuestionMarkCircleIcon, SearchIcon } from "@heroicons/react/solid";
import {
  BellIcon,
  CogIcon,
  CreditCardIcon,
  KeyIcon,
  MenuIcon,
  UserCircleIcon,
  ViewGridAddIcon,
  XIcon,
} from "@heroicons/react/outline";
import { useRouter } from "next/router";

import "tailwindcss/tailwind.css";

const user = {
  name: "Lisa Marie",
  email: "lisamarie@example.com",
  imageUrl:
    "https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=80",
};
const navigation = [
  { name: "Dashboard", href: "#" },
  { name: "Jobs", href: "#" },
  { name: "Applicants", href: "#" },
  { name: "Company", href: "#" },
];
const userNavigation = [
  { name: "Your Profile", href: "#" },
  { name: "Settings", href: "#" },
  { name: "Sign out", href: "#" },
];
const subNavigation = [
  { name: "Project", href: "/", icon: UserCircleIcon },
  { name: "Analytics", href: "#", icon: CogIcon },
  {
    name: "Authentication",
    href: "/authentication",
    icon: KeyIcon,
  },
  { name: "Data", href: "/data", icon: ViewGridAddIcon },
  { name: "Interactions", href: "#", icon: CreditCardIcon },
  { name: "Predictions", href: "#", icon: CreditCardIcon },
  { name: "PubSub", href: "#", icon: CreditCardIcon },
  { name: "Push Notifications", href: "#", icon: BellIcon },
  { name: "Storage", href: "#", icon: CreditCardIcon },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  function isCurrent(item) {
    return item.href === router.asPath;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Disclosure as="header" className="bg-white shadow">
        {({ open }) => (
          <>
            <div className="px-2 mx-auto max-w-7xl sm:px-4 lg:divide-y lg:divide-gray-200 lg:px-8">
              <div className="relative flex justify-between h-16">
                <div className="relative z-10 flex px-2 lg:px-0">
                  <div className="flex items-center flex-shrink-0">
                    <img
                      className="block w-auto h-8 pr-3"
                      src="https://docs.amplify.aws/assets/logo-dark.svg"
                      alt="Workflow"
                    />

                    <h1 className="text-lg text-orange-500">Amplify Visor</h1>
                  </div>
                </div>
                <div className="relative z-0 flex items-center justify-center flex-1 px-2 sm:absolute sm:inset-0">
                  <div className="w-full max-w-xs">
                    <label htmlFor="search" className="sr-only">
                      Search
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <SearchIcon
                          className="flex-shrink-0 w-5 h-5 text-gray-400"
                          aria-hidden="true"
                        />
                      </div>
                      <input
                        name="search"
                        id="search"
                        className="block w-full py-2 pl-10 pr-3 text-sm placeholder-gray-500 bg-white border border-gray-300 rounded-md focus:outline-none focus:text-gray-900 focus:placeholder-gray-400 focus:ring-1 focus:ring-gray-900 focus:border-gray-900 sm:text-sm"
                        placeholder="Search"
                        type="search"
                      />
                    </div>
                  </div>
                </div>
                <div className="relative z-10 flex items-center lg:hidden">
                  {/* Mobile menu button */}
                  <Disclosure.Button className="inline-flex items-center justify-center p-2 text-gray-400 rounded-md hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-900">
                    <span className="sr-only">Open menu</span>
                    {open ? (
                      <XIcon className="block w-6 h-6" aria-hidden="true" />
                    ) : (
                      <MenuIcon className="block w-6 h-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
                <div className="hidden lg:relative lg:z-10 lg:ml-4 lg:flex lg:items-center">
                  <button className="flex-shrink-0 p-1 text-gray-400 bg-white rounded-full hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900">
                    <span className="sr-only">View notifications</span>
                    <BellIcon className="w-6 h-6" aria-hidden="true" />
                  </button>

                  {/* Profile dropdown */}
                  <Menu as="div" className="relative flex-shrink-0 ml-4">
                    {({ open }) => (
                      <>
                        <div>
                          <Menu.Button className="flex bg-white rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900">
                            <span className="sr-only">Open user menu</span>
                            <img
                              className="w-8 h-8 rounded-full"
                              src={user.imageUrl}
                              alt=""
                            />
                          </Menu.Button>
                        </div>
                        <Transition
                          show={open}
                          as={Fragment}
                          enter="transition ease-out duration-100"
                          enterFrom="transform opacity-0 scale-95"
                          enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-75"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95"
                        >
                          <Menu.Items
                            static
                            className="absolute right-0 w-48 py-1 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                          >
                            {userNavigation.map((item) => (
                              <Menu.Item key={item.name}>
                                {({ active }) => (
                                  <a
                                    href={item.href}
                                    className={classNames(
                                      active ? "bg-gray-100" : "",
                                      "block py-2 px-4 text-sm text-gray-700"
                                    )}
                                  >
                                    {item.name}
                                  </a>
                                )}
                              </Menu.Item>
                            ))}
                          </Menu.Items>
                        </Transition>
                      </>
                    )}
                  </Menu>
                </div>
              </div>
              <nav
                className="hidden lg:py-2 lg:flex lg:space-x-8"
                aria-label="Global"
              >
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-900 rounded-md hover:bg-gray-50 hover:text-gray-900"
                  >
                    {item.name}
                  </a>
                ))}
              </nav>
            </div>

            <Disclosure.Panel
              as="nav"
              className="lg:hidden"
              aria-label="Global"
            >
              <div className="px-2 pt-2 pb-3 space-y-1">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="block px-3 py-2 text-base font-medium text-gray-900 rounded-md hover:bg-gray-50 hover:text-gray-900"
                  >
                    {item.name}
                  </a>
                ))}
              </div>
              <div className="pt-4 pb-3 border-t border-gray-200">
                <div className="flex items-center px-4">
                  <div className="flex-shrink-0">
                    <img
                      className="w-10 h-10 rounded-full"
                      src={user.imageUrl}
                      alt=""
                    />
                  </div>
                  <div className="ml-3">
                    <div className="text-base font-medium text-gray-800">
                      {user.name}
                    </div>
                    <div className="text-sm font-medium text-gray-500">
                      {user.email}
                    </div>
                  </div>
                  <button className="flex-shrink-0 p-1 ml-auto text-gray-400 bg-white rounded-full hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900">
                    <span className="sr-only">View notifications</span>
                    <BellIcon className="w-6 h-6" aria-hidden="true" />
                  </button>
                </div>
                <div className="px-2 mt-3 space-y-1">
                  {userNavigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="block px-3 py-2 text-base font-medium text-gray-500 rounded-md hover:bg-gray-50 hover:text-gray-900"
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>

      <main className="pb-10 mx-auto max-w-7xl lg:py-12 lg:px-8">
        <div className="lg:grid lg:grid-cols-12 lg:gap-x-5">
          <aside className="px-2 py-6 sm:px-6 lg:py-0 lg:px-0 lg:col-span-3">
            <nav className="space-y-1">
              {subNavigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className={classNames(
                    isCurrent(item)
                      ? "bg-gray-50 text-orange-600 hover:bg-white"
                      : "text-gray-900 hover:text-gray-900 hover:bg-gray-50",
                    "group rounded-md px-3 py-2 flex items-center text-sm font-medium"
                  )}
                  aria-current={isCurrent(item) ? "page" : undefined}
                >
                  <item.icon
                    className={classNames(
                      isCurrent(item)
                        ? "text-orange-500"
                        : "text-gray-400 group-hover:text-gray-500",
                      "flex-shrink-0 -ml-1 mr-3 h-6 w-6"
                    )}
                    aria-hidden="true"
                  />
                  <span className="truncate">{item.name}</span>
                </a>
              ))}
            </nav>
          </aside>

          {/* Payment details */}
          <div className="space-y-6 sm:px-6 lg:px-0 lg:col-span-9">
            <Component {...pageProps} />
          </div>
        </div>
      </main>
    </div>
  );
}

export default MyApp;
