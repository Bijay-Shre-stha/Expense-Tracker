import { UserButton } from '@clerk/nextjs'
import React from 'react'

const DashboardHeader = () => {
    return (
        <div className='p-5 flex justify-between items-center border shadow-sm '>
            <div className="">Search Bar</div>
            <div className="">
                <UserButton />
            </div>
        </div>
    )
}

export default DashboardHeader
