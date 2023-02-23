import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@/store/store";
import {logout} from "@/store/reducers/User/userSlice";
import {useRouter} from "next/router";
import {UserState} from "@/store/reducers/User/types";


const Logout = () => {
    const router = useRouter()
    const userState: UserState = useSelector((state: RootState) => state.user);
    const dispatch = useDispatch();


    useEffect(() => {
        debugger
        if (userState.auth.data.isAuthenticated) {
            dispatch(logout());
        } else {
            router.push('/sign-in').then(() => {
            });
        }
    }, [userState.auth.data.isAuthenticated])
    return (<h2>Logout</h2>)

}

export default Logout;