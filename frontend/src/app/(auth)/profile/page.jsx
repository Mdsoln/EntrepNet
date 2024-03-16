import React from 'react';
import MaxWidthWrapper from '@/components/MaxwidthWrapper';
import ProfileForm from '@/components/ProfileForm'
import ImageGrid from '@/components/ImageGrid'
export default function page() {

  return (
    <> 
    <MaxWidthWrapper>
      <div className="flex gap-x-48">

        <ProfileForm/>
        <ImageGrid  />
      </div>
    </MaxWidthWrapper>
    </>
  )
}
