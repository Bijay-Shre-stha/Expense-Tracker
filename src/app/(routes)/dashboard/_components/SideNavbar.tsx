"use client"
import Image from "next/image"
import logo from '@public/assets/logo.svg'
import { LayoutDashboard, PiggyBank, ReceiptText, ShieldCheck } from "lucide-react"
import { UserButton } from "@clerk/nextjs"
import { usePathname } from "next/navigation"
import Link from "next/link"

const SideNavbar = () => {
    const menuItems = [
        {
            id: 1,
            name: 'Dashboard',
            icon: LayoutDashboard,
            path: '/dashboard'
        },
        {
            id: 2,
            name: 'Budget',
            icon: PiggyBank,
            path: '/dashboard/budget'
        },
        {
            id: 3,
            name: 'Expenses',
            icon: ReceiptText,
            path: '/dashboard/expenses'
        },
        {
            id: 4,
            name: 'Upgrade',
            icon: ShieldCheck,
            path: '/dashboard/upgrade'
        },
    ]
    const path = usePathname()


    return (
        <div className='h-screen p-5 border shadow-sm'>
            <Image src={logo} alt='logo' width={200} height={200} />
            <div className='mt-5'>
                {
                    menuItems.map(item => (
                        <Link
                            key={item.id}
                            href={item.path || '/'}
                        >
                            <h2 key={item.id} className={`flex items-center space-x-2 p-3 mb-2 rounded-md cursor-pointer  gap-2 hover:text-primary hover:bg-blue-100
                        ${path === item.path && 'text-primary bg-blue-100'}
                        `}>
                                <item.icon size={24} />
                                <span>{item.name}</span>
                            </h2>
                        </Link>
                    ))
                }
            </div>
            <div className="fixed bottom-10 p-5 flex gap-2 items-center cursor-pointer ">
                <UserButton />
                Profile
            </div>
        </div>
    )
}

export default SideNavbar
