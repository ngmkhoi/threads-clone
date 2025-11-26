import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import authService from "@/services/auth/authService";
import {selectCurrentUser, selectFetchingState} from "@/features/auth/authSelector.js";

const useFetchCurrentUser = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        const accessToken = localStorage.getItem('accessToken');
        if(accessToken) {
            dispatch(authService.getCurrentUser())
        }
    }, [dispatch])
}

const useCurrentUser = () => {
    return useSelector(selectCurrentUser)
}

const useFetchUser = () => {
    return useSelector(selectFetchingState)
}

export {useCurrentUser, useFetchCurrentUser, useFetchUser}