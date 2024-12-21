import Image from "next/image"
import logo from '@public/assets/logo.svg'
import { LayoutDashboard, LogOut, PiggyBank, ReceiptText, ShieldCheck } from "lucide-react"
import { UserButton } from "@clerk/nextjs"

const SideNavbar = () => {
    const menuItems = [
        {
            id: 1,
            name: 'Dashboard',
            icon: LayoutDashboard,
        },
        {
            id: 2,
            name: 'Budget',
            icon: PiggyBank
        },
        {
            id: 3,
            name: 'Expenses',
            icon: ReceiptText
        },
        {
            id: 4,
            name: 'Upgrade',
            icon: ShieldCheck
        },
        {
            id: 5,
            name: 'Logout',
            icon: LogOut
        },
    ]

    return (
        <div className='h-screen p-5 border shadow-sm'>
            <Image src={logo} alt='logo' width={200} height={200} />
            <div className='mt-5'>
                {
                    menuItems.map(item => (
                        <h2 key={item.id} className='flex items-center space-x-2 p-3 rounded-md cursor-pointer  hover:text-primary hover:bg-blue-100'>
                            <item.icon size={24} />
                            <span>{item.name}</span>
                        </h2>
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
