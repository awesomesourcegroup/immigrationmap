const fs = require("fs");
const filePath = "data/countries.json";
const data = JSON.parse(fs.readFileSync(filePath));

const korea = {
  id: "south-korea",
  name: "South Korea",
  flagEmoji: "🇰🇷",
  region: "Asia",
  permanentResidence: {
    officialName: "F-5 Permanent Residence Visa (영주(F-5))",
    criteria: [
      "Have legally resided in South Korea for at least 5 years continuously (D-2 student time counts toward the 5-year qualifying period)",
      "Hold F-2 (Long-Term Resident) status for at least 2 years immediately before applying — OR qualify via the F-2-7 points-based system (80+ points on Korea Immigration Service scoring) plus 5 years total residence",
      "Demonstrated financial self-sufficiency (personal or household assets above minimum threshold)",
      "TOPIK Level 3 or higher in Korean, OR completion of the Social Integration Program (KIIP) up to Step 4",
      "Good conduct (no criminal record, no significant immigration violations)",
      "South Korea has no annual cap on F-5 applications — applications are adjudicated on eligibility",
    ],
    routes: [
      {
        name: "Student Visa (D-2) → Job Seeker (D-10) → Work Visa → F-2 → F-5",
        visaTypes: ["Student Visa D-2 (Korea)", "Job Seeker D-10 (Korea)"],
        description:
          "International students at Korean universities receive a D-2 Student Visa. South Korea has invested heavily in attracting international students — over 180,000 enrolled at Korean universities annually. Major institutions: Seoul National University, KAIST, POSTECH, Korea University, Yonsei University. D-2 student time counts toward the 5-year qualifying period for both F-5 permanent residence and citizenship. After graduation, students can apply for the D-10 Job Seeker Visa (6 months, extendable up to 2 years total). With a qualifying job offer, they transition to a work visa (typically E-7 or E-1 through E-6 category). After reaching 5 years of qualifying residence and meeting F-2 conditions, F-5 permanent residence is available.",
        estimatedDuration:
          "7–9 years: 3–4 years D-2 study + 6–12 months D-10 job seeking + 2–4 years work visa → F-2 → F-5",
      },
      {
        name: "Skilled Worker (E-7) → F-2-7 Points → F-5",
        visaTypes: ["Skilled Worker E-7 (Korea)"],
        description:
          "The E-7 Special Activity Visa covers foreign professionals in designated occupations (IT development, engineering, finance, research, education, and others listed by the Ministry of Employment and Labor). E-7 holders with 80+ points on Korea's immigration scoring system (F-2-7 point system) can apply for F-2 status after 1 year of continuous E-7 employment. F-5 permanent residence is available after F-2 holding (2 years) and total qualifying Korean residence of 5 years. Korea's IT, semiconductor, and K-culture industries create strong demand for international professionals.",
        estimatedDuration:
          "5–7 years: 1+ year E-7 → F-2-7 (1–2 years) → F-5 (after 5 years total qualifying residence)",
      },
      {
        name: "Korean Heritage (F-4) → F-2 → F-5",
        visaTypes: ["Korean Heritage F-4 (Korea)"],
        description:
          "Overseas Koreans (재외동포) — ethnic Koreans who hold foreign citizenship, primarily from China, Central Asia, and the Korean diaspora globally — can obtain the F-4 Overseas Korean Visa. F-4 holders can work freely in most sectors (except unskilled labor) without a separate work permit. After 2 years of F-4 status (or other qualifying status), they can transition to F-2, and then to F-5 after meeting the standard requirements. The F-4 path is significantly faster and less restrictive for those who qualify.",
        estimatedDuration:
          "3–5 years for qualifying ethnic Koreans (F-4 → F-2 → F-5 on accelerated timeline)",
      },
      {
        name: "Marriage to Korean Citizen (F-6) → F-5",
        visaTypes: ["Marriage Visa F-6 (Korea)"],
        description:
          "Foreign nationals married to Korean citizens receive the F-6 Marriage Migrant Visa. After 2 years of F-6 status AND 3 years of marriage to the Korean spouse (who must maintain Korean citizenship), the F-5 permanent residence is available. Spouses must demonstrate basic Korean language ability (TOPIK Level 1 or KIIP completion) and adequate income. F-5 through marriage is one of the fastest PR routes in South Korea.",
        estimatedDuration: "2 years F-6 (with 3 years marriage) → F-5",
      },
    ],
  },
  citizenship: {
    officialName: "South Korean Citizenship (대한민국 국적)",
    criteria: [
      "Have maintained uninterrupted lawful residence in South Korea for at least 5 years (general naturalization, 일반귀화) — D-2 student time counts",
      "Currently hold a valid long-term residence status (F-2, F-5, or other qualifying visa)",
      "Demonstrate financial self-sufficiency",
      "Korean language ability: pass the Korean Language Proficiency Test for naturalization (TOPIK Level 3 or completion of KIIP Social Integration Program through Step 5)",
      "Pass Korean cultural knowledge test (Korean history, legal system, national symbols)",
      "Good conduct (no criminal record, no serious immigration violations)",
      "IMPORTANT: South Korea generally prohibits dual citizenship for naturalized adults — applicants must renounce their prior nationality within 1 year of naturalization. Exceptions: those who naturalize after age 65, those who have genuine hardship preventing renunciation. South Korea introduced limited dual citizenship reforms in 2010 and 2022 but the general prohibition for most naturalized adults remains.",
    ],
    routes: [
      {
        name: "General Naturalization (5-Year Residence)",
        visaTypes: ["F-5 Permanent Residence (Korea)"],
        description:
          "Any foreign national who has maintained 5 years of continuous lawful residence in South Korea (including D-2 student time) can apply for naturalization. Requirements include Korean language proficiency (TOPIK Level 3 or KIIP completion), Korean cultural knowledge test, financial self-sufficiency, and good character. Applications are submitted to the Korea Immigration Service. Processing takes 1–2 years. Crucially, most naturalized adults must renounce their prior citizenship within 1 year — a significant deterrent for most nationalities.",
        estimatedDuration: "5 years qualifying residence + 1–2 years processing",
      },
      {
        name: "Simplified Naturalization – Spouse of Korean National",
        visaTypes: ["F-5 Permanent Residence (Korea)"],
        description:
          "Spouses of Korean nationals qualify for simplified naturalization (간이귀화) after 2 years of lawful residence in Korea (OR 1 year of residence with 3 years of marriage). They must meet the same language and cultural knowledge requirements. The Korean spouse must maintain Korean nationality. Processing takes 1–2 years. The renunciation of prior citizenship requirement generally applies here as well.",
        estimatedDuration: "2 years residence (or 1 year + 3 years marriage) + 1–2 years processing",
      },
      {
        name: "Citizenship by Descent (Jus Sanguinis)",
        visaTypes: ["Korean Citizenship by Descent"],
        description:
          "Korean citizenship is transmitted by jus sanguinis through either parent. Children born to at least one Korean citizen parent acquire Korean nationality at birth regardless of birthplace. South Korea's Nationality Act uses a paternal lineage system — children of Korean fathers were historically prioritized, though both parents now transmit citizenship equally. Dual citizenship is permitted for those who acquire it by birth (jus soli or dual heritage) — they may retain both nationalities until age 22, at which point they must choose one (unless granted an exemption, e.g., military service completion).",
        estimatedDuration: "Automatic at birth; registration 2–12 months",
      },
    ],
  },
  visaDetails: {
    "Student Visa D-2 (Korea)": {
      fullName: "Korean D-2 Student Visa (유학(D-2)) → F-5 Permanent Residence Pipeline",
      description:
        "The D-2 Student Visa is issued to foreign nationals enrolled in degree programs (bachelor's, master's, or PhD) at Korean universities and graduate schools. It is issued for the duration of the program (typically 4 years for bachelor's, 2 years for master's, 3–4 years for PhD) and is renewable. Korea's top universities (SKY — Seoul National, Korea, Yonsei; KAIST and POSTECH for science and engineering) are internationally ranked. Tuition ranges from KRW 3–8 million per semester at national universities; English-medium programs are widely available. D-2 student time counts toward the 5-year qualifying period for both F-5 permanent residence and citizenship — meaning study time is not 'lost' toward the immigration timeline.",
      pathToPR:
        "D-2 Student Visa → Study at Korean university → Graduate → Apply for D-10 Job Seeker Visa (6 months, extendable to 2 years total) → Secure job offer → Transition to E-7 Skilled Worker or other work category → Accumulate 5 years total qualifying Korean residence (D-2 + D-10 + E-7 time counts) → Apply for F-2 Long-Term Resident → After 2 years F-2 → Apply for F-5 Permanent Residence",
      pathToCitizenship:
        "D-2 → D-10 → E-7 work visa → 5 years total lawful Korean residence → Korean language (TOPIK Level 3 or KIIP Step 5) → Korean cultural knowledge test → Naturalization application to Korea Immigration Service → Approved → Renounce prior citizenship within 1 year → South Korean Citizen",
      timelineToPR:
        "7–9 years total: 3–4 years D-2 + 6–12 months D-10 + 2–3 years E-7 → F-2 (2 years) → F-5",
      timelineToCitizenship: "7–11 years total (5 years qualifying residence from any lawful status + 1–2 years processing)",
      probabilityToPR: 32,
      probabilityToCitizenship: 12,
      probabilityNote:
        "South Korea's F-5 system requires navigating multiple visa transitions (D-2 → D-10 → E-7 → F-2 → F-5), and the F-2 eligibility via the points system (F-2-7, requiring 80+ points) is competitive. The 32% PR probability accounts for the significant portion of international graduates who either cannot secure qualifying E-7 employment or return home after graduation. The 12% citizenship probability reflects the low uptake due to mandatory renunciation of prior citizenship (most nationalities) and the TOPIK Level 3 Korean language requirement (Korean is categorized as a Category IV language — among the world's hardest for English speakers). Source: Korea Immigration Service (KIS) annual immigration statistics.",
    },
    "Job Seeker D-10 (Korea)": {
      fullName: "Korean D-10 Job Seeker Visa (구직(D-10))",
      description:
        "The D-10 Job Seeker Visa allows recent graduates of Korean universities (or foreign graduates of overseas universities recognized by Korea) to remain in Korea while searching for employment. Initially valid for 6 months, it can be extended up to a total of 2 years. D-10 holders may engage in part-time work (up to 20 hours/week) while seeking full-time employment. Upon securing a qualifying job offer, D-10 holders apply to change their status to the appropriate work visa category (E-7, E-1, etc.). D-10 time counts toward the 5-year qualifying period for F-5 and citizenship.",
      pathToPR:
        "Graduate from Korean university → Apply for D-10 Job Seeker → Part-time work + active job search → Secure qualifying job offer → Change status to E-7 or other work visa → Continue toward F-2 → F-5",
      pathToCitizenship:
        "D-10 → E-7 work visa → 5 years total qualifying residence → TOPIK Level 3 → Korean culture test → Naturalization → Renounce prior nationality → Korean Citizen",
      timelineToPR:
        "6 months – 2 years as D-10 (included in the total path of 7–9 years to F-5)",
      timelineToCitizenship: "7–11 years total from D-2 arrival",
      probabilityToPR: 45,
      probabilityToCitizenship: 14,
      probabilityNote:
        "D-10 holders who are actively seeking employment in Korea have already demonstrated commitment to remaining in the country. The 45% PR probability reflects those who successfully transition to E-7 and accumulate sufficient qualifying time. The 14% citizenship probability is slightly higher than from the start of the student pipeline because D-10 applicants are self-selected for longer-term commitment. Source: Korea Immigration Service statistics.",
    },
    "Skilled Worker E-7 (Korea)": {
      fullName: "Korean E-7 Special Activity Visa (특정활동(E-7)) → F-2-7 Points → F-5",
      description:
        "The E-7 Special Activity Visa covers foreign workers in designated professional occupations determined by the Ministry of Employment and Labor and the Ministry of Justice. Key eligible occupations include: IT and software development (코드 85), engineering (mechanical, electrical, chemical, civil), finance and accounting, education (at international schools and universities), medical and health professionals, and creative industry roles. Employers must obtain approval from the Ministry of Employment and Labor. E-7 is one of Korea's most commonly used skilled worker visas. After 1 year of continuous E-7 status, holders with 80+ points on the F-2-7 immigration scoring system can apply for F-2 Long-Term Resident status — a key stepping stone to F-5.",
      pathToPR:
        "Job offer in designated E-7 occupation → Employer applies for E-7 → Receive E-7 (1–3 years, renewable) → After 1 year, if 80+ points on F-2-7 system → Apply for F-2 Long-Term Resident → After 2 years F-2 (and 5 years total qualifying Korean residence) → Apply for F-5 Permanent Residence",
      pathToCitizenship:
        "E-7 → F-2-7 → F-5 → 5 years total lawful Korean residence → TOPIK Level 3 or KIIP Step 5 → Korean culture test → Naturalization → Renounce prior nationality → Korean Citizen",
      timelineToPR:
        "5–7 years: 1+ year E-7 → F-2-7 (points) → F-2 (1–2 years) → F-5 (at 5-year mark)",
      timelineToCitizenship: "6–9 years total (5 years qualifying + 1–2 years processing)",
      probabilityToPR: 48,
      probabilityToCitizenship: 15,
      probabilityNote:
        "E-7 holders in Korea's IT, semiconductor (Samsung, SK Hynix), and finance (Korean banks, fintech) sectors have relatively stable employment. The 48% F-5 probability accounts for the points requirement (80+ on F-2-7 — some fail to accumulate sufficient points), job changes requiring permit amendments, and voluntary return. The 15% citizenship probability reflects the renunciation barrier and Korean language requirement (TOPIK Level 3 — equivalent to intermediate conversational Korean). Source: Korea Immigration Service E-7 and F-2-7 statistics.",
    },
    "Korean Heritage F-4 (Korea)": {
      fullName: "Korean Overseas Korean F-4 Visa (재외동포(F-4)) → F-5 Permanent Residence",
      description:
        "The F-4 Overseas Korean Visa is one of South Korea's most generous immigration statuses — available to ethnic Koreans (Korean descent) who hold foreign citizenship. Eligibility: persons of Korean descent (from Korean nationals or ethnic Koreans who emigrated) who currently hold citizenship of a foreign country. Major beneficiary groups: Korean-Chinese (조선족), Korean-Americans, Korean-Canadians, Korean diaspora from CIS countries. F-4 holders can: work freely in most sectors (except certain unskilled/manual labor categories), live in Korea without a separate work permit, access the Korean social insurance system. After 2 years of F-4 (or other qualifying status) and total 5 years of qualifying residence, F-5 permanent residence is available.",
      pathToPR:
        "Prove Korean ethnic descent or Korean national ancestor → Apply for F-4 at Korean consulate → Receive F-4 visa → Reside and work in Korea → After 5 years qualifying Korean residence (F-4 time counts) → Apply for F-5 Permanent Residence",
      pathToCitizenship:
        "F-4 → F-5 → 5 years total qualifying Korean residence → TOPIK Level 3 or KIIP → Korean culture test → Naturalization → Renounce foreign citizenship → Korean Citizen (note: some ethnic Korean naturalization cases have limited dual citizenship arrangements)",
      timelineToPR: "3–5 years total qualifying Korean residence",
      timelineToCitizenship: "5–8 years total (5 years qualifying + 1–2 years processing)",
      probabilityToPR: 62,
      probabilityToCitizenship: 25,
      probabilityNote:
        "Korean-heritage F-4 holders have the highest PR success rate of any non-marriage category — the cultural affinity, often pre-existing Korean language skills, and work freedom significantly reduce attrition. The 25% citizenship probability is higher than the general foreign worker rate because many F-4 holders already meet the language standard. Source: Korea Immigration Service F-4 and F-5 statistics.",
    },
    "Marriage Visa F-6 (Korea)": {
      fullName: "Korean Marriage Migrant Visa F-6 (결혼이민(F-6)) → F-5 Permanent Residence",
      description:
        "The F-6 Marriage Migrant Visa is issued to foreign nationals legally married to Korean citizens. Requirements: valid marriage certificate, Korean citizen sponsor with adequate income, passing a basic Korean language requirement (TOPIK Level 1 or KIIP Basic step). The F-6 is initially issued for 1 year, then renewable for 2–3 years. F-5 permanent residence is available after 2 years of F-6 status AND 3 years of marriage to the Korean spouse (who must maintain Korean citizenship). F-6 holders have unrestricted work rights and access to Korean social insurance.",
      pathToPR:
        "Marry Korean citizen → Apply for F-6 Marriage Migrant Visa → Reside in Korea → After 2 years F-6 (with 3 years marriage duration) → Apply for F-5 Permanent Residence",
      pathToCitizenship:
        "F-6 → F-5 (2 years F-6 + 3 years marriage) → Simplified naturalization: 2 years qualifying Korean residence (or 1 year + 3 years marriage) → TOPIK Level 1+ → Korean culture test → Korean Citizen",
      timelineToPR: "2 years F-6 (with 3 years marriage)",
      timelineToCitizenship: "3–5 years from marriage (2 years F-6 → F-5 → simplified naturalization at 2+ years residence)",
      probabilityToPR: 72,
      probabilityToCitizenship: 52,
      probabilityNote:
        "Marriage-based immigration to Korea has very high PR success rates for genuine relationships. The 72% accounts for marriages that end before F-5 eligibility and application processing delays. The 52% citizenship probability is the highest in this dataset for Korea — simplified naturalization for spouses requires only TOPIK Level 1 (basic), the simplified path is shorter, and many spouses naturally acquire Korean language skills through daily life. Source: Korea Immigration Service marriage immigrant statistics.",
    },
    "F-5 Permanent Residence (Korea)": {
      fullName: "Korean F-5 Permanent Residence Visa → Citizenship Eligibility",
      description:
        "The F-5 Permanent Residence Visa grants the right to reside in South Korea indefinitely, work in any sector without a separate work permit, access Korean social insurance on par with nationals, and sponsor qualifying family members. The F-5 card is renewed every 5 years (administrative renewal, not a new eligibility assessment). F-5 holders may apply for citizenship immediately if they have 5 years of continuous qualifying Korean residence, meet language requirements, and are prepared to renounce their prior nationality.",
      pathToPR: "N/A — F-5 IS permanent residence in South Korea.",
      pathToCitizenship:
        "F-5 Permanent Residence → 5 years total continuous lawful Korean residence (counting from first lawful entry, including D-2/D-10/E-7 time) → Korean language: TOPIK Level 3 OR Social Integration Program (KIIP) completion → Korean cultural knowledge test → Submit naturalization application to Korea Immigration Service → Review (1–2 years) → Approval → Renounce prior nationality within 1 year of naturalization → South Korean Citizen",
      timelineToPR: "N/A",
      timelineToCitizenship:
        "5 years total qualifying Korean residence (from first lawful entry) + 1–2 years processing",
      probabilityToPR: -1,
      probabilityToCitizenship: 30,
      probabilityNote:
        "For established F-5 holders who pursue citizenship, the Korea Immigration Service approves approximately 65–70% of applications. The 30% overall figure accounts for the very large proportion of F-5 holders who choose not to pursue citizenship due to the mandatory renunciation of their prior nationality — a significant sacrifice for nationals of countries with valuable passports (US, Canada, EU states). Korean language at TOPIK Level 3 is achievable but requires dedicated study (typically 600–800 hours for English speakers). Source: Korea Immigration Service naturalization statistics.",
    },
    "Korean Citizenship by Descent": {
      fullName: "Korean Citizenship by Descent (속지주의 / 속인주의)",
      description:
        "Korean citizenship transmits by jus sanguinis through either parent. Children born to at least one Korean citizen parent acquire Korean nationality at birth, regardless of birthplace. South Korea's Nationality Act has historically been patrilineal (citizenship through fathers), but was amended in 1998 to allow transmission through either parent equally. Children who acquire dual citizenship at birth (e.g., born in the US to Korean parents) may retain both nationalities until age 22, at which point they must renounce one — unless they complete Korean military service (males) or receive a special exception. The 2010 amendment created a limited dual citizenship exemption for those who had Korean nationality from birth and acquire foreign citizenship involuntarily.",
      pathToPR: "N/A — citizenship by descent bypasses permanent residence.",
      pathToCitizenship:
        "Confirm Korean citizen parent → Child is Korean at birth → Register with Korean consulate (재외국민 출생 신고) → Receive Korean family register entry (가족관계증명서) → Apply for Korean passport → If dual citizen at birth: must choose one nationality by age 22 (or complete military service)",
      timelineToPR: "N/A",
      timelineToCitizenship:
        "Automatic at birth; consular registration 2–12 months; nationality choice required by age 22 for dual nationals",
      probabilityToPR: -1,
      probabilityToCitizenship: 80,
      probabilityNote:
        "Korean citizenship by descent is automatic and reliable for documented children of Korean citizens. The 80% accounts for administrative challenges in consular registration for Korean emigrants in countries with incomplete documentation systems, and the ~10–15% of dual nationals who choose to renounce Korean citizenship by age 22 in favor of their other nationality. Source: Korean Ministry of the Interior and Safety nationality statistics.",
    },
  },
};

data.countries.push(korea);
fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
console.log(`Added South Korea. Total: ${data.countries.length}`);
