import { EventoEvent } from "@/lib/types";
import EventCard from "./event-card";

type EventListProps = {
  city: string;
};

export default async function EventsList({ city }: EventListProps) {
  const response = await fetch(
    `https://bytegrad.com/course-assets/projects/evento/api/events?city=${city}`,
    {
      next: {
        revalidate: 300,
      },
    }
  );
  let events: EventoEvent[] = [];
  if (response.ok) {
    events = await response.json();
  }
  return (
    <section className="flex flex-wrap gap-10 justify-center max-w-[1100px] px-5">
      {events.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </section>
  );
}
