'use client';

import { signIn } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

export default function LoginPage() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/';

  const [loading, setLoading] = useState(false);

  const handleGoogleLogin = async () => {
    setLoading(true);
    await signIn('google', { callbackUrl });
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-white shadow p-8 rounded-lg max-w-md w-full">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <Button onClick={handleGoogleLogin} disabled={loading}>
          {loading ? 'Redirecting...' : 'Sign in with Google'}
        </Button>
      </div>
    </div>
  );
}
