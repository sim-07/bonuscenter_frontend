import { Box, Button, Container, Grid, Typography, useTheme } from '@mui/material';
import { styled } from '@mui/material/styles';

const HeroContainer = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.grey?.[100] || '#f5f5f5',
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

    const theme = useTheme();


    return (
        <HeroContainer>
            <Container maxWidth="lg">
                <Grid container spacing={4} alignItems="center">
                    <Grid size={{ xs: 12, md: 6 }} >
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
                                Condividi Codici,
                            </Box>
                            <br />
                            Guadagna Ricompense!
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
                            Bonuscenter è la piattaforma dove ogni codice condiviso si trasforma in guadagno. Unisciti alla community e inizia a monetizzare oggi stesso!
                        </Typography>

                        <Grid container spacing={2} sx={{ mt: 4 }}>
                            <Grid>
                                <PrimaryButton variant="contained" size="large" onClick={scrollToMiddle}>
                                    Inizia a Guadagnare
                                </PrimaryButton>
                            </Grid>
                            <Grid>
                                <SecondaryButton variant="outlined" size="large">
                                    Scopri Come Funziona
                                </SecondaryButton>
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>
                        {/* img */}
                    </Grid>
                </Grid>
            </Container>
        </HeroContainer>
    );
}