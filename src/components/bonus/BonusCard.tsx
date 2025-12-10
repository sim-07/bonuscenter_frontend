import Image from 'next/image';
import { Box, Divider, IconButton, Stack, Typography } from '@mui/material';
import Link from 'next/link';

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useRouter } from 'next/router';

interface BonusCardProps {
    name: string,
    title: string;
    description: string;
    bonus_value: string;
    image: string;
    code_id?: string;
    edit?: boolean;
    editCode?: () => void;
    deleteCode?: (code_id: string) => void;
    setSelectedCodeId?: (code_id: string) => void;
}

export default function BonusCard({
    code_id,
    name,
    title,
    description,
    image,
    bonus_value,
    edit,
    editCode,
    deleteCode,
    setSelectedCodeId
}: BonusCardProps) {
    const { locale } = useRouter();
    const currentLocale = locale || 'it';

    return (
        <Link
            href={currentLocale === 'it' ? `/it/bonus/${name}` : `/en/bonus/${name}`}
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
                    height: edit ? '380px' : '330px',
                    backgroundColor: 'grey.700',
                    cursor: 'pointer',
                    padding: '20px',
                    borderRadius: '8px',
                    margin: '10px 0px',
                    userSelect: 'none',
                    overflow: 'hidden'
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
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <Typography
                            sx={{
                                color: 'white',
                                mt: 0.4,
                                maxWidth: 60,
                                overflow: 'hidden',
                            }}
                            variant='h5'>
                            {bonus_value}
                        </Typography>
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
                        color: 'grey',
                    }}
                    variant='h6'
                >
                    {title}
                </Typography>
                <Typography
                    variant='body2'
                    sx={{
                        maxHeight: 60,
                        overflow: 'hidden'
                    }}
                >
                    {description}
                </Typography>
                {(edit && editCode && deleteCode && code_id && setSelectedCodeId) && (
                    <Stack
                        direction="column"
                        spacing={1}
                        sx={{
                            position: 'absolute',
                            bottom: '20px',
                            left: '20px',
                            right: '20px',
                            alignItems: 'center',
                        }}
                    >
                        <Divider sx={{ width: '100%', marginBottom: '10px !important' }} />
                        <Stack
                            direction={'row'}
                            spacing={2}
                        >
                            <IconButton
                                onClick={(e) => {
                                    e.stopPropagation();
                                    e.preventDefault();
                                    setSelectedCodeId(code_id);
                                    editCode();
                                }}
                            >
                                <EditIcon />
                            </IconButton>

                            <IconButton
                                onClick={(e) => {
                                    e.stopPropagation();
                                    e.preventDefault();
                                    deleteCode(code_id);
                                }}
                            >
                                <DeleteIcon />
                            </IconButton>
                        </Stack>
                    </Stack>
                )}
            </Box >
        </Link>
    );
}