import Image from 'next/image';
import { Box, Typography } from '@mui/material';

interface BonusCardProps {
    title: string;
    description: string;
    image: string;
    bonusValue: string;
}

export default function BonusCard({ title, description, image, bonusValue }: BonusCardProps) {
    return (
        <Box
            sx={{
                position: 'relative',
                width: '100%',
                minWidth: '220px',
                height: '300px',
                backgroundColor: '#ececec',
                cursor: 'pointer',
                padding: '20px',
                borderRadius: '24px',
                margin: '20px',
                userSelect: 'none'
            }}
        >

            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    mt: 2,
                }}
            >
                <Box
                sx={{
                    width: '60px',
                    height: '60px',
                    backgroundColor: 'primary.main',
                    cursor: 'default',
                    padding: '10px',
                    borderRadius: '50px',
                    position: 'absolute',
                    marginLeft: '160px',
                    marginTop: '-20px',
                }}
            >
                <Typography sx={{ color: 'white', mt: 0.4, }} variant='h5'>{bonusValue}</Typography>
            </Box>
                <Image
                    src={image}
                    alt={title}
                    width={140}
                    height={140}
                    style={{ borderRadius: '12px' }}
                />
            </Box>
            <Typography
                sx={{
                    mt: 2.5,
                    mb: 1,
                    color: 'gray',
                }}
                variant='h6'
            >
                {title}
            </Typography>
            <Typography variant='body2'>{description}</Typography>
        </Box >

    );
}