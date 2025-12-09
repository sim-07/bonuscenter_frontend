import { Box, Button, Container, Grid, Typography, useTheme, CssBaseline, Stack } from '@mui/material';
import { useEffect, useState } from 'react';
import LoginForm from '../common/LoginForm';
import DialogComponent from '../common/DialogComponent';
import { useTranslation } from 'next-i18next';

type HeroSectionProps = {
    scrollToMiddle: () => void;
};

export default function HeroSection({ scrollToMiddle }: HeroSectionProps) {
    const { t } = useTranslation('hero');
    const theme = useTheme();
    const [openLogin, setOpenLogin] = useState(false);

    const openLoginDialog = () => setOpenLogin(true);

    const max = 5;
    const min = 1;
    const [randTitle, setRandTitle] = useState<number>(0);

    useEffect(() => {
        const max = 5;
        const min = 1;
        const r = Math.floor(Math.random() * (max - min + 1)) + min;
        setRandTitle(r);
    }, []);


    return (
        <>
            <Box
                component="section"
                sx={{
                    bgcolor: theme.palette.grey[800],
                    borderRadius: '40px',
                    p: { xs: 4, md: 8 },
                    width: '95%',
                    height: '75vh',
                    margin: '80px auto',
                    position: 'relative',
                    overflow: 'hidden',
                }}
            >
                <Container
                    sx={{
                        margin: { xs: 2, md: 5, xl: 12 },
                    }}
                >
                    <Stack
                        direction={{ xs: 'column', md: 'row' }}
                        spacing={8}
                        alignItems="center"
                    >
                        <Box sx={{ width: { xs: '100%', md: '50%' } }}>
                            <Typography
                                variant="h1"
                                sx={{
                                    fontWeight: 800,
                                    fontSize: { xs: '2.5rem', sm: '3rem', md: '3.5rem' },
                                    lineHeight: 1.2,
                                    minHeight: 200,
                                    mb: 2,
                                    overflow: 'hidden',
                                }}
                            >
                                <Box
                                    sx={{
                                        display: 'inline-block',
                                        opacity: randTitle === 0 ? 0 : 1,
                                        transform: randTitle === 0 ? 'translateY(-10px)' : 'translateY(0)',
                                        transition: 'opacity 0.5s ease, transform 0.5s ease',
                                    }}
                                >
                                    <Box component="span" sx={{ color: theme.palette.primary.main }}>
                                        {randTitle === 0 ? '' : t(`title.title${randTitle}.part1`)}
                                    </Box>
                                    <br />
                                    {randTitle === 0 ? '' : t(`title.title${randTitle}.part2`)}
                                </Box>
                            </Typography>

                            <Typography
                                variant="h6"
                                sx={{
                                    fontWeight: 400,
                                    color: 'text.secondary',
                                    mb: 4,
                                    fontSize: { xs: '1.1rem', md: '1.25rem' },
                                }}
                            >
                                {t('subtitle')}
                            </Typography>

                            <Stack direction="column" spacing={2} mt={8} sx={{ width: '270px' }}>
                                <Button
                                    variant="contained"
                                    size="large"
                                    sx={{
                                        padding: theme.spacing(1.5, 4),
                                        fontSize: '1.1rem',
                                        fontWeight: 700,
                                        borderRadius: '12px',
                                        color: 'white',
                                        transition: 'all 0.3s ease',
                                        transform: randTitle === 0 ? 'translateY(-10px)' : 'translateY(0)',
                                        '&:hover': { transform: 'translateY(-3px)' },
                                    }}
                                    onClick={openLoginDialog}
                                >
                                    {t('button.publishReferral')}
                                </Button>

                                <Button
                                    variant="outlined"
                                    size="large"
                                    sx={{
                                        padding: theme.spacing(1.5, 4),
                                        fontSize: '1.1rem',
                                        fontWeight: 700,
                                        borderRadius: '12px',
                                        borderWidth: 2,
                                        '&:hover': { backgroundColor: theme.palette.grey[700] },
                                    }}
                                    onClick={scrollToMiddle}
                                >
                                    {t('button.viewAll')}
                                </Button>
                            </Stack>
                        </Box>

                    </Stack>
                </Container>

                <Box
                    sx={{
                        position: 'absolute',
                        top: -100,
                        right: -100,
                        width: 300,
                        height: 300,
                        borderRadius: '50%',
                        bgcolor: theme.palette.primary.light,
                        opacity: 0.3,
                        zIndex: 1,
                    }}
                />
            </Box>

            <DialogComponent open={openLogin} onClose={() => setOpenLogin(false)} variant="form">
                <LoginForm signinTypeP="signup" />
            </DialogComponent>
        </>
    );
}
