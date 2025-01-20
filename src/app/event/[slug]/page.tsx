import H1 from "@/components/h1";
import Skeleton from "@/components/skeleton";
import { EventoEvent } from "@/lib/types";
import Image from "next/image";
import { notFound } from "next/navigation";
import React, { Suspense } from "react";

type EventPageProps = {
  params: {
    slug: string;
  };
};

function Section({ children }: { children: React.ReactNode }) {
  return <section className="mb-8">{children}</section>;
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return <h2 className="text-2xl mb-4">{children}</h2>;
}

function SectionContent({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-lg leading-8 text-white/75 max-w-4xl mx-auto">
      {children}
    </p>
  );
}

export default async function EventPage({ params }: EventPageProps) {
  const slug = params.slug;
  const response = await fetch(
    `https://bytegrad.com/course-assets/projects/evento/api/events/${slug}`
  );
  if (!response.ok) {
    notFound();
  }
  const event: EventoEvent = await response.json();
  console.log(event);

  const formattedDate = new Intl.DateTimeFormat("en-US", {
    weekday: "long", // Full weekday name (e.g., "Saturday")
    month: "long", // Full month name (e.g., "October")
    day: "numeric", // Day of the month (e.g., "12")
  }).format(new Date(event.date));

  return (
    <main>
      <section className="relative overflow-hidden flex justify-center items-center py-8 md:py-20">
        <Image
          className="object-cover blur-3xl z-0"
          src={event.imageUrl}
          alt="Event background image"
          fill
          quality={20}
          sizes="(max-width:1280px) 100vw, 1280px"
          priority
        />
        <div className="z-1 relative flex flex-col md:flex-row gap-6 lg:gap-x-16 justify-center max-w-[95%]">
          <Image
            className="rounded-xl border-2 border-white/50 object-cover"
            src={event.imageUrl}
            alt={event.name}
            width={300}
            height={201}
          />
          <div className="flex flex-col">
            <p className="text-white/75 text-sm">{formattedDate}</p>
            <H1 className="mb-1  whitespace-nowrap lg:text-5xl">
              {event.name}
            </H1>
            <p className="whitespace-nowrap text-xl text-white/75">
              Organized by <span className="italic">{event.organizerName}</span>
            </p>
            <button className="bg-white/20 text-lg capitalize mt-4 sm:mt-auto rounded-md border-white/10 w-full py-2 state-effects">
              Get Tickets
            </button>
          </div>
        </div>
      </section>

      <div className="text-center px-5 py-7 lg:py-16 min-h-[75vh]">
        <Section>
          <SectionHeading>About this event</SectionHeading>
          <SectionContent>{event.description}</SectionContent>
        </Section>
        <Section>
          <SectionHeading>Location</SectionHeading>
          <SectionContent>{event.location}</SectionContent>
        </Section>
      </div>
    </main>
  );
}
