"use client";

import { useState } from "react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { FaBars, FaTimes } from "react-icons/fa";
import { HiOutlineChartBar, HiOutlineNewspaper, HiOutlineChartPie, HiOutlineUser, HiOutlineLightBulb } from "react-icons/hi";
import Logo from './Logo';
import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';

const navItems = [
  { 
    id: 1, 
    title: 'Günün Gelişmeleri', 
    path: '/gunun-gelismeleri',
    icon: <HiOutlineNewspaper className="w-5 h-5" />
  },
  { 
    id: 2, 
    title: 'Hisseler', 
    path: '/hisseler',
    icon: <HiOutlineChartBar className="w-5 h-5" />
  },
  { 
    id: 3, 
    title: 'Analizler', 
    path: '/analizler',
    icon: <HiOutlineChartPie className="w-5 h-5" />
  },
  { 
    id: 4, 
    title: 'Nasıl Çalışır', 
    path: '/nasil-calisir',
    icon: <HiOutlineLightBulb className="w-5 h-5" />
  },
];

export default function Navbar() {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <>
      {/* Overlay - Mobile Only */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-md z-40 md:hidden"
          onClick={toggleMenu}
        />
      )}

      {/* Main Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-30">
        <div className="bg-[#0D0B21]/95 backdrop-blur-xl border-b border-white/10">
          {/* Top Gradient Line */}
          <div className="h-[1px] w-full bg-gradient-to-r from-orange-500/0 via-orange-500/50 to-purple-600/0"></div>

          <div className="max-w-7xl mx-auto px-4">
            <div className="flex justify-between items-center h-16">
              {/* Logo */}
              <Link href="/" className="group relative">
                <div className="absolute -inset-2 bg-gradient-to-r from-orange-500/20 to-purple-600/20 rounded-lg blur-lg opacity-0 group-hover:opacity-100 transition duration-500"></div>
                <Logo />
              </Link>

              {/* Desktop Menu */}
              <div className="hidden md:flex items-center space-x-1">
                {navItems.map((item) => (
                  <Link
                    key={item.id}
                    href={item.path}
                    className="group flex items-center gap-2.5 px-4 py-2 text-white/90 hover:text-white rounded-lg hover:bg-white/5 transition-all relative font-medium tracking-wide"
                  >
                    <span className="absolute inset-0 bg-gradient-to-r from-orange-500/0 via-orange-500/10 to-purple-600/0 rounded-lg opacity-0 group-hover:opacity-100 transition duration-300"></span>
                    <span className="text-orange-500 group-hover:text-orange-400 transition-colors relative">
                      {item.icon}
                    </span>
                    <span className="relative font-poppins text-[15px]">{item.title}</span>
                  </Link>
                ))}
              </div>

              {/* Desktop Auth/Profile */}
              <div className="hidden md:flex items-center">
                {session ? (
                  <Menu as="div" className="relative">
                    <Menu.Button className="group flex items-center gap-2.5 px-4 py-2 text-white/90 hover:text-white rounded-lg hover:bg-white/5 transition-all">
                      <span className="absolute inset-0 bg-gradient-to-r from-orange-500/0 via-orange-500/10 to-purple-600/0 rounded-lg opacity-0 group-hover:opacity-100 transition duration-300"></span>
                      <HiOutlineUser className="w-5 h-5 text-orange-500 group-hover:text-orange-400" />
                      <span className="font-poppins text-[15px] font-medium tracking-wide truncate max-w-[120px]">
                        {session.user?.name || session.user?.email}
                      </span>
                      <ChevronDownIcon className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors" />
                    </Menu.Button>

                    <Transition
                      enter="transition duration-100 ease-out"
                      enterFrom="transform scale-95 opacity-0"
                      enterTo="transform scale-100 opacity-100"
                      leave="transition duration-75 ease-in"
                      leaveFrom="transform scale-100 opacity-100"
                      leaveTo="transform scale-95 opacity-0"
                    >
                      <Menu.Items className="absolute right-0 mt-2 w-56 rounded-xl bg-[#1E1B33]/95 backdrop-blur-xl border border-white/10 shadow-lg py-2">
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              href="/profile"
                              className={`${
                                active ? 'bg-white/5 text-white' : 'text-white/90'
                              } flex items-center gap-2.5 px-4 py-2.5 text-[15px] font-poppins font-medium transition-colors`}
                            >
                              <HiOutlineUser className="w-5 h-5 text-orange-500" />
                              Profil
                            </Link>
                          )}
                        </Menu.Item>

                        {session.user?.role === "ADMIN" && (
                          <Menu.Item>
                            {({ active }) => (
                              <Link
                                href="/admin/stocks"
                                className={`${
                                  active ? 'bg-white/5 text-white' : 'text-white/90'
                                } flex items-center gap-2.5 px-4 py-2.5 text-[15px] font-poppins font-medium transition-colors`}
                              >
                                <svg className="w-5 h-5 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                Yönetim
                              </Link>
                            )}
                          </Menu.Item>
                        )}

                        <div className="border-t border-white/10 my-2"></div>

                        <Menu.Item>
                          {({ active }) => (
                            <button
                              onClick={() => signOut()}
                              className={`${
                                active ? 'bg-white/5 text-white' : 'text-white/90'
                              } flex items-center gap-2.5 px-4 py-2.5 text-[15px] font-poppins font-medium transition-colors w-full`}
                            >
                              <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                              </svg>
                              Çıkış Yap
                            </button>
                          )}
                        </Menu.Item>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                ) : (
                  <Link
                    href="/auth/login"
                    className="group relative"
                  >
                    <span className="absolute -inset-0.5 bg-gradient-to-r from-orange-500 to-purple-600 rounded-lg blur opacity-30 group-hover:opacity-50 transition duration-300"></span>
                    <span className="relative bg-gradient-to-r from-orange-500 to-purple-600 hover:opacity-90 text-white px-6 py-2 rounded-lg font-poppins font-medium tracking-wide text-[15px] transition-all block">
                      Giriş Yap
                    </span>
                  </Link>
                )}
              </div>

              {/* Mobile Menu Button */}
              <button 
                onClick={toggleMenu}
                className="md:hidden w-10 h-10 flex items-center justify-center text-gray-400 hover:text-white rounded-lg hover:bg-white/5 transition-all relative group"
                aria-label="Toggle menu"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-orange-500/0 via-orange-500/10 to-purple-600/0 rounded-lg opacity-0 group-hover:opacity-100 transition duration-300"></span>
                <FaBars className="w-5 h-5 relative" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Side Navigation */}
      <div className={`
        fixed top-0 left-0 h-full w-72 bg-[#0D0B21]/95 backdrop-blur-xl z-50
        transform transition-transform duration-300 ease-in-out border-r border-white/10
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        md:hidden
      `}>
        {/* Top Gradient Line */}
        <div className="h-[1px] w-full bg-gradient-to-r from-orange-500/0 via-orange-500/50 to-purple-600/0"></div>

        {/* Mobile Menu Header */}
        <div className="flex items-center justify-between p-4 border-b border-white/10">
          <Link href="/">
            <Logo />
          </Link>
          <button 
            onClick={toggleMenu}
            className="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-white rounded-lg hover:bg-white/5 transition-all"
          >
            <FaTimes className="w-5 h-5" />
          </button>
        </div>

        {/* Mobile Navigation Items */}
        <div className="py-4">
          {navItems.map((item) => (
            <Link
              key={item.id}
              href={item.path}
              className="flex items-center gap-3 px-4 py-3 text-gray-400/90 hover:text-white hover:bg-white/5 transition-all group"
            >
              <span className="text-orange-500 group-hover:text-orange-400 transition-colors">
                {item.icon}
              </span>
              <span className="font-poppins text-[15px] font-medium tracking-wide">{item.title}</span>
            </Link>
          ))}
        </div>

        {/* Mobile Auth/Profile */}
        <div className="absolute bottom-8 left-0 right-0 px-4">
          {session ? (
            <div className="space-y-2">
              <Link
                href="/profile"
                className="flex items-center gap-2.5 px-4 py-3 text-gray-400/90 hover:text-white hover:bg-white/5 rounded-lg transition-all"
              >
                <HiOutlineUser className="w-5 h-5 text-orange-500" />
                <span className="font-poppins text-[15px] font-medium tracking-wide">
                  {session.user?.name || session.user?.email}
                </span>
              </Link>
              <button
                onClick={() => signOut()}
                className="w-full bg-gradient-to-r from-orange-500 to-purple-600 hover:opacity-90 text-white py-2.5 px-4 rounded-lg font-poppins font-medium tracking-wide text-[15px] transition-all"
              >
                Çıkış Yap
              </button>
            </div>
          ) : (
            <Link
              href="/auth/login"
              className="block w-full bg-gradient-to-r from-orange-500 to-purple-600 hover:opacity-90 text-white py-2.5 px-4 rounded-lg font-poppins font-medium tracking-wide text-[15px] transition-all text-center"
            >
              Giriş Yap
            </Link>
          )}
        </div>
      </div>

      {/* Main Content Padding */}
      <div className="h-16" />
    </>
  );
} 