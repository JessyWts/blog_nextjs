'use client';

import React from 'react'
import { Mail, User } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import useAuth from '@/hooks/useAuth';
import Image from 'next/image';
import { useFirebase } from '../../context/articleContext';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function PageDashboard() {
  const {user} = useAuth();

  const  {articles, deleteArticle} = useFirebase();

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

      <div className="flex flex-col space-y-2 mt-4 p-3">
        <h1 className='text-2xl font-black uppercase'>Vos articles</h1>
        <p className='text-muted-foreground text-lg'>Vos posts publiés</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
          {articles.map((item, index) => (
            <Card key={index} className='p-3'>
              <div className='flex gap-2 mb-4'>
                <Image src={item.image} alt={item.title} width={100} height={100} className='max-w-[200] h-[100] object-cover' />
                <div className="flex flex-col space-y-4">
                  <h3>{item.title}</h3>
                </div>
              </div>
              <div className='flex items-center justify-between'>
                <Link href={`dashboard/articleUser/${item.id}` }>
                  <Button>Modifier</Button>
                </Link>
                <Button className='bg-red-500 hover:bg-red-600 text-white' onClick={()=> deleteArticle(item.id)}>Supprimer</Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </>
  )
}
