
import { useRouter } from "next/navigation"
import { toast } from "sonner"

export const  useAuth =()=>{
    const router = useRouter()
   const signOut = async ()=>{
    try {
        localStorage.removeItem('jwtToken')
        router.push("/sign-in")
        router.refresh()
    } 
    
     catch (error) {
        toast.error("couldn't sign-out try again")
    }
   
}
  return {signOut}
}
