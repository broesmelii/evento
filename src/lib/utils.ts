import clsx, { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { notFound } from "next/navigation";
import prisma from "./db";
import { unstable_cache } from "next/cache";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function sleep(ms: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

export function capitalize(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

export const getEvent = unstable_cache(async (slug: string) => {
  const event = await prisma.eventoEvent.findUnique({
    where: {
      slug: slug,
    },
  });
  if (!event) {
    notFound();
  }
  return event;
});

export const getEvents = unstable_cache(async (city: string, page = 1) => {
  const resultsPerPage = 6;
  const events = await prisma.eventoEvent.findMany({
    where: {
      city: city === "all" ? undefined : capitalize(city),
    },
    orderBy: {
      date: "asc",
    },
    take: resultsPerPage,
    skip: (page - 1) * resultsPerPage,
  });

  if (!events) {
    notFound();
  }

  // pass on total counts of events for city
  let totalCount: number;
  if (city === "all") {
    totalCount = await prisma.eventoEvent.count();
  } else {
    totalCount = await prisma.eventoEvent.count({
      where: {
        city: capitalize(city),
      },
    });
  }
  return { events, totalCount };
});
