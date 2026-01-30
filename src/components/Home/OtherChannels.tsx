import { Box, Divider, Link, Stack, Typography } from '@mui/material';
import { useTranslation } from 'next-i18next';

import TelegramLogo from '@/components/Icons/TelegramLogo'
import RedditLogo from '@/components/Icons/RedditLogo'

import LanguageIcon from '@mui/icons-material/Language';



export default function BestBonusSection() {
    const { t } = useTranslation('common');

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
            <Typography component={"h1"} sx={{ fontSize: "2rem", color: "grey.400", fontWeight: "bold" }}>{t('other_channels')}</Typography>
            <Divider />

            <Box sx={{ width: "100%", whiteSpace: "nowrap", overflow: "hidden" }}>
                <Stack direction={"column"} gap={3}
                    sx={{
                        width: "max-content",
                        my: 5,
                    }}
                >
                    <Link
                        href="https://www.reddit.com/r/ReferralITA/"
                        target="_blank"
                        rel="noopener noreferrer">
                        <Stack direction={"row"} gap={3}>
                            <RedditLogo />
                            <Typography sx={{ mt: 1.5 }}>ReferralITA</Typography>
                        </Stack>
                    </Link>

                    <Link
                        href="https://t.me/guadagnaitalyearnchannel"
                        target="_blank"
                        rel="noopener noreferrer">
                        <Stack direction={"row"} gap={3}>
                            <TelegramLogo />
                            <Typography sx={{ mt: 1.5 }}>Guadagna Italy Earn Channel</Typography>
                        </Stack>
                    </Link>

                    <Link
                        href="https://www.economiarecensioni.it/comparatore-economia-recensioni/"
                        target="_blank"
                        rel="noopener noreferrer">
                        <Stack direction={"row"} gap={3}>
                            <LanguageIcon
                                sx={{
                                    width: 50,
                                    height: 50,
                                    color: "#cecece"
                                }}
                            />
                            <Typography sx={{ mt: 1.5 }}>Economiarecensioni.it</Typography>
                        </Stack>
                    </Link>

                </Stack>
            </Box>

        </Box>

    );
}