import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@/store/store";
import {logout} from "@/store/reducers/User/userSlice";
import {useRouter} from "next/router";
import {UserState} from "@/store/reducers/User/types";


const Logout = () => {
    const router = useRouter();
    const userState: UserState = useSelector((state: RootState) => state.user);
    const dispatch = useDispatch();

    useEffect(() => {
        if (userState.auth.data.isAuthenticated) {
            dispatch(logout());
        } else {
            router.push('/sign-in').then(() => {
            });
        }
    })
    return (<h3 style={{margin: "1rem"}}>Logout...</h3>)
}

export default Logout;