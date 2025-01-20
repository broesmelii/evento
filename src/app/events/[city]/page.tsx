import React, { Suspense } from "react";
import H1 from "@/components/h1";
import EventsList from "@/components/events-list";
import Loading from "./loading";

type EventsPageProps = {
  params: {
    city: string;
  };
};

export default async function EventsPage({ params }: EventsPageProps) {
  const city = params.city;

  // console.log(events);
  return (
    <main className="flex flex-col items-center py-8 md:py-24 px-[20px]">
      <H1 className="mb-10">
        {city === "all"
          ? "All Events"
          : `Events in ${city.charAt(0).toUpperCase() + city.slice(1)}`}
      </H1>
      <Suspense fallback={<Loading />}>
        <EventsList city={city} />
      </Suspense>
    </main>
  );
}
