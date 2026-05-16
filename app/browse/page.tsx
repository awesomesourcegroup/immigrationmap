import { getCountries } from "@/lib/data";
import HomeClient from "../HomeClient";

export default function BrowsePage() {
  const countries = getCountries();
  return <HomeClient countries={countries} />;
}
