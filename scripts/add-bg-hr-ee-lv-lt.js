const fs = require("fs");
const filePath = "data/countries.json";
const data = JSON.parse(fs.readFileSync(filePath));

const bulgaria = {
  id: "bulgaria",
  name: "Bulgaria",
  flagEmoji: "🇧🇬",
  region: "Europe",
  permanentResidence: {
    officialName: "Permanent Residence Permit / EU Long-Term Resident Permit (Разрешение за постоянно пребиваване / Разрешение за дългосрочно пребиваване - ЕС)",
    criteria: [
      "Have legally and continuously resided in Bulgaria for at least 5 years",
      "Student permit time counts toward the 5-year threshold under the EU Long-Term Residence Directive",
      "Registered place of residence in Bulgaria",
      "Sufficient income (at least the minimum monthly wage per household member)",
      "Health insurance",
      "No serious criminal convictions",
    ],
    routes: [
      {
        name: "Student Visa → Work Permit → Permanent Residence",
        visaTypes: ["Student Visa (Bulgaria)", "Work Permit (Bulgaria)"],
        description:
          "International students at Bulgarian universities (Sofia University, Technical University of Sofia, Medical University Sofia, etc.) receive a student residence permit. Bulgaria is popular for EU-recognized medical degrees at significantly lower costs than Western Europe (€2,000–6,000/year tuition). Student permit time counts toward the 5-year EU LTR threshold, making the path approximately 5 years from first arrival.",
        estimatedDuration: "~5 years total (student time counts toward 5-year EU LTR threshold)",
      },
      {
        name: "Work Permit (Single Permit) → Permanent Residence",
        visaTypes: ["Work Permit (Bulgaria)"],
        description:
          "Non-EU nationals with a job offer can obtain a combined single permit for work and residence. Bulgaria requires a labor market test (employer must prove no local worker can fill the role) for most occupations. After 5 years of continuous qualifying residence, the permanent residence or EU Long-Term Resident permit is available. Bulgaria's IT sector, shared services centers (large multinationals like IBM, HP, KPMG), and BPO industry employ significant numbers of foreign workers.",
        estimatedDuration: "5 years continuous qualifying residence for EU LTR or permanent residence",
      },
      {
        name: "Investment Residence (Bulgarian Investor Program)",
        visaTypes: ["Investor Permit (Bulgaria)"],
        description:
          "Bulgaria's investment residence program grants a 5-year renewable residence permit for investments of at least BGN 1,000,000 (approximately €500,000) in qualifying Bulgarian assets (shares of Bulgarian companies, government bonds, registered venture capital funds, or approved investment projects). After 5 years of qualifying residence, permanent residence is available. After acquiring permanent residence, citizenship by naturalization is possible (5 years holding permanent residence).",
        estimatedDuration: "5-year permit (renewable); permanent residence after 5 years qualifying residence",
      },
    ],
  },
  citizenship: {
    officialName: "Bulgarian Citizenship (Българско гражданство)",
    criteria: [
      "Have held permanent residence in Bulgaria for at least 5 years continuously",
      "Have legally resided in Bulgaria for at least 5 years before applying for permanent residence (total: ~10 years minimum)",
      "Have a registered address in Bulgaria",
      "Not have criminal convictions for intentional crimes under Bulgarian law",
      "Demonstrate basic Bulgarian language knowledge (assessed at interview)",
      "Bulgaria permits dual citizenship — no renunciation required",
    ],
    routes: [
      {
        name: "Naturalization – General (5-Year PR Holding)",
        visaTypes: ["Permanent Residence (Bulgaria)"],
        description:
          "Non-EU nationals who have held permanent residence for 5 years (total qualifying Bulgarian residence typically 10 years) can apply for citizenship by naturalization. The application is submitted to the Ministry of Justice. Processing times range from 1 to 3 years. An interview assessing basic Bulgarian language knowledge is conducted. Bulgaria's naturalization process has historically had significant backlogs.",
        estimatedDuration: "5 years PR holding (total ~10 years qualifying residence) + 1–3 years processing",
      },
      {
        name: "Citizenship by Descent",
        visaTypes: ["Bulgarian Citizenship by Descent"],
        description:
          "Bulgarian citizenship transmits by descent through either parent. Children born to at least one Bulgarian citizen are Bulgarian at birth regardless of birthplace. Bulgaria permits dual citizenship. Descendants of Bulgarian emigrants (including those forced out during communist era, particularly from the large Bulgarian diaspora in North Macedonia) may also be eligible.",
        estimatedDuration: "Automatic at birth; registration 2–12 months",
      },
    ],
  },
  visaDetails: {
    "Student Visa (Bulgaria)": {
      fullName: "Bulgarian Student Residence Permit (Разрешение за пребиваване с цел обучение)",
      description:
        "Non-EU students at Bulgarian accredited higher education institutions receive an annual student residence permit. Bulgaria is notably popular for EU-recognized medical and pharmacy degrees at costs of €2,000–6,000/year — far below equivalent programs in Germany, the UK, or Scandinavia. The Medical University of Sofia and Medical University Plovdiv are well-established with large international student cohorts. Student permit time counts toward the 5-year EU LTR threshold.",
      pathToPR:
        "Student Visa → Study at Bulgarian university → Graduate → Apply for work permit or change of status → Work Permit → Accumulate 5 years total qualifying residence (student + work time) → EU Long-Term Resident Permit or Permanent Residence",
      pathToCitizenship:
        "Student Visa → Work Permit → Permanent Residence (5 years) → Hold PR for 5 years → Basic Bulgarian → Citizenship application → Ministry of Justice → Bulgarian Citizen",
      timelineToPR: "~5 years total (student time counts toward 5-year LTR threshold)",
      timelineToCitizenship: "12–16 years total",
      probabilityToPR: 40,
      probabilityToCitizenship: 20,
      probabilityNote:
        "Bulgaria's job market is smaller than Western EU countries, and many international graduates move westward after obtaining their EU-recognized degree. The 40% PR probability accounts for those who do establish stable employment in Bulgaria. The 10-year qualifying period before permanent residence (plus 5 years holding PR for citizenship) makes the 20% citizenship figure reflect the low proportion who commit to Bulgaria long-term. Source: Bulgarian State Agency for Refugees and Ministry of Interior immigration statistics.",
    },
    "Work Permit (Bulgaria)": {
      fullName: "Bulgarian Work Permit (Single Permit) → Permanent Residence",
      description:
        "The Bulgarian combined single permit (единно разрешение за пребиваване и работа) covers both residence and work authorization for non-EU nationals. Employers must demonstrate labor market need (job advertisement for 1 month). Bulgaria's IT, BPO, and shared services sectors employ significant foreign workers, particularly from India, Ukraine, and Moldova. After 5 years of continuous qualifying residence, permanent residence (постоянно пребиваване) or EU Long-Term Resident permit is available.",
      pathToPR:
        "Job offer → Labor market test → Employer applies for single permit → Receive permit (valid 1 year, renewable) → Work continuously → After 5 years qualifying residence → Apply for permanent residence or EU LTR",
      pathToCitizenship:
        "Work Permit → Permanent Residence (5 years qualifying) → Hold PR 5 years → Basic Bulgarian language → Citizenship application → Bulgarian Citizen",
      timelineToPR: "5 years continuous qualifying residence",
      timelineToCitizenship: "10 years qualifying + 1–3 years processing",
      probabilityToPR: 52,
      probabilityToCitizenship: 28,
      probabilityNote:
        "Bulgaria's IT and BPO sectors provide stable employment. The 52% PR probability accounts for significant attrition — many work permit holders use Bulgaria as a stepping stone to Western EU. The 28% citizenship probability reflects the 10-year total commitment and language requirement. Dual citizenship is permitted, removing a major deterrent. Source: Bulgarian Interior Ministry immigration data.",
    },
    "Investor Permit (Bulgaria)": {
      fullName: "Bulgarian Investor Residence Permit → Permanent Residence",
      description:
        "Bulgaria's investment program grants residence to those making BGN 1,000,000+ (approx. €500,000) qualifying investments. Options include Bulgarian company shares, government bonds, or approved venture capital funds. The 5-year renewable permit allows the investor and family to reside in Bulgaria and access the EU's Schengen Area (Bulgaria joined Schengen in 2024). After 5 years qualifying residence, permanent residence is granted; citizenship follows after 5 additional years of PR holding.",
      pathToPR:
        "Make qualifying investment (BGN 1,000,000+) → Apply for investor residence permit → 5-year permit for investor and family → Reside in Bulgaria → After 5 years qualifying residence → Permanent Residence",
      pathToCitizenship:
        "Investor Permit → Permanent Residence (5 years) → Hold PR 5 years → Bulgarian Citizen",
      timelineToPR: "5 years qualifying residence",
      timelineToCitizenship: "10 years qualifying + 1–3 years processing",
      probabilityToPR: 65,
      probabilityToCitizenship: 30,
      probabilityNote:
        "Investment-based permanent residence is straightforward once the investment is maintained. The 65% PR probability reflects that most investors who choose Bulgaria as their investment destination are genuinely committed. Citizenship at 30% is lower because many investor-visa holders use Bulgaria for EU access rather than intending to naturalize. Source: Bulgarian Investment Agency statistics.",
    },
    "Permanent Residence (Bulgaria)": {
      fullName: "Bulgarian Permanent Residence → Citizenship Eligibility",
      description:
        "Bulgarian permanent residence (постоянно пребиваване) grants the right to live and work in Bulgaria indefinitely, with access to social services and protection from deportation except in serious criminal cases. The permit card is renewed every 5 years. Permanent residence is the prerequisite for citizenship: applicants must hold it for 5 years before naturalizing.",
      pathToPR: "N/A — permanent residence IS the PR status in Bulgaria.",
      pathToCitizenship:
        "Permanent Residence → Hold for 5 years → Basic Bulgarian language interview → Submit citizenship application to Ministry of Justice → Ministry of Justice review → Presidential decree → Bulgarian Citizen",
      timelineToPR: "N/A",
      timelineToCitizenship: "5 years holding PR + 1–3 years processing",
      probabilityToPR: -1,
      probabilityToCitizenship: 48,
      probabilityNote:
        "For established Bulgarian permanent residents who pursue citizenship, the Ministry of Justice approves approximately 70–75% of applications. The 48% overall figure accounts for the ~35% of PR holders who never apply for citizenship (often having already secured Western EU residence). Source: Bulgarian Ministry of Justice naturalization data.",
    },
    "Bulgarian Citizenship by Descent": {
      fullName: "Bulgarian Citizenship by Descent",
      description:
        "Bulgarian citizenship transmits by jus sanguinis through either parent. Children of Bulgarian citizens are Bulgarian at birth. Bulgaria permits dual citizenship — no renunciation is required. Children of Bulgarian emigrants can claim citizenship through consular registration. Those with Bulgarian ethnic heritage (Bulgarian origin abroad) may apply through simplified procedures under the Bulgarian Citizenship Act.",
      pathToPR: "N/A — citizenship by descent bypasses permanent residence.",
      pathToCitizenship:
        "Confirm Bulgarian citizen parent → Child is Bulgarian at birth → Register with Bulgarian consulate or Interior Ministry → Apply for Bulgarian identity documents and passport",
      timelineToPR: "N/A",
      timelineToCitizenship: "Automatic at birth; processing 3–18 months",
      probabilityToPR: -1,
      probabilityToCitizenship: 85,
      probabilityNote:
        "Bulgarian citizenship by descent is reliable for documented first-generation children of Bulgarian citizens. The 85% reflects primarily documentation challenges for the diaspora. Source: Bulgarian consular statistics.",
    },
  },
};

