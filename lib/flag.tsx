const COUNTRY_ISO: Record<string, string> = {
  "usa":            "us",
  "canada":         "ca",
  "australia":      "au",
  "uk":             "gb",
  "germany":        "de",
  "france":         "fr",
  "netherlands":    "nl",
  "sweden":         "se",
  "portugal":       "pt",
  "spain":          "es",
  "ireland":        "ie",
  "singapore":      "sg",
  "japan":          "jp",
  "south-korea":    "kr",
  "new-zealand":    "nz",
  "italy":          "it",
  "switzerland":    "ch",
  "denmark":        "dk",
  "austria":        "at",
  "belgium":        "be",
  "finland":        "fi",
  "greece":         "gr",
  "poland":         "pl",
  "czech-republic": "cz",
  "hungary":        "hu",
  "romania":        "ro",
  "bulgaria":       "bg",
  "croatia":        "hr",
  "estonia":        "ee",
  "latvia":         "lv",
  "lithuania":      "lt",
  "luxembourg":     "lu",
  "malta":          "mt",
  "slovakia":       "sk",
  "slovenia":       "si",
  "cyprus":         "cy",
  "north-korea":    "kp",
  "thailand":       "th",
};

const SIZES = {
  sm:  { width: 28,  height: 21  },
  md:  { width: 44,  height: 33  },
  lg:  { width: 80,  height: 60  },
  xl:  { width: 120, height: 90  },
};

export function getIso(countryId: string): string | null {
  return COUNTRY_ISO[countryId] ?? null;
}

export function Flag({
  id,
  size = "md",
  className = "",
}: {
  id: string;
  size?: keyof typeof SIZES;
  className?: string;
}) {
  const iso = getIso(id);
  if (!iso) return null;
  const { width, height } = SIZES[size];
  return (
    <span
      className={`fi fi-${iso} rounded-sm ${className}`}
      style={{ width, height, display: "inline-block" }}
    />
  );
}
