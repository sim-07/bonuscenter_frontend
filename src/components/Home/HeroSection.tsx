import { Box, Button, Container, Grid, Typography, useTheme } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useState } from 'react';
import LoginForm from '../common/LoginForm';
import DialogComponent from '../common/DialogComponent';
import { useTranslation } from 'next-i18next';

const HeroContainer = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.grey?.[100] || '#f5f5f5', //#1B1E1F
    borderRadius: '40px',
    padding: theme.spacing(8, 0),
    position: 'relative',
    overflow: 'hidden',
    width: '95%',
    height: '75vh',
    margin: '80px auto',
    zIndex: 2,

    [theme.breakpoints.down('sm')]: {
        margin: theme.spacing(2, 1),
        padding: theme.spacing(4, 0),
        borderRadius: '24px'
    },

    '&:before': {
        content: '""',
        position: 'absolute',
        top: -100,
        right: -100,
        width: 300,
        height: 300,
        borderRadius: '50%',
        backgroundColor: theme.palette.primary?.light || 'rgba(72, 167, 75, 0.2)',
        opacity: 0.3,
        zIndex: 1
    }
}));

const PrimaryButton = styled(Button)(({ theme }) => ({
    padding: theme.spacing(1.5, 4),
    fontSize: '1.1rem',
    fontWeight: 700,
    borderRadius: '12px',
    transition: 'all 0.3s ease',
    color: 'white',

    '&:hover': {
        transform: 'translateY(-3px)',
    }
}));

const SecondaryButton = styled(Button)(({ theme }) => ({
    padding: theme.spacing(1.5, 4),
    fontSize: '1.1rem',
    fontWeight: 700,
    borderRadius: '12px',
    borderWidth: 2,

    '&:hover': {
        borderWidth: 2,
        backgroundColor: theme.palette.grey?.[200] || '#eeeeee'
    }
}));

const ImageContainer = styled(Box)(({ theme }) => ({
    position: 'relative',
    zIndex: 1,

    [theme.breakpoints.up('md')]: {
        paddingLeft: theme.spacing(4)
    }
}));

type HeroSectionProps = {
    scrollToMiddle: () => void;
};

export default function HeroSection({ scrollToMiddle }: HeroSectionProps) {
    const { t } = useTranslation('hero');
    const theme = useTheme();

    const [openLogin, setOpenLogin] = useState(false);

    const openLoginDialog = () => {
        setOpenLogin(true);
    };

    return (
        <HeroContainer>
            <Container
                sx={{
                    margin: {
                        xs: 2,
                        md: 5,
                        xl: 12,
                    },
                }}>
                <Grid size={{ xs: 12, md: 6 }}>
                    <Typography
                        variant="h1"
                        sx={{
                            fontWeight: 800,
                            fontSize: { xs: '2.5rem', sm: '3rem', md: '3.5rem' },
                            lineHeight: 1.2,
                            mb: 2,
                            position: 'relative',
                            zIndex: 1,
                        }}
                    >
                        <Box component="span" sx={{ color: theme.palette.primary.main }}>
                            {t('title.part1')}
                        </Box>
                        <br />
                        {t('title.part2')}
                    </Typography>

                    <Typography
                        variant="h6"
                        sx={{
                            fontWeight: 400,
                            color: 'text.secondary',
                            mb: 10,
                            fontSize: { xs: '1.1rem', md: '1.25rem' },
                            position: 'relative',
                            zIndex: 1,
                        }}
                    >
                        {t('subtitle')}
                    </Typography>

                    <Grid container spacing={2} sx={{ mt: 4 }}>
                        <Grid>
                            <PrimaryButton variant="contained" size="large" onClick={openLoginDialog}>
                                {t('button.publishReferral')}
                            </PrimaryButton>
                        </Grid>
                        <Grid>
                            <SecondaryButton variant="outlined" size="large" onClick={scrollToMiddle}>
                                {t('button.viewAll')}
                            </SecondaryButton>
                        </Grid>
                    </Grid>
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                    {/* img */}
                </Grid>
            </Container>
            <DialogComponent open={openLogin} onClose={() => setOpenLogin(false)} variant="form">
                <LoginForm signinTypeP={"signup"} />
            </DialogComponent>
        </HeroContainer>
    );
}