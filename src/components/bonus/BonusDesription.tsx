import { Box, Typography, List, ListItem, ListItemText, Divider, Link, Stack } from '@mui/material';
import Image from 'next/image'

import Navbar from '@/components/Home/Navbar';
import Footer from '@/components/Home/Footer';
import AllReferral from './AllReferral';

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
    return (
        <>
            <Navbar>
                <Link
                    href="/dashboard"
                    style={{
                        color: 'black',
                        textDecoration: 'underline'
                    }}
                >
                    Tutti i bonus
                </Link>
            </Navbar>

            <Box sx={{ p: 3, maxWidth: 1200, mx: 'auto' }}>
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
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                        width="100%"
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
                        Riepilogo
                    </Typography>
                    <List disablePadding>
                        <ListItem disableGutters>
                            <ListItemText primary="Bonus benvenuto" secondary={bonus.summary.bonus} />
                        </ListItem>
                        <ListItem disableGutters>
                            <ListItemText primary="Bonus invito" secondary={bonus.summary.invito} />
                        </ListItem>
                        <ListItem disableGutters>
                            <ListItemText primary="Deposito richiesto" secondary={bonus.summary.deposito_richiesto} />
                        </ListItem>
                        <ListItem disableGutters>
                            <ListItemText primary="Scadenza" secondary={bonus.summary.scadenza} />
                        </ListItem>
                        <ListItem disableGutters>
                            <ListItemText primary="Commissioni" secondary={bonus.summary.commissioni} />
                        </ListItem>
                        <ListItem disableGutters>
                            <ListItemText primary="Bonus extra" secondary={bonus.summary.extra} />
                        </ListItem>
                    </List>
                </Box>

                <Divider sx={{ mb: 5 }} />

                {bonus.sections.map((section, i) => (
                    <Box key={i} sx={{ mb: 6 }}>
                        <Typography variant="h5" component="h3" gutterBottom fontWeight="medium" color="text.primary">
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
            </Box>

            <Footer />
        </>

    );
}