const croatia = {
  id: "croatia",
  name: "Croatia",
  flagEmoji: "🇭🇷",
  region: "Europe",
  permanentResidence: {
    officialName: "Permanent Residence Permit / EU Long-Term Resident Permit (Dozvola za stalno boravište / EU dozvola za dugotrajno boravište)",
    criteria: [
      "Have legally and continuously resided in Croatia for at least 5 years",
      "Student permit time counts toward the 5-year threshold under the EU Long-Term Residence Directive",
      "Adequate means of subsistence and health insurance",
      "Registered address in Croatia",
      "No threat to public policy or national security",
      "Croatia joined the Schengen Area on January 1, 2023 and the Eurozone on January 1, 2023",
    ],
    routes: [
      {
        name: "Student Visa → Work Permit → Permanent Residence",
        visaTypes: ["Student Visa (Croatia)", "Work Permit (Croatia)"],
        description:
          "International students at Croatian universities (University of Zagreb, University of Split, University of Rijeka) receive a student residence permit. Croatia's universities offer EU-recognized programs. Student permit time counts toward the 5-year EU LTR threshold. Croatia's tourism, IT, and maritime sectors are growing employers.",
        estimatedDuration: "~5 years total (student time counts toward 5-year EU LTR threshold)",
      },
      {
        name: "Work Permit → Permanent Residence",
        visaTypes: ["Work Permit (Croatia)"],
        description:
          "Non-EU nationals with a job offer in Croatia require a combined work and residence permit. Croatia introduced simplified work access for nationals of specific countries facing labor shortages (particularly in construction, tourism, and shipbuilding). After 5 years of continuous qualifying residence, permanent residence or EU Long-Term Resident permit is available.",
        estimatedDuration: "5 years continuous qualifying residence for EU LTR",
      },
      {
        name: "Digital Nomad Visa → Temporary Residence → Permanent Residence",
        visaTypes: ["Digital Nomad Visa (Croatia)"],
        description:
          "Croatia launched one of Europe's first Digital Nomad Visas in 2021, allowing remote workers earning at least HRK 16,907 (approximately €2,240)/month from non-Croatian sources to reside in Croatia for up to 1 year (renewable once, maximum 2 consecutive years). Digital Nomad Visa time may count toward the 5-year permanent residence threshold if the holder transitions to a qualifying residence permit status before the 2-year limit.",
        estimatedDuration: "2 years maximum on Digital Nomad Visa; must transition to standard permit for permanent residence path",
      },
    ],
  },
  citizenship: {
    officialName: "Croatian Citizenship (Hrvatsko državljanstvo)",
    criteria: [
      "Have legally resided in Croatia for at least 8 years continuously (reduced to 3 years for spouses of Croatian citizens)",
      "Have held permanent residence for at least 5 years",
      "Demonstrate Croatian language and culture knowledge (B1 level Croatian, Latin script, basic civics)",
      "Proof of integration into Croatian society",
      "No criminal convictions",
      "Croatia permits dual citizenship — no renunciation required",
    ],
    routes: [
      {
        name: "Naturalization – General (8-Year Residence)",
        visaTypes: ["Permanent Residence (Croatia)"],
        description:
          "Non-EU nationals who have legally resided in Croatia for at least 8 years (with at least 5 years of permanent residence) can apply for citizenship by naturalization. Applications are submitted to the Ministry of the Interior. Language test: B1 Croatian proficiency. Processing takes 1–3 years. Croatia permits dual citizenship.",
        estimatedDuration: "8 years qualifying residence (5 years holding PR) + 1–3 years processing",
      },
      {
        name: "Citizenship by Descent",
        visaTypes: ["Croatian Citizenship by Descent"],
        description:
          "Croatian citizenship transmits by jus sanguinis through either parent. Children of Croatian citizens are Croatian at birth. Croatia also has specific provisions for ethnic Croats abroad (particularly in Bosnia and Herzegovina, Serbia, and the diaspora) to obtain Croatian citizenship through simplified procedures — without residency in Croatia. This pathway has been used by hundreds of thousands of Bosnian Croats.",
        estimatedDuration: "Automatic at birth; consular registration 2–18 months",
      },
    ],
  },
  visaDetails: {
    "Student Visa (Croatia)": {
      fullName: "Croatian Student Residence Permit (Dozvola za boravak u svrhu studiranja)",
      description:
        "Non-EU students at accredited Croatian higher education institutions receive a student residence permit. Croatia's universities offer EU-recognized degrees; the University of Zagreb is particularly notable for medicine, engineering, and social sciences. Croatia's cost of living is lower than most Western EU countries. Student permit time counts toward the 5-year EU LTR threshold.",
      pathToPR:
        "Student Visa → Study at Croatian university → Graduate → Find job → Work Permit → Accumulate 5 years total qualifying residence (student + work time) → EU Long-Term Resident Permit / Permanent Residence",
      pathToCitizenship:
        "Student Visa → Work Permit → Permanent Residence → 8 years total qualifying residence → B1 Croatian → Citizenship application → Croatian Citizen",
      timelineToPR: "~5 years total (student time counts toward 5-year LTR threshold)",
      timelineToCitizenship: "10–13 years total",
      probabilityToPR: 42,
      probabilityToCitizenship: 22,
      probabilityNote:
        "Croatia's job market is growing post-EU accession, but brain drain is significant — many graduates move to Germany, Austria, or Ireland. The 42% PR probability reflects those who remain in Croatia long-term. The 8-year naturalization requirement and language test explain the 22% citizenship probability. Source: Croatian Ministry of the Interior immigration statistics.",
    },
    "Work Permit (Croatia)": {
      fullName: "Croatian Work Permit (Dozvola za boravak i rad) → Permanent Residence",
      description:
        "Croatia introduced simplified work permit procedures for nationals of specific countries to address acute labor shortages (construction, tourism, agriculture, shipbuilding). Standard permits require employer sponsorship and labor market test. Tourism-sector workers are in particularly high demand due to Croatia's Adriatic coast tourism. After 5 years continuous qualifying residence, EU LTR is available.",
      pathToPR:
        "Job offer in Croatia → Employer applies for work/residence permit → Receive permit → Work continuously → Renew → After 5 years qualifying residence → EU Long-Term Resident Permit / Permanent Residence",
      pathToCitizenship:
        "Work Permit → EU LTR / Permanent Residence (5 years qualifying) → 8 years total qualifying residence → B1 Croatian → Citizenship → Croatian Citizen",
      timelineToPR: "5 years continuous qualifying residence",
      timelineToCitizenship: "8 years qualifying + 1–3 years processing",
      probabilityToPR: 50,
      probabilityToCitizenship: 25,
      probabilityNote:
        "Croatia's labor shortages in construction and hospitality create genuine demand. The 8-year citizenship timeline and Croatian language requirement (B1 is non-trivial) explain the 25% citizenship probability. Dual citizenship permitted. Source: Croatian Ministry of Interior statistics.",
    },
    "Digital Nomad Visa (Croatia)": {
      fullName: "Croatian Digital Nomad Visa → Residence",
      description:
        "Croatia's Digital Nomad Visa (introduced January 2021) was one of the world's first purpose-built remote worker visas. Requirements: remote work for a non-Croatian employer/client, minimum income of approx. €2,240/month, accommodation in Croatia, health insurance. Valid for 1 year, renewable once. Maximum consecutive stay: 2 years. After the 2-year limit, the holder must leave and may re-apply after 6 months. To continue residing and progress toward permanent residence, holders must transition to a standard long-term residence permit before the 2-year maximum.",
      pathToPR:
        "Digital Nomad Visa (1 year, renewable once to max 2 years) → Transition to Work Permit or other qualifying permit → Accumulate 5 years total qualifying residence → Permanent Residence",
      pathToCitizenship:
        "Digital Nomad Visa → Work Permit transition → Permanent Residence → 8 years qualifying residence → Croatian Citizen",
      timelineToPR:
        "Maximum 2 years on Digital Nomad Visa; then must switch permit — total 5 years qualifying needed",
      timelineToCitizenship: "8+ years qualifying residence + processing",
      probabilityToPR: 30,
      probabilityToCitizenship: 12,
      probabilityNote:
        "Most Digital Nomad Visa holders use Croatia as a temporary remote-work base rather than a long-term immigration destination. The transition to qualifying long-term permits for permanent residence is the key challenge. The low probabilities reflect this transient intent. Source: Croatian Ministry of Interior.",
    },
    "Permanent Residence (Croatia)": {
      fullName: "Croatian Permanent Residence / EU Long-Term Resident Permit → Citizenship",
      description:
        "Croatian permanent residence grants unrestricted labor market access, social security parity, and the foundation for citizenship. After holding permanent residence for 5 years (part of the 8-year total qualifying residence), citizenship application is possible with B1 Croatian language proficiency.",
      pathToPR: "N/A — permanent residence IS the PR status in Croatia.",
      pathToCitizenship:
        "Permanent Residence → Hold for 5 years (8 years total qualifying Croatian residence) → B1 Croatian language test → Civic knowledge → Citizenship application to Ministry of Interior → Croatian Citizen",
      timelineToPR: "N/A",
      timelineToCitizenship: "5 years holding PR (total 8 years qualifying) + 1–3 years processing",
      probabilityToPR: -1,
      probabilityToCitizenship: 48,
      probabilityNote:
        "For established Croatian PR holders who pursue citizenship, approval rates are approximately 65–70%. The 48% accounts for the significant portion who don't pursue citizenship despite qualifying. Dual citizenship is permitted. Source: Croatian Ministry of Interior citizenship data.",
    },
    "Croatian Citizenship by Descent": {
      fullName: "Croatian Citizenship by Descent (Hrvatsko državljanstvo po podrijetlu)",
      description:
        "Croatian citizenship transmits by jus sanguinis through either parent. Children born to Croatian citizens are Croatian at birth regardless of birthplace. Croatia has a notable simplified naturalization for ethnic Croats abroad — particularly Bosnian Croats and diaspora in Germany, Austria, Australia, and the Americas — allowing them to obtain Croatian citizenship without residing in Croatia. Dual citizenship is permitted.",
      pathToPR: "N/A — citizenship by descent bypasses permanent residence.",
      pathToCitizenship:
        "Confirm Croatian citizen ancestor → Document Croatian lineage → Apply at Croatian consulate or Ministry of Interior → Receive Croatian citizenship certificate → Croatian identity documents and passport",
      timelineToPR: "N/A",
      timelineToCitizenship: "Automatic at birth (children of Croatian parents); 6 months – 2 years for diaspora/descent claims",
      probabilityToPR: -1,
      probabilityToCitizenship: 82,
      probabilityNote:
        "Croatian citizenship by descent is well-established and reliable, particularly for the large Bosnian Croat diaspora. The 82% reflects documentation challenges for more distant diaspora (particularly in South America and Australia). Source: Croatian Ministry of Interior diaspora citizenship statistics.",
    },
  },
};

