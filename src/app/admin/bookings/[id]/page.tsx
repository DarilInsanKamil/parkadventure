// This is a server component (no "use client" directive)
import { BookingEditor } from "./booking-editor";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params;
  return <BookingEditor id={id} />;
} 