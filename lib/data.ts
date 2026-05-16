import rawData from "@/data/countries.json";
import type { Country } from "@/lib/types";

const data = rawData as unknown as { countries: Country[] };

export function getCountries(): Country[] {
  return data.countries;
}

export function getCountryById(id: string): Country | undefined {
  return data.countries.find((c) => c.id === id);
}
