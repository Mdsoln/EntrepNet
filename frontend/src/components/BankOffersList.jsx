import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
export default function BankOffersList() {
  return (
    <div className="flex flex-col gap-y-8 items-center justify-center">
      
    <div className="text-white text-xl">Get to know the current banking offers</div>
    <div>

      <Link href={"https://crdbbank.co.tz/en/ways-to-bank/business/3"}>
        <Image
          src={"/crdb.svg"}
          width={500}
          height={500}
          alt="bank offer"
        />
      </Link>
    </div>
    <div>
      <Link href={"https://www.nmbbank.co.tz/business-banking"}>
        <Image src={"/nmb.svg"} width={650} height={450} alt="bank offer" />
      </Link>
    </div>
  </div>
  )
}
