import { router } from "@/trpc/trpc"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

export const  useAuth =()=>{
    const router = useRouter()
   const signOut = async ()=>{
    try {
        const res = await fetch(`localhost:8080/api/users/logout`,
        {
            method:"POST",
            credentials:"include",
            headers:{
                "content-Type":"application/json",
            },
        }
        ) 
        if(!res.ok) throw new Error()
        toast.success("signed out successfully")
        router.push("/sign-in")
        router.refresh()
    } 
    
     catch (error) {
        toast.error("couldn't sign-out try again")
    }
   
}
  return {signOut}
}
