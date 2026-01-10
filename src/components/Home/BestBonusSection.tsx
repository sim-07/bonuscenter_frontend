'use client'

import { Box, Divider, Stack, Typography } from '@mui/material';
import { useTranslation } from 'next-i18next';

import { bonusListData } from '../data/bonusListData';
import { useEffect, useState } from 'react';
import Image from 'next/image';


export default function BestBonusSection() {
    const { t } = useTranslation('common');

    const [bestItems, setBestItems] = useState(bonusListData);

    useEffect(() => {
        let bestBonuses = bonusListData.filter((bonus) => bonus.best);

        bestBonuses = bestBonuses.concat(bestBonuses);

        setBestItems(bestBonuses);

        console.log(bestBonuses);
    }, [bonusListData]);

    return (
        <Box
            sx={{
                //backgroundColor: 'grey.800',
                // border: "1px solid #353535",
                borderRadius: '24px',
                width: "95%",
                mx: 'auto',
                height: 'auto',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'left',
                justifyContent: 'center',
                gap: '30px',
                p: 4,
            }}
        >
            <Typography component={"h1"} sx={{ fontSize: "2rem", color: "grey.400", fontWeight: "bold" }}>{t('best_bonus_title')}</Typography>
            <Divider />

            <Box sx={{ width: "100%", whiteSpace: "nowrap", overflow: "hidden" }}>
                <Stack direction={"row"} gap={{ xs: 10, xl: 20 }}
                    sx={{
                        width: "max-content",
                        my: 10,
                        animation: "scroll 40s linear infinite",
                        '@keyframes scroll': {
                            '0%': { transform: 'translateX(0)' },
                            '100%': { transform: 'translateX(-50%)' }
                        },
                        '&:hover': {
                            animationPlayState: "paused",
                        },
                    }}
                >
                    {
                        bestItems.map((bonus, index) => {
                            return (
                                <Box
                                    sx={{
                                        borderRadius: "50px",
                                        height: "100px",
                                        width: "100px",
                                        userSelect: "none",
                                        cursor: "pointer"
                                    }}
                                >
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            justifyContent: 'center',
                                            mt: 2,
                                        }}
                                    >
                                        <Box
                                            sx={{
                                                width: '60px',
                                                height: '60px',
                                                backgroundColor: 'primary.main',
                                                cursor: 'default',
                                                padding: '10px',
                                                borderRadius: '50px',
                                                position: 'absolute',
                                                marginLeft: '110px',
                                                marginTop: '-20px',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                            }}
                                        >
                                            <Typography
                                                sx={{
                                                    color: 'white',
                                                    mt: 0.4,
                                                    maxWidth: 60,
                                                    overflow: 'hidden',
                                                    fontSize: "1.5rem"
                                                }}
                                            >
                                                {bonus.bonus_value}
                                            </Typography>
                                        </Box>
                                        <Image
                                            src={bonus.image}
                                            alt={bonus.title}
                                            key={index}
                                            width={100}
                                            height={100}
                                            style={{ objectFit: 'cover', borderRadius: "20px" }}
                                        />
                                    </Box>

                                </Box>
                            )
                        })
                    }



                </Stack>
            </Box>

        </Box>

    );
}