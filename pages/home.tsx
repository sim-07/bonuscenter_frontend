import { useRef } from 'react';
import Head from 'next/head';

import HeroSection from '../src/components/Home/HeroSection';
import MiddlePage from '../src/components/Home/MiddlePage';
import Footer from '../src/components/Home/Footer';
import Header from '@/components/Home/Header';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';

export default function Home() {
    const middleRef = useRef<HTMLDivElement | null>(null);
    const { t } = useTranslation('home');

    return (
        <>
            <Head>
                <title>{t('home_title')}</title>
                <meta name="description" content={t('home_description')} />

                <link
                    rel="alternate"
                    href={`https://www.bonuscenter.it/it/`}
                    hrefLang="it"
                />
                <link
                    rel="alternate"
                    href={`https://www.bonuscenter.it/en/`}
                    hrefLang="en"
                />
                <link
                    rel="alternate"
                    href={`https://www.bonuscenter.it/`}
                    hrefLang="x-default"
                />
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