const estonia = {
  id: "estonia",
  name: "Estonia",
  flagEmoji: "🇪🇪",
  region: "Europe",
  permanentResidence: {
    officialName: "Permanent Residence Permit / EU Long-Term Resident Permit (Alaline elamisluba / Pikaajalise elaniku elamisluba)",
    criteria: [
      "Have legally and continuously resided in Estonia for at least 5 years",
      "Student permit time counts toward the 5-year threshold under the EU Long-Term Residence Directive",
      "Stable legal income (at least the Estonian subsistence minimum per month per household member)",
      "Registered place of residence in Estonia (via e-Residency or in-person registration)",
      "Estonian language proficiency at B1 level for permanent residence (higher standard than most EU countries — Estonian is a Finno-Ugric language)",
      "Knowledge of Estonian constitution and the Citizenship Act",
    ],
    routes: [
      {
        name: "Student Visa → Work Permit → Permanent Residence",
        visaTypes: ["Student Visa (Estonia)", "Work Permit (Estonia)"],
        description:
          "International students at Estonian universities (University of Tartu, Tallinn University of Technology, Tallinn University) receive a student residence permit. Estonia has become a digital innovation hub — Tartu is ranked among Europe's top tech ecosystems. Student permit time counts toward the 5-year EU LTR threshold. Estonia's startup ecosystem (Skype, TransferWise/Wise, Pipedrive all founded in Estonia) creates genuine tech job opportunities.",
        estimatedDuration: "~5 years total (student time counts toward 5-year EU LTR threshold)",
      },
      {
        name: "Work Permit / Startup Visa → Permanent Residence",
        visaTypes: ["Work Permit (Estonia)"],
        description:
          "Non-EU nationals with a job offer in Estonia earning at least the average Estonian wage can obtain a residence permit for employment. Estonia has an annual immigration quota for non-EU/EEA nationals (0.1% of Estonia's population — approximately 1,300 new permits per year), though EU Blue Card holders and certain categories are quota-exempt. Estonia's tech industry frequently sponsors skilled workers. After 5 years qualifying residence, permanent residence is available.",
        estimatedDuration: "5 years continuous qualifying residence for EU LTR / permanent residence",
      },
      {
        name: "EU Blue Card (Estonia) → Permanent Residence",
        visaTypes: ["EU Blue Card (Estonia)"],
        description:
          "Estonia's EU Blue Card is available to highly qualified workers with a job offer paying at least 1.5× the average gross Estonian wage. The Blue Card is quota-exempt (significant advantage given Estonia's tight annual immigration quota). After 5 years qualifying residence (student time counts), permanent residence is available.",
        estimatedDuration: "5 years qualifying residence for permanent residence",
      },
    ],
  },
  citizenship: {
    officialName: "Estonian Citizenship (Eesti kodakondsus)",
    criteria: [
      "Have resided in Estonia on the basis of a permanent residence permit for at least 8 years (5 years of which must be on permanent residence basis)",
      "Demonstrate Estonian language proficiency at B1 level (oral and written — Estonian is notably difficult for non-Finno-Ugric speakers)",
      "Pass Estonian civics test (knowledge of Estonian constitution, laws, and history)",
      "Have a legal and stable source of income",
      "Loyalty to the Estonian state",
      "IMPORTANT: Estonia does NOT permit dual citizenship for naturalized citizens — applicants must renounce their previous citizenship before receiving Estonian citizenship. This is one of the strictest dual-citizenship policies in the EU.",
    ],
    routes: [
      {
        name: "Naturalization – General (8-Year PR Requirement)",
        visaTypes: ["Permanent Residence (Estonia)"],
        description:
          "Non-EU nationals who have been on a permanent residence basis for at least 8 years and lived continuously in Estonia can apply for citizenship. The B1 Estonian language test is a significant barrier — Estonian is a Finno-Ugric language unrelated to Indo-European languages, making it very difficult for most foreign nationals. The strict dual-citizenship prohibition means applicants must renounce their existing nationality, making this one of the most demanding citizenship paths in the EU.",
        estimatedDuration: "8 years residence (with 5 years on permanent permit) + 1–2 years processing",
      },
      {
        name: "Citizenship by Descent",
        visaTypes: ["Estonian Citizenship by Descent"],
        description:
          "Estonian citizenship transmits by descent through either parent. Children of Estonian citizens are Estonian at birth. There is also a 'restoration of citizenship' path for descendants of citizens who held Estonian citizenship before 1940 (pre-Soviet occupation) — this is a notable provision given Estonia's Soviet-era history. Citizenship by descent does not require renouncing other nationalities for those who acquired it by descent (dual citizenship is permitted for those who received it by descent, not by naturalization).",
        estimatedDuration: "Automatic at birth; consular registration 2–12 months",
      },
    ],
  },
  visaDetails: {
    "Student Visa (Estonia)": {
      fullName: "Estonian Student Residence Permit (Õpilase elamisluba)",
      description:
        "Non-EU students at Estonian accredited higher education institutions receive a student residence permit valid for the program duration. Estonia's tech-forward university ecosystem (University of Tartu — ranked among Europe's top 400; TalTech — strong in engineering and IT) is a draw for tech-minded international students. Estonia's e-Residency program (digital citizenship for non-residents) also attracts digitally-focused individuals who may pursue actual physical residence. Student permit time counts toward the 5-year EU LTR threshold.",
      pathToPR:
        "Student Visa → Study at Estonian university → Graduate → Find qualifying job → Work Permit → Accumulate 5 years total qualifying residence (student + work time) → Permanent Residence Permit (EU LTR equivalent)",
      pathToCitizenship:
        "Student Visa → Work Permit → Permanent Residence (5 years) → 8 years qualifying (on permanent permit basis) → B1 Estonian language + civics → Renounce prior citizenship → Estonian Citizen",
      timelineToPR: "~5 years total (student time counts toward 5-year threshold)",
      timelineToCitizenship: "11–14 years total",
      probabilityToPR: 45,
      probabilityToCitizenship: 8,
      probabilityNote:
        "Estonia's tech sector provides real employment opportunities, supporting a reasonable 45% PR probability. The 8% citizenship probability is exceptionally low due to three compounding factors: (1) the Estonian language requirement (B1 in a language considered one of the world's most difficult for non-Finno-Ugric speakers); (2) the mandatory renunciation of prior nationality; (3) the 8-year permanent residence requirement. Most long-term residents in Estonia prefer to maintain EU LTR status without pursuing citizenship. Source: Estonian Police and Border Guard Board (PPA) immigration statistics.",
    },
    "Work Permit (Estonia)": {
      fullName: "Estonian Work Permit (Tööluba / Elamisluba töötamiseks) → Permanent Residence",
      description:
        "Estonia's immigration quota (approximately 1,300 new permits/year for non-EU nationals) is a significant constraint. However, IT specialists, engineers, and other highly qualified workers are frequently quota-exempt or prioritized. Estonia's average monthly salary is approximately €2,000–2,500 (one of the highest in the Baltic states). Work permit holders must earn at least the average Estonian wage. After 5 years qualifying continuous residence, permanent residence (alaline elamisluba) is available.",
      pathToPR:
        "Job offer at average Estonian wage level → Employer applies for work residence permit → Receive permit → Work continuously → Renew annually → After 5 years qualifying residence → Permanent Residence Permit",
      pathToCitizenship:
        "Work Permit → Permanent Residence (5 years qualifying) → 8 years permanent permit basis residence → B1 Estonian → Civics test → Renounce prior nationality → Estonian Citizen",
      timelineToPR: "5 years continuous qualifying residence",
      timelineToCitizenship: "8 years on permanent permit basis + 1–2 years processing",
      probabilityToPR: 55,
      probabilityToCitizenship: 10,
      probabilityNote:
        "Estonia's tech sector employment is stable and the 55% PR probability reflects successful long-term employment. Citizenship remains very low (10%) due to the language barrier and mandatory renunciation requirement. Source: Estonian PPA immigration data.",
    },
    "EU Blue Card (Estonia)": {
      fullName: "Estonian EU Blue Card → Permanent Residence",
      description:
        "Estonia's EU Blue Card is quota-exempt and available to highly qualified workers with a job offer at 1.5× the average gross Estonian wage. IT professionals, data scientists, and engineers from non-EU countries commonly use this route. The Blue Card provides flexibility and family reunification rights (spouse gets work authorization). After 5 years qualifying residence, permanent residence is available.",
      pathToPR:
        "Higher education + job offer at 1.5× average salary → EU Blue Card → Work in Estonia → After 5 years qualifying residence (student time counts) → Permanent Residence",
      pathToCitizenship:
        "Blue Card → Permanent Residence → 8 years permanent permit residence → B1 Estonian + civics → Renounce prior citizenship → Estonian Citizen",
      timelineToPR: "5 years qualifying residence",
      timelineToCitizenship: "8 years on permanent basis + processing",
      probabilityToPR: 58,
      probabilityToCitizenship: 12,
      probabilityNote:
        "Blue Card holders in Estonia's tech sector have strong employment continuity and slightly better citizenship prospects than standard work permit holders (higher self-selection for long-term commitment). Still low due to language and renunciation barriers. Source: Estonian PPA Blue Card data.",
    },
    "Permanent Residence (Estonia)": {
      fullName: "Estonian Permanent Residence Permit (Alaline elamisluba) → Citizenship Eligibility",
      description:
        "Estonian permanent residence (alaline elamisluba) grants the right to live and work in Estonia indefinitely, full access to social services, and the ability to sponsor family members. The permanent residence permit does NOT automatically grant citizenship — an additional 8-year residence period (on the basis of the permanent permit) plus language and civics tests are required. Crucially, naturalization requires renouncing prior citizenship — a major deterrent.",
      pathToPR: "N/A — permanent residence IS the PR status in Estonia.",
      pathToCitizenship:
        "Permanent Residence → Reside 8 years on permanent permit basis → Pass B1 Estonian language test (oral + written) → Pass Estonian civics and constitutional knowledge test → Submit citizenship application to Police and Border Guard Board → Renounce prior citizenship → Receive Estonian citizenship certificate → Estonian Citizen",
      timelineToPR: "N/A",
      timelineToCitizenship: "8 years on permanent permit + 1–2 years processing",
      probabilityToPR: -1,
      probabilityToCitizenship: 22,
      probabilityNote:
        "For Estonian permanent residents who do pursue citizenship, the approval rate at the administrative level is approximately 75–80%. However, the 22% overall probability accounts for the very large proportion of permanent residents who choose not to apply — primarily due to the mandatory renunciation of prior nationality. The Estonian language test failure rate is also significant (approximately 25–30% of applicants fail on the first attempt). Source: Estonian PPA citizenship data, Statistics Estonia.",
    },
    "Estonian Citizenship by Descent": {
      fullName: "Estonian Citizenship by Descent (Sünnijärgne kodakondsus)",
      description:
        "Estonian citizenship transmits by jus sanguinis through either parent. Children born to Estonian citizens are Estonian at birth regardless of birthplace. A notable provision: descendants of citizens who held Estonian citizenship before the Soviet occupation (before June 16, 1940) can restore their citizenship without naturalizing — this 'restoration' path does not require Estonian language proficiency and does not require renouncing prior nationalities. This has been an important path for Estonian diaspora communities in Sweden, Canada, Australia, and the US.",
      pathToPR: "N/A — citizenship by descent bypasses permanent residence.",
      pathToCitizenship:
        "Confirm Estonian citizen parent or pre-1940 Estonian citizen ancestor → Document lineage → Submit application to Police and Border Guard Board → Receive Estonian citizenship certificate → Estonian identity documents and passport",
      timelineToPR: "N/A",
      timelineToCitizenship: "Automatic at birth (children of Estonian citizens); 6 months – 2 years for restoration claims",
      probabilityToPR: -1,
      probabilityToCitizenship: 80,
      probabilityNote:
        "Estonian citizenship by descent and restoration are well-established. The 80% reflects the occasional documentation gap for diaspora, particularly for pre-1940 lineage claims. Dual citizenship is permitted for descent/restoration cases (unlike naturalization). Source: Estonian PPA citizenship statistics.",
    },
  },
};

