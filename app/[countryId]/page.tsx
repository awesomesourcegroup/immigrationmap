import { notFound } from "next/navigation";
import { getCountryById, getCountries } from "@/lib/data";
import CountryDetail from "./CountryDetail";

export function generateStaticParams() {
  return getCountries().map((c) => ({ countryId: c.id }));
}

export default async function CountryPage({
  params,
}: {
  params: Promise<{ countryId: string }>;
}) {
  const { countryId } = await params;
  const country = getCountryById(countryId);

  if (!country) notFound();

  return (
    <main className="min-h-screen bg-gray-50 px-6 py-12">
      <div className="max-w-3xl mx-auto">
        <CountryDetail country={country} />
      </div>
    </main>
  );
}
