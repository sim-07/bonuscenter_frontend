import fs from 'fs';
import path from 'path';

import BonusDescription from '@/components/bonus/BonusDesription';
import Head from 'next/head';
import { useRouter } from 'next/router';

interface BonusData {
    title: string;
    name: string;
    bonus_image: string;
    summary: {
        bonus: string;
        invito: string;
        deposito_richiesto: string;
        scadenza: string;
        commissioni: string;
        extra: string;
    };
    sections: {
        title: string;
        content: string[];
        image?: string;
    }[];
}

interface Props {
    bonus: BonusData;
}

export async function getStaticPaths() {
    const locales = ['it', 'en'];
    const paths: { params: { slug: string }, locale: string }[] = [];

    for (const locale of locales) {
        const dir = path.join(process.cwd(), 'src', 'components', 'data', 'bonusDescriptions', locale);
        if (!fs.existsSync(dir)) continue;
        const files = fs.readdirSync(dir);
        for (const filename of files) {
            paths.push({
                params: { slug: filename.replace('.json', '') },
                locale
            });
        }
    }

    return {
        paths,
        fallback: false
    };
}

export async function getStaticProps({ params, locale }: { params: { slug: string }, locale: string }) {
    const lang = locale || 'en';
    const filePath = path.join(
        process.cwd(),
        'src',
        'components',
        'data',
        'bonusDescriptions',
        lang,
        `${params.slug}.json`
    );

    const fileContents = fs.readFileSync(filePath, 'utf8');
    const bonus = JSON.parse(fileContents);

    return {
        props: {
            bonus
        }
    };
}

export default function BonusDescriptionPage({ bonus }: Props) {
    const router = useRouter();
    const slug = router.query.slug as string;
    const locale = router.locale || 'en';

    const canonicalUrl = `https://www.bonuscenter.it/${locale}/bonus/${slug}`;
    const metaDescription = bonus.title || 'Scopri tutti i dettagli sul bonus disponibile per questa piattaforma.';

    return (
        <>
            <Head>
                <title>{bonus.title}</title>
                <meta name="description" content={metaDescription} />
                <link rel="canonical" href={canonicalUrl} />
            </Head>
            <BonusDescription bonus={bonus} />
        </>
    );
}
