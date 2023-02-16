import {useRouter} from "next/router";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@/store/store";

export default function Home() {
    const user = useSelector((state: RootState) => state.user);
    const dispatch = useDispatch();

    const router = useRouter()
    useEffect(() => {
        user.information.data.name ? router.push('/dashboard').then(() => {}) :
        router.push('/sign-in').then(() => {});
    })
  return (
    <h2>
     HOME
    </h2>
  )
}
