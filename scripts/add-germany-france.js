const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "../data/countries.json");
const data = JSON.parse(fs.readFileSync(filePath, "utf8"));

const newCountries = [
  {
    id: "germany",
    name: "Germany",
    flagEmoji: "🇩🇪",
    region: "Europe",
    permanentResidence: {
      officialName: "Niederlassungserlaubnis (Settlement Permit)",
      criteria: [
        "Have held a qualifying residence permit (work, Blue Card, family, etc.) for the required period (typically 5 years; 21 months for EU Blue Card holders with B1 German, 27 months without)",
        "Have adequate knowledge of German (generally B1 CEFR level)",
        "Have sufficient income to support yourself and dependants without relying on social benefits",
        "Have made sufficient contributions to the German statutory pension scheme",
        "Have accommodation adequate for yourself and any dependants",
        "No serious criminal record or outstanding threats to public order",
        "Pass the basic civic knowledge test (Leben in Deutschland) if required"
      ],
      routes: [
        {
          name: "Student Visa → Opportunity Card / Job Seeker Route Pipeline",
          visaTypes: ["German Student Visa", "Opportunity Card (Chancenkarte)"],
          description: "International students graduate from a German university and use the 18-month job seeker visa to find qualifying work. Since 2024, Germany's Opportunity Card (Chancenkarte) allows skilled workers from non-EU countries to come to Germany to look for work without a prior job offer, based on a points system. After securing employment, the worker transitions to a Skilled Worker Visa or EU Blue Card, eventually reaching the Settlement Permit (Niederlassungserlaubnis).",
          estimatedDuration: "8–12 years: 3–4 years study + 18-month job seeker period + 5 years on work visa to Settlement Permit"
        },
        {
          name: "EU Blue Card → Settlement Permit (Niederlassungserlaubnis)",
          visaTypes: ["EU Blue Card (Germany)"],
          description: "The EU Blue Card is Germany's flagship route for highly qualified non-EU workers earning above the salary threshold (€45,300/year general; €35,100/year for shortage occupations as of 2024). Since the 2023 reform, Blue Card holders can apply for the Settlement Permit after just 27 months (or 21 months with B1 German). This is one of the fastest PR paths in Germany and grants rights to move to other EU member states.",
          estimatedDuration: "21–27 months on EU Blue Card to Settlement Permit; add 6–12 months job search and application"
        },
        {
          name: "Skilled Worker Visa → Settlement Permit",
          visaTypes: ["Skilled Worker Visa (Germany)"],
          description: "Germany's Fachkräfteeinwanderungsgesetz (Skilled Immigration Act), significantly expanded in 2023, allows non-EU workers with recognized qualifications (vocational or academic) to work in Germany without requiring a German employer to prove no EU worker is available. After 4 years on a work residence permit, workers can apply for the Settlement Permit, requiring sufficient German language and financial independence.",
          estimatedDuration: "4–5 years on Skilled Worker Visa to Settlement Permit"
        },
        {
          name: "Family – Spouse / Family Reunification → Settlement Permit",
          visaTypes: ["Family Reunification Visa (Germany)"],
          description: "Spouses and minor children of German citizens or holders of the Settlement Permit can join them in Germany. Spouses of German citizens receive an initial 3-year residence permit and can apply for Settlement Permit after 3 years of living with their German-citizen spouse. Spouses of Settlement Permit holders follow the general 5-year route. Basic German language knowledge (A1) is required before entry for spouses joining German citizens.",
          estimatedDuration: "3 years for spouses of German citizens; 5 years for family of permanent residents"
        },
        {
          name: "Freelance / Self-Employed Residence Permit → Settlement Permit",
          visaTypes: ["Freelance Visa (Germany)"],
          description: "Qualified freelancers (Freiberufler) in regulated professions — artists, journalists, scientists, doctors, lawyers, engineers — can receive a residence permit for self-employment. After 5 years of continuous self-employed residence with sufficient income and pension contributions, the Settlement Permit becomes available. Germany distinguishes between Freiberufler (professional freelancers) and Gewerbetreibende (business owners), with different requirements.",
          estimatedDuration: "5 years of continuous qualifying self-employment + several months Settlement Permit processing"
        }
      ]
    },
    citizenship: {
      officialName: "German Citizenship (Einbürgerung)",
      criteria: [
        "Have legally resided in Germany for at least 5 years (reduced to 3 years for special integration achievements under the 2024 reform)",
        "Hold an unlimited or long-term residence permit (Settlement Permit or EU Long-Term Residence)",
        "Be able to support yourself and dependants without social benefits (exceptions for reasons beyond your control)",
        "Have adequate German language skills (B1 CEFR level minimum)",
        "Pass the citizenship test (Einbürgerungstest) — 33 questions, 17 correct required",
        "Have no serious criminal convictions",
        "IMPORTANT: Germany now allows dual citizenship since the 2024 Nationality Act reform — you no longer need to renounce your existing nationality to become German"
      ],
      routes: [
        {
          name: "Naturalization – General (5-Year Rule)",
          visaTypes: ["Settlement Permit (Niederlassungserlaubnis)"],
          description: "After 5 years of legal residence in Germany (reduced from 8 under the 2024 reform), holders of a Settlement Permit or EU Long-Term Residence Permit can apply for citizenship. The 2024 Nationality Act also introduced a 3-year accelerated path for those with 'special integration achievements' (exceptional civic engagement, professional achievement, or voluntary work). Dual citizenship is now permitted since January 2024.",
          estimatedDuration: "5 years legal residence (3 years with special achievements) + 12–18 months naturalization processing"
        },
        {
          name: "Citizenship by Descent (Born to German Parent)",
          visaTypes: ["German Citizenship by Descent"],
          description: "A child born to at least one German citizen parent acquires German citizenship automatically at birth, regardless of where they are born (jus sanguinis). The child must be registered with a German consulate if born abroad. Since the 2024 reform, children born in Germany to foreign parents who have legally resided in Germany for 5+ years (previously 8) also acquire German citizenship at birth (jus soli).",
          estimatedDuration: "Automatic from birth; consular registration recommended within 1 year"
        }
      ]
    },
    visaDetails: {
      "German Student Visa": {
        fullName: "German Student Visa (Studienvisa) → Permanent Residence Pipeline",
        description: "The German Student Visa allows international students to study at recognized German universities and higher education institutions. Tuition fees at public universities are minimal (most charge only semester fees of €150–400). After graduation, students can stay 18 months on a job-seeker visa to find qualifying employment matching their degree. Germany actively encourages international graduates to remain, particularly in STEM and engineering fields. The pipeline leads from student visa → 18-month job seeker → Skilled Worker Visa or EU Blue Card → Settlement Permit.",
        pathToPR: "Student Visa → Study at German university → Graduate → Apply for 18-month Job Seeker Visa → Find qualifying employment → Switch to Skilled Worker Visa or EU Blue Card → After 4–5 years (or 21–27 months on Blue Card) → Apply for Niederlassungserlaubnis (Settlement Permit)",
        pathToCitizenship: "Student Visa → Job Seeker → Work Visa → Settlement Permit → After 5 years total legal residence (or 3 with special achievements) → Einbürgerungstest + B1 German → German Citizen",
        timelineToPR: "8–12 years: 3–4 years study + 18 months job seeker + 4–5 years work toward Settlement Permit (21–27 months if on EU Blue Card)",
        timelineToCitizenship: "13–17 years from starting studies to citizenship (5 years residence post-Settlement Permit eligibility + 12–18 months processing)",
        probabilityToPR: 28,
        probabilityToCitizenship: 18,
        probabilityNote: "The 28% probability accounts for the significant attrition along the pipeline: approximately 55% of international graduates in Germany remain to seek work; of those, ~65% secure qualifying employment and obtain a work residence permit; of those who reach the work permit stage, ~75% accumulate the required years for Settlement Permit eligibility; and ~80% of those who apply for Settlement Permit receive approval. The 18% citizenship probability is higher than comparable countries (like Japan) because Germany now permits dual citizenship since 2024, removing a major barrier. Approximately 200,000 people naturalize in Germany per year. Source: BAMF (Federal Office for Migration and Refugees) annual statistics, DAAD international student data."
      },
      "Opportunity Card (Chancenkarte)": {
        fullName: "Opportunity Card (Chancenkarte) – Points-Based Job Seeker Visa",
        description: "Introduced in June 2024 under Germany's revised Skilled Immigration Act, the Opportunity Card allows skilled workers from non-EU countries to come to Germany for up to 1 year to look for work — without a prior job offer. Eligibility is based on a points system: recognized qualification (professional or academic), German or English language skills, work experience, age, and prior Germany connection. Minimum 6 points required. Holders can work up to 20 hours/week in any job while searching. If they find qualifying work, they switch to a Skilled Worker Visa or EU Blue Card.",
        pathToPR: "Qualify for Chancenkarte (6+ points) → Come to Germany (up to 1 year) → Find employer offering qualifying job → Switch to Skilled Worker Visa or EU Blue Card → After 4–5 years (or 21–27 months Blue Card) → Apply for Settlement Permit",
        pathToCitizenship: "Chancenkarte → Work Visa → Settlement Permit → 5 years total legal residence → Naturalization → German Citizen",
        timelineToPR: "6–8 years from arriving on Chancenkarte: up to 1 year job search + 4–5 years on work permit (or 21–27 months Blue Card) to Settlement Permit",
        timelineToCitizenship: "11–13 years to citizenship",
        probabilityToPR: 38,
        probabilityToCitizenship: 22,
        probabilityNote: "The Opportunity Card is new (2024) so data is limited. The 38% estimate reflects that Chancenkarte holders arrive already pre-screened (6+ points, recognized qualification), increasing the probability of finding qualifying work compared to random job seekers. However, the German labor market requires language skills and credential recognition that can be challenging. Estimate is based on analogy with similar job-seeker visa holders in other countries. Source: BAMF preliminary Chancenkarte statistics 2024."
      },
      "EU Blue Card (Germany)": {
        fullName: "EU Blue Card (Germany) → Settlement Permit (Niederlassungserlaubnis)",
        description: "Germany's most popular route for highly skilled non-EU workers. Requires a recognized academic degree (or 3+ years of equivalent professional experience accepted since 2023) and a job offer paying at least €45,300/year (general) or €35,100/year for shortage occupations (ICT, medicine, engineering, science — as of 2024 figures). The EU Blue Card is initially granted for 4 years (or job contract duration + 3 months). Key advantage: Settlement Permit eligibility after only 27 months (21 months with B1 German), the fastest PR path for non-EU workers in Germany.",
        pathToPR: "Secure job offer meeting salary threshold → Apply for EU Blue Card → Work in Germany → After 21 months (B1 German) or 27 months → Apply for Niederlassungserlaubnis → Receive Settlement Permit",
        pathToCitizenship: "EU Blue Card → Settlement Permit → Total 5 years legal residence → Pass citizenship test + B1 German → Apply for Einbürgerung → German Citizen (dual citizenship now permitted)",
        timelineToPR: "21–27 months on EU Blue Card to Settlement Permit (fastest non-family PR in Germany)",
        timelineToCitizenship: "5–7 years from first arriving in Germany (Settlement Permit after 21–27 months + 5 years total residence for citizenship; accelerated to 3 years for special achievements)",
        probabilityToPR: 68,
        probabilityToCitizenship: 42,
        probabilityNote: "The 68% probability reflects that most Blue Card holders arrive with qualifying degrees and employer sponsorship, meaning the main attrition is voluntary departures (career moves, personal reasons) rather than rejections. BAMF data shows Settlement Permit approval rates are ~90%+ for applicants who meet the criteria; the 68% accounts for the ~30% who leave Germany before completing the qualifying period. The 42% citizenship probability is significantly boosted since Germany's 2024 dual citizenship reform removed the renunciation requirement — expected naturalization rates among eligible residents are projected to increase substantially. Source: BAMF EU Blue Card statistics, Germany's 2024 Nationality Act."
      },
      "Skilled Worker Visa (Germany)": {
        fullName: "German Skilled Worker Visa (Fachkräfte-Einwanderungsgesetz) → Settlement Permit",
        description: "Under the reformed Skilled Immigration Act (Fachkräfteeinwanderungsgesetz) in force since November 2023, Germany significantly expanded pathways for non-EU skilled workers with recognized vocational or academic qualifications. No employer preference check (Vorrangprüfung) is required. Requirements: recognized qualification (professional or academic), job offer in the qualified field, salary appropriate for the occupation. The Skilled Worker Visa is the basis for the Settlement Permit after 4 years of qualifying work in Germany.",
        pathToPR: "Get qualification recognized by German authorities (e.g., ZAB for academic degrees, ANABIN database) → Secure job offer → Apply for Skilled Worker Visa at German embassy → Work in Germany → Renew visa → After 4 years qualifying work + B1 German + financial stability → Apply for Settlement Permit",
        pathToCitizenship: "Skilled Worker Visa → Settlement Permit → 5 years total legal residence → Citizenship test + B1 → Apply for naturalization → German Citizen",
        timelineToPR: "4 years qualifying work residence + several months Settlement Permit processing",
        timelineToCitizenship: "6–8 years from arriving in Germany to citizenship (5 years total legal residence required)",
        probabilityToPR: 52,
        probabilityToCitizenship: 30,
        probabilityNote: "The 52% reflects the multi-step attrition: credential recognition delays and rejections (~15% fail to get recognition), visa approval rates (~90% for those with recognition), employment retention over 4 years (~80%), and Settlement Permit approval (~90%). The 30% citizenship probability is boosted by Germany's 2024 dual citizenship allowance. Source: BAMF Fachkräfteeinwanderung statistics 2023–2024."
      },
      "Family Reunification Visa (Germany)": {
        fullName: "German Family Reunification Visa → Settlement Permit",
        description: "Family members of German citizens or holders of the Niederlassungserlaubnis can join them in Germany. Spouses joining German citizens need to demonstrate A1 German language ability before entry (an often-criticized requirement). The visa is initially a temporary residence permit; spouses of German citizens can apply for Settlement Permit after 3 years of living together in Germany (or immediately with the German-citizen spouse if the German citizen has been resident for 3+ years). Children under 16 do not need to show language ability.",
        pathToPR: "German citizen/PR holder sponsors family member → Family member demonstrates A1 German (for spouses of German citizens) → Receive Family Reunification Visa → Reside in Germany with sponsor → Spouses of German citizens: apply for Settlement Permit after 3 years together in Germany. Spouses of PR holders: apply after 5 years total qualifying residence",
        pathToCitizenship: "Family Reunification Visa → Settlement Permit → After 5 years total legal residence (or 3 with special achievements) → Citizenship test + B1 German → Apply for naturalization → German Citizen. Spouses of German citizens may have faster path depending on circumstances.",
        timelineToPR: "3 years for spouses of German citizens; 5 years for family of permanent residents + processing time",
        timelineToCitizenship: "5–7 years from arriving in Germany to citizenship eligibility",
        probabilityToPR: 72,
        probabilityToCitizenship: 38,
        probabilityNote: "Family reunification visa holders have a relatively high probability of reaching Settlement Permit status because their residence is tied to a stable family unit in Germany. The 72% reflects strong attrition mainly from relationship breakdown (divorce/separation leading to loss of entitlement) and some voluntary departures. Settlement Permit approval rate for qualifying applicants is approximately 90%. The 38% citizenship rate reflects that family members who arrive do eventually integrate and many naturalize, particularly since the 2024 dual citizenship reform. Source: BAMF family reunification statistics."
      },
      "Freelance Visa (Germany)": {
        fullName: "German Freelance Visa (Freiberufler) → Settlement Permit",
        description: "Germany's Freiberufler (freelancer) residence permit is available to professionals in regulated liberal arts and sciences: writers, artists, journalists, scientists, architects, doctors, lawyers, engineers, and teachers. Unlike other self-employed categories, Freiberufler are not registered with the trade office (Gewerbeamt). Requirements: demonstrated demand for services in Germany (client letters or contracts), ability to self-support financially, no public social benefit reliance. After 5 years of continuous freelance residence with sufficient income and pension contributions, the Settlement Permit is available.",
        pathToPR: "Gather client letters/contracts → Apply for Freiberufler residence permit at German embassy → Arrive in Germany → Register with relevant professional body if required → File taxes annually, contribute to pension scheme → After 5 years + B1 German + financial stability → Apply for Settlement Permit",
        pathToCitizenship: "Freelance Visa → Settlement Permit → 5 years total legal residence → Naturalization → German Citizen",
        timelineToPR: "5 years continuous qualifying freelance residence + several months Settlement Permit processing",
        timelineToCitizenship: "7–9 years from arriving in Germany",
        probabilityToPR: 35,
        probabilityToCitizenship: 20,
        probabilityNote: "Freelancers face higher attrition than employed workers: income volatility, the challenge of maintaining self-sufficiency without social benefits over 5 continuous years, and the difficulty of demonstrating consistent demand for services. Approximately 40–50% of Freiberufler visa holders maintain qualifying status through to Settlement Permit eligibility. Of those who apply, approval is approximately 85%. Source: BAMF self-employment residence statistics."
      },
      "Settlement Permit (Niederlassungserlaubnis)": {
        fullName: "German Settlement Permit (Niederlassungserlaubnis) → Citizenship",
        description: "The Niederlassungserlaubnis (NE) is Germany's permanent residence status — an indefinite residence permit with no expiry, allowing holders to live and work freely in Germany. Holders can sponsor family members, access social benefits on the same terms as Germans, and travel freely within the Schengen Area. It is the direct stepping stone to citizenship. Since the 2024 Nationality Act reform, holders need only 5 years of total legal residence (3 with special achievements) before applying for naturalization, and may retain their original nationality.",
        pathToPR: "N/A — the Settlement Permit IS permanent residence in Germany.",
        pathToCitizenship: "Hold Settlement Permit → Ensure 5 years total legal residence in Germany → Pass citizenship test (Einbürgerungstest, 33 questions) → Demonstrate B1 German → Apply for Einbürgerung at local Ausländerbehörde → Background check → Receive citizenship certificate → German Citizen",
        timelineToPR: "N/A",
        timelineToCitizenship: "5 years total legal residence in Germany (3 years with special integration achievements) + 12–18 months naturalization processing",
        probabilityToPR: -1,
        probabilityToCitizenship: 72,
        probabilityNote: "Among Settlement Permit holders who decide to apply for naturalization, the approval rate is approximately 85–90%. The 72% estimate reflects both those who apply and the subset who remain long-term residents but choose not to naturalize. Since Germany's 2024 dual citizenship reform eliminated the renunciation requirement, naturalization rates are expected to increase significantly — Germany naturalized approximately 200,000 people in 2023, a record high driven by anticipation of the reform. Source: BAMF citizenship statistics 2023–2024."
      },
      "German Citizenship by Descent": {
        fullName: "German Citizenship by Descent (Abstammungsprinzip)",
        description: "German citizenship is transmitted by descent (jus sanguinis) — a child born to at least one German citizen parent acquires German citizenship at birth, wherever the birth occurs. If born abroad, the birth should be registered at the nearest German consulate. Since the 2024 reform: (1) descendants of Germans who were forced to renounce their citizenship under the Nazi regime can now claim German citizenship; (2) children born in Germany to foreign parents who have legally resided in Germany for 5+ years now also acquire citizenship at birth (jus soli reduction from 8 to 5 years).",
        pathToPR: "N/A — German citizenship by descent bypasses permanent residence entirely.",
        pathToCitizenship: "Confirm at least one parent was a German citizen at time of birth → If born abroad: register birth at German consulate → Child is a German citizen from birth. For Nazi-era descendants: gather documentation proving persecution-based renunciation → Apply under § 5 StAG or via the new §§ 14a–15 StAG (2024 reform) → Receive citizenship",
        timelineToPR: "N/A",
        timelineToCitizenship: "Citizenship exists from birth. Consular birth registration recommended within 1 year. Nazi-era descendant claims: 6–24 months processing depending on documentation.",
        probabilityToPR: -1,
        probabilityToCitizenship: 92,
        probabilityNote: "For those born to a German citizen parent, citizenship acquisition is automatic — the 92% (rather than 100%) accounts for edge cases: births abroad not registered within required timeframes, rare disputes over parentage, and the small fraction who renounce German citizenship voluntarily later in life. For Nazi-era descendant claims, approval rates are high (~85–90%) for well-documented cases. Source: German Federal Foreign Office citizenship statistics."
      }
    }
  },
  {
    id: "france",
    name: "France",
    flagEmoji: "🇫🇷",
    region: "Europe",
    permanentResidence: {
      officialName: "Carte de Résident (10-Year Residence Card)",
      criteria: [
        "Have lived continuously and legally in France for at least 5 years on a valid residence permit",
        "Demonstrate integration into French society (knowledge of French language at B1 level minimum, adherence to republican values)",
        "Have sufficient stable resources to support yourself (typically at least the French minimum wage, SMIC)",
        "Not have been subject to any deportation order or serious criminal conviction",
        "Pass an integration interview (entretien d'intégration civique) if requested by the prefecture"
      ],
      routes: [
        {
          name: "Student Visa → Talent Passport Pipeline",
          visaTypes: ["Student Visa (France)", "Talent Passport (France)"],
          description: "International students who graduate from a French institution (master's or PhD) can apply for the Autorisation Provisoire de Séjour (APS) — a 1-year permit to seek work or start a business. After finding qualifying employment, they transition to the Talent Passport (Passeport Talent), a 4-year multi-entry residence permit covering highly skilled workers, researchers, and startup founders. After 5 cumulative years on qualifying permits, the Carte de Résident is available.",
          estimatedDuration: "8–12 years: 2–3 years study + 1 year APS job search + 4+ years Talent Passport toward Carte de Résident"
        },
        {
          name: "Talent Passport (Passeport Talent) → Carte de Résident",
          visaTypes: ["Talent Passport (France)"],
          description: "The Talent Passport (Passeport Talent) is a 4-year residence permit for highly skilled workers, researchers, artists, company executives, startup founders, and investors. It requires either a job offer with a salary of at least 1.5× the average annual salary (~€53,000+) or qualification-based eligibility. After 5 cumulative years of legal residence in France on qualifying permits, the holder can apply for the Carte de Résident.",
          estimatedDuration: "5 years of cumulative legal residence in France to Carte de Résident"
        },
        {
          name: "Work Visa (Salarié) → Carte de Résident",
          visaTypes: ["Work Visa (France)"],
          description: "Standard long-stay work visa for non-EU/EEA nationals with a French employer sponsoring them. Requires a work contract, employer sponsorship, and OFII validation. The work visa is renewed annually; after 5 continuous years of legal residence, the holder can apply for the Carte de Résident, which is valid for 10 years and renewable.",
          estimatedDuration: "5 years continuous legal residence on work visas + several months Carte de Résident processing"
        },
        {
          name: "Family – Regroupement Familial → Carte de Résident",
          visaTypes: ["Family Reunification Visa (France)"],
          description: "Spouses and minor children of French citizens or long-term residents can join them through the regroupement familial procedure. A spouse of a French citizen receives a 'vie privée et familiale' card (1-year initially, then 3-year) and can apply for the Carte de Résident after 5 years, or can naturalize after 4 years of marriage. Spouses of French citizens have an accelerated path compared to other categories.",
          estimatedDuration: "4 years of marriage to a French citizen for naturalization eligibility; 5 years for general Carte de Résident"
        },
        {
          name: "Investor – Exceptional Economic Contribution → Carte de Résident",
          visaTypes: ["Investor Visa (France)"],
          description: "France's investor pathway falls under the Talent Passport category for investors making a 'significant economic contribution' to France: investing at least €300,000 in productive assets in France and creating or preserving at least 10 jobs. The visa is granted for 4 years; after 5 years of qualifying residence, the investor can apply for the Carte de Résident.",
          estimatedDuration: "4-year Talent Passport Investor; 5 years total for Carte de Résident eligibility"
        }
      ]
    },
    citizenship: {
      officialName: "French Citizenship (Naturalisation)",
      criteria: [
        "Have lived continuously in France for at least 5 years (2 years if graduated from a French grandes écoles or similar institution; 2 years for exceptional service to France)",
        "Be at least 18 years old",
        "Demonstrate assimilation into French culture: language level B1 minimum (tested), knowledge of French rights and duties, and attachment to French values",
        "Have stable and sufficient income",
        "Not have been convicted of a crime or offence incompatible with French nationality",
        "Not have been subject to a deportation or exclusion order in the 10 years preceding the application",
        "France generally permits dual citizenship — you do not need to renounce your existing nationality"
      ],
      routes: [
        {
          name: "Naturalization – General (5-Year Rule)",
          visaTypes: ["Carte de Résident (France)"],
          description: "After 5 years of continuous and regular residence in France, any legally resident foreigner can apply for French citizenship by naturalization (décret de naturalisation). The prefecture conducts an assimilation interview to assess French language ability, knowledge of French institutions and values, and integration into French society. Processing takes 12–18 months. France allows dual citizenship.",
          estimatedDuration: "5 years residence in France + 12–18 months naturalization processing"
        },
        {
          name: "Naturalization via Marriage to French Citizen (4-Year Rule)",
          visaTypes: ["Spouse of French Citizen Visa"],
          description: "Spouses of French citizens can apply for naturalization after 4 years of marriage and continuous residence in France (5 years if not meeting language requirements). The period is reduced to 3 years if they have a child with French citizenship or lived abroad representing France. Community of life and assimilation are assessed.",
          estimatedDuration: "4 years of marriage + qualifying residence + 12–18 months processing"
        },
        {
          name: "Citizenship by Descent (Born to French Parent)",
          visaTypes: ["French Citizenship by Descent"],
          description: "A child born to at least one French citizen parent is automatically a French citizen at birth, regardless of birthplace (jus sanguinis). France also has jus soli rules for children born in France to foreign parents who have lived in France for 5 years. Children born in France who have not acquired another citizenship can claim French citizenship at age 18. France permits dual citizenship.",
          estimatedDuration: "Automatic from birth; passport application 2–6 months"
        }
      ]
    },
    visaDetails: {
      "Student Visa (France)": {
        fullName: "French Long-Stay Student Visa (VLS-TS Étudiant) → Carte de Résident Pipeline",
        description: "France's long-stay student visa (visa long séjour valant titre de séjour — VLS-TS étudiant) allows international students to study at accredited French institutions without obtaining a separate residence permit in the first year. France has strong universities including the grandes écoles (HEC, Polytechnique, Sciences Po) and is a target for international students — Campus France coordinates admissions. After graduating with a master's or PhD, students can apply for the APS (Autorisation Provisoire de Séjour) for 1 year to find work. The pipeline leads to Talent Passport → Carte de Résident → citizenship.",
        pathToPR: "Student Visa → Study in France (2–3 years master's or more) → Graduate → Apply for APS (1-year job-seeker permit) → Find qualifying job (salary €53,000+ for Talent Passport, or any qualifying work contract) → Obtain Talent Passport (4 years) or Work Visa → Renew → After 5 cumulative years qualifying residence → Apply for Carte de Résident",
        pathToCitizenship: "Student Visa → APS → Talent Passport or Work Visa → Carte de Résident → After 5 years total qualifying residence (or 2 years if French grandes écoles graduate) → Naturalization → French Citizen",
        timelineToPR: "7–10 years: 2–3 years study + 1 year APS + 4+ years on Talent Passport or work visa to 5-year residence threshold",
        timelineToCitizenship: "7–10 years (with 2-year accelerated naturalization after French degree): 2–3 years study + 2 years qualifying residence → naturalization. OR 10–13 years via general route.",
        probabilityToPR: 30,
        probabilityToCitizenship: 18,
        probabilityNote: "Approximately 40–50% of international students in France remain after graduation; of those, ~65% secure qualifying employment and transition to a work or Talent Passport permit; of those, ~80% accumulate 5 years and qualify for the Carte de Résident; approval rate is ~90% for qualifying applicants. The 18% citizenship probability reflects that France naturalizes roughly 100,000–120,000 people annually, but significant attrition occurs along the multi-year pipeline. Source: Ministère de l'Intérieur immigration statistics, OFII data."
      },
      "Talent Passport (France)": {
        fullName: "French Talent Passport (Passeport Talent) → Carte de Résident",
        description: "The Talent Passport is France's flagship permit for attracting skilled foreign talent — researchers, artists, company executives, innovative startup founders, and high-earning employees. It covers 10 sub-categories. Key ones: (1) Employees earning ≥1.5× average salary (~€53,000+) with a higher-education qualification; (2) Researchers with hosting agreement from French research institution; (3) Innovative company founders (young innovative company label); (4) Investors (€300,000+ + 10 jobs created/maintained); (5) Artists and cultural figures. Valid for 4 years (renewable), with open work rights for the spouse.",
        pathToPR: "Qualify for one Talent Passport sub-category → Apply at French consulate → Receive 4-year Talent Passport → Work/reside in France → Renew if needed → After 5 cumulative years qualifying residence → Apply for Carte de Résident at prefecture",
        pathToCitizenship: "Talent Passport → 5 years residence → Carte de Résident → Naturalization application → Assimilation interview → French Citizen (dual nationality permitted)",
        timelineToPR: "5 years total qualifying residence in France (the Talent Passport covers 4 years of that)",
        timelineToCitizenship: "6–8 years from first arriving on Talent Passport (5 years residence + 12–18 months naturalization processing)",
        probabilityToPR: 58,
        probabilityToCitizenship: 35,
        probabilityNote: "Talent Passport holders are pre-screened for economic contribution and stability, leading to lower attrition than general work visa holders. Most Talent Passport holders who remain 5 years qualify for and receive the Carte de Résident. The 35% citizenship probability reflects that many Talent Passport holders are globally mobile professionals who may not choose to naturalize despite eligibility. France naturalized ~110,000 people in 2022. Source: Ministère de l'Intérieur, DGEF immigration statistics."
      },
      "Work Visa (France)": {
        fullName: "French Long-Stay Work Visa (Visa Salarié) → Carte de Résident",
        description: "The standard work visa for non-EU/EEA nationals employed by a French company. Requires an employment contract, employer sponsorship, and validation by OFII (Office Français de l'Immigration et de l'Intégration). The employer must typically demonstrate that no EU/EEA candidate is available (opposabilité de la situation de l'emploi) — though exceptions exist for shortage occupations. Annual renewal required. After 5 continuous years of legal qualifying residence, the Carte de Résident (10-year renewable) becomes available.",
        pathToPR: "Secure French employer → Employer applies for work authorization → Apply for long-stay work visa → Arrive in France → Complete OFII integration procedure → Renew annually → After 5 years continuous qualifying residence → Apply for Carte de Résident",
        pathToCitizenship: "Work Visa → 5 years → Carte de Résident → Naturalization (5 years total, B1 French, assimilation interview) → French Citizen",
        timelineToPR: "5 years continuous legal residence in France + several months Carte de Résident processing",
        timelineToCitizenship: "6–8 years to citizenship",
        probabilityToPR: 48,
        probabilityToCitizenship: 28,
        probabilityNote: "Work visa holders face attrition through job changes (requiring new visa procedures), economic downturns affecting employer sponsorship, and voluntary departures. Approximately 55–60% of long-term work visa holders accumulate the 5 years required for Carte de Résident; approval rates are approximately 88%. Source: DGEF annual immigration report."
      },
      "Family Reunification Visa (France)": {
        fullName: "French Family Reunification Visa (Regroupement Familial) → Carte de Résident",
        description: "Spouses and dependent children of French citizens or legally resident foreigners can join them through regroupement familial. Spouses of French citizens receive a 'vie privée et familiale' residence card and have an accelerated path to both Carte de Résident and naturalization. Spouses of resident foreigners must go through the prefecture-managed regroupement familial procedure (minimum income and housing requirements apply). Family reunion with French citizens is generally more streamlined than with foreign residents.",
        pathToPR: "French citizen/resident sponsors family member → Prefectural or consular application → Receive family visa → Complete OFII integration procedure → Receive initial residence card → Renew → After 5 years qualifying residence (spouses of French citizens may apply for Carte de Résident earlier based on circumstances) → Carte de Résident",
        pathToCitizenship: "Family Visa → Carte de Résident → Naturalization. Spouses of French citizens: after 4 years of marriage and qualifying residence → naturalization. Others: 5 years residence → naturalization.",
        timelineToPR: "5 years qualifying residence; earlier in some cases for spouses of French citizens",
        timelineToCitizenship: "4–6 years for spouses of French citizens (4-year marriage route); 6–8 years for others",
        probabilityToPR: 70,
        probabilityToCitizenship: 42,
        probabilityNote: "Family reunification visa holders have the highest probability of long-term settlement in France due to the anchor of family ties. Approximately 75–80% accumulate the required residence; prefecture approval rates for Carte de Résident are approximately 90%. The 42% citizenship rate reflects solid naturalization rates among settled family members. Source: Ministère de l'Intérieur immigration and naturalization statistics."
      },
      "Investor Visa (France)": {
        fullName: "French Talent Passport – Investor Category → Carte de Résident",
        description: "France's investor immigration path falls within the Talent Passport framework. To qualify as an investor: commit at least €300,000 in real and productive assets in a French company (or purchase shares in an existing French company) AND create or preserve at least 10 jobs in France within 4 years. French nationality is available after 5 years of qualifying residence. Unlike pure golden visa programs, France requires active job creation, not just passive investment.",
        pathToPR: "Commit €300,000 investment in French productive assets + commit to 10 jobs created/maintained → Apply for Talent Passport (Investor) → 4-year permit → Document investment and job creation → After 5 years qualifying residence → Carte de Résident",
        pathToCitizenship: "Talent Passport (Investor) → 5 years residence → Carte de Résident → Naturalization → French Citizen",
        timelineToPR: "5 years total qualifying residence",
        timelineToCitizenship: "6–8 years from initial investment to citizenship",
        probabilityToPR: 62,
        probabilityToCitizenship: 38,
        probabilityNote: "Investor category Talent Passport holders who maintain their investment and job creation commitments have a relatively high probability of reaching Carte de Résident. The 38% citizenship probability reflects that many investor-class residents are globally mobile and may not prioritize naturalization. Source: DGEF investor visa statistics."
      },
      "Carte de Résident (France)": {
        fullName: "French Carte de Résident (10-Year Residence Card) → Citizenship",
        description: "The Carte de Résident is France's permanent residence equivalent — a 10-year renewable residence card that grants free access to the French labor market, social benefits, and the right to sponsor family members. Holders may naturalize after 5 years of total legal residence in France (which typically means they already hold the Carte de Résident). France generally permits dual citizenship — there is no requirement to renounce your original nationality upon naturalization.",
        pathToPR: "N/A — the Carte de Résident IS permanent residence in France.",
        pathToCitizenship: "Hold Carte de Résident → Ensure 5 years total legal residence in France → Prepare naturalization dossier (proof of income, housing, language B1, integration) → Submit to prefecture → Assimilation interview → Ministerial decree (décret de naturalisation) → French Citizen. Ceremony optional.",
        timelineToPR: "N/A",
        timelineToCitizenship: "5 years total qualifying residence in France + 12–18 months naturalization processing",
        probabilityToPR: -1,
        probabilityToCitizenship: 68,
        probabilityNote: "Among Carte de Résident holders who decide to apply for naturalization, France's approval rate is approximately 70–75% at first application (some are deferred due to language or integration concerns and reapply). The 68% accounts for both those who apply and the subset who remain long-term residents without naturalizing. France naturalized approximately 110,000–120,000 people annually in recent years. Source: Ministère de l'Intérieur naturalization statistics."
      },
      "Spouse of French Citizen Visa": {
        fullName: "Spouse of French Citizen → Naturalization (4-Year Marriage Route)",
        description: "Spouses of French citizens benefit from an accelerated naturalization path: after 4 years of marriage and continuous qualifying residence in France, they can apply for naturalization (the standard 5-year residence requirement is reduced). The period is reduced to 3 years if they have a child with French citizenship or if they lived 3 years abroad in a French overseas territory or worked for a French government mission. Community of life (living together) with the French spouse is required; the period is suspended if the couple separates.",
        pathToPR: "N/A — the primary benefit here is accelerated citizenship, not a separate PR path. Spouses of French citizens receive a 'vie privée et familiale' card, not a direct PR equivalent.",
        pathToCitizenship: "Marry French citizen → Obtain 'vie privée et familiale' residence card → Reside in France for 4 years of marriage (continuous community of life) → Prepare naturalization dossier → Prefecture interview assessing language (B1) and integration → Ministerial decree → French Citizen",
        timelineToPR: "N/A",
        timelineToCitizenship: "4 years of marriage and qualifying residence + 12–18 months processing (minimum 5–6 years from marriage date)",
        probabilityToPR: -1,
        probabilityToCitizenship: 74,
        probabilityNote: "Spouses of French citizens applying through the 4-year marriage route have a higher approval rate than general naturalization applicants because the France ties are more established (living with a French citizen). Approval rates for this category are approximately 75–80%, with deferrals mainly for insufficient French language or demonstrated integration. Source: Ministère de l'Intérieur naturalization by category statistics."
      },
      "French Citizenship by Descent": {
        fullName: "French Citizenship by Descent (Filiation)",
        description: "A child born to at least one French citizen parent is automatically French at birth by filiation, regardless of birthplace. France also has jus soli provisions: children born in France to foreign parents who have resided in France for at least 5 years can claim French citizenship at age 18 (or earlier under certain conditions), and children born in France who have not acquired another citizenship are French. France permits dual citizenship — French citizens by descent are not required to renounce other nationalities.",
        pathToPR: "N/A — French citizenship by descent bypasses permanent residence entirely.",
        pathToCitizenship: "Confirm at least one parent was a French citizen at time of birth → Child is French at birth → Register with French consulate if born abroad → Apply for French birth certificate and passport. For jus soli: be born in France + at least one parent resided in France 5+ years → Claim citizenship at 18 (or earlier) at the prefecture.",
        timelineToPR: "N/A",
        timelineToCitizenship: "Citizenship exists from birth for children of French citizens. Consular birth registration: 2–12 months for passport.",
        probabilityToPR: -1,
        probabilityToCitizenship: 94,
        probabilityNote: "For children genuinely born to a French citizen parent, citizenship acquisition is essentially automatic — the 94% accounts for rare procedural failures (birth not registered within required timeframes abroad, disputed parentage) and the small fraction who voluntarily renounce French citizenship. Source: Ministère des Affaires Étrangères consular statistics."
      }
    }
  }
];

data.countries.push(...newCountries);
fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
console.log("Added Germany and France. Total countries:", data.countries.length);
