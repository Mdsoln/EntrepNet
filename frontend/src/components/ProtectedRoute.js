import {useAuth} from "@/context/AuthContext";
import {useRouter} from "next/navigation";

export const ProtectedRoute=({children})=>{
    const router = useRouter()
    const {auth} = useAuth()

    if(!auth){
        router.push("/signin")
    }
    return children;
}