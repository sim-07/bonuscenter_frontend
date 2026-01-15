import { Box } from "@mui/material";
import { useEffect, useState } from "react";

import BonusContainer from "@/components/bonus/BonusContainer"
import router from "next/router";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import { bonusListData } from '../../../public/data/bonusListData';
import apiService from "../scripts/apiService";

import { useTranslation } from 'next-i18next';

export default function UserReferral() {

    const { t } = useTranslation('common');

    const [userReferral, setUserReferral] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getUserReferral = async () => {
            try {
                setLoading(true);

                const res = await apiService('codes', 'get_user_codes');

                const userReferralWithImg = res.data.map((ref: any) => {
                    const selectedBonus = bonusListData.find(
                        (b) => b.title.toLowerCase() === ref.brand.toLowerCase()
                    );
                    return {
                        ...ref,
                        image: selectedBonus?.image,
                    };
                });

                setUserReferral(userReferralWithImg);

            } catch (err: any) {
                console.error('Errore nel recupero dei codici:', err.message || err);
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
                <BonusContainer bonusListDataP={userReferral} titleBonusContainer={t('userreferral_title')} edit={true} />
            )}
        </Box>
    );
}
