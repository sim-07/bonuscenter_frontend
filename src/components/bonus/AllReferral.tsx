import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import router from "next/router";
import LoadingSpinner from "../common/LoadingSpinner";

interface AllReferralProps {
    bonusName: string;
}

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export default function AllReferral({ bonusName }: AllReferralProps) {
    const [isLoading, setIsLoading] = useState(true);

    console.log(bonusName)

    useEffect(() => {
        const getAllReferral = async () => {
            try {
                const res = await fetch(`${apiUrl}/users/get_referral_codes`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    credentials: 'include',
                    body: JSON.stringify(bonusName),
                });
                if (res.ok) {
                    const data = await res.json();
                } else {
                    console.error("Errore getAllReferral")
                }
            } catch (err) {
                router.push('/');
            } finally {
                setIsLoading(false);
            }
        };

        getAllReferral();
    }, []);

    if (isLoading) {
        return <LoadingSpinner />;
    }

    return (
        <Box
            sx={{
                backgroundColor: 'grey.100',
                p: 3,
                borderRadius: 2,
                height: 300,
            }}
        >
            {bonusName}
        </Box>
    );
}
