import {useRouter} from "next/router";
import {useEffect} from "react";
import {useSelector} from "react-redux";
import {RootState} from "@/store/store";
import {UserState} from "@/store/reducers/User/types";

const useIsAuth = () => {
    const router = useRouter()
    const userState: UserState = useSelector((state: RootState) => state.user);

    useEffect(() => {
        if (!userState.auth.data.isAuthenticated) {
            router.push('/sign-in').then(() => {
            });
        }
    });

    return {router, userState}
}

export default useIsAuth;