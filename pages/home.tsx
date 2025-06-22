import { useRef } from 'react';

import Header from '../src/components/Home/Header';
import HeroSection from '../src/components/Home/HeroSection';
import MiddlePage from '../src/components/Home/MiddlePage';
import Footer from '../src/components/Home/Footer';


export default function Home() {
  const middleRef = useRef<HTMLDivElement | null>(null);
  
  return (
    <>
      <Header />
      <HeroSection scrollToMiddle={() => {
        middleRef.current?.scrollIntoView({ behavior: 'smooth' });
      }} />
      <div ref={middleRef}>
        <MiddlePage />
      </div>
      <Footer />
    </>
  );
}
