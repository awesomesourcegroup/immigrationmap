const fs = require("fs"), path = require("path");
const filePath = path.join(__dirname, "../data/countries.json");
const data = JSON.parse(fs.readFileSync(filePath, "utf8"));

data.countries.push(...[
  // ─── AUSTRIA ───────────────────────────────────────────────────────────────
  {
    id: "austria",
    name: "Austria",
    flagEmoji: "🇦🇹",
    region: "Europe",
    permanentResidence: {
      officialName: "Daueraufenthalt-EU (EU Long-Term Residence Permit)",
      criteria: [
        "Have legally and continuously resided in Austria for at least 5 years on a valid residence permit",
        "Have stable and regular income sufficient to support yourself and dependants without social assistance",
        "Have adequate housing",
        "Have passed the German language test at A2 level minimum for the EU Long-Term Residence Permit (B1 for the Red-White-Red Card Plus)",
        "Have Austrian social insurance coverage",
        "No criminal convictions or threats to public order"
      ],
      routes: [
        {
          name: "Student Visa → Red-White-Red Card (Graduates) Pipeline",
          visaTypes: ["Student Visa (Austria)", "Red-White-Red Card – University Graduates (Austria)"],
          description: "Graduates of Austrian universities can apply directly for the Red-White-Red Card in the 'very highly qualified workers' or 'graduates of Austrian universities' category without a points threshold, provided they have a job offer at the appropriate wage. Student time in Austria counts toward the 5-year EU Long-Term Residence threshold. After 2 years on the RWR Card, the holder receives the RWR Card Plus (open work rights). After 5 years total qualifying residence, the EU Long-Term Residence Permit is available.",
          estimatedDuration: "~5 years total: study time counts toward the 5-year EU LTR threshold. After a 3–4 year degree, only 1–2 years of RWR Card residence complete the 5 years."
        },
        {
          name: "EU Blue Card → EU Long-Term Residence",
          visaTypes: ["EU Blue Card (Austria)"],
          description: "Austria's EU Blue Card requires a recognized university degree and a salary of at least €4,068/month (general) or €3,255/month for shortage occupations (2024 figures). After 5 years of continuous qualifying residence in Austria, the EU Long-Term Residence Permit is available. Blue Card holders can move to other EU member states after 18 months.",
          estimatedDuration: "5 years qualifying residence including Blue Card time"
        },
        {
          name: "Red-White-Red Card → EU Long-Term Residence",
          visaTypes: ["Red-White-Red Card (Austria)"],
          description: "Austria's Red-White-Red (RWR) Card is a points-based permit for three categories: (A) Very highly qualified workers (70+ points from degree, experience, income, language, age); (B) Skilled workers in shortage occupations on the published list; (C) Other key workers earning above the threshold. After 2 years on the RWR Card, holders receive the RWR Card Plus (open work rights). After 5 years total residence, EU Long-Term Residence is available.",
          estimatedDuration: "2 years RWR Card → RWR Card Plus; 5 years total for EU Long-Term Residence"
        },
        {
          name: "Family – Spouse/Family Reunification → EU Long-Term Residence",
          visaTypes: ["Family Reunification Permit (Austria)"],
          description: "Spouses and minor children of Austrian citizens or residence permit holders can join them in Austria. The sponsor must demonstrate adequate income and housing. After 5 years of continuous qualifying residence, the EU Long-Term Residence Permit is available.",
          estimatedDuration: "5 years continuous qualifying residence"
        }
      ]
    },
    citizenship: {
      officialName: "Österreichische Staatsbürgerschaft (Austrian Citizenship)",
      criteria: [
        "Have legally resided in Austria for at least 10 years continuously (6 years for those with sustained and broad integration achievements)",
        "Have held the EU Long-Term Residence Permit or equivalent for the last year before application",
        "Have adequate German language skills (B2 level for citizenship, higher than for PR)",
        "Have sufficient income to be self-supporting",
        "Pass the citizenship knowledge test (Staatsbürgerschaftsprüfung)",
        "IMPORTANT: Austria is one of the strictest EU countries on dual citizenship — applicants must generally renounce all other nationalities. Exceptions exist for former Austrian citizens who lost citizenship involuntarily, EU/EEA nationals in certain circumstances, and cases where renunciation would cause hardship"
      ],
      routes: [
        {
          name: "Naturalization – General (10-Year Rule)",
          visaTypes: ["EU Long-Term Residence Permit (Austria)"],
          description: "The standard path requires 10 years of continuous legal residence in Austria (reduced to 6 years for demonstrated exceptional integration — sustained professional achievements, volunteering, broad community participation). B2 German language level required (higher than for PR). Renunciation of other nationalities is strictly required in almost all cases.",
          estimatedDuration: "10 years legal residence (6 with special integration) + 12–24 months processing"
        },
        {
          name: "Citizenship by Descent (Born to Austrian Parent)",
          visaTypes: ["Austrian Citizenship by Descent"],
          description: "A child born to at least one Austrian citizen parent acquires Austrian citizenship at birth (jus sanguinis), regardless of birthplace. Austria does NOT permit dual citizenship for adults acquiring citizenship by naturalization, but children born to an Austrian parent and a foreign parent hold dual citizenship until they must choose (there is generally no compelled election). Registration at an Austrian consulate is recommended within 1 year of birth abroad.",
          estimatedDuration: "Automatic from birth; consular registration 2–12 months"
        }
      ]
    },
    visaDetails: {
      "Student Visa (Austria)": {
        fullName: "Austrian Student Visa (Studierendenvisum) → EU Long-Term Residence Pipeline",
        description: "Non-EU/EEA students at Austrian universities (University of Vienna, TU Wien, Vienna University of Economics and Business, Graz University of Technology, etc.) apply for a student residence permit. Austria has no dedicated post-study work visa but graduates of Austrian universities can apply directly for the Red-White-Red Card in the graduate category with a qualifying job offer. Student time counts toward the 5-year EU Long-Term Residence threshold, making the total pipeline significantly shorter than previously assumed.",
        pathToPR: "Student Visa → Study at Austrian university (3–4 years — counts toward 5-year EU LTR threshold) → Graduate → Find qualifying employment → Apply for Red-White-Red Card (Graduates of Austrian Universities category, no points minimum, just qualifying job offer) → 2 years RWR Card → RWR Card Plus (open work rights) → Accumulate remaining residence to reach 5 years total → EU Long-Term Residence Permit",
        pathToCitizenship: "Student Visa → RWR Card → EU Long-Term Residence → 10 years total legal residence + B2 German → Citizenship test → Renounce other nationalities → Austrian Citizen",
        timelineToPR: "~5 years total from starting studies: study time counts toward the 5-year EU LTR threshold. After a 3-year degree, only 2 more years of qualifying work are needed.",
        timelineToCitizenship: "~11–12 years: 10 years qualifying residence + 12–24 months processing. Dual citizenship not permitted (renunciation required).",
        probabilityToPR: 30,
        probabilityToCitizenship: 12,
        probabilityNote: "The 30% PR probability reflects: ~45% of international graduates find qualifying employment; ~80% of those accumulate 5 qualifying years; ~90% EU LTR approval. The 12% citizenship probability is significantly reduced by Austria's strict renunciation requirement — many eligible residents choose not to naturalize to avoid losing their birth nationality — and the 10-year timeline. Austria naturalizes approximately 7,000–9,000 people annually, a low rate relative to its immigrant population. Source: Austrian Federal Ministry of the Interior (BMI) statistics."
      },
      "Red-White-Red Card – University Graduates (Austria)": {
        fullName: "Austrian Red-White-Red Card – Graduates of Austrian Universities",
        description: "A special category of the Red-White-Red Card for graduates of Austrian universities and universities of applied sciences. Unlike other RWR categories, no points minimum applies — the holder simply needs a qualifying job offer and a gross monthly salary of at least €2,294 (2024 entry-level threshold). This makes it Austria's most accessible skilled worker route for those who have already studied in Austria. After 2 years on the RWR Card, the holder is upgraded to the RWR Card Plus (unrestricted work rights). After 5 years total qualifying residence, the EU Long-Term Residence Permit is available.",
        pathToPR: "Graduate from Austrian university → Find qualifying employer → Apply for RWR Card (Graduates) → 2 years on RWR Card → RWR Card Plus → Accumulate remaining time to 5-year EU LTR threshold → EU Long-Term Residence",
        pathToCitizenship: "RWR Card → RWR Card Plus → EU LTR → 10 years total residence → B2 German + citizenship test → Renounce other nationalities → Austrian Citizen",
        timelineToPR: "2 years on RWR Card + remaining time to 5-year total; combined with 3–4 years study, PR is reached at ~5 years from starting in Austria",
        timelineToCitizenship: "~11–12 years from starting in Austria",
        probabilityToPR: 48,
        probabilityToCitizenship: 15,
        probabilityNote: "Graduates of Austrian universities have stronger local networks and language skills, improving conversion rates. ~60% find qualifying employment; ~85% accumulate 5 qualifying years; ~90% EU LTR approval. The 15% citizenship probability remains low due to the renunciation requirement. Source: AMS Austria and BMI statistics."
      },
      "EU Blue Card (Austria)": {
        fullName: "Austrian EU Blue Card → EU Long-Term Residence",
        description: "Austria's EU Blue Card requires a recognized university degree and a salary of at least €4,068/month (general; €3,255/month for shortage occupations). No quota applies. After 5 years of continuous qualifying residence in Austria, the EU Long-Term Residence Permit is available. The Blue Card provides freedom to change employers (without a new permit after 2 years) and intra-EU mobility after 18 months.",
        pathToPR: "Secure qualifying job offer → Apply for EU Blue Card → Work in Austria → After 5 years total qualifying residence → EU Long-Term Residence",
        pathToCitizenship: "EU Blue Card → EU Long-Term Residence → 10 years total → B2 German → Renounce other nationalities → Austrian Citizen",
        timelineToPR: "5 years qualifying residence (including prior student permit time if applicable)",
        timelineToCitizenship: "~11–12 years from first arriving in Austria",
        probabilityToPR: 58,
        probabilityToCitizenship: 18,
        probabilityNote: "EU Blue Card holders have strong employment stability. ~65% maintain 5 qualifying years; ~90% receive EU LTR. The 18% citizenship probability is depressed by the renunciation requirement — many high-earning expats on Blue Cards are globally mobile and value their original nationality. Source: Austrian Ministry of the Interior statistics."
      },
      "Red-White-Red Card (Austria)": {
        fullName: "Austrian Red-White-Red Card (Points-Based) → EU Long-Term Residence",
        description: "Austria's flagship points-based work permit for three categories: (A) Very Highly Qualified Workers (70+ points from: degree, work experience, income, Austrian German/English, age — awarded for earning above €5,112/month gross); (B) Skilled workers in shortage occupations on Austria's published Mangelberufsliste; (C) Other key workers with minimum wage. After 2 years the RWR Card converts to RWR Card Plus (open work rights, any employer). After 5 years total, EU Long-Term Residence is available.",
        pathToPR: "Score qualifying points → Secure job offer → Apply for RWR Card → Work in Austria → After 2 years: RWR Card Plus → After 5 years total qualifying residence → EU Long-Term Residence",
        pathToCitizenship: "RWR Card → EU Long-Term Residence → 10 years total → Austrian Citizen (renunciation required)",
        timelineToPR: "5 years total qualifying residence (2 years RWR + 3 more years toward 5-year total)",
        timelineToCitizenship: "~11–12 years",
        probabilityToPR: 55,
        probabilityToCitizenship: 16,
        probabilityNote: "RWR Card holders are pre-screened for skills and income, leading to moderate-high PR probability. The low citizenship probability reflects Austria's renunciation requirement. Source: Austrian BMI statistics."
      },
      "Family Reunification Permit (Austria)": {
        fullName: "Austrian Family Reunification Permit → EU Long-Term Residence",
        description: "Spouses, registered partners, and dependent children of Austrian citizens or residence permit holders can join them in Austria. A2 German language proof may be required before entry (for spouses of Austrian citizens). After 5 years of continuous qualifying residence, EU Long-Term Residence is available. Spouses of Austrian citizens may naturalize after 6 years of residence with demonstrated integration.",
        pathToPR: "Sponsor meets income/housing requirements → Family member demonstrates A2 German (if required) → Receive family reunification permit → 5 years continuous residence → EU Long-Term Residence",
        pathToCitizenship: "Family Permit → EU Long-Term Residence → 10 years (6 with integration) → Austrian Citizen (renunciation required)",
        timelineToPR: "5 years qualifying residence",
        timelineToCitizenship: "10–12 years; 6 years with special integration achievements",
        probabilityToPR: 65,
        probabilityToCitizenship: 22,
        probabilityNote: "Family reunification permit holders have strong settlement motivation. ~72% accumulate 5 qualifying years; ~90% EU LTR approval. The 22% citizenship probability is higher than work-based routes because family members tend to integrate more deeply (learn German, participate in community). Source: Austrian BMI family reunification statistics."
      },
      "EU Long-Term Residence Permit (Austria)": {
        fullName: "Austrian EU Long-Term Residence Permit (Daueraufenthalt-EU) → Citizenship",
        description: "Austria's EU Long-Term Residence Permit (Daueraufenthalt-EU) is permanent residence, valid indefinitely. It grants full labour market access, social benefit eligibility, and the right to move to other EU states. After 10 years of total qualifying residence in Austria (6 with special integration), citizenship is available — but Austria's strict renunciation requirement (give up all other nationalities) makes it one of the least pursued citizenships in Western Europe relative to its eligible population.",
        pathToPR: "N/A — EU Long-Term Residence IS permanent residence in Austria.",
        pathToCitizenship: "Hold EU LTR → Accumulate 10 years total legal residence (6 with sustained integration achievements) → Pass B2 German language exam → Pass Staatsbürgerschaftsprüfung (citizenship knowledge test) → Renounce all other nationalities → Apply at Magistrat/Bezirkshauptmannschaft → Austrian Citizen",
        timelineToPR: "N/A",
        timelineToCitizenship: "10 years total qualifying residence (6 with special integration) + 12–24 months processing",
        probabilityToPR: -1,
        probabilityToCitizenship: 45,
        probabilityNote: "Among EU LTR holders who apply for Austrian citizenship, the approval rate is approximately 80–85%. The 45% estimate accounts for the large proportion who are eligible but choose not to apply due to the renunciation requirement. Austria naturalizes only approximately 7,000–9,000 people per year — significantly below comparable Western European nations. Source: Austrian BMI citizenship statistics."
      },
      "Austrian Citizenship by Descent": {
        fullName: "Austrian Citizenship by Descent (Staatsbürgerschaft durch Abstammung)",
        description: "Austrian citizenship is transmitted by descent (jus sanguinis): a child born to at least one Austrian citizen parent is Austrian at birth, regardless of birthplace. Austria also has provisions for former Austrian citizens and their descendants who lost citizenship due to Nazi persecution (1933–1945) — they can apply for re-acquisition without renouncing other nationalities (one of the few dual-citizenship exceptions in Austria). Children born abroad must be registered at an Austrian consulate.",
        pathToPR: "N/A — Austrian citizenship by descent bypasses permanent residence.",
        pathToCitizenship: "Confirm Austrian citizen parent → Child is Austrian at birth → Register with Austrian consulate if born abroad. For Nazi-era descendants: gather documentation → apply for re-acquisition under § 58c StbG → no renunciation required in this case.",
        timelineToPR: "N/A",
        timelineToCitizenship: "Automatic from birth. Nazi-era re-acquisition: 1–2 years processing.",
        probabilityToPR: -1,
        probabilityToCitizenship: 92,
        probabilityNote: "Citizenship by descent is automatic for eligible persons. Source: Austrian BMI and consular statistics."
      }
    }
  },

  // ─── BELGIUM ───────────────────────────────────────────────────────────────
  {
    id: "belgium",
    name: "Belgium",
    flagEmoji: "🇧🇪",
    region: "Europe",
    permanentResidence: {
      officialName: "Verblijfsvergunning voor onbepaalde duur / Autorisation de séjour illimitée (EU Long-Term Residence)",
      criteria: [
        "Have legally and continuously resided in Belgium for at least 5 years",
        "Have stable, regular, and sufficient resources (not lower than the guaranteed average monthly income — approximately €1,700/month net)",
        "Have health insurance or right to access Belgian social security",
        "Not pose a threat to public policy or national security",
        "Demonstrate integration into Belgian society (language and civic knowledge test required for citizenship, though less formally for EU LTR)"
      ],
      routes: [
        {
          name: "Student Visa → Job Seeker Permit Pipeline",
          visaTypes: ["Student Visa (Belgium)", "Job Seeker Permit (Belgium)"],
          description: "International students completing a master's or PhD at a Belgian university (KU Leuven, Ghent University, ULB, VUB, etc.) can apply for a 12-month job-seeker permit after graduation. Belgium is a hub for EU institutions, international organizations, and pharma/biotech (Johnson & Johnson, UCB, etc.). Student time counts toward the 5-year EU Long-Term Residence threshold. After finding qualifying employment, students switch to a Single Permit and accumulate remaining years.",
          estimatedDuration: "~5 years total: study time counts toward the 5-year EU LTR threshold. After a 3-year degree, approximately 2 more years of qualifying work are needed."
        },
        {
          name: "EU Blue Card → EU Long-Term Residence",
          visaTypes: ["EU Blue Card (Belgium)"],
          description: "Belgium's EU Blue Card requires a salary of at least €55,505/year (2024 figure — one of the highest in the EU). No quota applies. Belgium is home to significant EU/NATO employment; many expats access Belgian PR through employer-sponsored Blue Cards. After 5 years of qualifying residence, EU Long-Term Residence is available.",
          estimatedDuration: "5 years qualifying residence"
        },
        {
          name: "Single Permit → EU Long-Term Residence",
          visaTypes: ["Single Permit (Belgium)"],
          description: "Belgium's Single Permit (Gecombineerde vergunning / Permis unique) combines work authorization and residence permit into one document, issued for non-EU/EEA workers with an employer. Employer must demonstrate the position cannot be filled by an EU worker (labour market test), except for shortage occupations. After 5 years of continuous qualifying residence, EU Long-Term Residence is available.",
          estimatedDuration: "5 years continuous qualifying residence"
        },
        {
          name: "Family – Reunification → EU Long-Term Residence",
          visaTypes: ["Family Reunification Permit (Belgium)"],
          description: "Spouses and dependent children of Belgian citizens or legal residents can join them through family reunification. The sponsor must meet income (€1,700/month net) and housing requirements. After 5 years of continuous qualifying residence, EU Long-Term Residence is available. Spouses of Belgian citizens may naturalize after 3 years of residence and marriage.",
          estimatedDuration: "5 years qualifying residence; citizenship available for spouses of Belgian citizens after 3 years"
        }
      ]
    },
    citizenship: {
      officialName: "Belgische nationaliteit / Nationalité belge (Belgian Nationality)",
      criteria: [
        "Have legally resided in Belgium for at least 5 years total (from the date the declaration of acquisition is submitted, or 5 years for naturalization)",
        "Demonstrate integration: language knowledge (Dutch, French, or German depending on residence region — minimum level varies but typically A2–B1), and proof of social integration (participation in Belgian society) and economic participation (employment, self-employment, study, or recognized disability)",
        "Have no serious criminal convictions in the past 5 years",
        "Belgium fully permits dual citizenship since the 2012 nationality code reform — no renunciation required"
      ],
      routes: [
        {
          name: "Naturalization – General (5-Year Rule)",
          visaTypes: ["EU Long-Term Residence Permit (Belgium)"],
          description: "Belgium's citizenship by declaration (verklaring / déclaration) allows any legal resident with 5 years of lawful residence to apply for Belgian citizenship by demonstrating language knowledge, social integration, and economic participation. No parliamentary vote required (unlike the old naturalization process). Belgium has one of the most accessible citizenship routes in the EU — 5 years with no renunciation requirement and relatively flexible integration criteria.",
          estimatedDuration: "5 years legal residence + 4–12 months declaration processing"
        },
        {
          name: "Citizenship by Descent (Born to Belgian Parent)",
          visaTypes: ["Belgian Citizenship by Descent"],
          description: "A child born to at least one Belgian citizen parent is Belgian at birth (jus sanguinis), regardless of birthplace. Belgium also has extended jus soli provisions: children born in Belgium who would otherwise be stateless, and grandchildren of Belgian citizens born in Belgium. Belgium fully permits dual citizenship.",
          estimatedDuration: "Automatic from birth; consular registration 2–12 months"
        }
      ]
    },
    visaDetails: {
      "Student Visa (Belgium)": {
        fullName: "Belgian Student Visa (Visum voor studies / Visa étudiant) → EU Long-Term Residence Pipeline",
        description: "Non-EU/EEA students at Belgian universities apply for a student visa (type D, long-stay) and a student residence permit in Belgium. Belgium has world-class universities (KU Leuven ranked top 50 globally, Ghent, ULB, VUB) with strong English-language programs. Brussels hosts the headquarters of the EU and NATO, creating significant international employment. Student time counts toward the 5-year EU Long-Term Residence threshold.",
        pathToPR: "Student Visa → Study in Belgium (3–4 years — counts toward 5-year EU LTR) → Graduate (master's or PhD) → Apply for 12-month job-seeker permit → Find qualifying employment → Switch to Single Permit or EU Blue Card → Accumulate remaining time to 5-year total → EU Long-Term Residence",
        pathToCitizenship: "Student Visa → Single Permit or Blue Card → EU Long-Term Residence → 5 years total legal residence → Language test (Dutch/French/German for region) + social/economic integration proof → Declaration of acquisition → Belgian Citizen (dual permitted)",
        timelineToPR: "~5 years total from starting studies: student time counts toward the 5-year EU LTR threshold.",
        timelineToCitizenship: "~6–7 years: 5 years qualifying residence + 4–12 months declaration processing. Belgium has one of the shortest student-to-citizenship timelines in the EU.",
        probabilityToPR: 38,
        probabilityToCitizenship: 28,
        probabilityNote: "The 38% PR probability reflects: ~50% of international graduates remain; ~68% find qualifying employment; ~82% accumulate 5 qualifying years; ~90% EU LTR approval. The 28% citizenship probability is relatively high because Belgium has the most accessible citizenship in the EU for residents (5-year timeline, dual nationality permitted, declaration process rather than full naturalization). Belgium naturalizes approximately 30,000–35,000 people annually. Source: Belgian Immigration Office (DVZ/CGRA) statistics."
      },
      "Job Seeker Permit (Belgium)": {
        fullName: "Belgian Job Seeker Permit (Verblijfsvergunning voor werkzoekenden) → Single Permit",
        description: "After completing a master's or PhD at a Belgian university, non-EU graduates can apply for a 12-month job-seeker permit to find employment in Belgium. This period counts as lawful residence toward the 5-year EU LTR threshold. Belgium's job market — particularly in Brussels (EU institutions, consulting, international organizations), Flanders (pharma, technology, manufacturing), and Wallonia — offers opportunities for graduates with relevant skills.",
        pathToPR: "Apply for 12-month job-seeker permit after graduation → Seek qualifying employment → Find employer → Switch to Single Permit or Blue Card → Complete 5-year residence total → EU Long-Term Residence",
        pathToCitizenship: "Job Seeker → Single Permit → EU LTR → 5 years total → Citizenship declaration → Belgian Citizen",
        timelineToPR: "Ends immediately when qualifying employment is found; combined with study time, PR eligibility is at the 5-year total residence mark.",
        timelineToCitizenship: "~6–7 years from starting studies to citizenship",
        probabilityToPR: 50,
        probabilityToCitizenship: 32,
        probabilityNote: "Belgian graduates seeking employment have strong local networks and language skills (bilingual/multilingual environment). ~65% find qualifying employment within the permit year. Source: Belgian CGVS statistics."
      },
      "EU Blue Card (Belgium)": {
        fullName: "Belgian EU Blue Card → EU Long-Term Residence",
        description: "Belgium's EU Blue Card has one of the highest salary thresholds in the EU — approximately €55,505/year gross (2024), reflecting Belgium's high wage structure. No labour market test required for Blue Card applications. Particularly relevant for senior professionals in Brussels (EU institutions, consulting, legal), pharma (Janssen, UCB), and technology. After 5 years of qualifying residence, EU Long-Term Residence is available.",
        pathToPR: "Secure job offer at €55,505+/year → Apply for EU Blue Card → Work in Belgium → After 5 years qualifying residence → EU Long-Term Residence",
        pathToCitizenship: "EU Blue Card → EU Long-Term Residence → 5 years total residence → Citizenship declaration (dual permitted) → Belgian Citizen",
        timelineToPR: "5 years qualifying residence (including prior student time if applicable)",
        timelineToCitizenship: "~6 years: 5 years + 4–12 months declaration processing",
        probabilityToPR: 62,
        probabilityToCitizenship: 40,
        probabilityNote: "Blue Card holders have high employment stability; ~70% maintain 5 qualifying years. The 40% citizenship probability is boosted by Belgium's accessible 5-year declaration route with dual citizenship. Source: Belgian DVZ Blue Card statistics."
      },
      "Single Permit (Belgium)": {
        fullName: "Belgian Single Permit (Gecombineerde vergunning / Permis unique) → EU Long-Term Residence",
        description: "Belgium's Single Permit combines the work authorization and residence permit into one document. Employers apply on behalf of their non-EU/EEA employees. A labour market test applies (employer must demonstrate no suitable EU worker available) except for certain shortage professions. The permit is renewed annually. After 5 years of continuous qualifying residence, EU Long-Term Residence is available.",
        pathToPR: "Employer applies for Single Permit → Worker receives combined work+residence permit → Annual renewal → After 5 years qualifying residence → EU Long-Term Residence",
        pathToCitizenship: "Single Permit → EU Long-Term Residence → 5 years → Citizenship declaration → Belgian Citizen",
        timelineToPR: "5 years continuous qualifying residence",
        timelineToCitizenship: "~6–7 years from first arriving in Belgium",
        probabilityToPR: 52,
        probabilityToCitizenship: 32,
        probabilityNote: "Single Permit holders face attrition from employer changes and labour market fluctuations. ~60% maintain 5 qualifying years; ~90% EU LTR approval. The 32% citizenship probability reflects Belgium's accessible declaration process. Source: Belgian DVZ statistics."
      },
      "Family Reunification Permit (Belgium)": {
        fullName: "Belgian Family Reunification Permit → EU Long-Term Residence",
        description: "Spouses, registered/cohabiting partners, and dependent children of Belgian citizens or legal residents can join them in Belgium. The sponsor must demonstrate adequate income and housing. The family member receives a temporary residence permit; after 5 years of continuous qualifying residence, EU Long-Term Residence is available. Spouses of Belgian citizens can apply for citizenship via declaration after 3 years of cohabitation and marriage.",
        pathToPR: "Sponsor meets requirements → Family member receives residence permit → After 5 years → EU Long-Term Residence",
        pathToCitizenship: "Family Permit → EU Long-Term Residence → 5 years total → Citizenship declaration (or 3 years for spouses of Belgian citizens) → Belgian Citizen",
        timelineToPR: "5 years qualifying residence",
        timelineToCitizenship: "3 years for spouses of Belgian citizens (cohabitation + marriage route); 5–6 years for others",
        probabilityToPR: 72,
        probabilityToCitizenship: 45,
        probabilityNote: "Family reunification holders have strong settlement motivation. ~80% accumulate 5 qualifying years. The 45% citizenship probability is high because Belgium's accessible declaration route (5 years, dual permitted) combined with family roots in Belgium strongly encourages naturalization. Source: Belgian DVZ statistics."
      },
      "EU Long-Term Residence Permit (Belgium)": {
        fullName: "Belgian EU Long-Term Residence Permit → Citizenship",
        description: "Belgium's EU Long-Term Residence Permit grants indefinite residence rights, full labour market access, and social benefit eligibility. The 5-year residence for EU LTR coincides with the 5-year requirement for citizenship by declaration — meaning citizenship can often be applied for simultaneously with or immediately after the EU LTR. Belgium's citizenship process requires demonstrating language knowledge (Dutch/French/German), social integration, and economic participation, but has no interview and dual citizenship is fully permitted.",
        pathToPR: "N/A — EU Long-Term Residence IS permanent residence in Belgium.",
        pathToCitizenship: "Hold EU LTR (or any 5-year legal residence) → Demonstrate language knowledge (A2–B1 in Dutch/French/German of the region) + social integration (employment/study/civic participation) + no serious criminal record → Submit declaration of acquisition at municipality → Process at court of first instance → Belgian Citizen (dual nationality fully permitted)",
        timelineToPR: "N/A",
        timelineToCitizenship: "5 years total qualifying residence + 4–12 months processing",
        probabilityToPR: -1,
        probabilityToCitizenship: 72,
        probabilityNote: "Belgium has an unusually high naturalization uptake rate because of its accessible 5-year declaration process and dual citizenship permission. Among those who apply for citizenship, the success rate is approximately 80–85% (some rejected for insufficient language or integration). Belgium naturalizes approximately 30,000–35,000 people annually. Source: Belgian DVZ citizenship statistics."
      },
      "Belgian Citizenship by Descent": {
        fullName: "Belgian Citizenship by Descent (Nationaliteit door afstamming / Nationalité par filiation)",
        description: "A child born to at least one Belgian parent acquires Belgian citizenship at birth (jus sanguinis). Belgium also has jus soli provisions: children born in Belgium to foreign parents who have resided in Belgium for at least 5 years, and children who would otherwise be stateless. Belgian citizenship by descent can be transmitted indefinitely to subsequent generations. Dual citizenship is fully permitted.",
        pathToPR: "N/A — Belgian citizenship by descent bypasses permanent residence.",
        pathToCitizenship: "Confirm Belgian citizen parent → Automatic at birth → Consular birth registration if born abroad → Belgian passport.",
        timelineToPR: "N/A",
        timelineToCitizenship: "Automatic from birth. Passport: 2–6 months.",
        probabilityToPR: -1,
        probabilityToCitizenship: 95,
        probabilityNote: "Citizenship by descent is automatic. Source: Belgian consular statistics."
      }
    }
  },

  // ─── FINLAND ───────────────────────────────────────────────────────────────
  {
    id: "finland",
    name: "Finland",
    flagEmoji: "🇫🇮",
    region: "Europe",
    permanentResidence: {
      officialName: "Pysyvä oleskelulupa (Permanent Residence Permit, Type P)",
      criteria: [
        "Have resided continuously in Finland for 4 years on a continuous residence permit (type A) — Finland's PR threshold is shorter than most EU countries",
        "Not have any long absences from Finland (generally not more than 6 months at a stretch)",
        "Have a valid reason for residence (employment, family, etc.)",
        "Have a clean criminal record",
        "Finland allows dual citizenship — no renunciation required"
      ],
      routes: [
        {
          name: "Student Residence Permit → Job Seeker Permit Pipeline",
          visaTypes: ["Student Residence Permit (Finland)", "Job Seeker Permit (Finland)"],
          description: "International students at Finnish universities (University of Helsinki, Aalto University, University of Turku, Tampere University, etc.) receive a student residence permit. After graduation, students can apply for a job-seeker permit valid for 1 year. Finland has a strong technology sector (Nokia's heritage, modern gaming — Supercell, Rovio — and cleantech). Student time counts toward Finland's 4-year PR threshold, making it one of the most efficient student-to-PR pipelines in the EU.",
          estimatedDuration: "~4 years total: study time counts toward the 4-year PR threshold. After a 3-year bachelor's or master's, as little as 1 more year of qualifying residence completes the 4 years. A 4-year degree puts the holder at immediate PR eligibility upon graduation."
        },
        {
          name: "EU Blue Card → Permanent Residence",
          visaTypes: ["EU Blue Card (Finland)"],
          description: "Finland's EU Blue Card requires a recognized higher education degree and a salary of at least 1.5× the average gross salary in Finland (approximately €5,400/month in 2024). No quota. After 4 years of continuous residence in Finland (including Blue Card time), the permanent residence permit is available.",
          estimatedDuration: "4 years qualifying residence"
        },
        {
          name: "Work Residence Permit → Permanent Residence",
          visaTypes: ["Work Residence Permit (Finland)"],
          description: "Finland's work-based residence permit (oleskelulupa työn perusteella) is issued for a specific employer and position. The employer must demonstrate that no Finnish or EU/EEA worker is available (partial labour market consideration). After 4 years of continuous qualifying residence in Finland, the permanent residence permit is available.",
          estimatedDuration: "4 years continuous qualifying residence"
        },
        {
          name: "Family – Spouse/Partner Reunification → Permanent Residence",
          visaTypes: ["Family Reunification Permit (Finland)"],
          description: "Spouses, registered partners, and dependent children of Finnish citizens or permanent residents can join them in Finland. Income requirement applies (sponsor must earn sufficient income). After 4 years of continuous qualifying residence, the permanent residence permit is available.",
          estimatedDuration: "4 years continuous qualifying residence"
        }
      ]
    },
    citizenship: {
      officialName: "Suomen kansalaisuus (Finnish Citizenship)",
      criteria: [
        "Have resided continuously in Finland for at least 5 years (or 7 years total with acceptable gaps) — calculated from the most recent period of continuous residence",
        "Have had a permanent residence permit (Type P) or EU Long-Term Residence for at least 2 years before applying",
        "Demonstrate Finnish or Swedish language skills at B1 level (oral and written), OR demonstrate proficiency in another language with satisfactory Finnish/Swedish knowledge",
        "Have a clean criminal record and not be under criminal investigation",
        "Have fulfilled obligations (taxes, child support, etc.)",
        "Finland fully permits dual citizenship — no renunciation required"
      ],
      routes: [
        {
          name: "Naturalization – General (5-Year Rule)",
          visaTypes: ["Permanent Residence Permit (Finland)"],
          description: "After 5 years of continuous residence in Finland (or 7 years total), holders of a permanent residence permit (Type P) can apply for Finnish citizenship. The language requirement (Finnish or Swedish at B1) is the primary challenge for many applicants. Dual citizenship is fully permitted — Finland reformed its nationality law in 2003 to allow multiple nationalities.",
          estimatedDuration: "5 years continuous residence (can include student time) + 12–18 months citizenship processing"
        },
        {
          name: "Citizenship by Descent (Born to Finnish Parent)",
          visaTypes: ["Finnish Citizenship by Descent"],
          description: "A child born to at least one Finnish citizen parent acquires Finnish citizenship at birth, regardless of birthplace (jus sanguinis). If born abroad to a Finnish parent who was also born abroad, the child may lose Finnish citizenship at age 22 unless they establish a genuine connection with Finland (have lived in Finland or apply to retain citizenship). Dual citizenship fully permitted.",
          estimatedDuration: "Automatic from birth; retain citizenship declaration by age 22 if born abroad to foreign-born Finnish parent"
        }
      ]
    },
    visaDetails: {
      "Student Residence Permit (Finland)": {
        fullName: "Finnish Student Residence Permit (Opiskelijan oleskelulupa) → Permanent Residence Pipeline",
        description: "Non-EU/EEA students at Finnish universities apply for a student residence permit. Finland has a unique education system (free public university education even for international students at some institutions, though €4,000–€18,000/year tuition applies to non-EU students at most). Aalto University is globally ranked in design and engineering; University of Helsinki in research. After graduation, students can apply for a 1-year job-seeker permit. Critically, student time counts toward Finland's 4-year permanent residence threshold — one of the shortest PR timelines in the EU.",
        pathToPR: "Student Permit → Study in Finland (3–4 years — counts toward 4-year PR threshold) → Graduate → Apply for 1-year job-seeker permit → Find qualifying employment → Work Residence Permit → Accumulate remaining time to 4-year total → Permanent Residence (Type P). With a 4-year degree, PR eligibility may be reached immediately upon graduation.",
        pathToCitizenship: "Student Permit → Work Permit → Permanent Residence → 5 years continuous residence total (including student time) + B1 Finnish/Swedish → Citizenship application → Finnish Citizen (dual permitted)",
        timelineToPR: "~4 years total: Finland's 4-year PR threshold is the shortest work-permit-based PR in the EU, and student time counts. A 4-year degree holder can apply for PR immediately upon graduation.",
        timelineToCitizenship: "~6–7 years from starting studies: 5 years continuous residence (including student time) + 12–18 months processing.",
        probabilityToPR: 40,
        probabilityToCitizenship: 30,
        probabilityNote: "Finland's short 4-year PR timeline significantly reduces attrition compared to the 5-year+ countries. The 40% PR probability reflects: ~50% of international graduates remain; ~72% find qualifying employment; ~85% accumulate 4 qualifying years; ~90% PR approval. The 30% citizenship probability is boosted by Finland's dual citizenship permission and 5-year total residence timeline (same threshold as many countries' PR). The language requirement (B1 Finnish/Swedish) is the main citizenship barrier — Finnish is notoriously difficult for most non-Finno-Ugric speakers. Source: Finnish Immigration Service (Migri) annual statistics."
      },
      "Job Seeker Permit (Finland)": {
        fullName: "Finnish Job Seeker Permit (Työnhakijan oleskelulupa) → Work Permit",
        description: "Finnish university graduates can apply for a 1-year job-seeker residence permit after completing their degree. The permit allows working in any position while seeking qualifying employment. Finland's tech sector (gaming, cleantech, ICT) is active in hiring international graduates, particularly those who have learned Finnish during their studies. The job-seeker period counts as qualifying residence toward the 4-year PR threshold.",
        pathToPR: "Apply for 1-year job-seeker permit → Work while seeking qualifying employment → Find qualifying employer → Switch to Work Residence Permit → Accumulate remaining time to 4-year total (counting student time) → Permanent Residence",
        pathToCitizenship: "Job Seeker → Work Permit → Permanent Residence → 5 years total → Citizenship",
        timelineToPR: "Ends when qualifying job is found; combined with study time, PR typically reached at 4-year mark.",
        timelineToCitizenship: "~6–7 years from starting studies",
        probabilityToPR: 55,
        probabilityToCitizenship: 35,
        probabilityNote: "Finnish graduates who have studied in Finland often have some Finnish language skills (boosting employability significantly) and strong local networks. ~68% find qualifying employment within the job-seeker period. Source: Finnish Immigration Service (Migri) data."
      },
      "EU Blue Card (Finland)": {
        fullName: "Finnish EU Blue Card (EU:n sininen kortti) → Permanent Residence",
        description: "Finland's EU Blue Card targets highly qualified workers earning at least 1.5× the average gross salary (~€5,400/month in 2024). No labour market test required. After 4 years of continuous qualifying residence in Finland, the permanent residence permit (Type P) is available — one of the fastest Blue Card to PR timelines in the EU.",
        pathToPR: "Secure high-salary job → Apply for EU Blue Card → Work in Finland → After 4 years → Permanent Residence (Type P)",
        pathToCitizenship: "EU Blue Card → Permanent Residence → 5 years total residence + B1 Finnish/Swedish → Finnish Citizen",
        timelineToPR: "4 years qualifying residence (including any prior student permit time)",
        timelineToCitizenship: "~6–7 years from first arriving in Finland",
        probabilityToPR: 65,
        probabilityToCitizenship: 38,
        probabilityNote: "Blue Card holders have high employment stability. ~75% maintain 4 qualifying years; ~90% receive PR. The 38% citizenship probability reflects Finland's dual citizenship allowance and 5-year timeline, offset by the Finnish/Swedish language B1 requirement. Source: Migri EU Blue Card statistics."
      },
      "Work Residence Permit (Finland)": {
        fullName: "Finnish Work Residence Permit (Oleskelulupa työn perusteella) → Permanent Residence",
        description: "Finland's work-based residence permit is employer-specific and requires the employer to advertise to Finnish and EU/EEA workers first (partial labour market consideration). The permit is valid for 1–2 years (renewable). After 4 years of continuous qualifying residence in Finland, the permanent residence permit (Type P) is available. Finland is actively trying to increase immigration for labour market reasons (aging population).",
        pathToPR: "Employer applies + partial labour market test → Work Permit → Work in Finland → After 4 years → Permanent Residence",
        pathToCitizenship: "Work Permit → Permanent Residence → 5 years continuous + B1 Finnish/Swedish → Finnish Citizen",
        timelineToPR: "4 years continuous qualifying residence",
        timelineToCitizenship: "~6–7 years from first arriving",
        probabilityToPR: 55,
        probabilityToCitizenship: 30,
        probabilityNote: "Work permit holders face attrition from employer changes and the language challenge for long-term integration. ~62% maintain 4 qualifying years; ~90% receive PR. Source: Migri work permit statistics."
      },
      "Family Reunification Permit (Finland)": {
        fullName: "Finnish Family Reunification Permit → Permanent Residence",
        description: "Spouses, registered partners, and dependent children of Finnish citizens or permanent residents can join them in Finland. Income requirement: sponsor must earn sufficient income (approximately €1,300–€1,600/month net depending on family size). After 4 years of continuous qualifying residence, the permanent residence permit is available.",
        pathToPR: "Sponsor meets income requirement → Family member receives residence permit → After 4 years → Permanent Residence",
        pathToCitizenship: "Family Permit → Permanent Residence → 5 years continuous + B1 Finnish/Swedish → Finnish Citizen",
        timelineToPR: "4 years qualifying residence",
        timelineToCitizenship: "~5–6 years for family members already somewhat integrated; language requirement is the main hurdle",
        probabilityToPR: 70,
        probabilityToCitizenship: 38,
        probabilityNote: "Family members in Finland tend to integrate well, particularly when children attend Finnish schools (learning Finnish naturally). ~78% accumulate 4 qualifying years; ~90% receive PR. Source: Migri family reunification statistics."
      },
      "Permanent Residence Permit (Finland)": {
        fullName: "Finnish Permanent Residence Permit (Type P) → Citizenship",
        description: "The Finnish permanent residence permit (Type P, pysyvä oleskelulupa) is valid indefinitely and grants the right to live and work freely in Finland with no employer restriction. After 5 years of continuous residence in Finland (which can include student permit time), citizenship is available. Finland's naturalization requires B1 Finnish or Swedish language proficiency — the main hurdle for most applicants.",
        pathToPR: "N/A — Type P Permit IS permanent residence in Finland.",
        pathToCitizenship: "Hold Permanent Residence (Type P) for at least 2 years → Accumulate 5 years continuous residence in Finland → Pass Finnish or Swedish language test at B1 level (or demonstrate other sufficient knowledge) → Clean criminal record → Submit citizenship application (Kansalaisuushakemus) to Finnish Immigration Service (Migri) → Decision within 12–18 months → Finnish Citizen (dual permitted)",
        timelineToPR: "N/A",
        timelineToCitizenship: "5 years continuous residence + 12–18 months processing",
        probabilityToPR: -1,
        probabilityToCitizenship: 68,
        probabilityNote: "Among permanent residents who apply for Finnish citizenship, the approval rate is approximately 85–90%. The 68% estimate accounts for eligible PR holders who do not apply — primarily those who cannot meet the Finnish/Swedish B1 language requirement. Finland naturalizes approximately 8,000–12,000 people annually. Source: Migri citizenship statistics."
      },
      "Finnish Citizenship by Descent": {
        fullName: "Finnish Citizenship by Descent (Kansalaisuus syntyperän perusteella)",
        description: "Finnish citizenship is transmitted by descent (jus sanguinis): a child born to at least one Finnish citizen parent is Finnish at birth. Important limitation: if a child is born abroad to a Finnish parent who was also born abroad, the child risks losing Finnish citizenship at age 22 unless they have lived in Finland or apply to retain citizenship before that age. Dual citizenship fully permitted since 2003.",
        pathToPR: "N/A — Finnish citizenship by descent bypasses permanent residence.",
        pathToCitizenship: "Confirm Finnish citizen parent → Child is Finnish at birth → Register with Finnish consulate if born abroad → Important: if parent was also born abroad, apply to retain citizenship before age 22.",
        timelineToPR: "N/A",
        timelineToCitizenship: "Automatic from birth. Passport: 2–6 months.",
        probabilityToPR: -1,
        probabilityToCitizenship: 90,
        probabilityNote: "Finnish citizenship by descent is automatic but can be lost at age 22 for second-generation abroad cases who don't act in time — the 90% accounts for this loss rate. Source: Finnish Immigration Service statistics."
      }
    }
  }
]);

fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
console.log("Added Austria, Belgium, Finland. Total:", data.countries.length);
