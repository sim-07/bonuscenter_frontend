import { Box } from '@mui/material';

import BonusContainer from '../bonus/BonusContainer';

export default function BonusSection() {
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
            }}
        >
            <BonusContainer background={true} showDetails={true} />
        </Box>

    );
}