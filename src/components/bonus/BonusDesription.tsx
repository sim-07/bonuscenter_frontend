import { Box, Typography, List, ListItem, ListItemText, Divider, Link, Stack } from '@mui/material';
import Image from 'next/image'
import { useTranslation } from 'next-i18next';

import Navbar from '@/components/Home/Navbar';
import Footer from '@/components/Home/Footer';
import AllReferral from './AllReferral';
import CommentsContainer from '../Comments/CommentsContainer';

import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import apiService from '../scripts/apiService';
import { MDXRemote } from 'next-mdx-remote';

interface BonusData {
    title: string;
    name: string;
    bonus_image: string;
    summary: {
        bonus: string;
        invito: string;
        deposito: string;
        scadenza: string;
        commissioni: string;
        extra: string;
        last_edit: string;
    };
    sections: {
        title: string;
        content: string[];
        image?: string;
    }[];
}

interface Props {
    jsonData?: BonusData;
    mdxData?: any;
}

export default function BonusDescription({ jsonData, mdxData }: Props) {
    const { t } = useTranslation('common');
    const { locale } = useRouter();

    const [auth, setAuth] = useState(false);

    const mdxComponents = {
        h2: (props: any) => <Typography variant="h5" fontWeight="bold" sx={{ mb: 3, mt: 5 }} {...props} />,
        h3: (props: any) => <Typography variant="h6" fontWeight="bold" sx={{ mb: 2, mt: 4 }} {...props} />,
        p: (props: any) => (
            <Typography
                component="div"
                variant="body1"
                sx={{ mb: 2, lineHeight: 1.6 }}
                {...props}
            />
        ),
        ul: (props: any) => <Box component="ul" sx={{ pl: 4, mb: 2 }} {...props} />,
        li: (props: any) => (
            <Box
                component="li"
                sx={{ mb: 1, typography: 'body1' }}
            >
                {props.children}
            </Box>
        ),
    };

    const dataSummary = mdxData ? {
        title: mdxData.frontmatter.title,
        name: mdxData.frontmatter.name,
        bonus_image: mdxData.frontmatter.bonus_image,
        summary: mdxData.frontmatter.summary
    } : jsonData;

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const res = await apiService('users', 'get_user_data');

                if (res.error || !res.data || !Array.isArray(res.data) || res.data.length === 0) {
                    setAuth(false)
                    return;
                }

                setAuth(true)
            } catch (err) {
                console.error("Error fetching user data")
            }
        };

        checkAuth();
    }, []);

    return (
        <>
            <Navbar>
                {/* TODO icona traduzioni */}
                <Link
                    href={auth ? (locale === 'it' ? '/it/dashboard' : '/en/dashboard') : (locale === 'it' ? '/it/' : '/en/')}
                    style={{
                        color: 'grey.300',
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
                width: { sm: '95%', md: '80%' }
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
                    {dataSummary?.title}
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
                            src={`/images_bonus/${dataSummary?.bonus_image}.avif`}
                            width={300}
                            height={300}
                            style={{
                                borderRadius: '16px',
                                marginBottom: '30px'
                            }}
                        />

                        <AllReferral bonusName={dataSummary?.name} />
                    </Stack>

                </Box>

                <Box sx={{ mb: 5, p: 3, backgroundColor: 'grey.800', borderRadius: 3 }}>
                    <Typography variant="h5" component="h2" gutterBottom fontWeight="medium" color="text.primary">
                        {t('summary')}
                    </Typography>
                    <List disablePadding>
                        <ListItem disableGutters>
                            <ListItemText primary={t('welcome_bonus')} secondary={dataSummary?.summary?.bonus} />
                        </ListItem>
                        <ListItem disableGutters>
                            <ListItemText primary={t('invite_bonus')} secondary={dataSummary?.summary?.invito} />
                        </ListItem>
                        <ListItem disableGutters>
                            <ListItemText
                                primary={t('required_deposit')}
                                secondary={mdxData ? dataSummary?.summary?.deposito : dataSummary?.summary?.deposito_richiesto}
                            />
                        </ListItem>
                        <ListItem disableGutters>
                            <ListItemText primary={t('expiration')} secondary={dataSummary?.summary?.scadenza} />
                        </ListItem>
                        <ListItem disableGutters>
                            <ListItemText primary={t('fees')} secondary={dataSummary?.summary?.commissioni} />
                        </ListItem>
                        <ListItem disableGutters>
                            <ListItemText primary={t('extra_bonus')} secondary={dataSummary?.summary?.extra} />
                        </ListItem>
                        <ListItem disableGutters>
                            <ListItemText primary={t('last_edit')} secondary={dataSummary?.summary?.last_edit} />
                        </ListItem>
                    </List>
                </Box>

                <Divider sx={{ mb: 5 }} />

                {
                    jsonData ? (
                        <Box>

                            {jsonData.sections.map((section, i) => (
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

                            <CommentsContainer bonusName={jsonData.name} />
                        </Box>
                    ) : mdxData ? (
                        <>
                            <Box sx={{ my: 9 }}>
                                <MDXRemote {...mdxData} components={mdxComponents} />
                            </Box>

                            <CommentsContainer bonusName={mdxData.name} />
                        </>

                    ) : null
                }



            </Box>

            <Footer />
        </>
    );
}
