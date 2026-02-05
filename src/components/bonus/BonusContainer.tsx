import { Box, Divider, Typography } from '@mui/material';
import SearchInput from '../common/SearchInput';
import BonusList from './BonusList';
import { useState } from 'react';
import { bonusListData } from '../data/bonusListData';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

import { BonusItem } from '@/types/bonusTypes';


interface BonusContainerProps {
    bonusListDataP?: BonusItem[] | null;
    width?: string;
    titleBonusContainer?: string;
    edit?: boolean;
    background?: boolean;
}

export default function BonusContainer({
    width = '95%',
    bonusListDataP = bonusListData,
    titleBonusContainer,
    edit = false,
    background = false,
}: BonusContainerProps) {
    const [searchTerm, setSearchTerm] = useState('');
    const { locale } = useRouter();
    const currentLocale = locale || 'it';
    const { t } = useTranslation('common');

    const filtBonusListData = Array.isArray(bonusListDataP)
        ? bonusListDataP.filter((bonus) =>
            bonus.title.toLowerCase().includes(searchTerm.toLowerCase())
        )
        : [];

    return (
        <Box
            sx={{
                backgroundColor: background ? 'grey.800' : 'none',
                backgroundImage: 'none',
                borderRadius: '24px',
                width: width,
                height: 'auto',
                minHeight: '85vh',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '30px',
                border: background ? "1px solid #353535" : "none",
            }}
        >
            <Box
                sx={{
                    width: "100%",
                    justifyContent: "left",
                    alignItems: "left",
                    p: 4,
                }}
            >
                <Typography component={"h1"} sx={{ fontSize: "2rem", color: "grey.400", fontWeight: "bold", mb: 2 }}>
                    {titleBonusContainer ? titleBonusContainer : t('all_bonus')}
                </Typography>
                <Divider />
            </Box>

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
