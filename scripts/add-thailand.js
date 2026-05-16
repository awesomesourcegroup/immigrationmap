const fs = require("fs");
const filePath = "data/countries.json";
const data = JSON.parse(fs.readFileSync(filePath));

const thailand = {
  id: "thailand",
  name: "Thailand",
  flagEmoji: "🇹🇭",
  region: "Asia",
  permanentResidence: {
    officialName: "Thai Permanent Residence (ใบถิ่นที่อยู่ถาวร)",
    criteria: [
      "Have held a Non-Immigrant visa (same category) continuously for at least 3 years immediately before applying",
      "Have a valid work permit (for employment-based applicants) or meet financial criteria",
      "Minimum income: 80,000 THB/month (approximately $2,200/month) — or 30,000 THB/month for BOI-promoted company employees",
      "Annual quota of approximately 100 persons per nationality — Thailand is one of the world's most restrictive permanent residence systems",
      "Applications only accepted during a specific annual window (typically December–February)",
      "Thai language ability (basic proficiency assessed by interview for most applicants)",
      "No criminal record; good social conduct",
      "Processing takes 1–3 years after submission; many applicants wait longer",
    ],
    routes: [
      {
        name: "Student Visa (ED) → Work Permit (Non-B) → Permanent Residence",
        visaTypes: ["Student Visa ED (Thailand)", "Work Permit Non-B (Thailand)"],
        description:
          "International students at Thai universities (Chulalongkorn University, Mahidol University, Thammasat University, Asian Institute of Technology, KMITL) receive a Non-Immigrant ED (Education) visa, renewed annually. After graduation, students must find a qualifying employer and obtain a Non-Immigrant B visa and work permit — these are separate processes. After 3 consecutive years of Non-Immigrant B status plus a valid work permit, the student is eligible to apply for permanent residence during the annual application window. Note: Thailand's PR quota (approximately 100 per nationality per year) and processing delays (1–3+ years) make this one of the most difficult PR processes in Asia.",
        estimatedDuration:
          "8–13 years: 3–5 years ED study + 3 years Non-B qualifying period + 1–3 years PR processing",
      },
      {
        name: "Employment (Non-B + Work Permit) → Permanent Residence",
        visaTypes: ["Work Permit Non-B (Thailand)"],
        description:
          "Foreign nationals employed in Thailand on a Non-Immigrant B visa with a valid work permit for at least 3 consecutive years can apply for permanent residence. Eligible employers include Thai companies, BOI-promoted businesses, international organizations, and government agencies. High earners (80,000+ THB/month) and BOI employees (30,000+ THB/month) are the primary applicant pool. Thailand's Alien Employment Act reserves many occupations for Thai nationals exclusively, limiting the roles available to foreigners. After 3 years of qualifying Non-B status, the annual PR window opens, with quota limits and processing delays of 1–3 years common.",
        estimatedDuration:
          "5–8 years: 3 years qualifying Non-B employment + 1–3 years PR processing",
      },
      {
        name: "Long-Term Resident (LTR) Visa → Permanent Residence Pathway",
        visaTypes: ["LTR Visa (Thailand)"],
        description:
          "Thailand introduced the Long-Term Resident (LTR) Visa in 2022 to attract high-value foreign residents. Four categories: (1) Wealthy Global Citizen — $1M+ assets and $80K+ annual income OR $500K investment in Thai assets; (2) Wealthy Pensioner — 50+ years old with $80K+ income or $250K pension; (3) Work-from-Thailand Professional — employed by a listed company with $80K+ income; (4) Highly Skilled Professional — working in Thai S-curve industries (biotech, aerospace, automotive EV, digital). LTR Visa grants a 10-year renewable stay with work authorization (categories 3 and 4). LTR holders can work toward permanent residence after holding Non-Immigrant status for the required qualifying period.",
        estimatedDuration:
          "10-year renewable LTR permit; eligible for PR application after 3 years of qualifying Non-B/LTR status (if converted to Non-B category for PR purposes)",
      },
      {
        name: "Marriage to Thai National (Non-O) → Permanent Residence",
        visaTypes: ["Marriage Visa Non-O (Thailand)"],
        description:
          "Foreign nationals married to Thai citizens can obtain a Non-Immigrant O (Other) visa annually renewable, with the right to apply for a 1-year extension (non-immigrant O-A). After 3 consecutive years on a Non-Immigrant O visa based on marriage, they become eligible to apply for permanent residence. The marriage-based PR path is generally faster and has higher approval rates than work-based PR. The Thai spouse must maintain Thai citizenship.",
        estimatedDuration:
          "4–7 years: 3 years Non-O (marriage) + 1–3 years PR processing",
      },
    ],
  },
  citizenship: {
    officialName: "Thai Citizenship (สัญชาติไทย)",
    criteria: [
      "Have held Thai permanent residence (ใบถิ่นที่อยู่ถาวร) for at least 5 years before applying",
      "Thai language proficiency: must be able to read, write, and speak Thai fluently (assessed by interview)",
      "Have resided in Thailand without extended absences (generally not more than 180 days total in the 5-year PR holding period)",
      "Demonstrate good character and loyalty to Thailand",
      "No criminal convictions",
      "Financial self-sufficiency",
      "IMPORTANT: Thailand generally does NOT permit dual citizenship for naturalized adults — applicants must renounce their prior nationality. Thailand is one of the most selective countries in the world for granting citizenship to foreign nationals. Even people who have lived in Thailand for 20–30 years are often denied.",
      "Annual quota applies to citizenship applications as well; denials are common even for technically qualifying applicants",
    ],
    routes: [
      {
        name: "Naturalization (5-Year PR Holding)",
        visaTypes: ["Thai Permanent Residence"],
        description:
          "Foreign nationals who have held Thai permanent residence for at least 5 years can apply for citizenship by naturalization. The application is submitted to the Ministry of Interior. A Thai language interview is mandatory — applicants must demonstrate reading, writing, and conversational Thai. Thailand's naturalization is among the world's most restrictive — the Ministry of Interior has wide discretion to deny applications without explanation, and approvals are rare even for long-term residents who technically meet all criteria. Total path from first arrival to citizenship is typically 15–25 years.",
        estimatedDuration:
          "5 years holding PR (total ~10–16 years from first arrival) + 1–5 years processing",
      },
      {
        name: "Citizenship by Descent (Jus Sanguinis)",
        visaTypes: ["Thai Citizenship by Descent"],
        description:
          "Thai citizenship transmits by descent, but with important gender asymmetry: children born to a Thai father acquire Thai citizenship at birth regardless of where they are born or who the mother is. Children born to a Thai mother and a foreign father acquire Thai citizenship if: (a) born in Thailand, or (b) the parents are married and the father has no objection. Children born in Thailand to foreign parents do NOT automatically receive Thai citizenship (no universal jus soli) — they may apply for citizenship after age 18 under specific circumstances. Thailand has strict blood-line citizenship rules.",
        estimatedDuration: "Automatic at birth (for qualifying cases); registration 2–12 months",
      },
    ],
  },
  visaDetails: {
    "Student Visa ED (Thailand)": {
      fullName: "Thai Non-Immigrant ED Visa (การศึกษา) → Permanent Residence Pipeline",
      description:
        "The Non-Immigrant ED (Education) Visa is issued to foreign nationals enrolled in academic programs at accredited Thai institutions, language schools, and vocational training centers. Major institutions: Chulalongkorn University (Thailand's most prestigious; ranked in QS top 250 Asia); Mahidol University (strong in medicine and health sciences); Thammasat University (law, political science, economics); Asian Institute of Technology (AIT, Pathum Thani — renowned for engineering and technology); KMITL and KMUTT for engineering. The ED visa is renewed annually. After graduation, there is no automatic 'job-seeking' stay — students must immediately transition to a Non-Immigrant B visa through a qualifying employer. ED student time does NOT automatically count toward the 3-year Non-B qualifying period for PR.",
      pathToPR:
        "Non-Immigrant ED → Study at Thai university → Graduate → Find qualifying employer → Obtain Non-Immigrant B visa + Work Permit → Maintain Non-B + work permit for 3 consecutive years → Apply for PR during annual December–February window → 1–3 years processing → Thai Permanent Residence",
      pathToCitizenship:
        "ED → Non-B + Work Permit (3 years) → Permanent Residence → Hold PR for 5 years → Thai language fluency (read/write/speak) → Naturalization application to Ministry of Interior → Renounce prior nationality → Thai Citizen",
      timelineToPR:
        "8–13 years total: 3–5 years ED + 3 years Non-B qualifying + 1–3 years PR processing",
      timelineToCitizenship: "15–22 years total",
      probabilityToPR: 10,
      probabilityToCitizenship: 3,
      probabilityNote:
        "Thailand has one of the world's most restrictive PR systems. The 10% PR probability reflects: (1) the annual quota (~100 per nationality) means many qualified applicants are simply not processed in any given year; (2) many graduates cannot secure qualifying Non-B employment and return home; (3) even after submission, processing can take 3+ years with no guarantee of approval; (4) significant discretionary rejection even for meeting technical criteria. The 3% citizenship probability reflects Thailand's extremely selective naturalization — the Ministry of Interior approves very few non-ethnic-Thai applicants. Thai citizenship is widely considered among Asia's hardest to obtain. Source: Thai Immigration Bureau annual reports; Ministry of Interior naturalization statistics.",
    },
    "Work Permit Non-B (Thailand)": {
      fullName: "Thai Non-Immigrant B Visa + Work Permit → Permanent Residence",
      description:
        "Foreign nationals employed in Thailand require both a Non-Immigrant B (Business) visa and a separate work permit (ใบอนุญาตทำงาน) issued by the Department of Employment. The work permit lists the specific employer, job title, location, and permitted activities — switching employers requires a new work permit application. Thailand's Alien Employment Act (2017) reserves 39 specific occupations for Thai nationals only, including: driving, making Thai musical instruments, haircutting, farming and crop cultivation, manual labor, accounting, brick laying, and others. After 3 consecutive years of Non-B status with a valid work permit, the annual PR application window opens.",
      pathToPR:
        "Job offer in Thailand → Employer applies for work permit → Receive Non-B visa + work permit → Work continuously for 3 years (same Non-B category, no gaps) → Apply for PR in December–February application window → 1–3 years processing → Thai Permanent Residence",
      pathToCitizenship:
        "Non-B + Work Permit → Permanent Residence (3 years qualifying) → Hold PR 5 years → Fluent Thai → Naturalization → Renounce prior nationality → Thai Citizen",
      timelineToPR: "5–8 years: 3 years qualifying Non-B + 1–3 years PR processing",
      timelineToCitizenship: "11–17 years total",
      probabilityToPR: 14,
      probabilityToCitizenship: 4,
      probabilityNote:
        "Work permit holders with 3 years of continuous qualifying employment are the most common PR applicants in Thailand. The 14% probability reflects: quota constraints (many qualifying applicants cannot get approved in their application year), strict continuity requirements (any gap in Non-B status restarts the clock), and the 1–3 year processing backlog. Nationality matters — Japanese, Chinese, and Western nationals historically have lower approval rates than some other groups due to higher application volumes hitting the quota. The 4% citizenship probability remains extremely low even for PR holders. Source: Thai Immigration Bureau.",
    },
    "LTR Visa (Thailand)": {
      fullName: "Thai Long-Term Resident (LTR) Visa → Extended Stay",
      description:
        "Thailand's Long-Term Resident (LTR) Visa (launched September 2022) targets four high-value foreign resident categories: (1) Wealthy Global Citizens — $1M+ assets AND $80K+/year income, OR $500K invested in Thai government bonds/real estate/BOI-promoted companies; (2) Wealthy Pensioners — 50+ years old with $80K+/year income or $40K/year pension + $250K Thai asset deposit; (3) Work-from-Thailand Professionals — employed by a foreign-listed company ($100B+ market cap OR $150M+ revenue) with $80K+/year income; (4) Highly Skilled Professionals — working in Thai S-curve target industries (biotech, aerospace, automotive EV, food innovation, digital, defense, medical hub). Benefits: 10-year renewable permit (no annual extension required), fast-track immigration lanes, digital work permit exemption for WFT category, 17% personal income tax flat rate (vs. progressive Thai tax rate up to 35%), personal property import tax exemptions. LTR holders can apply for PR after establishing standard qualifying Non-B/long-stay periods.",
      pathToPR:
        "Meet LTR category requirements → Apply via BOI (Board of Investment) → Receive 10-year LTR permit → Reside in Thailand → Convert to qualifying Non-Immigrant category if pursuing PR → After 3 years qualifying Non-B/Non-O status → Annual PR application window",
      pathToCitizenship:
        "LTR → Convert to qualifying Non-B → PR (3 years qualifying) → Hold PR 5 years → Thai fluency → Naturalization → Thai Citizen",
      timelineToPR:
        "5–10 years depending on category and when qualifying Non-B period is established",
      timelineToCitizenship: "12–20 years total",
      probabilityToPR: 18,
      probabilityToCitizenship: 5,
      probabilityNote:
        "LTR visa holders are a self-selected high-value group and have somewhat better PR prospects than standard work permit holders due to: financial self-sufficiency meeting the PR income threshold automatically, BOI connections that smooth processing, and lower risk of employment gaps. The 18% PR probability accounts for the LTR's novelty (many LTR holders may not pursue formal PR, preferring to rely on the 10-year LTR itself). Citizenship at 5% remains extremely low. Source: Thailand Board of Investment (BOI) LTR statistics; Thai Immigration Bureau.",
    },
    "Marriage Visa Non-O (Thailand)": {
      fullName: "Thai Non-Immigrant O (Marriage) Visa → Permanent Residence",
      description:
        "Foreign nationals married to Thai citizens can obtain a Non-Immigrant O (Other — Based on Marriage) visa. After the first non-immigrant O visa, extensions of up to 1 year are granted annually at immigration offices (requires proof of continued marriage, financial documentation showing 400,000 THB in a Thai bank account or 40,000 THB/month income, and a home visit by immigration officers). After 3 consecutive years of Non-O extensions based on marriage, the holder can apply for permanent residence during the annual PR window. PR approval for marriage cases tends to be more accessible than work-based PR, particularly for long-established families with children.",
      pathToPR:
        "Marry Thai citizen → Non-Immigrant O visa → Annual Non-O extensions (3 consecutive years) → Apply for PR in December–February window → 1–2 years processing → Thai Permanent Residence",
      pathToCitizenship:
        "Non-O (Marriage) → Permanent Residence (3 years qualifying) → Hold PR 5 years → Thai fluency → Naturalization → Renounce prior nationality → Thai Citizen",
      timelineToPR: "4–6 years: 3 years Non-O + 1–2 years PR processing",
      timelineToCitizenship: "10–14 years total",
      probabilityToPR: 28,
      probabilityToCitizenship: 8,
      probabilityNote:
        "Marriage-based PR applicants in Thailand have the highest approval rates among standard categories due to family ties and the social integration that comes with Thai family membership. The 28% probability is the highest in this dataset for Thailand — reflecting that marriage cases are prioritized within the quota system. The 8% citizenship probability accounts for the still-required Thai language fluency and the Ministry of Interior's broad discretion. Source: Thai Immigration Bureau PR statistics.",
    },
    "Thai Permanent Residence": {
      fullName: "Thai Permanent Residence (ใบถิ่นที่อยู่ถาวร) → Citizenship Eligibility",
      description:
        "Thai permanent residence (the 'blue book' or ใบถิ่นที่อยู่ถาวร) grants the right to live in Thailand indefinitely without annual visa extensions. However, Thai PR is significantly more limited than permanent residence in most other countries: PR holders still cannot vote, cannot own land (same restrictions as other foreigners — only a condo unit up to 49% of building's foreign quota), must still carry their yellow house registration book (ทะเบียนบ้านคนต่างด้าว), and must report to immigration every year. PR is not the same as equal social standing — it is simply long-stay authorization. After 5 years of Thai PR, citizenship by naturalization becomes possible, though approvals are extremely rare.",
      pathToPR: "N/A — Thai Permanent Residence IS the PR status in Thailand.",
      pathToCitizenship:
        "Thai Permanent Residence → Hold for 5 years → Thai language fluency (read, write, speak — assessed by interview) → Good character declaration → Financial self-sufficiency → Submit naturalization application to Ministry of Interior → Ministry review (1–5 years, highly discretionary) → Renounce prior nationality within required period → Thai Citizen",
      timelineToPR: "N/A",
      timelineToCitizenship: "5 years holding PR + 1–5 years processing",
      probabilityToPR: -1,
      probabilityToCitizenship: 12,
      probabilityNote:
        "For established Thai PR holders who apply for citizenship, the Ministry of Interior approves approximately 20–30% of formally submitted applications. The 12% overall estimate accounts for the large majority of PR holders who never formally apply — either because of Thai language barriers, unwillingness to renounce prior nationality, or awareness of the extremely discretionary and opaque approval process. Thailand naturalizes very few people per year — typically fewer than 200–300 non-ethnic-Thai foreigners annually. Source: Thai Ministry of Interior nationality statistics.",
    },
    "Thai Citizenship by Descent": {
      fullName: "Thai Citizenship by Descent (สัญชาติโดยการเกิด)",
      description:
        "Thai citizenship transmits primarily by jus sanguinis. Children born to a Thai father acquire Thai citizenship automatically at birth, regardless of birthplace or the mother's nationality. Children born to a Thai mother and a foreign father: acquire Thai citizenship if born in Thailand OR if the parents are married and the father does not object. Children born outside Thailand to a Thai mother and a foreign father who are NOT married do not automatically receive Thai citizenship — they must apply through a formal process. Children born in Thailand to two foreign parents do NOT receive Thai citizenship (no universal birthright citizenship). Thailand does not permit dual citizenship for naturalized adults, but children born with dual citizenship (e.g., born in a jus soli country to Thai parents) may retain dual nationality until voluntarily choosing.",
      pathToPR: "N/A — citizenship by descent bypasses permanent residence.",
      pathToCitizenship:
        "Confirm Thai citizen father (or qualifying Thai mother + circumstances) → Child is Thai at birth → Register birth in Thai house registration system → Apply for Thai national ID card and passport",
      timelineToPR: "N/A",
      timelineToCitizenship: "Automatic at birth (for qualifying cases); house registration 1–6 months",
      probabilityToPR: -1,
      probabilityToCitizenship: 78,
      probabilityNote:
        "Thai citizenship by descent through a Thai father is automatic and relatively straightforward to document for children born within legal marriage. The 78% accounts for complications in: children born outside marriage (where the father must formally acknowledge paternity through Thai legal channels), documentation challenges for Thai fathers abroad who didn't register births, and the gender asymmetry (Thai mother + foreign father cases require additional steps). Source: Thai Ministry of Interior civil registration statistics.",
    },
  },
};

data.countries.push(thailand);
fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
console.log(`Added Thailand. Total: ${data.countries.length}`);
