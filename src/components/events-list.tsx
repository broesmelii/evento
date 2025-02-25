import { EventoEvent } from "@prisma/client";
import EventCard from "./event-card";
import { getEvents } from "@/lib/server-utils";
import PaginationControls from "./pagination-controls";

type EventListProps = {
  city: string;
  page?: number;
};

export default async function EventsList({ city, page = 1 }: EventListProps) {
  const { events, totalCount } = await getEvents(city, page);
  const eventsPerPage = 6;
  page =
    page * eventsPerPage > totalCount
      ? Math.floor(totalCount / eventsPerPage) + 1
      : page;
  const previousPath = page > 1 ? `/events/${city}?page=${page - 1}` : "";
  const nextPath =
    totalCount > page * eventsPerPage ? `/events/${city}?page=${page + 1}` : "";
  return (
    <section className="flex flex-wrap gap-10 justify-center max-w-[1100px] px-5">
      {events.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}

      <PaginationControls previousPath={previousPath} nextPath={nextPath} />
    </section>
  );
}
