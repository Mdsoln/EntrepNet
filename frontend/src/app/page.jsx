
import ImageGrid from "../components/ImageGrid";
import MaxWidthWrapper from "../components/MaxwidthWrapper";
import React from "react";

import Hero from "@/components/Hero";

export default function page() {
  return (
    <>
      <MaxWidthWrapper>
        <main className="flex gap-x-24">
          <Hero />
          <ImageGrid />
        </main>
      </MaxWidthWrapper>
    </>
  );
}
