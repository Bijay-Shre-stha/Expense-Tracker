import Image from 'next/image'
import logo from '@public/assets/logo.svg'
import { Button } from '@/components/ui/button'

function Header() {
    return (
        <div className='p-5 flex justify-between items-center border shadow-sm'>
            <Image src={logo} alt="logo" width={160} height={100} />
            <Button>Get started</Button>
        </div>
    )
}

export default Header
