import Image from 'next/image';
import { Box, Typography } from '@mui/material';
import Link from 'next/link';

import router from 'next/router';

interface BonusCardProps {
    name: string,
    title: string;
    description: string;
    image: string;
    bonus_value: string;
}

export default function BonusCard({ name, title, description, image, bonus_value }: BonusCardProps) {

    return (
        <Link
            href={`/bonus/${name}`}
            passHref
            style={{
                textDecoration: 'none',
                color: 'inherit',
                display: 'block',
            }}
        >

            <Box
                sx={{
                    position: 'relative',
                    width: '100%',
                    minWidth: '220px',
                    height: '320px',
                    backgroundColor: '#ececec',
                    cursor: 'pointer',
                    padding: '20px',
                    borderRadius: '24px',
                    margin: '20px',
                    userSelect: 'none',
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
                        <Typography sx={{ color: 'white', mt: 0.4, }} variant='h5'>{bonus_value}</Typography>
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
        </Link>

    );
}