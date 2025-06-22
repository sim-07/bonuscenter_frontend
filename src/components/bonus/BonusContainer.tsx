import { Box } from '@mui/material';

import SearchInput from '../common/SearchInput';
import BonusList from './BonusList';

export default function HeroSection() {
    return (
        <Box
            sx={{
                backgroundColor: '#f9f9f9',
                borderRadius: '24px',
                width: '95%',
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