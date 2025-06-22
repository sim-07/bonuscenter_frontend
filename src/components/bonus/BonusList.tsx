import React from 'react';
import { Box, Grid, Pagination, Stack, Typography } from '@mui/material';

import { bonusListData } from '../data/bonusListData';


import BonusCard from './BonusCard';
import { relative } from 'path';

export default function BonusList() {

    const [page, setPage] = React.useState(1);
    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };

    const itemsPageNum = 12;
    const startIndex = (page - 1) * itemsPageNum;
    const endIndex = startIndex + itemsPageNum;
    const itemsPage = bonusListData.slice(startIndex, endIndex);

    return (
        <Box
            sx={{
                mt: 4,
                paddingRight: 5,
                display: 'flex',
                flexDirection: 'column',
                minHeight: '70vh',
            }}
        >
            <Box sx={{ flex: 1 }}>
                <Grid container spacing={2} columns={{ xs: 4, sm: 6, md: 9, lg: 12 }}>
                    {itemsPage.map((bonus, index) => (
                        <Grid key={index} size={{ xs: 4, sm: 3, md: 3 }}>
                            <BonusCard
                                title={bonus.title}
                                description={bonus.description}
                                image={bonus.image}
                                bonusValue={bonus.bonusValue}
                            />
                        </Grid>
                    ))}
                </Grid>
            </Box>

            <Stack
                sx={{
                    justifyContent: 'center',
                    alignSelf: 'center',
                    pt: 5,
                }}
            >
                <Pagination
                    count={Math.ceil(bonusListData.length / itemsPageNum)}
                    page={page}
                    onChange={handleChange}
                />
            </Stack>
        </Box>
    );
}