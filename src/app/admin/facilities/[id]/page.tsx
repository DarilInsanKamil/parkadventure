// This is a server component
import { FacilityEditor } from "./facility-editor";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = (await params);
  return <FacilityEditor id={id} />;
} 