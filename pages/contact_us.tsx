import { Box, Button, InputAdornment, Link, Stack, TextField, Typography } from "@mui/material";
import apiService from '@/components/scripts/apiService';
import { useState } from "react";
import Navbar from "@/components/Home/Navbar";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export async function getStaticProps({ locale }: any) {
    return {
        props: {
            ...(await serverSideTranslations(locale, ['dashboard', 'common'])),
        },
    };
}


export default function ContactUs() {
    const { t } = useTranslation('common');

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
                    <Link sx={{ color: "grey.200" }} href="/">{t("return_to_home")}</Link>
                </>
            </Navbar>
            <Box sx={{ display: "flex", width: "100vw", height: "90vh", justifyContent: "center", alignItems: "center" }}>
                <Box component="form" onSubmit={submitHandler} sx={{ width: "70%", maxWidth: "600px", height: "600px", backgroundColor: "grey.800", padding: 6, borderRadius: "16px" }}>
                    <Stack direction={'column'} gap={2}>
                        <Typography sx={{ color: 'grey.300', fontSize: '2em', mb: 3 }}>
                            {t("contact_us")}
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

                    <Typography sx={{ color: 'grey.500', mt: 3 }}>
                        {t("or_write_at")}: <Link href="mailto:info@bonuscenter.it" sx={{ color: 'primary.main', textDecoration: 'none' }}>info@bonuscenter.it</Link>
                    </Typography>

                </Box>
            </Box>
        </>
    );
}