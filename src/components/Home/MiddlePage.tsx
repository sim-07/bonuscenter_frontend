import { Box } from '@mui/material';

import BonusContainer from '../bonus/BonusContainer';

export default function MiddlePage() {
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center'
            }}
        >
            <BonusContainer />
        </Box>

    );
}