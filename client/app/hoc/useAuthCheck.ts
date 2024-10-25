// hooks/useAuthCheck.ts
"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export const useAuthCheck = () => {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Simulate an async authentication check (or use real auth logic here)
    const checkAuth = async () => {
      const token = localStorage.getItem('token'); // Assuming token is stored in localStorage
      if (token) {
        setAuthenticated(true);
      } else {
        router.push('/login');
      }
      setLoading(false);
    };
    checkAuth();
  }, [router]);

  return { loading, authenticated };
};
