import { Box, Typography } from '@mui/material';
import SearchInput from '../common/SearchInput';
import BonusList from './BonusList';
import { useState } from 'react';
import { bonusListData } from '../data/bonusListData';
import { useRouter } from 'next/router';

interface BonusItem {
    name: string;
    title: string;
    description: {
        it: string;
        en: string;
        [key: string]: string;
    };
    bonus_value: string;
    image: string;
    category: string;
}

interface BonusContainerProps {
    bonusListDataP?: BonusItem[] | null;
    width?: string;
    titleBonusContainer?: string;
    edit?: boolean;
}

export default function BonusContainer({
    width = '95%',
    bonusListDataP = bonusListData,
    titleBonusContainer,
    edit = false
}: BonusContainerProps) {
    const [searchTerm, setSearchTerm] = useState('');
    const { locale } = useRouter();
    const currentLocale = locale || 'it'; 

    const filtBonusListData = Array.isArray(bonusListDataP)
        ? bonusListDataP.filter((bonus) =>
            bonus.title.toLowerCase().includes(searchTerm.toLowerCase())
        )
        : [];

    return (
        <Box
            sx={{
                backgroundColor: 'grey.800',
                backgroundImage: 'none',
                borderRadius: '24px',
                width: width,
                height: 'auto',
                minHeight: '85vh',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '30px',
            }}
        >
            <Typography
                component={'h1'}
                sx={{
                    fontSize: '26px',
                    fontWeight: 'bold',
                    mt: 4
                }}
            >
                {titleBonusContainer}
            </Typography>

            <SearchInput
                width="60%"
                value={searchTerm}
                onChange={(value) => setSearchTerm(value)}
            />

            <BonusList
                bonusListDataP={filtBonusListData}
                edit={edit}
                locale={currentLocale}
            />
        </Box>
    );
}
