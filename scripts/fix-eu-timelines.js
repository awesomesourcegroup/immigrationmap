const fs = require("fs");
const data = JSON.parse(fs.readFileSync("data/countries.json"));

// ── Croatia ─────────────────────────────────────────────────────────────────
// Standard path: 5 years to EU LTR + 5 years holding EU LTR = 10 years total
const croatia = data.countries.find(c => c.id === "croatia");
croatia.visaDetails["Work Permit (Croatia)"].timelineToCitizenship =
  "10–13 years total (5 years to EU LTR + 5 years holding EU LTR + 1–3 years processing)";
croatia.visaDetails["Permanent Residence (Croatia)"].timelineToCitizenship =
  "5 years holding EU LTR — total ~10 years from first arrival (5 years to qualify for EU LTR + 5 years on EU LTR)";
croatia.visaDetails["Permanent Residence (Croatia)"].pathToCitizenship =
  "EU Long-Term Resident Permit → Hold for 5 years (total ~10 years from first arrival on a work/student permit) → B1 Croatian language test → Civic knowledge → Citizenship application to Ministry of Interior → Croatian Citizen";
croatia.citizenship.routes[0].description =
  "Non-EU nationals must have 8 years of total legal residence in Croatia with the last 5 years on permanent residence. For standard work-based immigrants who obtain EU Long-Term Resident status after 5 years of qualifying residence, this means a total of ~10 years before citizenship is possible (5 years to qualify for EU LTR + 5 years holding EU LTR). B1 Croatian language required. Croatia permits dual citizenship.";
croatia.citizenship.routes[0].estimatedDuration =
  "~10 years for standard work-based immigration (5 years to EU LTR + 5 years holding it) + 1–3 years processing";

// ── Estonia ──────────────────────────────────────────────────────────────────
// 8 years must be SPECIFICALLY on permanent permit → total ~13 years from first arrival
const estonia = data.countries.find(c => c.id === "estonia");
estonia.visaDetails["Student Visa (Estonia)"].timelineToCitizenship =
  "13–16 years total (5 years to get permanent permit + 8 years holding permanent permit + 1–2 years processing)";
estonia.visaDetails["Student Visa (Estonia)"].probabilityToCitizenship = 6;
estonia.visaDetails["Student Visa (Estonia)"].probabilityNote =
  "Estonia has exceptionally low citizenship uptake due to three compounding barriers: (1) B1 Estonian language test — Estonian is a Finno-Ugric language considered among the world's most difficult for non-native speakers; (2) mandatory renunciation of prior nationality for naturalized citizens; (3) the permanent permit must be held for 8 years, meaning the earliest citizenship application is ~13 years after first arrival. The 6% probability reflects this reality. Source: Estonian Police and Border Guard Board (PPA) statistics.";

estonia.visaDetails["Work Permit (Estonia)"].pathToCitizenship =
  "Work Permit → Permanent Residence Permit (after 5 years qualifying) → Hold permanent permit for 8 years (total ~13 years from first arrival) → B1 Estonian language test (oral + written) → Estonian civics test → Renounce prior nationality → Estonian Citizen";
estonia.visaDetails["Work Permit (Estonia)"].timelineToCitizenship =
  "13–15 years total (5 years to permanent permit + 8 years on permanent permit + 1–2 years processing)";

estonia.visaDetails["EU Blue Card (Estonia)"].pathToCitizenship =
  "Blue Card → Permanent Residence Permit (after 5 years qualifying) → Hold permanent permit for 8 years (total ~13 years from first arrival) → B1 Estonian → Civics test → Renounce prior nationality → Estonian Citizen";
estonia.visaDetails["EU Blue Card (Estonia)"].timelineToCitizenship =
  "13–15 years total (5 years to permanent permit + 8 years on permanent permit + processing)";

estonia.visaDetails["Permanent Residence (Estonia)"].timelineToCitizenship =
  "8 years holding the permanent residence permit (total ~13 years from first arrival on a work permit) + 1–2 years processing";
estonia.citizenship.routes[0].description =
  "Non-EU nationals must hold a permanent residence permit for at least 8 years before applying for citizenship. Since the permanent residence permit requires 5 years of prior qualifying residence, the minimum total path from first arrival is ~13 years. The B1 Estonian language test and mandatory renunciation of prior nationality make Estonian citizenship one of the least pursued in the EU despite the country's strong economy.";
estonia.citizenship.routes[0].estimatedDuration =
  "~13 years from first arrival (5 years to permanent permit + 8 years holding it) + 1–2 years processing";

// ── Poland ───────────────────────────────────────────────────────────────────
// EU LTR requires 5 years qualifying → then 3 years holding EU LTR → total ~8 years
const poland = data.countries.find(c => c.id === "poland");
poland.visaDetails["EU Long-Term Resident Permit (Poland)"].timelineToCitizenship =
  "3 years holding EU LTR + 1–3 years processing (total ~8 years from first arrival: 5 years to qualify for EU LTR + 3 years holding it)";
poland.visaDetails["EU Long-Term Resident Permit (Poland)"].pathToCitizenship =
  "EU LTR → Hold for 3 years (earliest citizenship application is ~8 years after first arrival: 5 years to qualify for EU LTR + 3 years holding it) → B1 Polish language certificate → Naturalization application to Voivod → Presidential grant → Polish Citizen";

// ── Sweden ───────────────────────────────────────────────────────────────────
// 5 years total qualifying (including at least 2 years on PUT) — not additive
const sweden = data.countries.find(c => c.id === "sweden");
sweden.visaDetails["Permanent Residence Permit (Sweden)"].timelineToCitizenship =
  "5 years total qualifying Swedish residence (at least 2 of which must be on permanent residence PUT) + 6–12 months processing";

fs.writeFileSync("data/countries.json", JSON.stringify(data, null, 2));
console.log("Fixed Croatia, Estonia, Poland, Sweden citizenship timelines.");
