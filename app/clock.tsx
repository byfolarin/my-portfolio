"use client";

import { useEffect, useState } from "react";

const TIME_ZONE = "Africa/Lagos";
const PLACE = "Lagos, Nigeria";

function formatTime(date: Date) {
  return new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
    timeZone: TIME_ZONE,
  })
    .format(date)
    .toLowerCase()
    .replace(" ", "");
}

export default function Clock() {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const tick = () => setTime(formatTime(new Date()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <p style={{ opacity: time ? 1 : 0, transition: "opacity 0.3s ease" }}>
      {time ?? "0:00am"} in {PLACE}
    </p>
  );
}
