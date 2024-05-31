"use client"
import MaxWidthWrapper from '@/components/MaxwidthWrapper';
import ImageGrid from '@/components/ImageGrid'
import FormWrapper from '../../../components/FormWrapper';
import { useAuthContext } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
export default function page() {

  const {auth} = useAuthContext()
  const router = useRouter()
  if(auth){
    router.push("/home")
  }
  return (
    <> 
    <MaxWidthWrapper>
      <div className="flex gap-x-48 ">
        <FormWrapper/>
        <ImageGrid  />
      </div>
    </MaxWidthWrapper>
    </>
  )
}
