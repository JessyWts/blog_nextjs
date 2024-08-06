'use client';

import React, { createContext, useContext, useEffect, useState } from "react";
import { collection, onSnapshot, addDoc, deleteDoc, doc, updateDoc, query, where } from "firebase/firestore";
import { db } from "@/db/config-firebase";
import { DataType, DbContextType } from "@/types/types";
import useAuth from "@/hooks/useAuth";

const ArticleContext = createContext<DbContextType | null>(null);

export const useFirebase = () => {
    const context = useContext(ArticleContext);
    if (!context) {
        throw new Error('Une erreur à eu lieu dans le context');
    }
    return context;
}

export const ArticleProvider: React.FC<{children: React.ReactNode}> = ({children}) => {
    const [articles, setArticles] = useState<DataType[]>([]);
    const {user} = useAuth();
    const authorId = user?.uid as string;

    useEffect(() => {
        if (!authorId) return;

        const q = query(collection(db, 'articles'), where('authorId', '==', authorId));

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const data: DataType[] = [];
            snapshot.forEach((doc) => {
                data.push({id: doc.id, ...doc.data()} as DataType)
            });
            setArticles(data);
        });

        return () => unsubscribe();
    }, [authorId]);

    const addArticle = async (data: Omit<DataType, 'id'> & {image: string}) => {
        try {
            const docRef = await addDoc(collection(db, 'articles'), {...data, authorId});
            const newArticle : DataType = {id: docRef.id , ...data, authorId}
            setArticles([...articles, newArticle]);
        } catch (error) {
            console.error("Une erreur est survenue lors de l'ajout de l'article.", error);
            throw new Error('Erreur lors de la création article')
        }
    };

    const updateArticle = async (article: DataType) => {
        try {
            const articleRef = doc(db, 'articles', article.id );
            await updateDoc(articleRef, article);
            setArticles(articles.map((oldArticle) => (oldArticle.id === article.id ? {...oldArticle, article}: oldArticle)))
        } catch (error) {
            console.error("Une erreur est survenue lors de la modification de l'article.", error);
            throw new Error('Erreur lors de la modification article')
        }
    }

    const deleteArticle = async (id: string) => {
        try {
            await deleteDoc(doc(db, 'articles', id));
            setArticles(articles.filter((article) => article.id !== id));
        } catch (error) {
            console.error("Une erreur est survenue lors de la suppression de l'article.", error);
            throw new Error('Erreur lors de la suppression article')
        }
    }

    const value = {
        articles,
        addArticle,
        updateArticle,
        deleteArticle
    }

    return <ArticleContext.Provider value={value}>{children}</ArticleContext.Provider>

}