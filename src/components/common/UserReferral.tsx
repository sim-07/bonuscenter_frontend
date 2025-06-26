import { Box } from "@mui/material";
import { useEffect, useState } from "react";

import BonusContainer from "@/components/bonus/BonusContainer"
import router from "next/router";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import { bonusListData } from '@/components/data/bonusListData';

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export default function MyReferral() {

    const [userReferral, setUserReferral] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getUserReferral = async () => {
            try {
                setLoading(true);
                const response = await fetch(`${apiUrl}/codes/get_user_codes`, {
                    method: 'POST',
                    credentials: 'include',
                });

                const resData = await response.json();

                if (response.ok) {
                    console.log("DATA: ", resData);

                    const userReferralImg = resData.data.map((ref: any) => {
                        const selectedBonus = bonusListData.find(
                            (b) => b.title.toLowerCase() === ref.brand.toLowerCase()
                        );

                        return {
                            ...ref,
                            image: selectedBonus?.image,
                        };
                    });

                    setUserReferral(userReferralImg);

                } else {
                    console.log(resData.error);
                }
            } catch (error) {
                console.error('Errore di rete:', error);
                router.push('/dashboard');
            } finally {
                setLoading(false);
            }
        };

        getUserReferral();
    }, []);


    return (
        <Box>
            {loading ? (
                <Box
                    sx={{
                        width: '100%',
                        height: '100vh',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        alignContent: 'center'
                    }}
                >
                    <LoadingSpinner />

                </Box>
            ) : (
                    <BonusContainer bonusListDataP={userReferral} titleBonusContainer={'I miei codici'} />                
            )}
        </Box>
    );
}
