import { Fragment, useEffect } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { NavLink, Navigate, useNavigate } from "react-router-dom";
import { useState } from "react";
import logo from "../asserts/logo.png";
import "../styles/carousel.css";
import { toast } from "react-toastify";

const navigation = [
  { name: "Sign up", to: "/signup", current: true },
  { name: "Log in", to: "/login", current: false },
  // { name: 'Projects', to: '/login', current: false },
  // { name: 'Calendar', to: '/dashboard', current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Example() {
  const [profile, setprofile] = useState(false);
  const token = localStorage.getItem("token");

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const notifications = [
    { id: 1, message: "Notification 1 " },
    { id: 2, message: "Notification 2" },
    { id: 3, message: "Notification 3" },
  ];

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const navigate = useNavigate();

  const handleSignout = () => {
    localStorage.clear();
    toast.success("You have succesfully logged out");
  };

  useEffect(() => {
    if (token) {
      setprofile(true);
    } else {
      setprofile(false);
    }
  });
  return (
    <div className=" bg-white navbb min-w-[425px] " >
      <Disclosure as="nav" >
        {({ open }) => (
          <>
            <div className="mx-auto px-2 sm:px-6 lg:px-8 ">
              <div className="relative flex h-16 items-center justify-between ">
                <div className="flex flex-1 items-center justify-start sm:items-stretch sm:justify-start">
                  <div className="flex flex-shrink-0 items-center">
                    <NavLink to="/">
                      <img
                        className="h-9 w-auto"
                        src={logo}
                        alt="Your Company"
                      />
                    </NavLink>
                  </div>
                </div>
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                  {!profile && (
                    <div className="  hidden sm:block">
                      <NavLink to="/login">
                        <button className="transition duration-300 ease-in-out hover:bg-blue-800 border hover:border-blue-800 hover:text-gray-100 bg-transparent text-blue-800  border-blue-800 py-2 px-4 rounded-xl mx-2 uppercase">
                          Log in
                        </button>
                      </NavLink>
                      <NavLink to="/signup">
                        <button className="transition duration-300 ease-in-out bg-blue-800 border hover:border-blue-800 hover:text-blue-800  hover:bg-transparent text-gray-100 border-blue-800 py-2 px-4 rounded-xl mx-2 uppercase">
                          Sign up
                        </button>
                      </NavLink>
                    </div>
                  )}
                  {/* Profile dropdown */}
                  <Menu as="div" className="relative ml-3">
                    <div className="flex gap-5">
                      {profile && (
                        <div className="h-full flex justify-center items-center">
                          <button
                            onClick={toggleDropdown}
                            type="button"
                            className="relative rounded-full   focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                          >
                            <div className="h-[10px] w-[10px] rounded top-0 right-1 bg-red-600 absolute"></div>
                            <span className="absolute -inset-1.5" />
                            <span className="sr-only">View notifications</span>
                            <BellIcon className="h-8 w-8" aria-hidden="true" />
                          </button>
                          {isDropdownOpen && (
                            <div className="dropdown-content absolute bg-white z-10 top-[120%] right-[50%] min-w-[40vw] md:w-[20vw] border-2 rounded-xl ">
                              {notifications.map((notification) => (
                                <div
                                  key={notification.id}
                                  className="notification-item px-2 text-center"
                                >
                                  <div className=" m-2">
                                  {notification.message}
                                  </div>
                                  <hr />
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      )}
                      {profile && (
                        <Menu.Button className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                          <span className="absolute -inset-1.5" />
                          <span className="sr-only">Open user menu</span>
                          <img
                            className="h-8 w-8 rounded-full"
                            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                            alt=""
                          />
                        </Menu.Button>
                      )}
                      {!profile && (
                        <div className=" inset-y-0 flex items-center sm:hidden">
                          {/* Mobile menu button*/}

                          <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                            <span className="absolute -inset-0.5" />
                            <span className="sr-only">Open main menu</span>
                            {open ? (
                              <XMarkIcon
                                className="block h-6 w-6"
                                aria-hidden="true"
                              />
                            ) : (
                              <Bars3Icon
                                className="block h-6 w-6"
                                aria-hidden="true"
                              />
                            )}
                          </Disclosure.Button>
                        </div>
                      )}
                    </div>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <Menu.Item>
                          {({ active }) => (
                            <NavLink
                            to={`/dashboard/${token}`}
                              className={classNames(
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm text-gray-700"
                              )}
                            >
                              Your Profile
                            </NavLink>
                          )}
                        </Menu.Item>
                        {/* <Menu.Item>
                          {({ active }) => (
                            <NavLink
                              to="#"
                              className={classNames(
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm text-gray-700"
                              )}
                            >
                              Settings
                            </NavLink>
                          )}
                        </Menu.Item> */}
                        <Menu.Item>
                          {({ active }) => (
                            <NavLink
                              to="/"
                              className={classNames(
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm text-gray-700"
                              )}
                              onClick={handleSignout}
                            >
                              Sign out
                            </NavLink>
                          )}
                        </Menu.Item>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
              </div>
            </div>

            <Disclosure.Panel className="sm:hidden ">
              <div className="space-y-1 px-2 pb-3 pt-2">
                {navigation.map((item) => (
                  <NavLink key={item.name} to={item.to}>
                    <Disclosure.Button
                      className={classNames(
                        item.current
                          ? "bg-blue-800 text-white"
                          : "text-gray-300 hover:bg-blue-800 hover:text-white",
                        "block rounded-md px-3 py-2 text-base font-medium w-full"
                      )}
                      aria-current={item.current ? "page" : undefined}
                    >
                      {item.name}
                    </Disclosure.Button>
                  </NavLink>
                ))}
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </div>
  );
}
