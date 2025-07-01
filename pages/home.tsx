import { useRef } from 'react';
import Head from 'next/head';

import HeroSection from '../src/components/Home/HeroSection';
import MiddlePage from '../src/components/Home/MiddlePage';
import Footer from '../src/components/Home/Footer';
import Header from '@/components/Home/Header';



export default function Home() {
    const middleRef = useRef<HTMLDivElement | null>(null);

    return (
        <>
            <Head>
                <title>BonusCenter</title>
            </Head>
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
