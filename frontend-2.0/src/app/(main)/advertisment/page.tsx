"use client";

import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const Advertisment = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const paramValue = searchParams.get("active");
  const [active, setActive] = useState(Number(paramValue) || 0);

  useEffect(() => {
    setActive(Number(paramValue) || 0);
  }, [paramValue]);

  const handleLinkClick = (activeValue: number) => {
    console.log(activeValue)
    router.push(`/advertisment?active=${activeValue}`, { scroll: false });
    // setActive(activeValue)
  };

  return (
    <div className="container px-4 md:px-6 mt-10">
      <div className="flex gap-6">
        <Button onClick={() => handleLinkClick(0)}>For Sales</Button>
        <Button variant='outline' onClick={() => handleLinkClick(1)}>Others</Button>
      </div>

      <div>
        {active === 0 ? (
          <div>Sales</div>
        ) : active === 1 ? (
          <div>Others</div>
        ) : null}
      </div>
    </div>
  );
};

export default Advertisment;
