// This is a server component (no "use client" directive)

import { PackageEditor } from "./package-editor";

export default async function Page({
    params,
  }: {
    params: Promise<{ id: string }>
  }) {
    const { id } = await params;
    return <PackageEditor id={id} />;
  } 