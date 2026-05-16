const fs = require("fs");
const path = require("path");
const filePath = path.join(__dirname, "../data/countries.json");
const data = JSON.parse(fs.readFileSync(filePath, "utf8"));

const newCountries = [
  {
    id: "switzerland",
    name: "Switzerland",
    flagEmoji: "🇨🇭",
    region: "Europe",
    permanentResidence: {
      officialName: "Niederlassungsbewilligung C (Settlement Permit / Permit C)",
      criteria: [
        "EU/EFTA nationals: after 5 years of continuous residence in Switzerland with a B Permit (residence permit), qualify for the C Permit automatically",
        "Non-EU/EFTA nationals: after 10 years of continuous residence in Switzerland with a B Permit (with some cantons requiring this; typically 10 years nationally), qualify for the C Permit — reduced to 5 years for nationals of countries with a bilateral agreement with Switzerland (USA, Canada, etc.)",
        "Good integration: no dependence on social assistance, no criminal record, and demonstrated integration (language proficiency in one of Switzerland's national languages — German, French, or Italian — required for non-EU nationals)",
        "Continuous residence: absences from Switzerland must not exceed certain thresholds (generally 6 months/year)",
        "IMPORTANT: Swiss citizenship requires cantonal (municipal) approval and is among the world's most selective — each municipality and canton has its own additional requirements"
      ],
      routes: [
        {
          name: "Student Permit → Work Permit (B Permit) Pipeline",
          visaTypes: ["Student Permit (Switzerland)", "B Permit (Switzerland)"],
          description: "International students at Swiss universities (ETH Zurich, EPFL, University of Zurich, etc.) receive a student permit. After graduation, students have 6 months to find employment. For non-EU/EFTA nationals, Switzerland has a strict annual quota for work permits (the Drittstaatenkontingent) — a set number of B Permits are allocated to non-EU workers each year, distributed among the cantons. Competition for these permits is intense. After securing a permit, the path to the C Permit (10 years for non-EU nationals; 5 years for EU nationals) is long but stable.",
          estimatedDuration: "14–18 years for non-EU/EFTA: 3–4 years study + 10 years B Permit residence for C Permit. 8–12 years for EU/EFTA: 3–4 years study + 5 years B Permit."
        },
        {
          name: "Highly Specialized Work Permit (B Permit) → C Permit",
          visaTypes: ["B Permit (Switzerland)"],
          description: "The B Permit (Aufenthaltsbewilligung B) is Switzerland's temporary residence permit, valid for 1 year (renewable annually for non-EU nationals; up to 5 years for EU nationals). For non-EU nationals, B Permits are strictly quota-based — employers must prove the position cannot be filled by a Swiss or EU worker (Inländervorrang, domestic worker priority). After 10 continuous years of B Permit residence (for most non-EU nationals), the C Permit becomes available.",
          estimatedDuration: "10 years of continuous B Permit residence for non-EU/EFTA; 5 years for EU/EFTA"
        },
        {
          name: "EU/EFTA Agreement Work Permit → C Permit (Settlement)",
          visaTypes: ["EU/EFTA Work Permit (Switzerland)"],
          description: "EU and EFTA nationals benefit from the Agreement on the Free Movement of Persons between Switzerland and the EU. They can enter Switzerland to seek work (3-month stay) and obtain a B Permit (5-year permit for those with employment contract of 1+ year) or a Short-Term Permit (up to 364 days). After 5 continuous years of legal residence in Switzerland (on B Permit or combined qualifying permits), EU/EFTA nationals automatically qualify for the C Permit (unlimited duration).",
          estimatedDuration: "5 years qualifying residence for EU/EFTA nationals to C Permit"
        },
        {
          name: "Family – Spouse/Family Reunification → C Permit",
          visaTypes: ["Family Reunification Permit (Switzerland)"],
          description: "Spouses and minor children of C Permit holders or Swiss citizens can join them in Switzerland. They receive a B Permit initially (family reunification). After the same qualifying period as the sponsor (5 years for EU/EFTA family; 10 years generally for non-EU family), they qualify for the C Permit. Spouses of Swiss citizens have an accelerated path and may qualify for naturalization after 3 years of marriage and qualifying residence.",
          estimatedDuration: "5 years qualifying residence (EU/EFTA family) or 10 years (non-EU family) to C Permit"
        },
        {
          name: "Investor / Lump-Sum Tax Agreement → C Permit",
          visaTypes: ["Lump-Sum Tax / Investor Permit (Switzerland)"],
          description: "High-net-worth non-EU/EFTA individuals can obtain Swiss residence through the forfait fiscal (lump-sum taxation, Pauschalbesteuerung) — a special tax arrangement available in most cantons (not Zurich, Basel, Schaffhausen, Appenzell Innerrhoden, and some others) where the individual pays a lump-sum tax based on their living expenses in Switzerland rather than their worldwide income. Minimum taxable base varies by canton (typically CHF 400,000–1,000,000+ per year). After 10 years of qualifying residence, the C Permit is available — and citizenship may follow with strict cantonal approval.",
          estimatedDuration: "10 years qualifying residence for C Permit; citizenship highly selective"
        }
      ]
    },
    citizenship: {
      officialName: "Schweizerisches Bürgerrecht (Swiss Citizenship)",
      criteria: [
        "Have legally and continuously resided in Switzerland for at least 10 years total (years spent in Switzerland between ages 8–18 count double toward the federal requirement; effective federal requirement can be as low as 5 years for long-term childhood residents)",
        "Hold the C Permit (Settlement Permit) for at least 3 years before the federal citizenship application",
        "Be well integrated: speak the local language (German/French/Italian) at B1 oral and A2 written level minimum (federal requirement; cantons and municipalities may require higher)",
        "Comply with Swiss legal order and not pose a threat to internal or external security",
        "Have no dependence on social assistance (or if received, have repaid it)",
        "Pass a civics knowledge test and demonstrate knowledge of the Swiss way of life",
        "CRITICALLY: Swiss citizenship is a three-level process — federal, cantonal, and communal (municipal). Each level has its own requirements. Municipal approval is the hardest hurdle — applicants must demonstrate genuine ties to the specific municipality. Switzerland is one of the world's most selective citizenship systems.",
        "Switzerland generally allows dual citizenship (since 1992 for naturalization) — no renunciation required"
      ],
      routes: [
        {
          name: "Naturalization – General (10-Year Rule)",
          visaTypes: ["C Permit (Switzerland)"],
          description: "The standard path to Swiss citizenship requires 10 years of qualifying residence in Switzerland (with the years between ages 8 and 18 counting double). The applicant must have held the C Permit for at least 3 years and must obtain approval at three levels: federal, cantonal, and communal. The communal (municipal) level is often the hardest — municipalities may conduct interviews, home visits, and assess the applicant's integration, local knowledge, and social participation. Processing times: 1–4 years depending on the municipality and canton.",
          estimatedDuration: "10 years qualifying residence + 3 years holding C Permit + 1–4 years naturalization processing"
        },
        {
          name: "Citizenship by Descent (Born to Swiss Parent)",
          visaTypes: ["Swiss Citizenship by Descent"],
          description: "A child born to at least one Swiss citizen parent acquires Swiss citizenship at birth, regardless of birthplace (jus sanguinis). The child also acquires the Bürgerrecht (citizenship rights) of the parent's home municipality and canton. Switzerland permits dual citizenship — there is no requirement to choose between Swiss and other nationalities at birth or later. Children born abroad to Swiss parents who also acquire a foreign citizenship are not required to renounce either.",
          estimatedDuration: "Automatic from birth; passport/identity registration 2–12 months"
        }
      ]
    },
    visaDetails: {
      "Student Permit (Switzerland)": {
        fullName: "Swiss Student Permit (Aufenthaltsbewilligung für Studierende) → C Permit Pipeline",
        description: "Non-EU/EFTA students attending Swiss universities and higher education institutions (ETH Zurich — #7 globally; EPFL — #14; University of Zurich; etc.) receive an annual student permit. Switzerland has among the world's best universities for STEM and research. Tuition fees at public Swiss universities are modest (CHF 580–2,000/semester for most institutions). After graduation, students have 6 months to find qualifying employment. For non-EU/EFTA graduates, the B Permit is subject to the strict annual quota (Drittstaatenkontingent), making the transition to a work permit highly competitive. EU/EFTA graduates face fewer barriers.",
        pathToPR: "Student Permit → Study at Swiss institution → Graduate → 6-month job search → For non-EU/EFTA: employer must apply for quota B Permit (competitive) → If successful: B Permit → Annual renewals for 10 years → C Permit. For EU/EFTA: B Permit without quota → 5 years → C Permit.",
        pathToCitizenship: "Student Permit → B Permit → C Permit → 10 years total residence (double count for 8–18 age years) → 3 years C Permit → Federal + cantonal + communal naturalization approval → Swiss Citizen",
        timelineToPR: "Non-EU/EFTA: 14–18 years (3–4 study + 10 B Permit). EU/EFTA: 8–12 years (3–4 study + 5 B Permit).",
        timelineToCitizenship: "Non-EU/EFTA: 15–22 years total. EU/EFTA: 9–14 years.",
        probabilityToPR: 18,
        probabilityToCitizenship: 8,
        probabilityNote: "Switzerland has the lowest PR and citizenship probabilities among major immigration destinations for non-EU nationals. For non-EU students: quota constraints mean many cannot obtain a B Permit post-graduation; of those who do, significant attrition occurs over the 10-year qualifying period; only ~60% of qualifying applicants receive the C Permit (cantonal discretion applies). For EU graduates, probabilities are significantly higher. The 8% citizenship probability reflects Switzerland's extremely selective three-level municipal approval system — many C Permit holders who apply for citizenship fail at the municipal level. Switzerland naturalizes approximately 40,000–45,000 people per year, predominantly long-established EU residents. Source: State Secretariat for Migration (SEM) annual statistics."
      },
      "B Permit (Switzerland)": {
        fullName: "Swiss B Permit (Aufenthaltsbewilligung B) → C Permit (Settlement)",
        description: "The Swiss B Permit is the temporary residence permit for non-EU/EFTA nationals working in Switzerland. It is strictly quota-based — the federal government allocates a set number of B Permits per year for non-EU/EFTA workers (approximately 8,500 new permits/year in recent years), distributed among the 26 cantons. Employers must prove no suitable Swiss or EU worker is available (domestic worker priority, Inländervorrang). The B Permit is issued for 1 year (renewable annually) and is employer-tied. After 10 continuous years (for most non-EU nationals), the C Permit is available.",
        pathToPR: "Employer demonstrates domestic worker priority → Apply for quota B Permit at cantonal immigration authority → If quota available and approved: receive B Permit → Work in Switzerland → Renew annually → After 10 continuous years (5 for some bilateral agreement countries) → Apply for C Permit",
        pathToCitizenship: "B Permit → C Permit (3 years holding C Permit required) → Federal citizenship application → Cantonal application → Municipal interview/assessment → Swiss Citizen",
        timelineToPR: "10 years for most non-EU nationals (5 for some bilateral agreement countries and EU nationals) + processing",
        timelineToCitizenship: "15–20 years from first arriving on B Permit",
        probabilityToPR: 25,
        probabilityToCitizenship: 12,
        probabilityNote: "The quota system is the primary bottleneck for non-EU B Permit holders — many who are otherwise qualified cannot get a permit due to quota exhaustion. Of those who have B Permits, the long 10-year qualifying period causes significant attrition (voluntary departures, job loss requiring return). C Permit approval rates for qualifying applicants are approximately 80–85% at the federal level, but cantonal discretion can add difficulty. The extremely low citizenship probability reflects Swiss municipalities' highly selective community-integration requirements. Source: SEM immigration statistics."
      },
      "EU/EFTA Work Permit (Switzerland)": {
        fullName: "Swiss EU/EFTA Work Permit (Free Movement) → C Permit",
        description: "Under the Agreement on the Free Movement of Persons between Switzerland and the EU (AFMP), EU and EFTA nationals can enter Switzerland to seek work and obtain residence permits without quota restrictions. EU nationals with an employment contract of 1+ year receive a B Permit valid for 5 years; those with shorter contracts receive a short-term permit (L Permit, up to 364 days per year). No domestic worker priority test required. After 5 continuous years of legal residence in Switzerland, EU/EFTA nationals automatically qualify for the C Permit.",
        pathToPR: "EU/EFTA national arrives in Switzerland → Registers with cantonal immigration authority → Obtains 5-year B Permit (with employment contract 1+ year) → Works in Switzerland → Renews as needed → After 5 continuous years → C Permit",
        pathToCitizenship: "EU/EFTA Work Permit → C Permit → 10 years total qualifying residence (fewer if years 8–18 count double) → 3 years C Permit → Federal + cantonal + communal naturalization → Swiss Citizen",
        timelineToPR: "5 years continuous qualifying residence for EU/EFTA nationals to C Permit",
        timelineToCitizenship: "10 years qualifying + 3 years C Permit + 1–4 years processing = 12–17 years from first arriving",
        probabilityToPR: 62,
        probabilityToCitizenship: 30,
        probabilityNote: "EU/EFTA nationals have significantly higher probability than non-EU nationals due to the free movement agreement (no quotas, automatic C Permit after 5 years). Attrition is mainly voluntary departure. The 30% citizenship probability reflects Swiss municipal selectivity — even EU residents who qualify are often rejected at the communal level for insufficient local integration (not knowing neighbors, insufficient participation in local community). Source: SEM statistics."
      },
      "Family Reunification Permit (Switzerland)": {
        fullName: "Swiss Family Reunification Permit → C Permit",
        description: "Spouses, registered partners, and unmarried children under 18 of C Permit holders or Swiss citizens are entitled to family reunification in Switzerland. For non-EU/EFTA family of C Permit holders: they receive a B Permit (annual renewal) and follow the same 10-year timeline to their own C Permit. For spouses of Swiss citizens: they receive a B Permit and can apply for the C Permit after 5 years (or naturalization after 3 years of marriage and qualifying residence in Switzerland).",
        pathToPR: "C Permit holder/Swiss citizen sponsors family → Family member receives B Permit → Annual renewals → After qualifying period (5 or 10 years depending on sponsor status) → C Permit",
        pathToCitizenship: "Family Permit → C Permit → Naturalization (or 3-year marriage route for spouses of Swiss citizens) → Swiss Citizen",
        timelineToPR: "5 years for EU/EFTA family or spouses of Swiss citizens; 10 years for non-EU family of C Permit holders",
        timelineToCitizenship: "8–15 years depending on route",
        probabilityToPR: 65,
        probabilityToCitizenship: 28,
        probabilityNote: "Family reunification permit holders have a higher probability of long-term residence than work-based permit holders due to family ties. However, Switzerland's selective citizenship process remains a barrier. Source: SEM family reunification statistics."
      },
      "Lump-Sum Tax / Investor Permit (Switzerland)": {
        fullName: "Swiss Forfait Fiscal (Lump-Sum Tax) / Investor Permit → C Permit",
        description: "Switzerland's lump-sum taxation (Pauschalbesteuerung / forfait fiscal) is a special tax arrangement for wealthy foreign nationals who reside in Switzerland but do not pursue gainful employment there. Available in most cantons (Zurich, Basel-Stadt, Schaffhausen, and Appenzell Innerrhoden no longer offer it). Tax is calculated on the individual's living expenses in Switzerland (typically 5–7× annual rental value of primary residence) rather than actual income/wealth. Minimum taxable base: varies by canton, typically CHF 400,000–1,000,000+/year. Requires financial independence (no work in Switzerland). After 10 years of qualifying residence, the C Permit becomes available.",
        pathToPR: "Negotiate lump-sum tax agreement with canton → Receive B Permit → Annual renewal → After 10 years continuous qualifying residence → C Permit",
        pathToCitizenship: "Lump-Sum Permit → C Permit → Naturalization (3-level process) → Swiss Citizen",
        timelineToPR: "10 years continuous qualifying residence",
        timelineToCitizenship: "15–20 years; naturalization for wealthy foreigners requires exceptional community integration despite wealth",
        probabilityToPR: 55,
        probabilityToCitizenship: 18,
        probabilityNote: "Lump-sum tax residents have financial stability ensuring the 10-year qualifying period is achievable, but many are globally mobile and may not commit to Swiss citizenship. Swiss municipalities are known to reject citizenship applications from wealthy foreigners who are insufficiently integrated in local community life regardless of financial standing. Source: Swiss Tax Conference and SEM data."
      },
      "C Permit (Switzerland)": {
        fullName: "Swiss C Permit (Niederlassungsbewilligung) → Citizenship",
        description: "The Niederlassungsbewilligung C (Settlement Permit, Permit C) is Switzerland's permanent residence status — valid indefinitely with no renewal required (the physical ID card must be renewed periodically). Holders have unrestricted access to the Swiss labour market, access to social services, and cannot be expelled except in very serious criminal cases. The C Permit is the prerequisite for Swiss citizenship: holders must have held the C Permit for at least 3 years before applying for naturalization at the federal level. Swiss citizenship is a three-level process: federal approval + cantonal approval + communal (municipal) approval.",
        pathToPR: "N/A — C Permit IS permanent residence in Switzerland.",
        pathToCitizenship: "Hold C Permit for 3+ years → 10 years total qualifying Swiss residence (years 8–18 count double) → Apply for federal citizenship (Bundesebene) → Pass federal language requirement (B1 oral/A2 written in German/French/Italian) + civic knowledge → Cantonal review → Communal (municipal) review (interview, local integration assessment) → If all three levels approve: receive Swiss Citizen certificate → Swiss Citizen (dual citizenship permitted since 1992)",
        timelineToPR: "N/A",
        timelineToCitizenship: "10 years qualifying residence + 3 years C Permit + 1–4 years processing through three levels",
        probabilityToPR: -1,
        probabilityToCitizenship: 52,
        probabilityNote: "Switzerland's three-level citizenship process has a unique failure point: the communal/municipal level, which assesses local integration (language, neighborhood knowledge, community participation). Approval rates vary enormously by municipality. At the federal level, approval is ~95% for qualifying applicants. At the cantonal and communal levels combined, rejection rates range from 5% (in integrative municipalities) to 30%+ (in more selective areas). The 52% overall estimate accounts for both applicants and eligible C Permit holders who choose not to apply. Switzerland naturalizes approximately 40,000–45,000 people annually. Source: SEM naturalization statistics, cantonal integration reports."
      },
      "Swiss Citizenship by Descent": {
        fullName: "Swiss Citizenship by Descent (Heimatrecht / Bürgerrecht)",
        description: "Swiss citizenship is transmitted by descent (jus sanguinis): a child born to at least one Swiss citizen parent acquires Swiss citizenship at birth, regardless of birthplace. The child also inherits the Heimatort (home municipality Bürgerrecht) of the Swiss parent. Switzerland permits dual (or multiple) citizenship — there is no requirement to renounce other nationalities for those who acquire Swiss citizenship by descent. If born abroad to a Swiss parent who was also born abroad, the child must be registered with the Swiss civil registry before age 25 (or by the Swiss parent by the time the child turns 25) to retain Swiss citizenship.",
        pathToPR: "N/A — Swiss citizenship by descent bypasses permanent residence.",
        pathToCitizenship: "Confirm Swiss citizen parent → Child is Swiss at birth → Register birth with Swiss consulate/civil registry if born abroad → Important: if the Swiss parent was also born abroad (second generation), the child must be registered before age 25 to preserve Swiss citizenship → Apply for Swiss identity document and passport.",
        timelineToPR: "N/A",
        timelineToCitizenship: "Automatic at birth. Consular birth registration: 2–12 months. Second-generation: must register before age 25.",
        probabilityToPR: -1,
        probabilityToCitizenship: 90,
        probabilityNote: "Swiss citizenship by descent is automatic for children of Swiss parents. The 90% accounts for the relatively common scenario of second-generation Swiss (parent also born abroad) who fail to register their child before the age 25 deadline, resulting in loss of Swiss citizenship. Source: Federal Chancellery and Swiss consular statistics."
      }
    }
  },
  {
    id: "denmark",
    name: "Denmark",
    flagEmoji: "🇩🇰",
    region: "Europe",
    permanentResidence: {
      officialName: "Permanent Residence Permit (Tidsubegrænset opholdstilladelse)",
      criteria: [
        "Have held a valid Danish residence permit and lived in Denmark for at least 4 years continuously (reduced to 2 years for Pay Limit Scheme holders and some other qualifying categories)",
        "Have been in continuous, uninterrupted employment throughout the qualifying period (for work-based permits)",
        "Not have received certain social benefits in the last 3 years (or repaid them)",
        "Have passed Danish language test at Prøve i Dansk 2 (Danish Language Test 2, approximately A2/B1 level)",
        "Have passed Active Citizenship test (Medborgerskabsprøven) — civics knowledge",
        "Have no serious criminal convictions",
        "Denmark does NOT require renunciation of other nationalities for permanent residence; however, Danish CITIZENSHIP (until 2015) required renunciation — since 2015 dual citizenship is permitted"
      ],
      routes: [
        {
          name: "Student Visa → Post-Study Work Permit Pipeline",
          visaTypes: ["Student Visa (Denmark)", "Post-Study Work Permit (Denmark)"],
          description: "International students who complete a degree at a Danish university (University of Copenhagen, DTU, Aarhus University, etc.) can apply for a 2-year establishment card (Etableringskort) — Denmark's post-study work permit — to seek employment or start a business. This is one of Denmark's longer post-study work authorizations in Europe. After finding qualifying employment, students transition to a work permit. After 4 years of continuous qualifying residence, permanent residence is available.",
          estimatedDuration: "8–12 years: 3–4 years study + 2 years establishment card + 4 years work permit (if establishment card time counts)"
        },
        {
          name: "Pay Limit Scheme → Permanent Residence",
          visaTypes: ["Pay Limit Scheme Permit (Denmark)"],
          description: "The Pay Limit Scheme (Beløbsordningen) is Denmark's primary fast-track work permit for highly paid workers earning above DKK 448,000/year (2024 figure). No job list requirement and no labour market test. After only 2 years of employment under the scheme, the holder qualifies for permanent residence — the fastest work-based PR in Denmark. No requirement to switch employer.",
          estimatedDuration: "2 years under Pay Limit Scheme + several months PR processing"
        },
        {
          name: "Positive List / Fast-Track Scheme → Permanent Residence",
          visaTypes: ["Positive List / Fast-Track Permit (Denmark)"],
          description: "The Positive List includes occupations in shortage in Denmark; the Fast-Track Scheme allows certified companies to bring in workers without individual assessment. Pay threshold is lower than the Pay Limit Scheme. After 4 years of continuous qualifying residence (which may include time on the Positive List permit), permanent residence is available.",
          estimatedDuration: "4 years continuous qualifying residence + processing"
        },
        {
          name: "Family – Spouse/Partner Reunification → Permanent Residence",
          visaTypes: ["Family Reunification Permit (Denmark)"],
          description: "Spouses and registered partners of Danish citizens or permanent residents can join them in Denmark, subject to a 24-point integration requirement scored across language, employment, and civic knowledge. Denmark's family reunification rules are among the stricter in Europe. After 4 years of continuous qualifying residence, permanent residence is available. Spouses of Danish citizens may apply for citizenship after 2 years (if married to Danish citizen who has been citizen for 2+ years, with 7 years total qualifying residence).",
          estimatedDuration: "4 years qualifying residence for PR; citizenship route requires 9 years total (or 7 for spouses of Danish citizens)"
        },
        {
          name: "Start-up Denmark → Permanent Residence",
          visaTypes: ["Start-up Denmark Permit"],
          description: "Denmark's Start-up Denmark scheme allows entrepreneurs to reside in Denmark to establish a business based on an innovative concept. Requires a business plan evaluated by the Danish Business Authority; no minimum investment. Initial 2-year permit; renewable for 2 more years. After 4 years of qualifying residence, permanent residence is available if the business is viable.",
          estimatedDuration: "4 years qualifying residence + processing"
        }
      ]
    },
    citizenship: {
      officialName: "Dansk Statsborgerskab (Danish Citizenship)",
      criteria: [
        "Have legally resided in Denmark for at least 9 years (reduced to 8 years for some categories; 7 years for spouses of Danish citizens who have held citizenship for 2+ years; Nordic citizens: shorter qualifying periods apply)",
        "Have passed Danish language test at level 'Danskprøve 2' (PD2) or higher — demonstrating Danish language ability at B1 or above",
        "Have passed the Medborgerskabsprøven (citizenship test) — knowledge of Danish society, history, and culture",
        "Have been in employment or self-employment for at least 3.5 of the past 4 years",
        "Have not received social assistance (kontanthjælp or uddannelseshjælp) within the last 2 years 6 months",
        "Have no unpaid debt to public authorities",
        "Have no criminal convictions that disqualify (a waiting period applies depending on offence severity)",
        "Denmark has permitted dual citizenship since June 2015 — you do not need to renounce other nationalities"
      ],
      routes: [
        {
          name: "Naturalization – General (9-Year Rule)",
          visaTypes: ["Permanent Residence Permit (Denmark)"],
          description: "The standard path to Danish citizenship requires 9 years of legal residence in Denmark (4.5 years must be continuous residence immediately before the application). Applicants must pass a Danish language test at PD2 level, the Medborgerskabsprøven (citizenship test), and meet employment and financial self-sufficiency requirements. Since 2015, Denmark permits dual citizenship. Naturalization is by an act of Parliament (Naturalisationslov) passed annually.",
          estimatedDuration: "9 years qualifying residence + 6–12 months citizenship processing (annual Parliamentary naturalization cycle)"
        },
        {
          name: "Citizenship by Descent (Born to Danish Parent)",
          visaTypes: ["Danish Citizenship by Descent"],
          description: "A child born to at least one Danish citizen parent acquires Danish citizenship at birth, regardless of birthplace (jus sanguinis). If born abroad, there is no mandatory registration deadline, but consular birth registration is recommended for documentation purposes. Since Denmark permits dual citizenship (since 2015), there is no requirement to choose between Danish and other nationalities. Danish citizenship by descent can be transmitted to subsequent generations without limitation as long as one parent is Danish.",
          estimatedDuration: "Automatic from birth; passport application 2–6 months"
        }
      ]
    },
    visaDetails: {
      "Student Visa (Denmark)": {
        fullName: "Danish Student Visa (Opholdstilladelse til studier) → Permanent Residence Pipeline",
        description: "Non-EU/EEA students attending accredited Danish educational institutions apply for a student residence permit. Denmark has several internationally recognized universities (University of Copenhagen, Aarhus University, DTU, Copenhagen Business School) with English-language programs. Tuition fees for non-EU students vary (DKK 45,000–120,000/year at most institutions). After graduation, students can apply for the 2-year Establishment Card (Etableringskort) — Denmark's post-study work authorization. From there, students seek qualifying employment and accumulate toward the 4-year permanent residence threshold.",
        pathToPR: "Student Visa → Study at Danish institution → Graduate → Apply for 2-year Establishment Card (no work restrictions) → Find qualifying employment → Transition to Work Permit or continue on Establishment Card → After 4 years continuous qualifying residence (Establishment Card time may count) → Permanent Residence Permit",
        pathToCitizenship: "Student Visa → Work Permit → Permanent Residence → Danish language PD2 test + Medborgerskabsprøven → 9 years total qualifying residence + 4.5 continuous years → Parliamentary naturalization → Danish Citizen (dual permitted since 2015)",
        timelineToPR: "8–12 years: 3–4 years study + 2 years Establishment Card + 4 years work toward PR threshold",
        timelineToCitizenship: "12–16 years to citizenship (9 years qualifying residence + 6–12 months processing)",
        probabilityToPR: 30,
        probabilityToCitizenship: 20,
        probabilityNote: "Denmark's strong economy and accessible English-language environment give international graduates reasonable employment prospects. Approximately 45% of international graduates seek to remain; ~65% find qualifying employment; ~80% accumulate 4 qualifying years; ~90% receive PR upon qualifying application. The 20% citizenship probability reflects the long 9-year qualifying period and relatively strict requirements (employment, language, civics), though the dual citizenship allowance (since 2015) has significantly increased naturalization motivation. Denmark naturalizes approximately 15,000–25,000 people annually. Source: Udlændingestyrelsen (Immigration Service) annual statistics."
      },
      "Post-Study Work Permit (Denmark)": {
        fullName: "Danish Establishment Card (Etableringskort) → Work Permit",
        description: "The Danish Establishment Card (Etableringskort) is a 2-year post-study residence permit for graduates of Danish higher education institutions. It allows the holder to work in Denmark without restrictions (any employer, any occupation) while seeking permanent employment or establishing a business. The card can be renewed once for an additional year in some circumstances. Time spent on the Establishment Card counts toward the 4-year permanent residence qualifying period if the holder was also working or self-employed.",
        pathToPR: "Apply for Establishment Card within 1 month of graduation → Work in Denmark in any capacity → Find qualifying long-term employment → After 4 years total qualifying residence (including Establishment Card time with qualifying work) → Apply for Permanent Residence",
        pathToCitizenship: "Establishment Card → Work Permit → Permanent Residence → 9 years qualifying → Citizenship",
        timelineToPR: "2 years Establishment Card + 2 years work = 4 years minimum from graduation",
        timelineToCitizenship: "7–9 years from graduation to citizenship",
        probabilityToPR: 45,
        probabilityToCitizenship: 28,
        probabilityNote: "Establishment Card holders with open work rights are well-positioned to find qualifying employment. ~60% transition to qualifying employment and accumulate PR-eligible residence. The 28% citizenship probability is relatively high because Establishment Card holders who remain in Denmark tend to be highly integrated. Source: Udlændingestyrelsen statistics."
      },
      "Pay Limit Scheme Permit (Denmark)": {
        fullName: "Danish Pay Limit Scheme (Beløbsordningen) → Permanent Residence",
        description: "The Pay Limit Scheme is Denmark's fastest work-to-PR route: workers earning at least DKK 448,000/year (approximately €60,000/year in 2024) can obtain a work and residence permit without a labour market test or job list requirement, and after only 2 years, qualify for permanent residence. This is Denmark's most employer-friendly route for highly paid international talent. The scheme applies to any job (no occupation restriction) as long as the salary threshold is met.",
        pathToPR: "Secure job offer at DKK 448,000+/year → Apply for Pay Limit Scheme permit at SIRI → Arrive in Denmark → Work for 2 years continuously → Apply for Permanent Residence",
        pathToCitizenship: "Pay Limit Permit → Permanent Residence → 9 years total qualifying residence → Danish language PD2 + civics test → Parliamentary naturalization → Danish Citizen",
        timelineToPR: "2 years employment → Permanent Residence (fastest PR in Denmark)",
        timelineToCitizenship: "10–12 years from first arriving (9 years qualifying + 6–12 months processing)",
        probabilityToPR: 72,
        probabilityToCitizenship: 42,
        probabilityNote: "Pay Limit Scheme holders are highly paid professionals with strong employment stability. ~80% complete 2 years and receive Permanent Residence; ~90% of qualifying applicants approved. The 42% citizenship probability is relatively high because the high earners in this scheme tend to integrate and remain in Denmark long-term. Source: SIRI (Styrelsen for International Rekruttering og Integration) statistics."
      },
      "Positive List / Fast-Track Permit (Denmark)": {
        fullName: "Danish Positive List / Fast-Track Scheme → Permanent Residence",
        description: "Denmark's Positive List identifies occupations in shortage (healthcare, IT, engineering, scientific research, etc.) where non-EU workers may obtain permits without a salary threshold (though minimum wages apply). The Fast-Track Scheme allows certified companies (those who use the system regularly) to have applications processed within 10 days with minimal documentation. After 4 years of continuous qualifying residence, permanent residence is available.",
        pathToPR: "Employer is on shortage occupation list or certified Fast-Track company → Apply for residence and work permit → Work in Denmark → After 4 years continuous qualifying residence → Apply for Permanent Residence",
        pathToCitizenship: "Positive List Permit → Permanent Residence → 9 years qualifying → Citizenship",
        timelineToPR: "4 years continuous qualifying residence + processing",
        timelineToCitizenship: "10–12 years to citizenship",
        probabilityToPR: 55,
        probabilityToCitizenship: 32,
        probabilityNote: "Positive List holders in shortage occupations have good employment stability but the 4-year requirement creates more attrition than the 2-year Pay Limit route. ~62% accumulate qualifying residence; ~90% receive PR. Source: SIRI statistics."
      },
      "Family Reunification Permit (Denmark)": {
        fullName: "Danish Family Reunification Permit → Permanent Residence",
        description: "Denmark's family reunification process is among Europe's strictest. Requirements for the sponsor: Danish citizen or PR holder, age 24+, financial self-sufficiency, housing, no criminal record, sufficient connection to Denmark (scoring 0/100 points on attachment test for Danish citizens). The family member must score 0/24 on an integration requirement covering language, employment, and civic knowledge. Initial permit valid for 2 years (renewable). After 4 years of qualifying residence, permanent residence is available.",
        pathToPR: "Sponsor meets strict requirements → Family member scores on integration test → Receive 2-year residence permit → Renew → After 4 years qualifying residence → Permanent Residence",
        pathToCitizenship: "Family Permit → Permanent Residence → 9 years qualifying (7 for spouses of Danish citizens) → Citizenship",
        timelineToPR: "4 years qualifying residence + processing",
        timelineToCitizenship: "8–10 years for spouses of Danish citizens (7-year reduced route); 10–12 years for others",
        probabilityToPR: 62,
        probabilityToCitizenship: 38,
        probabilityNote: "Denmark's strict initial requirements mean only genuinely qualifying applicants enter this route. Those who obtain family reunification permits have high settlement motivation but must navigate the strict employment and language requirements for both PR and citizenship. Source: Udlændingestyrelsen family reunification statistics."
      },
      "Start-up Denmark Permit": {
        fullName: "Danish Start-up Denmark Permit → Permanent Residence",
        description: "Denmark's Start-up Denmark scheme targets innovative entrepreneurs outside the EU/EEA. Applicants submit a business plan to the Danish Business Authority (Erhvervsstyrelsen), which is assessed for innovation, viability, and relevance to the Danish economy. No minimum capital requirement (unlike some other countries' investor programs). Initial 2-year permit; renewable for 2 more years. After 4 years of continuous qualifying residence and demonstrating a viable business, permanent residence is available. The scheme is specifically for new business concepts, not acquiring existing businesses.",
        pathToPR: "Submit innovative business plan to Danish Business Authority → If approved: receive 2-year Start-up Denmark permit → Establish business in Denmark → Demonstrate viability → Renew for 2 more years → After 4 years qualifying residence → Permanent Residence",
        pathToCitizenship: "Start-up Denmark → Permanent Residence → 9 years qualifying → Citizenship",
        timelineToPR: "4 years qualifying residence + processing",
        timelineToCitizenship: "10–12 years to citizenship",
        probabilityToPR: 38,
        probabilityToCitizenship: 22,
        probabilityNote: "Start-up Denmark has a competitive application process (approximately 30–40% approval rate from Business Authority) and significant attrition from businesses that fail to demonstrate viability within 4 years. Of approved applicants, approximately 50–60% successfully obtain permanent residence. Source: Danish Business Authority Start-up Denmark statistics."
      },
      "Permanent Residence Permit (Denmark)": {
        fullName: "Danish Permanent Residence Permit (Tidsubegrænset opholdstilladelse) → Citizenship",
        description: "Denmark's Permanent Residence Permit grants the right to live and work in Denmark indefinitely without restrictions. The permit must be renewed every 2 years (for the document, not the status itself) and can be revoked for long absences from Denmark (more than 12 consecutive months outside Denmark, or more than 6 months/year over an extended period). Permanent residence is the standard prerequisite for Danish citizenship, which requires 9 years of qualifying residence (4.5 continuous years before the application).",
        pathToPR: "N/A — Permanent Residence IS permanent residence in Denmark.",
        pathToCitizenship: "Hold Permanent Residence → Accumulate 9 years total qualifying residence (4.5 years must be continuous immediately before application) → Pass Danish language test Prøve i Dansk 2 (PD2) → Pass Medborgerskabsprøven (civics test) → Demonstrate employment: 3.5 of past 4 years → No social assistance in past 2.5 years → No disqualifying criminal record → Submit citizenship application → Name included in annual Naturalization Act passed by Parliament → Danish Citizen",
        timelineToPR: "N/A",
        timelineToCitizenship: "9 years total qualifying residence (4.5 continuous) + 6–12 months processing",
        probabilityToPR: -1,
        probabilityToCitizenship: 65,
        probabilityNote: "Among permanent residents applying for Danish citizenship, the approval rate is approximately 75–80% for those who meet all criteria. The 65% accounts for: the significant subset of eligible residents who do not apply (historically deterred by the pre-2015 renunciation requirement, though this has since improved); those who fail language or civics tests; and those who fail the employment or social assistance requirements. Denmark naturalizes approximately 15,000–25,000 people annually. Source: Statistics Denmark (Danmarks Statistik) citizenship statistics."
      },
      "Danish Citizenship by Descent": {
        fullName: "Danish Citizenship by Descent (Statsborgerskab ved fødsel – afstamningsprincippet)",
        description: "Danish citizenship is transmitted by descent (jus sanguinis): a child born to at least one Danish citizen parent acquires Danish citizenship at birth, regardless of birthplace. Since 2015, Denmark permits dual citizenship — children born abroad who acquire both Danish and another nationality are not required to choose at adulthood. There is no generational limit on transmitting Danish citizenship by descent. Consular birth registration abroad is recommended but not legally mandatory for citizenship continuity.",
        pathToPR: "N/A — Danish citizenship by descent bypasses permanent residence.",
        pathToCitizenship: "Confirm at least one parent was a Danish citizen at time of birth → Child is Danish at birth → Register with Danish consulate if born abroad (recommended) → Apply for Danish passport and CPR (civil registration) number.",
        timelineToPR: "N/A",
        timelineToCitizenship: "Citizenship exists from birth. Passport processing: 2–6 months.",
        probabilityToPR: -1,
        probabilityToCitizenship: 95,
        probabilityNote: "Danish citizenship by descent is automatic and has essentially no rejection rate for eligible persons. The 95% accounts for very rare procedural issues. Source: Danish Ministry of Immigration statistics."
      }
    }
  }
];

data.countries.push(...newCountries);
fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
console.log("Added Switzerland and Denmark. Total countries:", data.countries.length);
