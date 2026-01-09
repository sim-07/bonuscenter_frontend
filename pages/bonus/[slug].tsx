import fs from 'fs';
import path from 'path';

import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

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
        last_edit: string;
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
    const lang = locale || 'it';
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
            bonus,
            ...(await serverSideTranslations(lang, ['common'])),
        }
    };
}

export default function BonusDescriptionPage({ bonus }: Props) {
    const router = useRouter();
    const slug = router.query.slug as string;
    const locale = router.locale || 'it';

    const canonicalUrl =
        locale === 'it'
            ? `https://www.bonuscenter.it/bonus/${slug}`
            : `https://www.bonuscenter.it/${locale}/bonus/${slug}`; // se l'utente è it non metto prefisso, altrimenti metto l'altra lingua

    const metaDescription = bonus.title || 'Scopri tutti i dettagli sul bonus disponibile per questa piattaforma.';


    return (
        <>
            <Head>
                <title>{bonus.title}</title>
                <meta name="description" content={metaDescription} />
                <link rel="canonical" href={canonicalUrl} />

                <link
                    rel="alternate"
                    href={`https://www.bonuscenter.it/bonus/${slug}`}
                    hrefLang="it"
                />
                <link
                    rel="alternate"
                    href={`https://www.bonuscenter.it/en/bonus/${slug}`}
                    hrefLang="en"
                />
                <link
                    rel="alternate"
                    href={`https://www.bonuscenter.it/bonus/${slug}`}
                    hrefLang="x-default"
                />
            </Head>
            <BonusDescription bonus={bonus} />
        </>
    );
}
