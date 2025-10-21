'use client';

export default function Error({ error }: { error: Error }) {
  console.error('Render Error:', error);
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-red-50">
      <h2 className="text-2xl text-red-700 mb-2">Something went wrong!</h2>
      <p className="text-gray-600">{error.message}</p>
    </div>
  );
}
