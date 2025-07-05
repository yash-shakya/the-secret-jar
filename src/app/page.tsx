'use client'

import { Button } from '@/components/ui/button';
import SplineViewer from '@/components/ui/splinecomponent';
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
    <div className='flex flex-col lg:flex-row items-center md:justify-center max-md:pt-10 min-h-screen bg-gray-100 dark:bg-gray-900 px-4 lg:px-0'>
      <div className='w-full lg:w-[50%] flex items-center justify-center flex-col py-8 lg:py-0'>
        <div className='w-fit max-w-full text-center lg:text-left lg:ml-40 lg:-mt-12'>

          <div className='flex flex-col items-center lg:items-start justify-center w-fit'>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center lg:text-left mt-4 lg:mt-10">
              Welcome to
            </h1>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-center lg:text-left">
              The Secret Jar
            </h1>
          </div>
          <p className="text-center lg:text-left mt-4 text-base sm:text-lg">
            Spill the Tea, Not your Identity!
          </p>
          <div className='flex justify-center lg:justify-start'>
            <Button className='mt-8 w-32 h-12 text-lg'>
              <Link href='/signup'>Start Now</Link>
            </Button>
          </div>
        </div>
      </div>
      <div className='w-full lg:w-[50%] h-[40vh] sm:h-[50vh] lg:h-[90svh] flex items-center justify-center ml-12'>
        {/* <h1>Spline test</h1> */}
        <SplineViewer />
      </div>
    </div>
  );
}
