'use client'

import { Button } from '@/components/ui/button';
import SplineViewer from '@/components/ui/Splinecomponent';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <div className='flex items-center justify-center h-fit bg-gray-100 dark:bg-gray-900'>
      <div className='w-[50%] flex items-center justify-center flex-col'>
        <div className='w-fit ml-40 -mt-12'>

          <div className='flex flex-col items-start justify-center w-fit'>
            <h1 className="text-5xl font-bold  text-left mt-10">
              Welcome to
            </h1>
            <h1 className="text-6xl font-bold  text-left">
              The Secret Jar
            </h1>
          </div>
          <p className="text-left mt-4">
            Spill the Tea, Not your Identity!
          </p>
          <div>
            <Button className='mt-8 w-32 h-12 text-lg'>
              <Link href='/signup'>Start Now</Link>
            </Button>
          </div>
        </div>
      </div>
      <div className='w-[50%] h-[90svh] flex items-center justify-center'>
        {/* <h1>Spline test</h1> */}
        <SplineViewer />
      </div>
    </div>
  );
}
