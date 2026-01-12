import { Box, Button, Container, Typography, useTheme, Stack } from '@mui/material';
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

    const [randTitle, setRandTitle] = useState<number>(0);

    useEffect(() => {
        const max = 4;
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
                    borderRadius: { xs: '20px', md: '40px' },
                    width: '95%',
                    minHeight: { xs: '50vh', md: '75vh' }, 
                    margin: { xs: '20px auto', md: '35px auto' },
                    position: 'relative',
                    overflow: 'hidden',
                    border: "1px solid #353535",
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    
                    py: { xs: 8, md: 0 }, 
                }}
            >
                <Container
                    maxWidth="xl"
                    sx={{
                        zIndex: 2,
                        position: 'relative',
                        ml: {xs: 0, md: 5, xl: 15}
                    }}
                >
                    <Box sx={{ width: { xs: '100%', md: '70%', lg: '60%' } }}>
                        
                        <Typography
                            variant="h1"
                            component="h1"
                            sx={{
                                fontWeight: 800,
                                fontSize: { xs: '2.7rem', sm: '3rem', md: '3.5rem' },
                                lineHeight: 1.1,
                                mb: 2,
                            }}
                        >
                            <Box
                                sx={{
                                    display: 'block',
                                    opacity: randTitle === 0 ? 0 : 1,
                                    transform: randTitle === 0 ? 'translateY(10px)' : 'translateY(0)',
                                    transition: 'opacity 0.6s ease-out, transform 0.6s ease-out',
                                }}
                            >
                                <Box component="span" sx={{ color: theme.palette.primary.main, display: 'block' }}>
                                    {randTitle === 0 ? '...' : t(`title.title${randTitle}.part1`)}
                                </Box>
                                <Box component="span" sx={{ color: 'white', display: 'block' }}>
                                    {randTitle === 0 ? '...' : t(`title.title${randTitle}.part2`)}
                                </Box>
                            </Box>
                        </Typography>

                        <Typography
                            variant="h6"
                            sx={{
                                fontWeight: 400,
                                color: 'text.secondary',
                                mb: 5,
                                fontSize: { xs: '1rem', md: '1.25rem' },
                            }}
                        >
                            {t('subtitle')}
                        </Typography>

                        <Stack 
                            direction="column" 
                            spacing={2} 
                            sx={{ 
                                width: 'fit-content',
                                minWidth: { sm: '250px' } 
                            }}
                        >
                            <Button
                                variant="contained"
                                size="large"
                                fullWidth
                                sx={{
                                    py: 1.8,
                                    px: 4,
                                    fontSize: '1.1rem',
                                    fontWeight: 700,
                                    borderRadius: '12px',
                                    color: 'white',
                                    boxShadow: theme.shadows[4],
                                    transition: 'transform 0.2s',
                                    '&:hover': { transform: 'translateY(-2px)' },
                                }}
                                onClick={openLoginDialog}
                            >
                                {t('button.publishReferral')}
                            </Button>

                            <Button
                                variant="outlined"
                                size="large"
                                fullWidth
                                sx={{
                                    py: 1.8,
                                    px: 4,
                                    fontSize: '1.1rem',
                                    fontWeight: 700,
                                    borderRadius: '12px',
                                    borderWidth: '2px',
                                    '&:hover': { 
                                        borderWidth: '2px',
                                        backgroundColor: 'rgba(255,255,255,0.05)' 
                                    },
                                }}
                                onClick={scrollToMiddle}
                            >
                                {t('button.viewAll')}
                            </Button>
                        </Stack>
                    </Box>
                </Container>

                <Box
                    sx={{
                        position: 'absolute',
                        top: { xs: -50, md: -100 },
                        right: { xs: -50, md: -100 },
                        width: { xs: 150, md: 300 },
                        height: { xs: 150, md: 300 },
                        borderRadius: '50%',
                        bgcolor: theme.palette.primary.main,
                        opacity: 0.2,
                        zIndex: 1,
                        pointerEvents: 'none',
                    }}
                />
            </Box>

            <DialogComponent open={openLogin} onClose={() => setOpenLogin(false)} variant="form">
                <LoginForm signinTypeP="signup" />
            </DialogComponent>
        </>
    );
}