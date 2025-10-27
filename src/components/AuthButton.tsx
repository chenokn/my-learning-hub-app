'use client';

import { useState } from 'react';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useAuth } from '@/contexts/AuthContext';

export default function AuthButton() {
  const { user } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (!auth) {
      setError('Firebase is not initialized');
      setLoading(false);
      return;
    }

    try {
      if (isSignUp) {
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    if (!auth) {
      setError('Firebase is not initialized');
      return;
    }

    try {
      await signOut(auth);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred');
      }
    }
  };

  if (user) {
    return (
      <div className="flex flex-col items-center space-y-4">
        <p className="text-green-600">Welcome, {user.email}!</p>
        <button
          onClick={handleSignOut}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
        >
          Sign Out
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4 text-center">
        {isSignUp ? 'Sign Up' : 'Sign In'}
      </h2>

      <form onSubmit={handleAuth} className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="mt-1 block bg-white/70 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="mt-1 block bg-white/70 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {error && (
          <p className="text-red-600 text-sm">{error}</p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors disabled:opacity-50"
        >
          {loading ? 'Loading...' : (isSignUp ? 'Sign Up' : 'Sign In')}
        </button>
      </form>

      <button
        onClick={() => setIsSignUp(!isSignUp)}
        className="w-full mt-4 text-blue-500 hover:text-blue-600 text-sm"
      >
        {isSignUp ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
      </button>
    </div>
  );
} 