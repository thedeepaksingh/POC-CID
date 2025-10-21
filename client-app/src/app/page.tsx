'use client';

import { useEffect, useState } from 'react';

export default function Home() {
  const [data, setData] = useState<string>('');
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('http://localhost:3001/ping');
        if (!res.ok) throw new Error(`Server returned ${res.status}`);
        const text = await res.text();
        setData(text);
      } catch (err: any) {
        console.error('❌ API Error:', err);
        setError(err.message || 'An unknown error occurred.');
      }
    };

    fetchData();
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8">
      <h1 className="text-4xl font-bold mb-6">POC: Next + Nest</h1>

      {data && (
        <p className="text-green-500 text-lg mb-4">
          ✅ Response: {data}
        </p>
      )}

      {error && (
        <div className="bg-red-100 text-red-600 p-3 rounded-xl shadow-md border border-red-400">
          <strong>Error:</strong> {error}
        </div>
      )}
    </main>
  );
}
