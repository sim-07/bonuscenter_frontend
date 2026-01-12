import Home from './home';

import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export default function IndexPage() {
    return <Home />;
}

export async function getStaticProps({ locale }: { locale: string }) {
    return {
        props: {
            ...(await serverSideTranslations(locale,
                [
                    'common',
                    'about',
                    'hero',
                    'login',
                    'home'
                ]
            )),
        },
    };
}