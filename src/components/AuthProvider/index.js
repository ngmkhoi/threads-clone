import {useFetchCurrentUser} from "@/features/auth/hooks.js";

function AuthProvider({children}) {
    useFetchCurrentUser()
    return children
}

export default AuthProvider