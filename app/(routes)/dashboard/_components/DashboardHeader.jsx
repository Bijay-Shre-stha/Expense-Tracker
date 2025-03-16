// Example usage within a Next.js page
import { Button } from '@/components/ui/button';
import { UserButton } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation'
import React from 'react';

function DashboardHeader() {

  return (
    <div className='p-5 shadow-md border-b flex items-center justify-between'>
      <div>
      </div>
      <div>
        <UserButton />
      </div>
    </div>
  );
}

export default DashboardHeader;
