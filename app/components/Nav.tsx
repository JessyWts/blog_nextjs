import React from 'react';
import Logo from '@/public/logo.svg';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { User } from 'lucide-react';

export default function Nav() {
  return (
    <nav className='max-w-[1200px] w-full mx-auto h-[80px] flex items-center
    justify-between p-5 border-b border-gray-300'>
        <div>
            <Link href='/'>
                <Image width={30} height={30} alt='Logo' src={Logo} />
            </Link>
        </div>

        <div className="flex items-center gap-4">
            <Link href={'/signInAndUp'}>
                <Button>
                    <User className='w-4'/>
                </Button>
            </Link>
        </div>
    </nav>
  )
}
