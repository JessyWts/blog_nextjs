'use client'

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged, User, GoogleAuthProvider, GithubAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from '@/db/config-firebase';

const githubProvider = new GithubAuthProvider;
const googleProvider = new GoogleAuthProvider;

const useAuth = () => {
    const [user, setUser] = useState<User | null>(null);
    const [isFetch, setIsFetch] = useState(true);
    const router = useRouter();

    const loginWithGoogle = async () => {
        try {
            const result = await signInWithPopup(auth, googleProvider);
            setUser(result.user);
            router.push('/dashboard');
        } catch (error) {
            console.error('erreur loginWithGoogle', error);
        }
    }

    const loginWithGitHub = async () => {
        try {
            const result = await signInWithPopup(auth, githubProvider);
            setUser(result.user);
            router.push('/dashboard');
        } catch (error) {
            console.error('erreur loginWithGitHub', error);
        }
    }

    useEffect(()=> {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
            } else {
                setUser(null)
            }
            setIsFetch(false);
        })
        return () => unsubscribe();
    }, []);

    const redirectIfAuthenticated = () => {
        if (user) {
            router.push('/dashboard');
        }
    }

    return {user, isFetch, redirectIfAuthenticated, loginWithGitHub, loginWithGoogle};
}

export default useAuth