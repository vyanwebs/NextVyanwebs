import React from 'react'
import Link from 'next/link';
const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center p-4">
      <h1 className="text-4xl font-bold mb-4 text-red-600">
        404 - Page Not Found
      </h1>
      <p className="text-lg mb-6 text-gray-700">
        Sorry, the page you are looking for does not exist.
      </p>
      <Link href="/" className="text-blue-600 hover:underline">
        Go back to Home
      </Link>
    </div>
  );
}

export default NotFound
