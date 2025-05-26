// This is a server component (no "use client" directive)

import { TestimonialEditor } from "./testimonial-editor";


export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params;
  return <TestimonialEditor id={id} />;
} 