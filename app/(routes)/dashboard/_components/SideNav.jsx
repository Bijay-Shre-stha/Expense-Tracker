"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { UserButton } from "@clerk/nextjs";
import { LayoutGrid, PiggyBank, ReceiptText, DollarSign, Menu, Wallet2Icon, Banknote } from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";

function SideNav() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const sidebarRef = useRef(null);
    const path = usePathname();

    const menuList = [
        { key: 1, name: "Dashboard", icon: LayoutGrid, path: "/dashboard" },
        { key: 2, name: "Budgets", icon: PiggyBank, path: "/dashboard/budgets" },
        { key: 3, name: "Transactions", icon: ReceiptText, path: "/dashboard/transactions" },
        { key: 4, name: 'Daily Transactions', icon: DollarSign, path: '/dashboard/daily-transactions' },
        { key: 5, name: "Savings", icon: Wallet2Icon, path: "/dashboard/savings" },
        { key: 6, name: "Extra Expense", icon: Banknote , path: "/dashboard/extra-expense" },

    ];

    // Toggle menu state
    const toggleMenu = () => setMobileMenuOpen(!mobileMenuOpen);

    // Close menu when clicking outside
    useEffect(() => {
        function handleClickOutside(event) {
            if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
                setMobileMenuOpen(false);
            }
        }
        if (mobileMenuOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [mobileMenuOpen]);

    return (
        <>
            {/* Mobile menu button */}
            <div className="md:hidden fixed top-4 left-4 z-30 w-52 flex justify-between">
                <button
                    onClick={toggleMenu}
                    className="p-2 bg-white "
                >
                    {mobileMenuOpen ? "" : <Menu size={24} />}
                </button>
            </div>

            {/* Sidebar */}
            <div
                ref={sidebarRef}
                className={`fixed inset-0 z-20 md:relative md:h-screen p-5 border shadow-md bg-white transition-transform duration-300 ease-in-out w-64 ${mobileMenuOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
                    }`}
            >
                <div className="flex items-center text-primary font-bold">
                    <Image src="/logo.svg" alt="logo" width={100} height={100} />
                    <h1>SpendWise</h1>
                </div>

                <nav className="mt-5">
                    {menuList.map((menu) => (
                        <Link key={menu.key} href={menu.path} onClick={() => setMobileMenuOpen(false)}>
                            <h2
                                className={`flex gap-2 items-center text-gray-500 font-medium mb-2 p-5 cursor-pointer rounded-md hover:text-primary hover:bg-rose-100 ${path === menu.path ? "text-primary bg-rose-100" : ""
                                    }`}
                            >
                                <menu.icon />
                                {menu.name}
                            </h2>
                        </Link>
                    ))}
                </nav>

                <div className="absolute bottom-10 p-5 flex gap-2 items-center">
                    <UserButton />
                    <span>Profile</span>
                </div>
            </div>

            {/* Overlay for mobile menu */}
            {mobileMenuOpen && (
                <div
                    className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-10"
                    onClick={() => setMobileMenuOpen(false)}
                />
            )}
        </>
    );
}

export default SideNav;
