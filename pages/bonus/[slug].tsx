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
    const dir = path.join(process.cwd(), 'src', 'components', 'data', 'bonusDescription');
    const files = fs.readdirSync(dir);

    const paths = files.map((filename) => ({
        params: { slug: filename.replace('.json', '') }
    }));

    return {
        paths,
        fallback: false
    };
}

export async function getStaticProps({ params }: { params: { slug: string } }) {
    const dir = path.join(process.cwd(), 'src', 'components', 'data', 'bonusDescription');
    const filePath = path.join(dir, `${params.slug}.json`);

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

    const canonicalUrl = `https://www.bonuscenter.it/bonus/${slug}`;
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