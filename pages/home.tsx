import { useRef } from 'react';
import Head from 'next/head';

import HeroSection from '../src/components/Home/HeroSection';
import BonusSection from '../src/components/Home/BonusSection';
import BestBonusSection from '../src/components/Home/BestBonusSection';
import Footer from '../src/components/Home/Footer';
import Header from '@/components/Home/Header';
import { useTranslation } from 'next-i18next';
import { Stack } from '@mui/material';
import OtherChannels from '@/components/Home/OtherChannels';


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

            <Stack direction={"column"} gap={"30px"}>
                <BestBonusSection />

                {/* <OtherChannels /> */}

                <div ref={middleRef}>
                    <BonusSection />
                </div>
               
            </Stack>

            <Footer />
        </>
    );
}