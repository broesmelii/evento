import React, { Suspense } from "react";
import H1 from "@/components/h1";
import EventsList from "@/components/events-list";
import Loading from "./loading";
import { Metadata } from "next";
import { capitalize } from "@/lib/utils";

type EventsPageProps = {
  params: {
    city: string;
  };
};

export function generateMetadata({ params }: EventsPageProps): Metadata {
  const city = params.city;
  const title = city === "all" ? "All events" : `Events in ${capitalize(city)}`;
  return {
    title: title,
  };
}

export default async function EventsPage({ params }: EventsPageProps) {
  const city = params.city;

  // console.log(events);
  return (
    <main className="flex flex-col items-center py-8 md:py-24 px-[20px]">
      <H1 className="mb-10">
        {city === "all" ? "All Events" : `Events in ${capitalize(city)}`}
      </H1>
      <Suspense fallback={<Loading />}>
        <EventsList city={city} />
      </Suspense>
    </main>
  );
}
