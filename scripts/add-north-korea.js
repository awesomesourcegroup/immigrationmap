const fs = require("fs");
const data = JSON.parse(fs.readFileSync("data/countries.json"));

const northKorea = {
  id: "north-korea",
  name: "North Korea",
  flagEmoji: "🇰🇵",
  region: "Asia",
  permanentResidence: {
    officialName: "Long-term Residence — State-Approved (Exceptional)",
    criteria: [
      "Foreign nationals must receive explicit approval from the DPRK State Security Department — no open application process exists",
      "Only available to foreigners deemed strategically useful: technical experts invited by the state, approved NGO/aid workers, or diplomats on extended assignment",
      "No independent job searching, employer switching, or self-sponsorship is permitted under any circumstances",
      "Applicants must have no known affiliation with organizations deemed hostile to the DPRK government",
      "Continuous surveillance and supervision by government-assigned minders is mandatory throughout the stay",
      "Permanent residence for non-ethnic Koreans is essentially non-existent in practice — fewer than a few dozen foreigners have held any form of long-term residency in modern DPRK history"
    ],
    routes: [
      {
        name: "State-Invited Expert Residency",
        description: "The only functional path to extended stay in North Korea is receiving a direct invitation from a DPRK state institution — typically as a technical advisor, language teacher, or specialist in an area the government has identified as a strategic need. The entire process is managed by the state, not by the individual. There is no job board, no visa application you can file independently, and no way to self-nominate.",
        estimatedDuration: "Invitation process: months to years of back-channel diplomacy or institutional contact → If approved: 1-year renewable permits, indefinitely at the state's discretion",
        visaTypes: ["Long-term Residence Permit (DPRK)"]
      }
    ]
  },
  citizenship: {
    officialName: "DPRK Citizenship — Supreme Leader Special Grant",
    criteria: [
      "DPRK citizenship for foreign nationals has been granted fewer than a handful of times in the country's entire history",
      "No law or formal process governs naturalization of foreigners — it is entirely at the discretion of the Supreme Leader",
      "Ethnic Koreans from abroad (Zainichi Koreans, Korean-Chinese) may in theory repatriate under historical agreements, but this process is frozen and essentially defunct",
      "Renunciation of prior citizenship is required and cannot be reversed once complete",
      "Recipients of citizenship have historically been defectors or individuals whose public defection served as propaganda value — not voluntary immigrants"
    ],
    routes: [
      {
        name: "Supreme Leader Special Decree",
        description: "In the entire history of the DPRK, citizenship has been granted to foreign nationals on only a tiny number of occasions, each as a political act rather than a legal process. There is no application, no checklist, no waiting period, and no appeal. The probability of this occurring for a random foreigner is effectively zero.",
        estimatedDuration: "Undefined — no process exists. Historical cases took years of high-profile circumstances to materialize.",
        visaTypes: ["DPRK Citizenship (Special Decree)"]
      }
    ]
  },
  visaDetails: {
    "Tourist Visa (DPRK)": {
      fullName: "DPRK Tourist Visa — State-Approved Group Tour",
      description: "North Korea issues tourist visas exclusively through state-approved tour operators. Independent travel is illegal. All visitors must be accompanied by at minimum two government-assigned guides at all times. Tourism is heavily restricted to specific sites and routes approved by the Korean International Travel Company (KITC). Tourists from the United States have been banned from tourist visits since 2017. The visa is stamped on a separate slip of paper — not in your passport — to protect travelers in countries hostile to the DPRK.",
      probabilityToPR: -1,
      probabilityToCitizenship: -1,
      probabilityNote: "The Tourist Visa has zero pathway to permanent residence or citizenship. It is a single-entry, heavily supervised visit of 5–14 days on a fixed itinerary. There is no mechanism — legal, practical, or historical — by which a tourist visa leads to any form of long-term residency. The -1 probability reflects that this visa stage is not applicable to the PR or citizenship question.",
      pathToPR: "N/A — Tourist visas do not lead to permanent residence. The DPRK does not offer any tourist-to-resident conversion pathway.",
      timelineToPR: "N/A",
      pathToCitizenship: "N/A — Tourist visas do not lead to citizenship. The DPRK does not offer any tourist-to-citizen conversion pathway.",
      timelineToCitizenship: "N/A"
    },
    "Long-term Residence Permit (DPRK)": {
      fullName: "DPRK Long-term Residence Permit — State-Issued to Approved Foreign Experts",
      description: "Issued exclusively by the DPRK government to foreign nationals invited as technical experts, diplomats, or approved NGO workers. This is not a visa you apply for — it is granted to you after the state has decided it wants you. Permit holders live in designated foreigner compounds (most famously Pyongyang's diplomatic quarter), cannot move freely within the country, and are subject to continuous monitoring. The permit is renewable at the state's discretion and can be revoked at any time without explanation.",
      probabilityToPR: 1,
      probabilityToCitizenship: 0,
      probabilityNote: "The 1% PR probability reflects that technically a handful of foreigners have held what amounts to indefinite long-term residence in North Korea — most notably some Soviet-era specialists and a small number of aid workers. The 0% citizenship probability reflects the complete absence of any naturalization pathway: no foreigner has been naturalised through a standard process in modern DPRK history. These probabilities assume you have already cleared the enormous barrier of receiving a state invitation — without one, the probability is exactly zero.",
      pathToPR: "Receive state invitation from DPRK ministry or institution → Undergo security vetting by State Security Department → Enter DPRK on diplomatic or long-term visa → Reside in approved foreigner compound under continuous supervision → Permit renewed annually at government discretion → After years of approved residency, may be granted indefinite permit (functionally equivalent to PR) → This outcome has occurred fewer than ~50 times in DPRK history",
      timelineToPR: "No defined timeline — entirely at state discretion. Historical cases: 5–20+ years of approved residency before any indefinite permit was considered.",
      pathToCitizenship: "N/A — No documented case of a non-ethnic-Korean foreigner receiving DPRK citizenship through residency. The only citizenship grants have been by Supreme Leader decree for individuals of exceptional propaganda value.",
      timelineToCitizenship: "N/A — No pathway exists."
    },
    "DPRK Citizenship (Special Decree)": {
      fullName: "DPRK Citizenship — Supreme Leader Special Decree",
      description: "Not a visa. Not a process. A political act. DPRK citizenship for foreigners has been granted in fewer than a handful of documented cases across the country's 75-year history, each time as a deliberate propaganda or political gesture by the Supreme Leader. There is no application form, no eligibility criteria, no waiting period, and no appeal. Including this here for completeness — and to make clear how exceptional (and essentially impossible) it is.",
      probabilityToPR: -1,
      probabilityToCitizenship: 0,
      probabilityNote: "Probability of 0% reflects the complete absence of any pathway or process. The only known recipients of DPRK citizenship among non-ethnic Koreans were high-profile defectors whose public defection served significant propaganda value for the regime. The probability for an ordinary foreign national is, for all practical purposes, zero. This entry exists to honestly document what 'citizenship' means in the DPRK context.",
      pathToPR: "N/A",
      timelineToPR: "N/A",
      pathToCitizenship: "Achieve something of extraordinary propaganda value to the DPRK regime → Hope the Supreme Leader notices → Receive citizenship by personal decree → Renounce prior citizenship (irrevocable) → DPRK Citizen",
      timelineToCitizenship: "No defined timeline. Historical cases involved years of high-profile circumstances. For a typical foreigner: effectively never."
    }
  }
};

data.countries.push(northKorea);
fs.writeFileSync("data/countries.json", JSON.stringify(data, null, 2));
console.log("North Korea added. Total countries:", data.countries.length);
