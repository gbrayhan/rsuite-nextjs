import {useRouter} from 'next/router';
import {useSelector} from "react-redux";
import {RootState} from "@/store/store";
import {useEffect} from "react";

export default function Main() {
    const user = useSelector((state: RootState) => state.user);
    const router = useRouter();

    useEffect(() => {
            if (user.information.data.isAuthenticated) {
                router.push('/home').then(() => {
                })
            } else {
                router.push('/sign-in').then(() => {
                })
            }
        }
    )

}
