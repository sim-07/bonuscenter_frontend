import { Box, Container, Typography, List, ListItem } from '@mui/material';
import Navbar from '@/components/Home/Navbar';
import Footer from '@/components/Home/Footer';

import { useTranslation } from 'react-i18next';

export default function AboutPage() {
    const { t } = useTranslation('about');

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                minHeight: '100vh'
            }}
        >
            <Navbar>
                <></>
            </Navbar>

            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    py: 6,
                    display: 'flex',
                    justifyContent: 'center'
                }}
            >
                <Container maxWidth="md" sx={{ width: '80%' }}>

                    <Typography
                        variant="h4"
                        component="h1"
                        align="left"
                        fontWeight="bold"
                        gutterBottom
                        sx={{ mb: 4 }}
                    >
                        {t('howItWorks.title')}
                    </Typography>

                    <Typography component="p" sx={{ mb: 3 }}>
                        {t('howItWorks.p1')}
                    </Typography>

                    <Typography component="p" sx={{ mb: 3 }}>
                        {t('howItWorks.p2')}
                    </Typography>

                    <Typography component="p" sx={{ mb: 3 }}>
                        {t('howItWorks.p3')}
                    </Typography>

                    <Typography component="p" sx={{ mb: 3 }}>
                        {t('howItWorks.p4')}
                    </Typography>

                    <Typography component="p" sx={{ mb: 6 }}>
                        {t('howItWorks.p5')}
                    </Typography>


                    <Typography
                        variant="h4"
                        component="h1"
                        align="left"
                        fontWeight="bold"
                        gutterBottom
                        sx={{ mb: 4 }}
                    >
                        {t('aboutUs.title')}
                    </Typography>

                    <Typography component="p" sx={{ mb: 3 }}>
                        {t('aboutUs.p1')}
                    </Typography>

                    <Typography component="p" sx={{ mb: 3 }}>
                        {t('aboutUs.p2')}
                    </Typography>

                    <Typography component="p" sx={{ mb: 3 }}>
                        {t('aboutUs.p3')}
                    </Typography>

                    <Typography component="p" sx={{ mb: 3 }}>
                        {t('aboutUs.p4')}
                    </Typography>

                    <Typography component="p" sx={{ mb: 3 }}>
                        {t('aboutUs.p5')}
                    </Typography>

                    <Typography component="p" sx={{ mb: 3 }}>
                        {t('aboutUs.p6')}
                    </Typography>

                    <List sx={{ pl: 4, mb: 4 }}>
                        <ListItem sx={{ display: 'list-item', p: 0, mb: 1 }}>
                            {t('lists.type1.title')} <strong>{t('lists.type1.bold')}</strong>
                        </ListItem>
                        <ListItem sx={{ display: 'list-item', p: 0 }}>
                            {t('lists.type2.title')} <strong>{t('lists.type2.bold')}</strong>
                        </ListItem>
                    </List>

                    <Typography component="p" sx={{ mb: 3 }}>
                        {t('final.p1')}
                    </Typography>

                    <Typography component="p" sx={{ mb: 3 }}>
                        {t('final.p2')}
                    </Typography>

                </Container>
            </Box>

            <Footer />
        </Box>
    );
}
