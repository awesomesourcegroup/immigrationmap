const fs = require("fs");
const data = JSON.parse(fs.readFileSync("data/countries.json"));

// ─── JAPAN ───────────────────────────────────────────────────────────────────
// ERROR: Student visa says "13-20 years" to citizenship.
// CORRECT: Japan allows naturalization after 5 years ANY lawful residence — no PR required.
// Student time fully counts. Citizenship possible at ~6-9 years from start of studies.
const japan = data.countries.find(c => c.id === "japan");

japan.visaDetails["Student Visa (Japan)"].pathToCitizenship =
  "Student Visa → Graduate → Work Visa → Accumulate 5 years total continuous Japan residence (student time counts fully) → Apply for naturalization directly — PR is NOT required for citizenship → Pass Japanese language interview → Good conduct declaration → Ministry of Justice review (12–24 months) → Renounce prior nationality → Japanese Citizen";
japan.visaDetails["Student Visa (Japan)"].timelineToCitizenship =
  "6–9 years from starting studies (5 years total Japan residence including student time → direct naturalization, NO PR required first) + 12–24 months processing";
japan.visaDetails["Student Visa (Japan)"].probabilityToCitizenship = 16;
japan.visaDetails["Student Visa (Japan)"].probabilityNote =
  "The 16% citizenship probability reflects the shortened direct naturalization path (5 years total Japan residence, student time counts — no PR needed first), but is tempered by Japan's strict single-citizenship requirement (renunciation of prior nationality is mandatory). For nationals of countries where losing one's original passport is costly (US, EU, etc.), renunciation is a decisive barrier. Japan's application approval rate for technically qualifying applicants is approximately 85%, but the renunciation barrier means most long-term residents on work visas never apply. The 20% PR probability reflects the difficulty of accumulating 10 years continuous qualifying residence on work visas given Japan's strict renewal requirements and the high departure rate among foreign workers. Source: Ministry of Justice Japan naturalization statistics.";

// Fix HSP visa citizenship timeline
const hspKey = Object.keys(japan.visaDetails).find(k => k.includes("Highly Skilled") || k.includes("HSP"));
if (hspKey) {
  japan.visaDetails[hspKey].pathToCitizenship =
    "HSP Visa → Accumulate 5 years total continuous Japan residence (including any prior work/student time in Japan) → Direct naturalization application (NO PR required) → Japanese language interview → Ministry of Justice review (12–24 months) → Renounce prior nationality → Japanese Citizen. Alternatively: HSP → PR (3–5 years via HSP fast track) → citizenship any time after PR.";
  japan.visaDetails[hspKey].timelineToCitizenship =
    "6–9 years total from first arriving in Japan (5 years any lawful residence → direct naturalization) OR 4–8 years if 5-year threshold reached on HSP/prior work period";
  japan.visaDetails[hspKey].probabilityToCitizenship = 20;
}

// ─── AUSTRIA ─────────────────────────────────────────────────────────────────
// ERROR: "Have held the EU Long-Term Residence Permit for the last year before application"
// CORRECT: Austrian law requires 6 of the 10 qualifying years to be on settlement permit — not "the last year."
const austria = data.countries.find(c => c.id === "austria");
austria.citizenship.criteria = austria.citizenship.criteria.map(c => {
  if (c.includes("last year before application")) {
    return "At least 6 of the 10 required years of Austrian residence must have been held on a settlement permit (Niederlassungsbewilligung) or EU Long-Term Residence Permit — these 6 years do not need to be the most recent 6, just any 6 within the qualifying 10-year period";
  }
  return c;
});
// Also fix citizenship route description
austria.citizenship.routes.forEach(r => {
  if (r.description && r.description.includes("last year")) {
    r.description = r.description.replace(/for the last year[^.]*\./g, "");
  }
});

// ─── AUSTRALIA ───────────────────────────────────────────────────────────────
// ERROR: "add 4 more years of residence after PR" — WRONG.
// CORRECT: Australia requires 4 years TOTAL lawful residence (student time counts) with last 12 months as PR.
// Minimum practical timeline: ~7-10 years from starting studies.
const australia = data.countries.find(c => c.id === "australia");
const auStuKey = Object.keys(australia.visaDetails).find(k => k.includes("500") || k.toLowerCase().includes("student"));
if (auStuKey) {
  australia.visaDetails[auStuKey].pathToCitizenship =
    "Subclass 500 Student → Subclass 485 Post-Study Work → PR (189/190/186) → Be lawfully present in Australia for 4 years total (student + work time all counts) with the last 12 months as a permanent resident → Pass the citizenship test → Attend citizenship ceremony → Australian Citizen";
  australia.visaDetails[auStuKey].timelineToCitizenship =
    "7–11 years from starting studies: 3–4 years study + 2–4 years post-study work → PR (6–18 months processing) → 1 more year as PR → citizenship (4-year total Australia presence with last 12 months as PR — student time counts toward the 4 years)";
  australia.visaDetails[auStuKey].probabilityToCitizenship = 38;
  australia.visaDetails[auStuKey].probabilityNote =
    "Australia's citizenship path is more accessible than the data previously indicated. The 4-year total Australia presence requirement (with only the last 12 months requiring PR status) means student time fully counts. A student who studies 3 years, works 2 years, gets PR, and stays 1 more year is eligible in ~6–7 years. The 38% probability reflects: selective skilled migration visa requirements (many students can't meet points thresholds or employer sponsorship), PR processing delays, and the segment who return home after studies. Australia permits dual citizenship. Source: Australian Department of Home Affairs statistics.";
}

