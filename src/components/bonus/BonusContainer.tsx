import { Box } from '@mui/material';

import SearchInput from '../common/SearchInput';
import BonusList from './BonusList';

interface HeroSectionProps {
    width?: string;
}

export default function HeroSection({ width = '95%' }: HeroSectionProps) {
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
            <SearchInput width={'60%'} />
            <BonusList />
        </Box>

    );
}