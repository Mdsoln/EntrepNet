
import { useAuthContext } from "@/context/AuthContext"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

export const  useLogout =()=>{
    const {setAuth} = useAuthContext()
    const router = useRouter()
   const signOut = async ()=>{
    try {
        localStorage.removeItem('jwtToken')
        localStorage.removeItem('user-details')
        setAuth(null)
        router.push("/signin")
        router.refresh()
    } 
    
     catch (error) {
        toast.error("couldn't sign-out try again")
    }
   
}
  return {signOut}
}
