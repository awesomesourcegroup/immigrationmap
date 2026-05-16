import { getCountries } from "@/lib/data";
import HomeClient from "./HomeClient";

export default function HomePage() {
  const countries = getCountries();
  return <HomeClient countries={countries} />;
}