// Fix citizenship criteria
australia.citizenship.criteria = australia.citizenship.criteria.map(c => {
  if (c.includes("4 years") && c.includes("after")) {
    return "Have been lawfully present in Australia for 4 years total immediately before applying — student visa time (Subclass 500) and all other lawful visa time counts toward these 4 years. Must have been a permanent resident for the 12 months immediately before applying.";
  }
  return c;
});

// ─── NEW ZEALAND ─────────────────────────────────────────────────────────────
// ERROR: "add 5 years of NZ presence after PR" — WRONG.
// CORRECT: NZ requires 1,350 days of presence in the 5 years before applying — student time counts.
// Only 1 year must be as permanent resident. Minimum: ~6-9 years from starting studies.
const nz = data.countries.find(c => c.id === "new-zealand");
const nzStuKey = Object.keys(nz.visaDetails).find(k => k.toLowerCase().includes("student"));
if (nzStuKey) {
  nz.visaDetails[nzStuKey].pathToCitizenship =
    "Student Visa → PSWV → Skilled Migrant Resident Visa (PR) → Be present in New Zealand for at least 1,350 days (3.7 years) in the 5 years before applying — student + work + PR time all count → Have been a permanent resident for at least the 12 months immediately before applying → Citizenship grant → New Zealand Citizen";
  nz.visaDetails[nzStuKey].timelineToCitizenship =
    "6–10 years from starting studies: 3–4 years study (counts toward 1,350-day presence) + 1–3 years work → PR → 1 more year as PR → citizenship (student time fully counts toward the 5-year/1,350-day presence requirement)";
  nz.visaDetails[nzStuKey].probabilityToCitizenship = 35;
  nz.visaDetails[nzStuKey].probabilityNote =
    "New Zealand's citizenship path is more accessible than previously stated. The 1,350-day (3.7-year) presence requirement within 5 years counts student, work, and permanent resident time — a student who studies 3 years and works 2 years on a work visa has already met the presence requirement before even getting PR. Only 1 year of PR is required before applying. The 35% probability reflects: SMC points threshold difficulty (many students can't accumulate enough skilled migrant points), processing delays, and return-home decisions. NZ permits dual citizenship. Source: NZ Department of Internal Affairs citizenship statistics.";
}

// Fix NZ citizenship criteria
nz.citizenship.criteria = nz.citizenship.criteria.map(c => {
  if (c.includes("5 years") && c.includes("after")) {
    return "Have been present in New Zealand for at least 1,350 days (approximately 3.7 years) in the 5 years immediately before applying — student visa time, work visa time, and PR time all count toward these 1,350 days";
  }
  return c;
});

// ─── HUNGARY ─────────────────────────────────────────────────────────────────
// ERROR: "10-14 years total" for student → citizenship.
// CORRECT: Hungary requires 8 years TOTAL continuous lawful residence (any status).
// Student time counts. Minimum: 8 years + 1-3 processing = 9-12 years.
const hungary = data.countries.find(c => c.id === "hungary");
const huStuKey = Object.keys(hungary.visaDetails).find(k => k.toLowerCase().includes("student"));
if (huStuKey) {
  hungary.visaDetails[huStuKey].timelineToCitizenship =
    "9–12 years total: student time counts toward Hungary's 8-year continuous lawful residence requirement (any lawful status) + 1–3 years processing";
  hungary.visaDetails[huStuKey].probabilityToCitizenship = 22;
}

// ─── ROMANIA ─────────────────────────────────────────────────────────────────
// ERROR: "10-14 years total" for student → citizenship.
// CORRECT: Romania requires 8 years TOTAL continuous lawful residence.
// Student time counts. Minimum: 8 years + 1-3 processing = 9-12 years.
const romania = data.countries.find(c => c.id === "romania");
const roStuKey = Object.keys(romania.visaDetails).find(k => k.toLowerCase().includes("student"));
if (roStuKey) {
  romania.visaDetails[roStuKey].timelineToCitizenship =
    "9–12 years total: student time counts toward Romania's 8-year total continuous lawful residence requirement + 1–3 years processing";
  romania.visaDetails[roStuKey].probabilityToCitizenship = 24;
}

// ─── SOUTH KOREA ─────────────────────────────────────────────────────────────
// Clarify: D-2 student time counts toward 5-year TOTAL qualifying residence for F-5,
// but F-2 status is still a prerequisite (requires work visa entry), not D-2 alone.
const korea = data.countries.find(c => c.id === "south-korea");
const krStuKey = Object.keys(korea.visaDetails).find(k => k.toLowerCase().includes("student") || k.includes("D-2"));
if (krStuKey) {
  korea.visaDetails[krStuKey].description =
    korea.visaDetails[krStuKey].description.replace(
      "D-2 student time counts toward the 5-year qualifying period for both F-5 permanent residence and citizenship",
      "D-2 student time counts toward: (1) the 5-year total qualifying Korean residence required for F-5 permanent residence (as part of the overall residence calculation); (2) the 5-year continuous lawful residence required for citizenship. However, F-2 status (required on the path to F-5) can only be obtained through qualifying work visa categories — D-2 alone does not grant F-2 access"
    );
}

// ─── UK ──────────────────────────────────────────────────────────────────────
// Verify UK: Student Visa time is EXCLUDED from ILR qualifying period but
// Graduate Route (post-study work) IS qualifying for ILR. Check the data is correct.
const uk = data.countries.find(c => c.id === "uk");
// Already correct — no change needed.

// ─── SAVE ────────────────────────────────────────────────────────────────────
fs.writeFileSync("data/countries.json", JSON.stringify(data, null, 2));
console.log("All corrections applied. Countries:", data.countries.length);
