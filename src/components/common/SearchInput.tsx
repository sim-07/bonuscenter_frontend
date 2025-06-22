import { Box, IconButton, InputAdornment, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';


export default function SearchInput({ width = '100%' }) {
    return (
        <TextField
            sx={{
                width: width,
                minWidth: '250px',
                marginTop: '20px',
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
            placeholder="Cerca"
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