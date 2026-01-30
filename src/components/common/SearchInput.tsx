import { IconButton, InputAdornment, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useTranslation } from 'next-i18next';


interface SearchInputProps {
    width?: string;
    value: string;
    onChange: (value: string) => void;
}

export default function SearchInput({ width = '100%', value, onChange }: SearchInputProps) {
    const { t } = useTranslation('common');
    
    return (
        <TextField
            sx={{
                width: width,
                minWidth: '250px',
                '& .MuiOutlinedInput-root': {
                    borderRadius: '24px',
                    '& fieldset': {
                        borderColor: '#ccc',
                    },
                    '&:hover fieldset': {
                        borderColor: '#4caf50',
                    },
                    '&.Mui-focused fieldset': {
                        borderColor: '#4caf50',
                        borderWidth: '2px',
                    },
                },
                '& .MuiOutlinedInput-input': {
                    padding: '20px 25px',
                },
                '& .MuiOutlinedInput-notchedOutline': {
                    padding: 0,
                }
            }}
            variant="outlined"
            placeholder={t('search')}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            slotProps={{
                input: {
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton edge="end">
                                <SearchIcon />
                            </IconButton>
                        </InputAdornment>
                    ),
                },
            }}
        />

    );
}