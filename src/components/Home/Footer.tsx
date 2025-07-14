import NextLink from 'next/link';
import { Box, Link, Typography, Stack } from '@mui/material';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

export default function Footer() {
    const { locale } = useRouter();
    const { t } = useTranslation('common');

    return (
        <Box
            component="footer"
            sx={{
                backgroundColor: '#1a1a1a',
                color: 'rgba(255, 255, 255, 0.7)',
                py: 3,
                px: { xs: 2, sm: 4 },
                mt: '50px',
                textAlign: 'center',
                fontSize: '0.9rem',
                width: '100%',
                flexShrink: 0,
            }}
        >
            <Stack
                direction={{ xs: 'column', sm: 'row' }}
                justifyContent="center"
                spacing={4}
                mb={1}
            >
                <Link
                    component={NextLink}
                    href={locale === 'it' ? '/it/privacy' : '/en/privacy'}
                    locale={locale}
                    underline="none"
                    color="#b7b7b7"
                    sx={{ cursor: 'pointer' }}
                >
                    {t('privacy')}
                </Link>

                <Link
                    component={NextLink}
                    href={locale === 'it' ? '/it/contact_us' : '/en/contact_us'}
                    locale={locale}
                    underline="none"
                    color="#b7b7b7"
                    sx={{ cursor: 'pointer' }}
                >
                    {t('contact')}
                </Link>

                <Link
                    component={NextLink}
                    href={locale === 'it' ? '/it/about' : '/en/about'}
                    locale={locale}
                    underline="none"
                    color="#b7b7b7"
                    sx={{ cursor: 'pointer' }}
                >
                    {t('about')}
                </Link>
            </Stack>

            <Typography variant="body2" color="inherit" component="p" sx={{ mt: 2 }}>
                &copy; {new Date().getFullYear()} BonusCenter. {t('all_rights_reserved')}
            </Typography>
        </Box>
    );
}
