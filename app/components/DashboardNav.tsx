import React from 'react';
import { Button } from '@/components/ui/button';
import { signOut } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import {auth} from '@/db/config-firebase';
import Link from 'next/link';
import { LogOut, Plus, Settings } from 'lucide-react';

export default function DashboardNav() {
  
  const router = useRouter();
  const handleSignout = () => {
    signOut(auth);
    router.push('/')
  }
  
    return (
    <nav className='flex items-center justify-between mb-4'>
        <div className="flex items-center space-x-3">
            <Link href='/dashboard'>
                <Button>
                    <Settings className='w-4'/>
                </Button>
            </Link>
            <Link href='/dashboard/createArticle'>
                <Button>
                    <Plus className='w-4'/>
                </Button>
            </Link>
        </div>

        <Button onClick={handleSignout}>
            <LogOut className='w-4'/>
        </Button>
    </nav>
  )
}
