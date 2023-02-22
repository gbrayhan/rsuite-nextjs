import useIsAuth from "@/hooks/useIsAuth";

const useHome = () => {
    const {router, userState} = useIsAuth();

    return {router, userState}
}

export default useHome;