const fs = require("fs");
const path = require("path");
const filePath = path.join(__dirname, "../data/countries.json");
const data = JSON.parse(fs.readFileSync(filePath, "utf8"));

const newCountries = [
  {
    id: "italy",
    name: "Italy",
    flagEmoji: "🇮🇹",
    region: "Europe",
    permanentResidence: {
      officialName: "Permesso di Soggiorno UE per Soggiornanti di Lungo Periodo (EU Long-Term Residence Permit)",
      criteria: [
        "Have legally and continuously resided in Italy for at least 5 years on a valid residence permit",
        "Not have been absent from Italy for more than 6 consecutive months or 10 months in total during the qualifying period",
        "Have sufficient income (at least the Italian minimum social pension — approximately €6,947/year in 2024)",
        "Have adequate housing",
        "Have passed the Italian language test (A2 level minimum for the long-term permit; higher for citizenship)",
        "Have no criminal convictions that constitute a threat to public order"
      ],
      routes: [
        {
          name: "Student Visa → Job Seeker Permit Pipeline",
          visaTypes: ["Student Visa (Italy)", "Job Seeker Permit (Italy)"],
          description: "International students who complete a degree at an Italian university can apply for a 1-year residence permit for job seeking (permesso per attesa occupazione). Italy's universities include globally ranked institutions (La Sapienza, Bologna, Politecnico di Milano) with growing English-language programs. Key challenge: Italy's Decreto Flussi (annual immigration quota) system for work permits is highly restrictive — non-EU workers often must wait for their country's annual quota to open, creating a bottleneck. After finding qualifying work and accumulating 5 years of legal residence, the EU Long-Term Residence Permit is available.",
          estimatedDuration: "9–13 years: 3–4 years study + 1 year job search + 5 years work residence"
        },
        {
          name: "EU Blue Card → Permesso di Soggiorno UE",
          visaTypes: ["EU Blue Card (Italy)"],
          description: "Italy's EU Blue Card is available to highly qualified non-EU workers with a salary of at least €35,000/year (the lower threshold for shortage occupations) or higher for general roles. The EU Blue Card bypasses Italy's restrictive Decreto Flussi quota system — a significant advantage. After 5 years of legal residence including Blue Card time, the EU Long-Term Residence Permit is available.",
          estimatedDuration: "5 years qualifying residence + processing"
        },
        {
          name: "Work Visa (Nulla Osta) → Permesso di Soggiorno",
          visaTypes: ["Work Visa (Italy)"],
          description: "The standard route for non-EU workers requires a Nulla Osta al Lavoro (authorization to work) under Italy's Decreto Flussi annual quota system. Quotas by country and sector are released annually — they typically open in early January and are oversubscribed within hours (the 'click day' phenomenon). After securing a Nulla Osta, the worker applies for a visa and then a residence permit (permesso di soggiorno). After 5 years of continuous legal residence, the EU Long-Term Residence Permit is available.",
          estimatedDuration: "5 years continuous qualifying work residence (though Decreto Flussi delays can add 1–2 years to start)"
        },
        {
          name: "Family – Ricongiungimento Familiare → Permesso di Soggiorno",
          visaTypes: ["Family Reunification Visa (Italy)"],
          description: "Family members of Italian citizens or legal residents (spouses, minor children, dependent parents) can join through family reunification (ricongiungimento familiare). The sponsor must demonstrate adequate income and housing. The family member receives a 2-year residence permit renewable for 3 years. After 5 years of continuous legal residence, the EU Long-Term Residence Permit is available. Spouses of Italian citizens can apply for citizenship after 2 years of marriage and legal residence in Italy.",
          estimatedDuration: "5 years for EU Long-Term Residence; 2 years of marriage to Italian citizen for citizenship"
        },
        {
          name: "Investor – Investor Visa → Permesso di Soggiorno",
          visaTypes: ["Investor Visa (Italy)"],
          description: "Italy's Investor Visa (Visto per Investitori) requires qualifying investment: €500,000 in an Italian company of strategic interest (€250,000 for innovative startups); €1,000,000 charitable donation to a public-interest project in Italy; or €2,000,000 in Italian government bonds. The initial 2-year visa is renewable for 3-year periods as a residence permit. After 5 years of qualifying residence, the EU Long-Term Residence Permit is available.",
          estimatedDuration: "5 years qualifying residence + processing"
        }
      ]
    },
    citizenship: {
      officialName: "Cittadinanza Italiana (Italian Citizenship)",
      criteria: [
        "Have legally resided in Italy for at least 10 years (4 years for EU citizens; 5 years for recognized refugees and stateless persons; 2 years for spouses of Italian citizens who have resided in Italy for at least 2 years or abroad for 3 years)",
        "Demonstrate Italian language proficiency (B1 level — required since 2018)",
        "Have sufficient income (above the social poverty threshold)",
        "Have no criminal convictions or pending proceedings incompatible with Italian citizenship",
        "Italy generally permits dual citizenship — there is no requirement to renounce your existing nationality"
      ],
      routes: [
        {
          name: "Naturalization – General (10-Year Rule)",
          visaTypes: ["Permesso di Soggiorno UE (Italy)"],
          description: "After 10 years of continuous legal residence in Italy, non-EU/EEA nationals can apply for Italian citizenship by naturalization. Requires B1 Italian language proficiency (demonstrated via recognized language certificate such as CELI, CILS, or PLIDA). Processing times have historically been very long (3–4+ years) due to administrative backlog, though reforms are ongoing. Italy permits dual citizenship.",
          estimatedDuration: "10 years legal residence + 3–4 years citizenship processing (historically long backlog)"
        },
        {
          name: "Citizenship by Descent (Jus Sanguinis – Italian Ancestry)",
          visaTypes: ["Italian Citizenship by Descent"],
          description: "Italy has one of the world's most expansive citizenship-by-descent (jus sanguinis) frameworks — there is no generational limit. Any person who can demonstrate an unbroken line of Italian citizenship from an Italian ancestor (who had not naturalized in another country before their children were born) can claim Italian citizenship. This has resulted in millions of applications from descendants of Italian emigrants, particularly from Brazil, Argentina, the USA, and Australia. Italy permits dual citizenship.",
          estimatedDuration: "2–5+ years for consular/judicial processing; varies by country of application and documentation"
        }
      ]
    },
    visaDetails: {
      "Student Visa (Italy)": {
        fullName: "Italian Student Visa (Visto per Studio) → EU Long-Term Residence Pipeline",
        description: "Non-EU students attending accredited Italian universities apply for a study visa (visto per studio) at an Italian consulate. Major universities include La Sapienza (Rome), University of Bologna (world's oldest), Politecnico di Milano, and University of Milan. Tuition fees are modest at public universities (€0–€3,000/year based on family income for non-EU students at many institutions). After graduation, students can apply for a 1-year job-seeker permit. The main pipeline challenge is Italy's Decreto Flussi quota system, which can delay the transition to a work permit by 1–2 years. Some graduates pursue the EU Blue Card to bypass quota restrictions.",
        pathToPR: "Student Visa → Study in Italy → Graduate → Apply for 1-year job-seeker permit (permesso per attesa occupazione) → Find qualifying employment → If EU Blue Card eligible: apply directly. Otherwise: wait for Decreto Flussi quota → Obtain work permit → Accumulate 5 years continuous legal residence → Apply for EU Long-Term Residence Permit",
        pathToCitizenship: "Student Visa → Work Permit or Blue Card → EU Long-Term Residence → B1 Italian language certificate → 10-year naturalization → Italian Citizen (dual permitted)",
        timelineToPR: "9–13 years: 3–4 years study + 1 year job search + 5 years work residence (longer if Decreto Flussi delays apply)",
        timelineToCitizenship: "16–20 years total (10 years residence + 3–4 years processing backlog)",
        probabilityToPR: 22,
        probabilityToCitizenship: 14,
        probabilityNote: "Italy's Decreto Flussi quota system creates major attrition for non-EU graduates seeking work permits. Approximately 35% of international graduates remain; ~50% successfully navigate the quota system to obtain a work permit; ~80% accumulate 5 qualifying years; ~90% receive EU Long-Term Residence upon qualifying application. The 14% citizenship probability reflects the extremely long processing time (10+ years residence + 3–4 years processing = 13–17 years total from graduation), discouraging many eligible residents. Italy naturalizes approximately 130,000–160,000 people annually but primarily through jus sanguinis descent applications rather than residence-based naturalization. Source: Ministero dell'Interno immigration statistics."
      },
      "Job Seeker Permit (Italy)": {
        fullName: "Italian Job Seeker Permit (Permesso per Attesa Occupazione) → Work Permit",
        description: "Italian graduates from Italian universities or non-EU nationals who have completed studies and are seeking employment can obtain a 1-year job-seeker residence permit (permesso per attesa occupazione). This permits the holder to remain in Italy while seeking work. If employment is found within the year, the permit can be converted to a work residence permit — either a standard work permit (subject to Decreto Flussi) or an EU Blue Card (quota-exempt). The period counts toward the 5-year EU Long-Term Residence requirement.",
        pathToPR: "Apply for 1-year job-seeker permit → Seek employment → Find qualifying job → Convert to Work Permit or EU Blue Card → Accumulate 5 years qualifying residence → EU Long-Term Residence",
        pathToCitizenship: "Job Seeker → Work Permit → EU Long-Term Residence → 10-year naturalization → Italian Citizen",
        timelineToPR: "1 year job search + 5 years work residence = 6 years from graduation (if no Decreto Flussi delays)",
        timelineToCitizenship: "9–12 years from graduation to naturalization eligibility, plus 3–4 years processing",
        probabilityToPR: 38,
        probabilityToCitizenship: 18,
        probabilityNote: "Job-seeker permit holders in Italy who already graduated from Italian institutions have better language skills and local networks, improving conversion rates. However, Decreto Flussi quota constraints remain a significant barrier for many. Source: Ministero dell'Interno statistics."
      },
      "EU Blue Card (Italy)": {
        fullName: "Italian EU Blue Card (Carta Blu UE) → EU Long-Term Residence",
        description: "Italy's EU Blue Card is available to highly qualified non-EU nationals with a recognized higher education degree and a job offer with a salary of at least €29,120/year (lower threshold for shortage occupations; general threshold higher). Crucially, the EU Blue Card bypasses Italy's Decreto Flussi quota system — making it a significantly more accessible route than the standard work permit for qualifying professionals. After 5 years of legal residence including Blue Card time, the EU Long-Term Residence Permit is available.",
        pathToPR: "Secure job offer meeting salary threshold → Apply for EU Blue Card (no quota, processed by Sportello Unico per l'Immigrazione) → Work in Italy → Accumulate 5 years qualifying residence → Apply for EU Long-Term Residence Permit",
        pathToCitizenship: "EU Blue Card → EU Long-Term Residence → B1 Italian language → 10-year naturalization → Italian Citizen",
        timelineToPR: "5 years qualifying residence + processing",
        timelineToCitizenship: "13–17 years total (10 years + 3–4 years processing)",
        probabilityToPR: 55,
        probabilityToCitizenship: 28,
        probabilityNote: "EU Blue Card holders bypass the Decreto Flussi quota bottleneck, significantly improving their probability of starting the qualifying period. ~65% maintain continuous qualifying residence for 5 years; ~90% receive EU Long-Term Residence. The 28% citizenship probability is moderate despite the long route because Italy permits dual citizenship (removing the renunciation barrier). Source: Ministero dell'Interno EU Blue Card statistics."
      },
      "Work Visa (Italy)": {
        fullName: "Italian Work Visa (Visto per Lavoro – Decreto Flussi) → Permesso di Soggiorno",
        description: "The standard Italian work visa for non-EU nationals is subject to Italy's Decreto Flussi annual quota system. The government publishes annual quotas by nationality and sector — applications for the most popular nationalities are typically exhausted within hours of the quota 'click day' opening in January. Once a Nulla Osta al Lavoro is obtained, the worker applies for a visa and then the permesso di soggiorno. Italy has been increasing Decreto Flussi quotas in recent years (500,000 places over 2023–2025) due to labour shortages, but administrative processing remains slow.",
        pathToPR: "Employer applies for Nulla Osta during Decreto Flussi window → If quota available: receive Nulla Osta → Apply for work visa at Italian consulate → Arrive in Italy → Register at municipality + apply for permesso di soggiorno → Work and renew annually → After 5 years continuous legal residence → EU Long-Term Residence",
        pathToCitizenship: "Work Visa → EU Long-Term Residence → B1 Italian + 10 years → Naturalization → Italian Citizen",
        timelineToPR: "5 years continuous qualifying residence (often 1–2 years delayed by Decreto Flussi queue)",
        timelineToCitizenship: "13–17 years total",
        probabilityToPR: 42,
        probabilityToCitizenship: 22,
        probabilityNote: "Decreto Flussi quotas create significant pre-entry bottlenecks — many workers apply for years before successfully obtaining a Nulla Osta. Once in Italy, attrition from employer changes and the strict continuous residence requirement further reduce the probability. Source: Ministero del Lavoro Decreto Flussi statistics."
      },
      "Family Reunification Visa (Italy)": {
        fullName: "Italian Family Reunification Visa (Visto per Ricongiungimento Familiare) → EU Long-Term Residence",
        description: "Family members of Italian citizens or legal residents can join them through family reunification. The sponsor must have adequate income (approximately €6,947/year for 1 person; higher for additional dependants) and housing. The family member receives an initial 2-year residence permit. After 5 years of legal residence, the EU Long-Term Residence Permit is available. Spouses of Italian citizens can apply for citizenship after 2 years of marriage and legal residence in Italy (3 years if residing abroad).",
        pathToPR: "Sponsor applies for family reunification authorization → Family member applies for visa → Receive permesso di soggiorno per motivi familiari → Reside in Italy → After 5 years → EU Long-Term Residence",
        pathToCitizenship: "Family Visa → EU Long-Term Residence (or 2 years marriage to Italian citizen for citizenship) → B1 Italian → Naturalization → Italian Citizen",
        timelineToPR: "5 years qualifying residence",
        timelineToCitizenship: "2 years marriage to Italian citizen (accelerated); or 10 years + 3–4 years processing for general route",
        probabilityToPR: 68,
        probabilityToCitizenship: 40,
        probabilityNote: "Family reunification permit holders have strong settlement motivation. ~75% accumulate 5 qualifying years; ~90% receive EU Long-Term Residence upon qualifying. Spouses of Italian citizens have high naturalization rates through the 2-year marriage route. Source: Ministero dell'Interno family reunification statistics."
      },
      "Investor Visa (Italy)": {
        fullName: "Italian Investor Visa (Visto per Investitori) → EU Long-Term Residence",
        description: "Italy's Investor Visa targets high-net-worth individuals with significant investments in the Italian economy. Investment options: €500,000 in an Italian company of strategic national interest (€250,000 for innovative startups as designated by MISE); €1,000,000 donation to a public-interest project in Italian culture, education, or scientific research; €2,000,000 in Italian government bonds. Initial 2-year visa convertible to 2-year residence permit (renewable for 3 years). After 5 years of qualifying residence, EU Long-Term Residence is available.",
        pathToPR: "Commit qualifying investment → Apply for Investor Visa at Italian consulate → Arrive in Italy → Maintain investment → Convert to residence permit → After 5 years → EU Long-Term Residence",
        pathToCitizenship: "Investor Visa → EU Long-Term Residence → B1 Italian + 10 years → Naturalization → Italian Citizen",
        timelineToPR: "5 years qualifying residence",
        timelineToCitizenship: "13–17 years",
        probabilityToPR: 62,
        probabilityToCitizenship: 28,
        probabilityNote: "Investor visa holders who maintain their qualifying investment have a good probability of reaching EU Long-Term Residence. The 28% citizenship probability is moderate — the 10-year residence requirement and long processing times deter many investors. Source: Ministero degli Affari Esteri investor visa data."
      },
      "Permesso di Soggiorno UE (Italy)": {
        fullName: "Italian EU Long-Term Residence Permit (Permesso di Soggiorno UE per Soggiornanti di Lungo Periodo) → Citizenship",
        description: "The EU Long-Term Residence Permit (Carta di Soggiorno) is Italy's permanent residence status — valid for 5 years (renewable without conditions) and granting the right to work freely in any sector, access social services, and bring family members. Holders can also exercise EU-wide long-term residence rights (moving to other EU member states after 18 months). After 10 years of total legal residence in Italy, citizenship by naturalization is available.",
        pathToPR: "N/A — EU Long-Term Residence IS permanent residence in Italy.",
        pathToCitizenship: "Hold EU Long-Term Residence → Accumulate 10 years total legal residence in Italy → Obtain B1 Italian language certificate (CELI, CILS, PLIDA, or others) → Ensure sufficient income → Submit citizenship application to Prefettura → Processing (currently 2–4 years due to backlog) → Presidential Decree → Italian Citizen (dual citizenship permitted)",
        timelineToPR: "N/A",
        timelineToCitizenship: "10 years total legal residence + 2–4 years processing (significant administrative backlog in Italy)",
        probabilityToPR: -1,
        probabilityToCitizenship: 60,
        probabilityNote: "Among EU Long-Term Residence holders who apply for Italian citizenship (10-year general route), the approval rate is approximately 70–75%. The 60% estimate accounts for eligible residents who are deterred by the very long processing times (2–4 years) and the long 10-year residence requirement. Italy permits dual citizenship, which increases the naturalization appeal compared to countries requiring renunciation. Italy naturalizes approximately 130,000–160,000 people annually, but a large share are jus sanguinis descent applications. Source: Ministero dell'Interno citizenship statistics."
      },
      "Italian Citizenship by Descent": {
        fullName: "Italian Citizenship by Descent (Cittadinanza per Discendenza / Jus Sanguinis)",
        description: "Italy's jus sanguinis citizenship-by-descent law has no generational limit — any person who can prove an unbroken chain of Italian ancestry where the Italian ancestor did not naturalize in another country before their child's birth can claim Italian citizenship. This has generated enormous interest globally: millions of people of Italian descent in Argentina, Brazil, USA, Australia, and elsewhere have applied. Claims can be processed at Italian consulates (abroad) or Italian civil courts (in Italy). Processing times vary from 2 to 10+ years depending on consulate workload, with Italian courts offering a potentially faster (but more expensive) alternative.",
        pathToPR: "N/A — Italian citizenship by descent bypasses permanent residence.",
        pathToCitizenship: "Research Italian ancestor who held Italian citizenship → Confirm ancestor did not naturalize in another country BEFORE their child was born → Gather apostilled birth/marriage/death certificates tracing lineage → Apply at Italian consulate (abroad) or Italian court (in Italy via judicial appeal) → Processing → Italian Citizen",
        timelineToPR: "N/A",
        timelineToCitizenship: "2–10+ years depending on consulate backlog; Italian court route via attorney: 1–3 years (but costs €5,000–€15,000+).",
        probabilityToPR: -1,
        probabilityToCitizenship: 78,
        probabilityNote: "Well-documented jus sanguinis cases with clear lineage documentation have a high approval rate (~85–90%). The 78% accounts for cases where: the Italian ancestor naturalized before the child's birth (severing the line), documentation gaps, or consulate/court rejections for procedural reasons. Millions of jus sanguinis applications are pending globally — Italy processes approximately 50,000–100,000 descent-based citizenships annually. Source: Italian consular service citizenship data, Ministero dell'Interno."
      }
    }
  },
  {
    id: "ireland",
    name: "Ireland",
    flagEmoji: "🇮🇪",
    region: "Europe",
    permanentResidence: {
      officialName: "Stamp 4 (Long-Term Residence / Permission to Remain)",
      criteria: [
        "Have legally resided in Ireland for at least 5 years (60 months) of reckonable residence on qualifying permissions",
        "Stamp 4 is Ireland's 'de facto' permanent residence — it allows open work rights and is the standard precursor to citizenship",
        "Have maintained valid immigration status throughout the qualifying period",
        "Have no serious criminal convictions",
        "Note: Ireland does not have a formal EU Long-Term Residence Permit in the traditional sense — Stamp 4 serves this function"
      ],
      routes: [
        {
          name: "Student Visa → Graduate Scheme → Employment Permit Pipeline",
          visaTypes: ["Student Visa (Ireland)", "Stamp 1G Graduate Permit (Ireland)"],
          description: "International students who graduate from an Irish higher education institution (HEI) recognized by QQI at NFQ Level 8+ can apply for the Third Level Graduate Programme — Stamp 1G, valid for 12 months (24 months for PhD graduates). This allows them to seek employment without needing an employment permit. After finding qualifying employment (Critical Skills EP or General EP), they accumulate time toward Stamp 4 (5 years reckonable residence) and then citizenship (5 of 9 years with 1 continuous year immediately before application).",
          estimatedDuration: "9–13 years: 3–4 years study + 1–2 years Stamp 1G + 4–5 years employment permit toward 5-year Stamp 4 threshold"
        },
        {
          name: "Critical Skills Employment Permit → Stamp 4",
          visaTypes: ["Critical Skills Employment Permit (Ireland)"],
          description: "The Critical Skills Employment Permit (CSEP) is Ireland's flagship work permit for highly skilled workers in shortage occupations (IT, engineering, healthcare, finance, etc.) earning €32,000+ (degree required) or €64,000+ (any qualification). After 2 years on a CSEP, the holder automatically qualifies for Stamp 4, which grants open work rights with no employer restrictions. This is the fastest non-student path to Stamp 4 in Ireland.",
          estimatedDuration: "2 years on CSEP → Stamp 4 (fastest employment-based route)"
        },
        {
          name: "General Employment Permit → Stamp 4",
          visaTypes: ["General Employment Permit (Ireland)"],
          description: "The General Employment Permit (GEP) is for non-EEA nationals in jobs not covered by the CSEP, earning at least €34,000/year. Unlike the CSEP, GEP does not automatically lead to Stamp 4 after 2 years — GEP holders must typically work toward 5 years of reckonable residence before applying for Stamp 4 (unless they switch to a CSEP). The GEP has a labour market needs test requirement (the employer must advertise to EEA workers first).",
          estimatedDuration: "5 years reckonable residence on GEP toward Stamp 4"
        },
        {
          name: "Family – Dependent/Spouse of Irish Citizen or Permit Holder",
          visaTypes: ["Join Family Visa (Ireland)"],
          description: "Spouses, civil partners, and dependent children of Irish citizens or employment permit holders can join them in Ireland. Non-EEA spouses of Irish citizens receive a Stamp 4 (join family) permission, granting immediate open work rights without needing an employment permit. Spouses of Critical Skills Employment Permit holders also receive Stamp 1 (no permit needed). After qualifying residence, citizenship is available.",
          estimatedDuration: "Spouses of Irish citizens receive Stamp 4 immediately; citizenship requires 3 of 9 years for spouses of Irish citizens (1 continuous year before application)"
        },
        {
          name: "Start-up Entrepreneur Programme (STEP) → Stamp 4",
          visaTypes: ["Start-up Entrepreneur Permit (Ireland)"],
          description: "The Start-up Entrepreneur Programme (STEP) allows non-EEA entrepreneurs to move to Ireland to establish a high-potential startup. Requirements: a business concept with the potential for €1,000,000+ in annual turnover within 3–4 years and creating 10+ jobs in Ireland; €75,000 in funding (reduced from €50,000 for online/digital businesses). After 2 years with a demonstrated viable business, the entrepreneur receives Stamp 4. STEP is administered by Enterprise Ireland.",
          estimatedDuration: "2 years building the startup → Stamp 4 (if business targets met)"
        }
      ]
    },
    citizenship: {
      officialName: "Irish Citizenship (Saoránacht Éireann)",
      criteria: [
        "Have 5 years of reckonable residence in Ireland in the 9 years before applying (including 1 continuous year immediately before the date of application)",
        "Be of good character",
        "Be 18 years or older (or 15 if applying to be registered with an Irish citizen parent)",
        "Declare an intention to continue residing in Ireland or maintain an association with Ireland",
        "Ireland does NOT require renunciation of other nationalities — dual (or multiple) citizenship is fully permitted",
        "No Irish language test, no civic knowledge test required — Ireland's naturalization is relatively accessible"
      ],
      routes: [
        {
          name: "Naturalization – General (5-Year Reckonable Residence)",
          visaTypes: ["Stamp 4 (Ireland)"],
          description: "After accumulating 5 years of reckonable residence in Ireland in the 9-year window before the application (including at least 1 continuous year immediately before applying), any legal resident can apply for Irish citizenship by naturalization. Reckonable residence includes most visa categories except Stamp 3 (non-contributory pension), Stamp 0 (conditions attached), and time on a student visa beyond the first 12 months. Ireland's naturalization is notable for: no language test, no civic knowledge test, and no renunciation requirement.",
          estimatedDuration: "5 of 9 years reckonable residence (including 1 continuous year immediately before) + 12–24 months citizenship processing"
        },
        {
          name: "Citizenship by Descent (Born to Irish Citizen Parent)",
          visaTypes: ["Irish Citizenship by Descent"],
          description: "Ireland has a comprehensive citizenship-by-descent framework. First generation born abroad: a child born anywhere in the world to an Irish citizen parent who was born on the island of Ireland is automatically an Irish citizen at birth (no registration required). Second generation born abroad: a child whose parent was also born outside Ireland to an Irish citizen grandparent is entitled to Irish citizenship, but must be registered in the Foreign Births Register (FBR) before acquiring another citizenship that might supersede it. Ireland permits dual citizenship.",
          estimatedDuration: "Automatic from birth for first generation. Foreign Births Register for second+ generation: 1–3+ years processing (significant backlog)."
        }
      ]
    },
    visaDetails: {
      "Student Visa (Ireland)": {
        fullName: "Irish Student Visa → Third Level Graduate Programme → Employment Permit Pipeline",
        description: "Non-EEA students studying in Ireland on a student permission (Stamp 2) at a recognized institution (QQI-listed). Ireland is an attractive destination: English-language education, globally respected degrees, proximity to UK, and strong tech economy (home to European headquarters of Google, Meta, Apple, LinkedIn, etc.). Part-time work during studies is permitted (20 hours/week during term, 40 hours during holidays). After graduation from a QQI NFQ Level 8+ program, students apply for the Third Level Graduate Programme (Stamp 1G) — 12 months (24 months for PhD holders) to find qualifying employment.",
        pathToPR: "Student Visa (Stamp 2) → Study at QQI-recognized Irish HEI → Graduate at NFQ Level 8+ → Apply for Stamp 1G (12 months, or 24 months for PhD) → Find employment: Critical Skills EP (€32,000+ in shortage occupation) or General EP (€34,000+) → Stamp 1 (employment permit) → After 2 years CSEP: automatic Stamp 4. Or 5 years total reckonable residence → Stamp 4",
        pathToCitizenship: "Student Visa → CSEP → Stamp 4 → Accumulate 5 of 9 years reckonable residence (1 year continuous before application) → Apply for naturalization → Irish Citizen (dual permitted, no language test)",
        timelineToPR: "5–7 years: 3–4 years study (Stamp 2 time counts as reckonable) + 1–2 years Stamp 1G + 2 years CSEP = Stamp 4. OR 3 years study + 5 years toward reckonable total if on GEP.",
        timelineToCitizenship: "8–11 years from starting studies (5 reckonable years + 12–24 months processing)",
        probabilityToPR: 38,
        probabilityToCitizenship: 28,
        probabilityNote: "Ireland's strong tech economy and English-language environment give international graduates good employment prospects. Approximately 50% of international graduates seek to remain; ~70% find qualifying CSEP or GEP employment; ~80% accumulate 5 reckonable years for Stamp 4; ~90% receive Stamp 4 upon qualifying application. The 28% citizenship probability is relatively high because Ireland's naturalization has no language test and permits dual citizenship, removing major barriers. Ireland naturalizes approximately 20,000–30,000 people annually. Source: Department of Justice Ireland immigration statistics."
      },
      "Stamp 1G Graduate Permit (Ireland)": {
        fullName: "Irish Third Level Graduate Programme (Stamp 1G) → Employment Permit",
        description: "The Third Level Graduate Programme (Stamp 1G) allows non-EEA graduates of Irish higher education institutions to remain in Ireland for 12 months (24 months for PhD graduates) to seek employment. During this period, they may work without an employment permit (open work rights). The Stamp 1G counts as reckonable residence for Irish citizenship purposes. If qualifying employment is found, the holder transitions to a Critical Skills EP (fastest path to Stamp 4) or General EP.",
        pathToPR: "Apply for Stamp 1G within 3 months of graduation → Remain in Ireland → Work in any role while seeking qualifying employment → Find CSEP-qualifying job → Apply for CSEP (no labour market test needed) → 2 years CSEP → Stamp 4",
        pathToCitizenship: "Stamp 1G → CSEP → Stamp 4 → 5 reckonable years → Naturalization → Irish Citizen",
        timelineToPR: "1–2 years Stamp 1G + 2 years CSEP = ~3 years from graduation to Stamp 4",
        timelineToCitizenship: "5–7 years from graduation to citizenship (including processing)",
        probabilityToPR: 52,
        probabilityToCitizenship: 38,
        probabilityNote: "Stamp 1G holders have open work rights, increasing their ability to find any employment (including non-CSEP roles) while seeking qualifying positions. Ireland's tech sector is active in hiring non-EEA graduates. Approximately 65% of Stamp 1G holders find qualifying employment and transition to an employment permit. Source: Department of Enterprise, Trade and Employment Ireland statistics."
      },
      "Critical Skills Employment Permit (Ireland)": {
        fullName: "Irish Critical Skills Employment Permit (CSEP) → Stamp 4",
        description: "The CSEP is Ireland's premium work permit for highly skilled non-EEA workers in occupations on the Critical Skills Occupations List (IT, engineering, healthcare, finance, construction, etc.) or earning €64,000+ (any occupation). Key features: no labour market needs test required; after 2 years, automatic entitlement to Stamp 4 (open work rights, no employer restrictions); spouse/civil partner receives Stamp 1 (can work without a permit). The CSEP is employer-tied but can be changed between employers with a new CSEP. Minimum salary: €32,000 (listed occupations) or €64,000 (unlisted).",
        pathToPR: "Receive CSEP job offer at qualifying salary → Apply for employment permit → Arrive in Ireland (or switch from Stamp 1G/student) → Work for 2 years → Apply for Stamp 4 → Receive Stamp 4 with open work rights",
        pathToCitizenship: "CSEP → Stamp 4 → Accumulate 5 reckonable years in 9-year window + 1 continuous year → Apply for naturalization → Irish Citizen",
        timelineToPR: "2 years on CSEP → Stamp 4 (fastest employment-based PR in Ireland)",
        timelineToCitizenship: "5 of 9 years reckonable (including pre-Stamp 4 time on CSEP, which counts) + 12–24 months processing = approximately 5–7 years from first arrival",
        probabilityToPR: 68,
        probabilityToCitizenship: 45,
        probabilityNote: "CSEP holders are in Ireland's highest-demand occupations with strong employer sponsorship, leading to low attrition. ~75% of CSEP holders reach the 2-year Stamp 4 milestone. The 45% citizenship probability is high because Ireland's accessible naturalization (no language test, dual citizenship permitted) and relatively short citizenship timeline (5 reckonable years) encourage naturalization among well-integrated residents. Source: Department of Enterprise Ireland employment permit statistics."
      },
      "General Employment Permit (Ireland)": {
        fullName: "Irish General Employment Permit (GEP) → Stamp 4",
        description: "The General Employment Permit covers non-EEA nationals in jobs not on the Critical Skills list, earning at least €34,000/year. Unlike the CSEP, the GEP requires a labour market needs test (employer must advertise to EEA workers for 2 weeks). GEP holders do not automatically receive Stamp 4 after 2 years — they must accumulate 5 years of reckonable residence (GEP time counts). Spouses of GEP holders require their own employment permit (unlike CSEP spouses who get Stamp 1). After 5 years, Stamp 4 and citizenship eligibility are reached.",
        pathToPR: "Employer proves labour market test → Apply for GEP → Work in Ireland → Renew annually → After 5 years reckonable residence → Apply for Stamp 4",
        pathToCitizenship: "GEP → Stamp 4 → 5 reckonable years + 1 continuous year → Naturalization → Irish Citizen",
        timelineToPR: "5 years reckonable residence on GEP + processing",
        timelineToCitizenship: "6–8 years from arrival to citizenship",
        probabilityToPR: 52,
        probabilityToCitizenship: 35,
        probabilityNote: "GEP holders face more attrition than CSEP holders due to employer changes (requiring new permit applications) and the 5-year vs 2-year path. ~60% accumulate 5 reckonable years; ~90% receive Stamp 4 upon qualifying application. Source: Department of Enterprise Ireland employment permit statistics."
      },
      "Join Family Visa (Ireland)": {
        fullName: "Irish Join Family Visa → Stamp 4 / Citizenship",
        description: "Non-EEA spouses and civil partners of Irish citizens receive Stamp 4 immediately upon arrival (or upon conversion from a short-stay visa), granting open work rights. Spouses of Critical Skills EP holders receive Stamp 1 (can work without a permit). Dependent children receive Stamp 3. Family members of Irish citizens can apply for citizenship after just 3 years of reckonable residence (including 1 continuous year before application) — Ireland's shortest standard citizenship path.",
        pathToPR: "Irish citizen/CSEP holder sponsors non-EEA family member → Family member applies for Join Family Visa → Arrive in Ireland → Stamp 4 granted (for spouses of Irish citizens) → Open work rights immediately",
        pathToCitizenship: "Join Family Visa → Stamp 4 → 3 of 9 years reckonable (1 continuous year immediately before) for spouses of Irish citizens → Apply for naturalization → Irish Citizen (dual permitted)",
        timelineToPR: "Immediate Stamp 4 for spouses of Irish citizens",
        timelineToCitizenship: "3 years reckonable residence + 12–24 months processing for spouses of Irish citizens",
        probabilityToPR: 85,
        probabilityToCitizenship: 58,
        probabilityNote: "Spouses of Irish citizens have near-immediate Stamp 4 and one of the most accessible citizenship routes globally (3-year reckonable, no language test, dual citizenship). The 58% citizenship probability reflects that a significant portion of eligible family members do naturalize. Source: Department of Justice Ireland citizenship statistics."
      },
      "Start-up Entrepreneur Permit (Ireland)": {
        fullName: "Irish Start-up Entrepreneur Programme (STEP) → Stamp 4",
        description: "STEP is Enterprise Ireland's scheme for non-EEA entrepreneurs with high-potential business concepts. Requirements: an innovative business idea with potential for €1,000,000+ annual turnover in 3–4 years and 10 jobs created; at least €75,000 in startup funding (from investor, own funds, or a combination). Applications are assessed by Enterprise Ireland. Successful applicants receive a 2-year permission to establish their business in Ireland; after demonstrating business viability against targets, they receive Stamp 4. The spouse receives Stamp 1 (open work rights).",
        pathToPR: "Submit business concept to Enterprise Ireland → If approved: receive STEP permission → Establish business in Ireland → Demonstrate viability against agreed targets after 2 years → Receive Stamp 4",
        pathToCitizenship: "STEP → Stamp 4 → 5 reckonable years + 1 continuous → Naturalization → Irish Citizen",
        timelineToPR: "2 years building the startup → Stamp 4 (if business targets met)",
        timelineToCitizenship: "5 reckonable years + 12–24 months processing = ~6–8 years from arriving on STEP",
        probabilityToPR: 42,
        probabilityToCitizenship: 28,
        probabilityNote: "STEP approval rates from Enterprise Ireland are approximately 30–40% (highly competitive). Of those approved, approximately 60% demonstrate sufficient business viability after 2 years to receive Stamp 4. The 28% citizenship probability reflects the subset of STEP holders who persist through to citizenship. Source: Enterprise Ireland STEP programme statistics."
      },
      "Stamp 4 (Ireland)": {
        fullName: "Irish Stamp 4 (Long-Term Residence) → Citizenship",
        description: "Stamp 4 is Ireland's de facto permanent residence status — a permission to remain in Ireland without an employment permit, granting open work rights, access to social services, and the right to sponsor family. Stamp 4 is the standard route to Irish citizenship: after accumulating 5 years of reckonable residence in Ireland in the 9-year window before the application (including 1 continuous year immediately before applying), the holder can apply for naturalization. Ireland's citizenship process is notably accessible: no language test, no civic knowledge test, and dual citizenship is fully permitted.",
        pathToPR: "N/A — Stamp 4 IS permanent residence in Ireland.",
        pathToCitizenship: "Hold Stamp 4 (or other qualifying permission) → Accumulate 5 years reckonable residence in the 9 years before applying, including 1 continuous year immediately before → Submit naturalization application to the Department of Justice → Declaration of good character → Processing (12–24 months) → Receive certificate of naturalisation → Irish Citizen (dual nationality permitted, no ceremony required — certificate is sufficient)",
        timelineToPR: "N/A",
        timelineToCitizenship: "5 of 9 years reckonable residence + 12–24 months processing",
        probabilityToPR: -1,
        probabilityToCitizenship: 82,
        probabilityNote: "Ireland's naturalization has among the highest uptake rates in Europe because it has no language test requirement and fully permits dual citizenship. Among Stamp 4 holders who apply for citizenship, the approval rate is approximately 90–92%. The 82% estimate reflects both applicants and the subset of eligible residents who do not apply (mainly those who have not yet met the 5-year reckonable threshold or who are planning to return home). Ireland naturalized approximately 22,000–35,000 people per year in recent years. Source: Department of Justice Ireland citizenship statistics."
      },
      "Irish Citizenship by Descent": {
        fullName: "Irish Citizenship by Descent (Birthright / Foreign Births Register)",
        description: "Ireland's citizenship-by-descent framework: (1) Born on island of Ireland before 2005: automatically Irish. (2) Born outside Ireland to an Irish citizen parent who was BORN on the island of Ireland: automatically Irish from birth (no registration required). (3) Born outside Ireland to an Irish citizen parent who was ALSO born outside Ireland (second generation): entitled to register in the Foreign Births Register (FBR) before acquiring another citizenship that would supersede it. Important: registration in FBR must happen BEFORE the person acquires another nationality by choice (e.g., before naturalizing elsewhere). Ireland fully permits dual/multiple citizenship.",
        pathToPR: "N/A — Irish citizenship by descent bypasses permanent residence.",
        pathToCitizenship: "First generation (parent born on island of Ireland): automatic from birth — apply for Irish passport at Irish consulate. Second generation: Parent must be registered in FBR first → Then register yourself in FBR at the Department of Foreign Affairs → Processing → Irish Citizen. Note: FBR has a significant processing backlog (currently 2–3+ years).",
        timelineToPR: "N/A",
        timelineToCitizenship: "Automatic from birth for first generation; passport application 2–12 months. FBR registration for second generation: 2–3 years (current backlog).",
        probabilityToPR: -1,
        probabilityToCitizenship: 88,
        probabilityNote: "First-generation descent (parent born on island of Ireland) is effectively automatic — the 88% accounts for very rare administrative issues and the small fraction who voluntarily renounce Irish citizenship. Second-generation FBR registration has a lower success rate due to documentation requirements and the strict rule about registering before acquiring another nationality. Source: Department of Foreign Affairs Ireland Foreign Births Register statistics."
      }
    }
  }
];

data.countries.push(...newCountries);
fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
console.log("Added Italy and Ireland. Total countries:", data.countries.length);
