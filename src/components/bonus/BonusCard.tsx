import Image from 'next/image';
import { Box, Chip, Divider, IconButton, Stack, Typography } from '@mui/material';
import Link from 'next/link';

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

import { BonusItem } from '@/types/bonusTypes';


interface BonusCardProps extends BonusItem {
    views: number;
    edit?: boolean;
    showDetails?: boolean;
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
    views = 0,
    bonus_value,
    active,
    edit,
    showDetails,
    editCode,
    deleteCode,
    setSelectedCodeId
}: BonusCardProps) {
    const { locale } = useRouter();
    const currentLocale = locale || 'it';
    const { t } = useTranslation('common');

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
                    {description[currentLocale] || description.en}
                </Typography>

                {showDetails && (
                    <Stack
                        direction={"row"}
                        gap={1}
                        sx={{
                            position: "absolute",
                            bottom: "17px",
                        }}
                    >
                        <Chip
                            label={active ? t("active") : t("inactive")}
                            size="small"
                            variant="outlined"
                            sx={{
                                color: active ? 'primary.main' : '#f43c3c',
                                borderColor: '#444',
                                paddingTop: "1px"
                            }}
                        />

                        <Chip
                            label={`${views} ${t("views")}`}
                            size="small"
                            variant="outlined"
                            sx={{
                                color: '#d4d4d4',
                                borderColor: '#444',
                                paddingTop: "1px"
                            }}
                        />
                    </Stack>
                )}


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