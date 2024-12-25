"use client"
import { ReactNode, useEffect } from 'react';
import SideNavbar from './_components/SideNavbar';
import DashboardHeader from './_components/DashboardHeader';
import { useUser } from '@clerk/nextjs';
import { db } from '../../../db/index';
import { Budgets } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { useRouter } from 'next/navigation';

const DashboardLayout = ({ children }: { children: ReactNode }) => {
    const { user } = useUser();
    const router = useRouter();

    const checkUserBudget = async () => {
        if (user?.primaryEmailAddress?.emailAddress) {
            const result = await db.select()
                .from(Budgets)
                .where(eq(Budgets.createdBy, user.primaryEmailAddress.emailAddress))
            if (result?.length === 0) {
                router.replace('/dashboard/budget')
            }

        }

    }
    useEffect(() => {
        if (user) {
            checkUserBudget();
        }
    },[user])


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
