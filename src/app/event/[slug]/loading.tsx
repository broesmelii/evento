import Skeleton from "@/components/skeleton";
import React from "react";

export default function Loading() {
  return (
    <div className="flex flex-col items-center gap-y-4 pt-28">
      <Skeleton className="h-[30vh] w-[100%]" />
      <Skeleton className="mt-20 " />
      <Skeleton className="mt-5 w-24" />
      <Skeleton className="mt-5 w-24" />
      <Skeleton className="mt-5 w-24" />
    </div>
  );
}
