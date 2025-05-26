// This is a server component (no "use client" directive)

import { GalleryEditor } from "./gallery-editor";

export default async function Page({
    params,
  }: {
    params: Promise<{ id: string }>
  }) {
    const { id } = await params;
    return <GalleryEditor id={id} />;
  } 