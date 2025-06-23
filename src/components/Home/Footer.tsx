import { Box, Link, Typography, Stack } from '@mui/material';

export default function Footer() {
    return (
        <Box
            component="footer"
            sx={{
                backgroundColor: '#1a1a1a',
                color: 'rgba(255, 255, 255, 0.7)',
                py: 3,
                px: { xs: 2, sm: 4 },
                mt: 'auto',
                textAlign: 'center',
                fontSize: '0.9rem',
            }}
        >
            <Stack
                direction={{ xs: 'column', sm: 'row' }}
                justifyContent="center"
                spacing={4}
                mb={1}
            >
                <Link href="/privacy" underline="hover" color="inherit" sx={{ cursor: 'pointer' }}>
                    Privacy Policy
                </Link>
                <Link href="/contact_us" underline="hover" color="inherit" sx={{ cursor: 'pointer' }}>
                    Contattaci
                </Link>
            </Stack>

            <Typography variant="body2" color="inherit" component="p">
                &copy; {new Date().getFullYear()} BonusCenter. Tutti i diritti riservati.
            </Typography>
        </Box>
    );
}
