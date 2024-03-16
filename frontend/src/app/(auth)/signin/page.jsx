import React from 'react'
import MaxWidthWrapper from '@/components/MaxwidthWrapper';
import SignUpForm from '@/components/SignUpForm'
import ImageGrid from '@/components/ImageGrid'
export default function page() {
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
