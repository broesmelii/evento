import React, { Suspense } from "react";
import H1 from "@/components/h1";
import EventsList from "@/components/events-list";
import Loading from "./loading";
import { Metadata } from "next";
import { capitalize } from "@/lib/utils";
import { z } from "zod";

type Props = {
  params: {
    city: string;
  };
};

type EventsPageProps = Props & {
  searchParams: { [key: string]: string | string[] | undefined };
};

export function generateMetadata({ params }: Props): Metadata {
  const city = params.city;

  const title = city === "all" ? "All events" : `Events in ${capitalize(city)}`;
  return {
    title: title,
  };
}

export async function generateStaticParams() {
  // already have the most popular cities ready
  return [
    {
      city: "Austin",
    },
    {
      city: "Seattle",
    },
  ];
}

const pageNumberSchema = z.coerce.number().int().positive().optional();

export default async function EventsPage({
  params,
  searchParams,
}: EventsPageProps) {
  const city = params.city;
  let parsedPage = pageNumberSchema.safeParse(searchParams.page);
  const page = parsedPage.success ? parsedPage.data : 1;

  // console.log(events);
  return (
    <main className="flex flex-col items-center py-8 md:py-24 px-[20px]">
      <H1 className="mb-10">
        {city === "all" ? "All Events" : `Events in ${capitalize(city)}`}
      </H1>
      <Suspense key={city + page} fallback={<Loading />}>
        <EventsList city={city} page={page} />
      </Suspense>
    </main>
  );
}
