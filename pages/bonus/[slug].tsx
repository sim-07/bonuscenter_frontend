import fs from 'fs';
import path from 'path';
import { Box, Typography, List, ListItem, ListItemText, Divider, Link } from '@mui/material';
import Image from 'next/image'

import Navbar from '@/components/Home/Navbar';
import Footer from '@/components/Home/Footer';
import { inherits } from 'util';
import BonusDescription from '@/components/bonus/BonusDesription';
import Head from 'next/head';

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
    return (
        <>
            <Head>
                <title>{ bonus.title }</title>
            </Head>
            <BonusDescription bonus={bonus} />
        </>

    );
}
