"use client";
import Image from 'next/image'
import logo from '@public/assets/logo.svg'
import { Button } from '@/components/ui/button'
import { UserButton, useUser } from '@clerk/nextjs'
import Link from 'next/link'

function Header() {

    const { isSignedIn } = useUser();

    return (
        <div className='p-5 flex justify-between items-center border shadow-sm'>
            <Link href={
                isSignedIn ? '/dashboard' : '/'
            }>
                <Image src={logo} alt="logo" width={160} height={100} />
            </Link>
            {
                isSignedIn
                    ? <UserButton /> :
                    <Link href="/sign-in">
                        <Button>Sign In</Button>
                    </Link>
            }
        </div>
    )
}

export default Header
