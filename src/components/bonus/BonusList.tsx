import React from 'react';
import { Box, Grid, Pagination, Stack, Typography } from '@mui/material';



import BonusCard from './BonusCard';
import { relative } from 'path';

interface BonusItem {
    title: string;
    description: string;
    bonusValue: string;
    image: string;
    category: string;
}

interface BonusListProps {
    bonusListData: BonusItem[];
}

export default function BonusList({ bonusListData }: BonusListProps) {

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
            <Box
                sx={{
                    flex: 1,
                    width: '100%'
                }}
            >
                <Grid
                    container
                    spacing={4}
                    columns={{ xs: 4, sm: 6, md: 9, lg: 12 }}
                    sx={{ 
                        margin: 0,
                        justifyContent: 'center',
                        padding: '10px !important',
                        minWidth: {
                            xs: '100%',
                            sm: '500px',
                            md: '760px',
                            lg: '980px',
                            xl: '1030px'
                          }
                    }}
                >
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