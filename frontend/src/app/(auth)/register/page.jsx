import React from 'react';
import MaxWidthWrapper from '@/components/MaxwidthWrapper';
import RegisterForm from '@/components/RegisterForm'
import ImageGrid from '@/components/ImageGrid'
import FormWrapper from '../../../components/FormWrapper';
export default function page() {
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