const latvia = {
  id: "latvia",
  name: "Latvia",
  flagEmoji: "🇱🇻",
  region: "Europe",
  permanentResidence: {
    officialName: "Permanent Residence Permit / EU Long-Term Resident Permit (Pastāvīgās uzturēšanās atļauja / ES pastāvīgā iedzīvotāja statuss)",
    criteria: [
      "Have legally and continuously resided in Latvia for at least 5 years",
      "Student permit time counts toward the 5-year threshold under the EU Long-Term Residence Directive",
      "Stable legal income (at least the Latvian minimum wage)",
      "Registered place of residence in Latvia",
      "Basic Latvian language proficiency (A2 level required for permanent residence application)",
      "Latvia has an annual immigration quota for non-EU/EEA nationals (0.2% of Latvia's population — approximately 3,800 new permits/year), with exemptions for highly qualified workers",
    ],
    routes: [
      {
        name: "Student Visa → Work Permit → Permanent Residence",
        visaTypes: ["Student Visa (Latvia)", "Work Permit (Latvia)"],
        description:
          "International students at Latvian universities (University of Latvia, Riga Technical University, Rīga Stradiņš University — popular for medicine) receive student residence permits. Student permit time counts toward the 5-year EU LTR threshold. Riga's growing fintech and IT sectors provide post-graduation employment opportunities.",
        estimatedDuration: "~5 years total (student time counts toward 5-year EU LTR threshold)",
      },
      {
        name: "Work Permit → Permanent Residence",
        visaTypes: ["Work Permit (Latvia)"],
        description:
          "Non-EU nationals with a job offer in Latvia can obtain a work residence permit. Latvia's annual immigration quota (approximately 3,800 permits for non-EU nationals) applies, with quota-exemptions for EU Blue Card holders, highly qualified workers, and family members. IT, financial services, and transport/logistics are key employers. After 5 years qualifying residence, EU LTR status is available.",
        estimatedDuration: "5 years continuous qualifying residence for EU LTR",
      },
      {
        name: "Investment Residence → Permanent Residence",
        visaTypes: ["Investment Permit (Latvia)"],
        description:
          "Latvia's investment residence permit is granted to non-EU nationals who invest in qualifying assets: real estate (€250,000+ outside Riga, €500,000+ in Riga), company shares (€50,000+ with 5+ employees and capital of €10,000+), or subordinated credit to a Latvian bank (€280,000+). The permit is valid for 5 years and renewable. After 5 years qualifying residence, permanent residence is available.",
        estimatedDuration: "5-year permit (renewable); permanent residence after 5 years qualifying residence",
      },
    ],
  },
  citizenship: {
    officialName: "Latvian Citizenship (Latvijas pilsonība)",
    criteria: [
      "Have held permanent residence in Latvia for at least 5 years and total qualifying residence of at least 10 years",
      "Demonstrate Latvian language proficiency at B1 level (oral and written — Latvian is a Baltic Indo-European language, distinct from other European languages)",
      "Knowledge of Latvian history, national anthem, and constitutional rights",
      "Loyal to Latvia and its democratic order",
      "No criminal convictions for intentional crimes",
      "IMPORTANT: Latvia generally does NOT permit dual citizenship for naturalized citizens (exceptions include EU/NATO member state dual citizens and specific bilateral agreements). This is a significant barrier to naturalization.",
    ],
    routes: [
      {
        name: "Naturalization – General (10-Year Residence)",
        visaTypes: ["Permanent Residence (Latvia)"],
        description:
          "Non-EU nationals who have held permanent residence for at least 5 years (total qualifying Latvian residence at least 10 years) can apply for citizenship by naturalization. The B1 Latvian language test and Latvian history/civics exam are required. Most significantly, Latvia generally prohibits dual citizenship for naturalized citizens — applicants must renounce prior nationality (with limited exceptions for EU state citizens). This makes Latvian citizenship significantly less attractive than other EU options.",
        estimatedDuration: "10 years qualifying residence (5 years holding PR) + 1–2 years processing",
      },
      {
        name: "Citizenship by Descent / Restoration",
        visaTypes: ["Latvian Citizenship by Descent"],
        description:
          "Latvian citizenship transmits by descent. Descendants of Latvian citizens (registered citizens before June 17, 1940 — the Soviet occupation date) can restore or confirm Latvian citizenship without naturalizing, and without language requirements or renunciation of other nationalities. This path is similar to Estonia's restoration provision and is relevant for Latvia's large diaspora in the US, Australia, Germany, and the UK.",
        estimatedDuration: "Automatic at birth (children of Latvian citizens); 6 months – 2 years for descent/restoration claims",
      },
    ],
  },
  visaDetails: {
    "Student Visa (Latvia)": {
      fullName: "Latvian Student Residence Permit (Uzturēšanās atļauja studijām)",
      description:
        "Non-EU students at Latvian accredited higher education institutions receive a student residence permit. Rīga Stradiņš University is particularly popular for EU-recognized medical degrees in English (tuition approximately €12,000–14,000/year). Riga Technical University and University of Latvia are strong in IT and engineering. Student permit time counts toward the 5-year EU LTR threshold.",
      pathToPR:
        "Student Visa → Study at Latvian university → Graduate → Find qualifying employment → Work Permit → Accumulate 5 years total qualifying residence (student + work) → EU Long-Term Resident Permit / Permanent Residence",
      pathToCitizenship:
        "Student Visa → Work Permit → Permanent Residence (5 years) → 10 years total qualifying residence → B1 Latvian + civics → Renounce prior nationality (generally) → Latvian Citizen",
      timelineToPR: "~5 years total (student time counts toward 5-year threshold)",
      timelineToCitizenship: "12–15 years total",
      probabilityToPR: 40,
      probabilityToCitizenship: 8,
      probabilityNote:
        "Latvia's job market has grown in IT and finance, supporting post-graduate employment. The 40% PR probability accounts for significant departure of international graduates to higher-wage EU countries. The 8% citizenship probability reflects the dual-citizenship prohibition (requiring renunciation) and B1 Latvian language requirement. Source: Office of Citizenship and Migration Affairs (OCMA) Latvia statistics.",
    },
    "Work Permit (Latvia)": {
      fullName: "Latvian Work Residence Permit → Permanent Residence",
      description:
        "Latvia's work residence permits are quota-bound for most non-EU nationals (annual quota ~3,800), with exemptions for highly qualified workers (earning at least twice the average Latvian gross wage). IT, fintech, shared services, and transport/logistics are the main non-EU employing sectors. After 5 years qualifying continuous residence, EU Long-Term Resident status is available.",
      pathToPR:
        "Job offer in Latvia → Employer sponsors work residence permit → Receive permit → Work continuously → Renew → After 5 years qualifying residence → EU LTR / Permanent Residence",
      pathToCitizenship:
        "Work Permit → EU LTR (5 years qualifying) → 10 years total qualifying residence → B1 Latvian + civics → Generally renounce prior nationality → Latvian Citizen",
      timelineToPR: "5 years continuous qualifying residence",
      timelineToCitizenship: "10 years qualifying + 1–2 years processing",
      probabilityToPR: 48,
      probabilityToCitizenship: 10,
      probabilityNote:
        "Latvia's growing economy supports employment continuity. The 10% citizenship probability is very low due to the dual-citizenship prohibition and language barrier. Source: Latvian OCMA data.",
    },
    "Investment Permit (Latvia)": {
      fullName: "Latvian Investment Residence Permit → Permanent Residence",
      description:
        "Latvia's investment residence program requires qualifying investment in Latvian real estate (€250,000–500,000 depending on location), company shares, or bank subordinated credit. The 5-year permit is renewable. Latvia's investment program is smaller than Greece's or Malta's Golden Visa programs but offers EU Schengen access. After 5 years qualifying residence, permanent residence is available.",
      pathToPR:
        "Qualifying investment → Apply for investment residence permit → 5-year permit → Reside in Latvia → After 5 years qualifying residence → Permanent Residence",
      pathToCitizenship:
        "Investment Permit → Permanent Residence (5 years) → 10 years total qualifying → B1 Latvian → Renounce prior nationality → Latvian Citizen",
      timelineToPR: "5 years qualifying residence",
      timelineToCitizenship: "10 years qualifying + processing",
      probabilityToPR: 60,
      probabilityToCitizenship: 12,
      probabilityNote:
        "Investment-based permanent residence is achievable with maintained investment. Citizenship is unlikely for most investors due to the renunciation requirement. Source: Latvian OCMA investment permit data.",
    },
    "Permanent Residence (Latvia)": {
      fullName: "Latvian Permanent Residence (EU LTR) → Citizenship Eligibility",
      description:
        "Latvia's permanent residence (EU Long-Term Resident status) grants unrestricted labor market access, social benefits parity, and EU mobility rights. Holding permanent residence for 5 years (total qualifying residence of 10 years) opens the citizenship path — with the major barrier being the dual-citizenship prohibition for most naturalized citizens.",
      pathToPR: "N/A — permanent residence IS the PR status in Latvia.",
      pathToCitizenship:
        "Permanent Residence → Hold 5 years (total 10 years qualifying) → B1 Latvian language + civics test → Renounce prior citizenship (generally required) → Submit naturalization application to OCMA → Presidential decision → Latvian Citizen",
      timelineToPR: "N/A",
      timelineToCitizenship: "5 years holding PR (total 10 years qualifying) + 1–2 years processing",
      probabilityToPR: -1,
      probabilityToCitizenship: 25,
      probabilityNote:
        "For Latvian PR holders who pursue citizenship, approval rates at the administrative level are approximately 75%. The 25% overall figure reflects the very large majority who choose not to apply due to the renunciation requirement. Source: Latvian OCMA naturalization statistics.",
    },
    "Latvian Citizenship by Descent": {
      fullName: "Latvian Citizenship by Descent / Restoration",
      description:
        "Latvian citizenship transmits by jus sanguinis. Descendants of citizens registered before June 17, 1940 (Soviet occupation date) can restore citizenship without language requirements and without renouncing other nationalities — dual citizenship IS permitted for restoration cases. This is the preferred path for the large Latvian diaspora in the US, Australia, Sweden, and Germany. For children born after Latvia's independence restoration (1991) to Latvian citizen parents, citizenship is automatic.",
      pathToPR: "N/A — citizenship by descent bypasses permanent residence.",
      pathToCitizenship:
        "Confirm Latvian citizen parent or pre-1940 registered ancestor → Document lineage → Application to OCMA or Latvian consulate → Citizenship certificate → Latvian identity documents and passport",
      timelineToPR: "N/A",
      timelineToCitizenship: "Automatic at birth (children of Latvian citizens); 6 months – 2 years for diaspora descent claims",
      probabilityToPR: -1,
      probabilityToCitizenship: 78,
      probabilityNote:
        "Descent/restoration citizenship is reliable for those with documented Latvian ancestry. The 78% reflects documentation challenges, particularly for families displaced during the Soviet era. Source: Latvian OCMA statistics.",
    },
  },
};

