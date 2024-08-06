"use client";

import React, { useState} from 'react';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '@/db/config-firebase';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useFirebase } from '@/context/articleContext';
import { schemaArticle } from '@/schema/schema';
import { DataFormType } from '@/types/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import useAuth from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

export default function PageCreateArticle() {

  const [file, setFile] = useState<File | undefined>();
  const [imagePreview, setImagePreview ] = useState<string | undefined>();
  const {addArticle} = useFirebase();
  const {user} = useAuth();
  const router = useRouter();

  const {handleSubmit, register, formState: {errors}} = useForm<DataFormType>({
    resolver: yupResolver(schemaArticle)
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const seletedFile = e.target.files?.[0];
    setFile(seletedFile);

    if (seletedFile) {
      const imageUrl = URL.createObjectURL(seletedFile);
      setImagePreview(imageUrl);
    }
  }

  const onSubmit: SubmitHandler<DataFormType> = async (formData) => {
    try {
      let imageUrl = "";

      if (file) {
        
        const imageRef = ref(storage, `articlesImages/${file.name}`);
        await uploadBytes(imageRef, file);
        imageUrl = await getDownloadURL(imageRef);
      }

      await addArticle({
        ...formData,
        authorId: user?.uid as string,
        authorName: user?.displayName as string,
        image: imageUrl,
        createAt: new Date()
      });

      setImagePreview(undefined);
      router.push('/dashboard');

    } catch (error) {
      console.error("Erreur lors de la soumission du formulaire", error);
    }
  }

  return (
    <Card>
      <CardContent className='p-4'>
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col space-y-4'>
          <Label htmlFor='tilte'>Titre</Label>
          <Input {...register('title')} id='title' ></Input>
          {errors.title && <span className='text-red-500'>{errors.title.message}</span>}

          <Label htmlFor='description'>Description</Label>
          <Textarea {...register('description')} id='description' />
          {errors.description && <span className='text-red-500'>{errors.description.message}</span>}

          <Label htmlFor='image'>Image</Label>
          <input type='file' accept='image/gif, image/jpeg, image/jpg, image/png, image/webp' onChange={handleChange} id='image' className='cursor-pointer' />

          {imagePreview && <Image className='w-full h-[500px] object-cover' height={250} width={300} src={imagePreview} alt='Image preview'/>}

          <div className="flex items-center justify-between">
            <Link href='/dashboard'>
              <Button className='bg-red-500 hover:bg-red-600 text-white' type='button'>Annuler</Button>
            </Link>
              <Button type='submit'>Ajouter</Button>
          </div>

        </form>
      </CardContent>
      
    </Card>
  )
}
