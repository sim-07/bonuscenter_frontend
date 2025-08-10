import { Box, Typography, List, ListItem, ListItemText, Divider, Link, Stack } from '@mui/material';
import Image from 'next/image'
import { useTranslation } from 'next-i18next';

import Navbar from '@/components/Home/Navbar';
import Footer from '@/components/Home/Footer';
import AllReferral from './AllReferral';
import CommentsContainer from '../Comments/CommentsContainer';
import { useRouter } from 'next/router';

interface BonusData {
    title: string;
    name: string;
    bonus_image: string;
    summary: {
        bonus: string;
        invito: string;
        deposito_richiesto: string;
        scadenza: string;
        commissioni: string;
        extra: string;
    };
    sections: {
        title: string;
        content: string[];
        image?: string;
    }[];
}

interface Props {
    bonus: BonusData;
}

export default function BonusDescription({ bonus }: Props) {
    const { t } = useTranslation('common');
    const { locale } = useRouter();

    return (
        <>
            <Navbar>
                <Link
                    href={locale === 'it' ? '/it/dashboard' : '/en/dashboard'}
                    style={{
                        color: 'black',
                        textDecoration: 'underline'
                    }}
                >
                    {t('all_bonus')}
                </Link>
            </Navbar>

            <Box sx={{
                p: 3,
                maxWidth: 1200,
                mx: 'auto',
                width: {sm: '95%', md: '80%'}
            }}>
                <Typography
                    variant="h4"
                    component="h1"
                    gutterBottom
                    fontWeight="bold"
                    textAlign="left"
                    sx={{
                        mb: 5,
                        mt: 3
                    }}
                >
                    {bonus.title}
                </Typography>

                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center'
                    }}
                >
                    <Stack
                        direction={{ md: "column", lg: "row" }}
                        justifyContent="space-between"
                        alignItems="center"
                        width="80%"
                        sx={{
                            margin: '80px 0px'
                        }}
                    >
                        <Image
                            alt="bonusimage"
                            src={`/images_bonus/${bonus.bonus_image}.avif`}
                            width={300}
                            height={300}
                            style={{
                                borderRadius: '16px',
                                marginBottom: '30px'
                            }}
                        />

                        <AllReferral bonusName={bonus.name} />
                    </Stack>

                </Box>

                <Box
                    sx={{
                        mb: 5,
                        p: 3,
                        backgroundColor: 'grey.100',
                        borderRadius: 3,
                    }}
                >
                    <Typography variant="h5" component="h2" gutterBottom fontWeight="medium" color="text.primary">
                        {t('summary')}
                    </Typography>
                    <List disablePadding>
                        <ListItem disableGutters>
                            <ListItemText primary={t('welcome_bonus')} secondary={bonus.summary.bonus} />
                        </ListItem>
                        <ListItem disableGutters>
                            <ListItemText primary={t('invite_bonus')} secondary={bonus.summary.invito} />
                        </ListItem>
                        <ListItem disableGutters>
                            <ListItemText primary={t('required_deposit')} secondary={bonus.summary.deposito_richiesto} />
                        </ListItem>
                        <ListItem disableGutters>
                            <ListItemText primary={t('expiration')} secondary={bonus.summary.scadenza} />
                        </ListItem>
                        <ListItem disableGutters>
                            <ListItemText primary={t('fees')} secondary={bonus.summary.commissioni} />
                        </ListItem>
                        <ListItem disableGutters>
                            <ListItemText primary={t('extra_bonus')} secondary={bonus.summary.extra} />
                        </ListItem>
                    </List>
                </Box>

                <Divider sx={{ mb: 5 }} />

                {bonus.sections.map((section, i) => (
                    <Box key={i} sx={{ mb: 6 }}>
                        <Typography variant="h5" component="h3" gutterBottom fontWeight="bold" color="text.primary" sx={{ mb: 5 }}>
                            {section.title}
                        </Typography>
                        {section.content.map((p, idx) => (
                            <Typography key={idx} component="p" sx={{ mb: idx === section.content.length - 1 ? 0 : 2, lineHeight: 1.6 }}>
                                {p}
                            </Typography>
                        ))}
                        {section.image && (
                            <Box
                                component="img"
                                src={section.image}
                                alt={section.title}
                                sx={{ width: '100%', maxWidth: 500, borderRadius: 2, mt: 3, boxShadow: 2 }}
                            />
                        )}
                    </Box>
                ))}

                <CommentsContainer bonusName={bonus.name} />

            </Box>

            <Footer />
        </>
    );
}
