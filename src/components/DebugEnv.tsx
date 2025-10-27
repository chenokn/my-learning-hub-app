'use client';

export default function DebugEnv() {
  return (
    <div className="fixed top-4 right-4 bg-black text-white p-4 rounded text-xs max-w-md z-50">
      <h3 className="font-bold mb-2">Environment Variables Debug:</h3>
      <div className="space-y-1">
        <div>API Key: {process.env.NEXT_PUBLIC_FIREBASE_API_KEY ? '✅' : '❌'}</div>
        <div>Auth Domain: {process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN ? '✅' : '❌'}</div>
        <div>Project ID: {process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ? '✅' : '❌'}</div>
        <div>Storage Bucket: {process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET ? '✅' : '❌'}</div>
        <div>Sender ID: {process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID ? '✅' : '❌'}</div>
        <div>App ID: {process.env.NEXT_PUBLIC_FIREBASE_APP_ID ? '✅' : '❌'}</div>
      </div>
      <div className="mt-2 text-xs opacity-75">
        API Key: {process.env.NEXT_PUBLIC_FIREBASE_API_KEY?.substring(0, 10)}...
      </div>
    </div>
  );
} 