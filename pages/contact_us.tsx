import { Box, Button, InputAdornment, Link, Stack, TextField, Typography } from "@mui/material";
import apiService from '@/components/scripts/apiService';
import { useState } from "react";
import Navbar from "@/components/Home/Navbar";


export default function ContactUs() {

    const [formData, setFormData] = useState<{
        email: string;
        object: string;
        body: string;
    }>({
        email: '',
        object: '',
        body: '',
    });

    const formFields = [
        {
            name: 'email',
            label: "Email",
            type: 'input',
            required: true,
        },
        {
            name: 'object',
            label: "Object",
            type: 'input',
            required: true,
        },
        {
            name: 'body',
            label: "Text",
            type: 'textArea',
            required: false,
        },
    ];

    const handleChange = (name: string, value: string) => {
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const submitHandler = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const res = await apiService('contact', 'submit_form', formData);
            if (res) {
                alert("Form sent");
                //router.push('/');
            }

        } catch (err) {
            alert("Error sending form");
        }
    }

    return (
        <>
            <Navbar>
                <>
                    <Link sx={{ color: "grey.200" }} href="/">Return to home page</Link>
                </>
            </Navbar>
            <Box sx={{ display: "flex", width: "100vw", height: "80vh", justifyContent: "center", alignItems: "center" }}>
                <Box component="form" onSubmit={submitHandler} sx={{ width: "70%", maxWidth: "500px", backgroundColor: "grey.800", padding: 6 }}>
                    <Stack direction={'column'} gap={2}>
                        <Typography sx={{ color: 'grey.300', fontSize: '2em', mb: 3 }}>
                            Contact us
                        </Typography>

                        {formFields.map((field) => {
                            switch (field.type) {
                                case 'input':
                                    return (
                                        <TextField
                                            key={field.name}
                                            label={field.label}
                                            type={field.type}
                                            variant="outlined"
                                            value={formData[field.name as keyof typeof formData]}
                                            onChange={(e) => handleChange(field.name, e.target.value)}
                                            required={field.required}
                                            sx={{ mb: 0.5 }}
                                        />
                                    )
                                case 'textArea':
                                    return (
                                        <TextField
                                            key={field.name}
                                            label={field.label}
                                            variant="outlined"
                                            value={formData[field.name as keyof typeof formData]}
                                            onChange={(e) => handleChange(field.name, e.target.value)}
                                            required={field.required}
                                            sx={{ mb: 0.5 }}
                                            multiline
                                            rows={4}
                                        />
                                    )

                                default:
                                    return null;
                            }
                        })}

                        <Button
                            type="submit"
                            variant="contained"
                            sx={{
                                backgroundColor: 'primary.main',
                                color: 'white',
                                mt: 2,
                                position: 'relative',
                                p: 1,
                            }}
                        >
                            Send
                        </Button>
                    </Stack>

                </Box>
            </Box>
        </>
    );
}