import 'rsuite/dist/rsuite.min.css'
import type {AppProps} from 'next/app'
import {Provider} from "react-redux";
import store, {RootState} from "../store/store";
import {useRouter} from "next/router";


function privateRoute<T extends Record<string, unknown>>(Component: React.ComponentType<T>) {
    return function PrivateRoute(props: T) {
        const router = useRouter();
        const isAuthenticated = (store.getState() as RootState).auth.isAuthenticated;

        if (!isAuthenticated) {
            router.push("/login").then();
            return null;
        }

        return <Component {...props} />;
    };
}

export default function App({ Component, pageProps }: AppProps) {
    const router = useRouter();
    const isPrivateRoute = router.pathname.startsWith("/app");

    return (
        <Provider store={store}>
            {isPrivateRoute ? (
                privateRoute(Component)(pageProps as any)
            ) : (
                <Component {...pageProps} />
            )}
        </Provider>
    );
}