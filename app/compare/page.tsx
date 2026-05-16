import { getCountryById } from "@/lib/data";
import CompareClient from "./CompareClient";

export default async function ComparePage({
  searchParams,
}: {
  searchParams: Promise<{ ids?: string }>;
}) {
  const { ids } = await searchParams;
  const idList = (ids ?? "").split(",").filter(Boolean).slice(0, 3);
  const countries = idList.map((id) => getCountryById(id)).filter(Boolean) as Awaited<ReturnType<typeof getCountryById>>[];

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-10">
      <div className="max-w-5xl mx-auto">
        <CompareClient countries={countries as NonNullable<typeof countries[0]>[]} />
      </div>
    </main>
  );
}