const lithuania = {
  id: "lithuania",
  name: "Lithuania",
  flagEmoji: "🇱🇹",
  region: "Europe",
  permanentResidence: {
    officialName: "Permanent Residence Permit / EU Long-Term Resident Permit (Nuolatinio gyvenimo leidimas / ES ilgalaikio gyventojo leidimas gyventi)",
    criteria: [
      "Have legally and continuously resided in Lithuania for at least 5 years",
      "Student permit time counts toward the 5-year threshold under the EU Long-Term Residence Directive",
      "Stable income (at least the Lithuanian minimum monthly wage per household member)",
      "Registered place of residence in Lithuania",
      "Basic Lithuanian language proficiency (A1 level sufficient for EU LTR; higher for permanent residence)",
      "Lithuania's annual immigration quota for non-EU/EEA nationals applies (0.2% of Lithuania's population), with exemptions for highly qualified workers",
    ],
    routes: [
      {
        name: "Student Visa → Work Permit → Permanent Residence",
        visaTypes: ["Student Visa (Lithuania)", "Work Permit (Lithuania)"],
        description:
          "International students at Lithuanian universities (Vilnius University, Kaunas University of Technology, Lithuanian University of Health Sciences) receive student residence permits. Lithuania's universities, particularly in Vilnius, offer increasingly English-medium programs. Student permit time counts toward the 5-year EU LTR threshold. Lithuania's IT and fintech sectors (Vilnius is among Europe's fastest-growing fintech hubs) provide post-graduation employment.",
        estimatedDuration: "~5 years total (student time counts toward 5-year EU LTR threshold)",
      },
      {
        name: "Work Permit / EU Blue Card → Permanent Residence",
        visaTypes: ["Work Permit (Lithuania)"],
        description:
          "Non-EU nationals with qualifying job offers in Lithuania can obtain work residence permits. Lithuania's fintech sector (hosting operations of Revolut, Railsr, and major payment processors after Brexit) and IT/gaming industry (Wargaming, Nord Security/NordVPN) create demand for skilled workers. After 5 years qualifying residence, EU LTR status is available.",
        estimatedDuration: "5 years continuous qualifying residence for EU LTR; citizenship after 10 years total",
      },
    ],
  },
  citizenship: {
    officialName: "Lithuanian Citizenship (Lietuvos pilietybė)",
    criteria: [
      "Have legally resided in Lithuania for at least 10 years and held permanent residence for at least 5 years",
      "Demonstrate Lithuanian language proficiency at B1 level",
      "Knowledge of Lithuanian constitution and history",
      "Loyal to Lithuania",
      "No criminal convictions for intentional crimes",
      "IMPORTANT: Lithuania generally prohibits dual citizenship for naturalized citizens (with exceptions for EU/NATO member state dual nationals and specific cases). The Lithuanian Constitutional Court has ruled dual citizenship is generally incompatible with the Constitution — a significant barrier to naturalization.",
    ],
    routes: [
      {
        name: "Naturalization – General (10-Year Residence)",
        visaTypes: ["Permanent Residence (Lithuania)"],
        description:
          "Non-EU nationals who have legally resided in Lithuania for at least 10 years and held permanent residence for at least 5 years can apply for citizenship. The B1 Lithuanian language test and constitutional knowledge test are required. The dual-citizenship prohibition for most naturalized citizens (requiring renunciation of prior nationality) is the primary deterrent. Processing takes 1–2 years.",
        estimatedDuration: "10 years qualifying residence (5 years PR) + 1–2 years processing",
      },
      {
        name: "Citizenship by Descent",
        visaTypes: ["Lithuanian Citizenship by Descent"],
        description:
          "Lithuanian citizenship transmits by descent. Children of Lithuanian citizens are Lithuanian at birth. Descendants of Lithuanian citizens who were deported during the Soviet era or emigrated before Lithuanian independence restoration (1990) can reclaim Lithuanian citizenship — with dual citizenship permitted for these restoration cases. This has been used by the large Lithuanian diaspora in the US, UK, Ireland, and Germany.",
        estimatedDuration: "Automatic at birth; 6 months – 2 years for diaspora descent claims",
      },
    ],
  },
  visaDetails: {
    "Student Visa (Lithuania)": {
      fullName: "Lithuanian Student Residence Permit (Leidimas gyventi studijų tikslu)",
      description:
        "Non-EU students at Lithuanian accredited higher education institutions receive student residence permits. Lithuania's universities offer increasingly international programs, particularly in Vilnius and Kaunas. The Lithuanian University of Health Sciences (LUHS) in Kaunas is popular for EU-recognized medical and dental degrees in English. Student permit time counts toward the 5-year EU LTR threshold.",
      pathToPR:
        "Student Visa → Study at Lithuanian university → Graduate → Find qualifying employment → Work Permit → Accumulate 5 years total qualifying residence (student + work time) → EU Long-Term Resident Permit",
      pathToCitizenship:
        "Student Visa → Work Permit → Permanent Residence (5 years) → 10 years total qualifying residence → B1 Lithuanian + civics → Renounce prior nationality (generally) → Lithuanian Citizen",
      timelineToPR: "~5 years total (student time counts toward 5-year threshold)",
      timelineToCitizenship: "12–15 years total",
      probabilityToPR: 42,
      probabilityToCitizenship: 7,
      probabilityNote:
        "Lithuania's fintech and IT sectors support post-graduation employment. The 42% PR probability accounts for significant emigration of graduates to higher-wage EU countries. The 7% citizenship probability reflects the dual-citizenship prohibition (renunciation required), B1 Lithuanian language requirement, and the 10-year total residence commitment. Source: Lithuanian Migration Department statistics.",
    },
    "Work Permit (Lithuania)": {
      fullName: "Lithuanian Work Residence Permit → Permanent Residence",
      description:
        "Lithuania's work residence permits require employer sponsorship and (for most occupations) a labor market test. Lithuania's fintech sector — hosting over 100 licensed payment and e-money institutions post-Brexit — and IT/gaming industry are active employers of non-EU nationals. After 5 years qualifying continuous residence, EU Long-Term Resident status is available. The annual immigration quota applies (with exemptions for highly qualified workers).",
      pathToPR:
        "Job offer → Employer applies for work residence permit → Labor market test (if required) → Receive permit → Work continuously → After 5 years qualifying residence → EU Long-Term Resident Permit",
      pathToCitizenship:
        "Work Permit → EU LTR (5 years qualifying) → 10 years total qualifying → B1 Lithuanian + civics → Renounce prior nationality → Lithuanian Citizen",
      timelineToPR: "5 years continuous qualifying residence",
      timelineToCitizenship: "10 years qualifying + 1–2 years processing",
      probabilityToPR: 50,
      probabilityToCitizenship: 9,
      probabilityNote:
        "Lithuania's fintech hub status supports employment continuity for qualified workers. The 9% citizenship probability is very low due to the dual-citizenship prohibition and language barrier. Source: Lithuanian Migration Department data.",
    },
    "Permanent Residence (Lithuania)": {
      fullName: "Lithuanian Permanent Residence (EU LTR) → Citizenship Eligibility",
      description:
        "Lithuania's permanent residence (EU Long-Term Resident permit) grants unrestricted labor market access, social security parity, and EU mobility rights. After 10 years of total qualifying residence (5 years on permanent basis), citizenship by naturalization is possible — but the dual-citizenship prohibition remains a major deterrent for most applicants.",
      pathToPR: "N/A — permanent residence IS the PR status in Lithuania.",
      pathToCitizenship:
        "Permanent Residence → 10 years total qualifying Lithuanian residence (5 years on permanent basis) → B1 Lithuanian language test → Constitutional knowledge test → Renounce prior citizenship (generally required) → Apply to Migration Department → Presidential decree → Lithuanian Citizen",
      timelineToPR: "N/A",
      timelineToCitizenship: "10 years total qualifying (5 years PR) + 1–2 years processing",
      probabilityToPR: -1,
      probabilityToCitizenship: 22,
      probabilityNote:
        "For Lithuanian PR holders who do pursue citizenship, approval rates are approximately 70%. The 22% overall probability accounts for the ~70% of qualifying PR holders who choose not to apply due to renunciation requirements and language barriers. Source: Lithuanian Migration Department citizenship statistics.",
    },
    "Lithuanian Citizenship by Descent": {
      fullName: "Lithuanian Citizenship by Descent / Restoration",
      description:
        "Lithuanian citizenship transmits by jus sanguinis. Descendants of Lithuanian citizens who were deported by the Soviet regime or emigrated before 1940 (or between 1940–1990 under Soviet occupation) can restore Lithuanian citizenship — with dual citizenship permitted for these restoration cases. This has been an important path for the large Lithuanian-American, Lithuanian-British, and Lithuanian-Irish diaspora communities. Dual citizenship is permitted for those who acquired citizenship by descent or restoration (not by naturalization).",
      pathToPR: "N/A — citizenship by descent bypasses permanent residence.",
      pathToCitizenship:
        "Confirm Lithuanian citizen ancestor → Document Lithuanian lineage (birth/marriage certificates, deportation/emigration records) → Apply to Migration Department or Lithuanian consulate → Citizenship restoration/confirmation → Lithuanian identity documents and passport",
      timelineToPR: "N/A",
      timelineToCitizenship: "Automatic at birth (children of Lithuanian citizens); 6 months – 2 years for diaspora/restoration claims",
      probabilityToPR: -1,
      probabilityToCitizenship: 75,
      probabilityNote:
        "Lithuanian citizenship restoration has high success rates for documented diaspora. The 75% accounts for documentation gaps, particularly for Soviet-era deportees whose records were altered. Source: Lithuanian Migration Department statistics.",
    },
  },
};

data.countries.push(...[bulgaria, croatia, estonia, latvia, lithuania]);
fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
console.log(`Added Bulgaria, Croatia, Estonia, Latvia, Lithuania. Total: ${data.countries.length}`);
