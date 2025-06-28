import { Box, Typography } from '@mui/material';

import SearchInput from '../common/SearchInput';
import BonusList from './BonusList';
import { useState } from 'react';
import { bonusListData } from '../data/bonusListData';

interface BonusItem {
    name: string,
    title: string;
    description: string;
    bonus_value: string;
    image: string;
    category: string;
}

interface BonusContainerProps {
    bonusListDataP?: BonusItem[] | null;
    width?: string;
    titleBonusContainer?: string;
}

export default function BonusContainer({ width = '95%', bonusListDataP = bonusListData, titleBonusContainer }: BonusContainerProps) {
    const [searchTerm, setSearchTerm] = useState('');

    console.log("bonusListDataP BONUSCONTAINER:", bonusListDataP);

    const filtBonusListData = Array.isArray(bonusListDataP)
        ? bonusListDataP.filter((bonus) =>
            bonus.title.toLowerCase().includes(searchTerm.toLowerCase())
        )
        : [];

    return (
        <Box
            sx={{
                backgroundColor: 'grey.100',
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
            <BonusList bonusListData={filtBonusListData} />
        </Box>

    );
}