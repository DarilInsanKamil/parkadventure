export const dynamic = "force-dynamic";

import { GalleryEditor } from "./gallery-editor";

export default async function Page({
    params,
  }: {
    params: Promise<{ id: string }>
  }) {
    const { id } = await params;
    return <GalleryEditor id={id} />;
  } 