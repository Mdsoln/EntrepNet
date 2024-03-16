import React from 'react';
import MaxWidthWrapper from '@/components/MaxwidthWrapper';
import RegisterForm from '@/components/RegisterForm'
import ImageGrid from '@/components/ImageGrid'
export default function page() {
  return (
    <> 
    <MaxWidthWrapper>
      <div className="flex gap-x-48 ">
        <RegisterForm/>
        <ImageGrid  />
      </div>
    </MaxWidthWrapper>
    </>
  )
}
