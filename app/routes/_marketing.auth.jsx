import { validateCredentials } from '../data/validation.server';
import AuthForm from '../../components/auth/AuthForm';
import authStyle from '../../styles/auth.css';
import { login, signup } from '../data/auth.server';

export const links = () => [{ rel: 'stylesheet', href: authStyle }];

export default function AuthPage() {
    return <AuthForm />;
}

export async function action({ request }) {
    const searchParams = new URL(request.url).searchParams;
    const authMode = searchParams.get('mode') || 'login';

    const formData = await request.formData();
    const credentials = Object.fromEntries(formData);

    try {
        validateCredentials(credentials);
    } catch (error) {
        return error;
    }

    try {
        if (authMode === 'login') {
            return await login(credentials);
        } else {
            return await signup(credentials);
        }
    } catch (error) {
        if (error.status === 422) {
            return { credentials: error.message };
        }
    }
}

export const headers = () => {
    return {
        'Cache-Control': 'max-age=3600',
    };
};
