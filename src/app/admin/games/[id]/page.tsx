// This is a server component (no "use client" directive)
import { GameEditor } from "./game-editor";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params;
  return <GameEditor id={id} />;
} 