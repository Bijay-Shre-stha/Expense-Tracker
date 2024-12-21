import { ReactNode } from 'react';
import SideNavbar from './_components/SideNavbar';

const DashboardLayout = ({ children }: { children: ReactNode }) => {
    return (
        <>
            <div className="fixed md:w-64 hidden md:block "><SideNavbar /></div>
            <div className="
                md:ml-64
                bg-gray-200
                min-h-screen
                p-5
                md:p-10
            ">
                {children}
            </div>
        </>
    )
}

export default DashboardLayout
