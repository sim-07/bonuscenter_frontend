import { Box } from '@mui/material';

import SearchInput from '../common/SearchInput';
import BonusList from './BonusList';
import { bonusListData } from '../data/bonusListData';
import { useState } from 'react';


interface BonusContainerProps {
    width?: string;
}

export default function BonusContainer({ width = '95%' }: BonusContainerProps) {
    const [searchTerm, setSearchTerm] = useState('');

    let filtBonusListData = bonusListData.filter((bonus) => {
        return bonus.title.toLowerCase().includes(searchTerm.toLowerCase())
    })

    return (
        <Box
            sx={{
                backgroundColor: '#f9f9f9',
                borderRadius: '24px',
                width: {width},
                height: 'auto',
                minHeight: '85vh',
                margin: '70px auto',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: '30px',
                gap: '30px',
            }}
        >
            <SearchInput
                width="60%"
                value={searchTerm}
                onChange={(value) => setSearchTerm(value)}
            />
            <BonusList bonusListData={filtBonusListData} />
        </Box>

    );
}