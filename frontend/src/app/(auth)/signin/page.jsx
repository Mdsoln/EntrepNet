"use client"
import MaxWidthWrapper from '@/components/MaxwidthWrapper';
import SignUpForm from '@/components/SignUpForm'
import { useAuthContext } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import ImageGrid from '@/components/ImageGrid'
export default function page() {
  const {auth} = useAuthContext()
  const router = useRouter()
  if(auth){
    router.push("/home")
  }
  return (
    <> 
    <MaxWidthWrapper>
      <div className="flex gap-x-72 ">
        <SignUpForm/>
        <ImageGrid  />
      </div>
    </MaxWidthWrapper>
    </>
  )
}
