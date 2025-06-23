import { Box } from "@mui/material";
import { useState } from "react";

export default function Dashboard() {
    const [open, setOpen] = useState(false)

    const toggleDrawer = (newOpen: boolean) => () => {
        setOpen(newOpen);
    };

    
    return (
        <Box>
            
        </Box>
    );
}
