import { notFound } from "next/navigation";
import { getCountryById, getCountries } from "@/lib/data";
import { getTranslatedCountry } from "@/lib/countryTranslations";
import { type LanguageCode } from "@/lib/translations";
import CountryDetail from "./CountryDetail";

export function generateStaticParams() {
  return getCountries().map((c) => ({ countryId: c.id }));
}

export default async function CountryPage({
  params,
  searchParams,
}: {
  params: Promise<{ countryId: string }>;
  searchParams: Promise<{ lang?: string }>;
}) {
  const { countryId } = await params;
  const { lang: rawLang } = await searchParams;

  const country = getCountryById(countryId);
  if (!country) notFound();

  const lang = (rawLang ?? "en") as LanguageCode;
  const displayCountry = getTranslatedCountry(country, lang);

  return (
    <main className="min-h-screen bg-white">
      <CountryDetail country={displayCountry} preTranslated={lang !== "en"} initialLang={lang} />
    </main>
  );
}
