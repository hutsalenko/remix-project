import {
    Link,
    Links,
    LiveReload,
    Meta,
    Outlet,
    Scripts,
    ScrollRestoration,
    isRouteErrorResponse,
    useRouteError,
} from '@remix-run/react';
import sharedStyle from '../styles/shared.css';
import Error from '../components/util/Error';

export const links = () => [{ rel: 'stylesheet', href: sharedStyle }];

export const meta = () => {
    return [{ title: 'RemixExpenses' }];
};

function Document({ title, children }) {
    return (
        <html lang="en">
            <head>
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width,initial-scale=1" />
                <Meta />
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
                <link
                    href="https://fonts.googleapis.com/css2?family=Rubik:wght@400;700&display=swap"
                    rel="stylesheet"
                />
                {title && <title>{title}</title>}
                <Links />
            </head>
            <body>
                {children}
                <ScrollRestoration />
                <Scripts />
                <LiveReload />
            </body>
        </html>
    );
}

export default function App() {
    return (
        <Document>
            <Outlet />
        </Document>
    );
}

export function ErrorBoundary() {
    const error = useRouteError();

    if (isRouteErrorResponse(error)) {
        return (
            <Document title={error.statusText}>
                <main>
                    <Error title={error.statusText}>
                        <p>{error.data?.message || 'Something went wrong. Please try again later.'}</p>
                        <p>
                            Back to <Link to="/">safety</Link>
                        </p>
                    </Error>
                </main>
            </Document>
        );
    } else {
        return (
            <Document title={error.statusText}>
                <main>
                    <Error title={error.statusText}>
                        <p>{error.message}</p>
                        <p>
                            Back to <Link to="/">safety</Link>
                        </p>
                    </Error>
                </main>
            </Document>
        );
    }
}
