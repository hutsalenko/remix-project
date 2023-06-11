import { Outlet } from '@remix-run/react';
import marketingStyle from '../../styles/marketing.css';
import MainHeader from '../../components/navigation/MainHeader';
import { getUserFromSession } from '../data/auth.server';

export const links = () => [{ rel: 'stylesheet', href: marketingStyle }];

export default function MarketLayout() {
    return (
        <>
            <MainHeader />
            <Outlet />;
        </>
    );
}

export function loader({ request }) {
    return getUserFromSession(request);
}

export const headers = () => {
    return {
        'Cache-Control': 'max-age=3600',
    };
};
