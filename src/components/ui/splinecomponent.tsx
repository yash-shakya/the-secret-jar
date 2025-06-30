'use client'

import dynamic from 'next/dynamic';

// Dynamically import Spline with no SSR
const Spline = dynamic(() => import('@splinetool/react-spline'), {
    ssr: false,
});

export default function SplineComponent() {
    return (
        <div className="w-full h-screen">
            <Spline
                scene="https://prod.spline.design/XixHEd6Knyh3o3HT/scene.splinecode"
            />
        </div>
    );
}