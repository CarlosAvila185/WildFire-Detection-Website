'use client';
import dynamic from 'next/dynamic';

// now this dynamic call lives in a client component
const KamloopsMap = dynamic(() => import('./KamloopsMap'), {
  ssr: false
});

export default function MapLoader() {
  return <KamloopsMap />;
}
