'use client';

import React from 'react'
import { Mail, User } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import useAuth from '@/hooks/useAuth';
import Image from 'next/image';

export default function PageDashboard() {
  const {user} = useAuth();

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className='text-2xl font-black uppercase'>Dashboard</CardTitle>
          <CardDescription className='text-muted-foreground text-lg'>
            Votre profil
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="flex flex-col space-y-4">
            {user?.photoURL && (
              <li className="flex items-center space-x-2">
                <Image src={user?.photoURL} width={50} height={50} alt={`Photo de profile de ${user?.displayName}`} />
              </li>
            )}
            <li className="flex items_center space-x-2">
              <span><User/></span>
              <span><b>Votre nom:</b> {user?.displayName}</span>
            </li>
            <li className="flex items_center space-x-2">
              <span><Mail/></span>
              <span><b>Votre email:</b> {user?.email}</span>
            </li>
            <li>
              <span className='text-muted-foreground'>
                Membre depuis le  {
                  user?.metadata?.creationTime ? new Intl.DateTimeFormat("fr-FR", {
                    dateStyle: 'full'
                  }).format(new Date(user.metadata.creationTime)) : 'Date inconnue'
                }
              </span>
            </li>
          </ul>
        </CardContent>
      </Card>
    </>
  )
}
