import { ReactNode } from 'react';
import SideNavbar from './_components/SideNavbar';
import DashboardHeader from './_components/DashboardHeader';

const DashboardLayout = ({ children }: { children: ReactNode }) => {
    return (
        <>
            <div className="fixed md:w-64 hidden md:block "><SideNavbar /></div>
            <div className="
                md:ml-64
                bg-gray-200
                min-h-screen
            ">
                <DashboardHeader />
                {children}
            </div>
        </>
    )
}

export default DashboardLayout
