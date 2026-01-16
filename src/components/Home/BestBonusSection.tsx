'use client'

import { Box, Divider, Stack, Typography } from '@mui/material';
import { useTranslation } from 'next-i18next';

import { bonusListData } from '../data/bonusListData';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import DraggableMarquee from '../DraggableMarquee/DraggableMarquee';
import { useRouter } from 'next/navigation';


export default function BestBonusSection() {
    const { t } = useTranslation('common');
    const router = useRouter();

    const [bestItems, setBestItems] = useState(bonusListData);

    useEffect(() => {
        let bestBonuses = bonusListData.filter((bonus) => bonus.best);

        bestBonuses = bestBonuses.concat(bestBonuses);

        setBestItems(bestBonuses);
    }, [bonusListData]);

    return (
        <Box
            sx={{
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
                    }}
                >
                    <DraggableMarquee baseVelocity={1} draggable={true} slowdownOnHover={true}>
                        <Stack
                            direction={"row"}
                            gap={10}
                            sx={{
                                pr: 10,
                                display: 'flex',
                                flexDirection: 'row'
                            }}
                        >
                            {
                                bestItems.map((bonus, index) => {
                                    return (
                                        <Box
                                            key={index}
                                            // onPointerUp={(e) => {
                                            //     router.push(`/bonus/${bonus.name}`);
                                            // }}
                                            sx={{
                                                flexShrink: 0,
                                                position: "relative",
                                                borderRadius: "50px",
                                                height: "100px",
                                                width: "100px",
                                                userSelect: "none",
                                                cursor: "pointer",
                                                pointerEvents: "auto",
                                            }}
                                        >
                                            <Link href={`/bonus/${bonus.name}`} style={{ color: "grey", marginTop: "10px", position: "relative" }}>
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
                                                <Box
                                                    sx={{
                                                        backgroundImage: `url(${bonus.image})`,
                                                        width: "100px",
                                                        height: "100px",
                                                        backgroundPosition: 'center',
                                                        backgroundSize: 'cover',
                                                        backgroundRepeat: 'no-repeat',
                                                        borderRadius: "20px"
                                                    }}
                                                >

                                                </Box>
                                            </Box>

                                            <Typography sx={{ mt: 1 }}>{bonus.title}</Typography>
                                            
                                            </Link>
                                        </Box>
                                    )
                                })
                            }
                        </Stack>

                    </DraggableMarquee>
                </Stack>
            </Box>

        </Box>

    );
}