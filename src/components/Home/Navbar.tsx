import { Box, AppBar, Toolbar, Stack } from '@mui/material';
import Image from 'next/image';
import { ReactNode } from 'react';

interface NavbarProps {
  children: ReactNode;
}

export default function Navbar({ children }: NavbarProps) {
  return (
    <Box
      sx={{
        mt: 4,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <AppBar
        position="static"
        sx={{
          backgroundColor: 'transparent',
          boxShadow: 'none',
          color: '#000000',
          fontSize: '1.1em',
          px: { xs: 2, sm: 4 },
        }}
      >
        <Toolbar
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            px: 0,
            flexDirection: 'row',
          }}
        >
          <Stack
            direction="row"
            spacing={2.5}
            sx={{
              order: { xs: 0, md: 1 }, // su mobile prima children (ordine 0), su desktop ordine 1 (secondo)
              '& a': {
                cursor: 'pointer',
                textDecoration: 'none',
                fontSize: '1.1em',
              },
              '& a:first-of-type': {
                fontWeight: 'bold',
              },
            }}
          >
            {children}
          </Stack>

          <Box
            sx={{
              flexGrow: 0,
              userSelect: 'none',
              mr: { xs: 0, md: 4 },
              ml: { xs: 2, md: 0 },
              minWidth: { xs: '150px', sm: '150px', md: '256px' },
              maxWidth: { xs: '150px', sm: '150px', md: '256px' },
              order: { xs: 1, md: 0 },
            }}
          >
            <Image
              src={'/icon/bonuscenter.avif'}
              alt={'bonuscenter'}
              width={256}
              height={34}
              priority={true}
              style={{
                width: '100%',
                height: 'auto',
              }}
            />
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
