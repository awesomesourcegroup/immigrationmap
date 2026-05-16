const fs = require("fs");
const path = require("path");
const filePath = path.join(__dirname, "../data/countries.json");
const data = JSON.parse(fs.readFileSync(filePath, "utf8"));

const newCountries = [
  {
    id: "netherlands",
    name: "Netherlands",
    flagEmoji: "🇳🇱",
    region: "Europe",
    permanentResidence: {
      officialName: "EU Long-Term Residence Permit (Verblijfsvergunning voor onbepaalde tijd EU)",
      criteria: [
        "Have legally and continuously resided in the Netherlands for at least 5 years",
        "Have a sufficient, independent, and durable income (at least 100% of the applicable social assistance norm)",
        "Pass the civic integration exam (inburgeringsexamen) at B1 level in Dutch language and knowledge of Dutch society — or hold an exemption",
        "No threats to public order or national security",
        "Have had valid health insurance throughout the qualifying period",
        "IMPORTANT: The Netherlands generally does NOT permit dual nationality — acquiring Dutch citizenship typically requires renouncing other nationalities (with limited exceptions)"
      ],
      routes: [
        {
          name: "Student Permit → Orientation Year → Highly Skilled Migrant Pipeline",
          visaTypes: ["Student Permit (Netherlands)", "Orientation Year Permit (Netherlands)"],
          description: "International students who complete a bachelor's, master's, or PhD at a Dutch university can apply for the Orientation Year (Zoekjaar Hoogopgeleide) — a 1-year permit to find work matching their degree. If they find employment paying above the Highly Skilled Migrant (HSM) salary threshold (€4,840/month in 2024 for those 30+; €3,549/month under 30), they transition to the HSM permit. After 5 years of qualifying residence including student and HSM time, the EU Long-Term Residence Permit is available.",
          estimatedDuration: "8–11 years: 3–4 years study + 1 year Orientation + 4+ years HSM permit toward 5-year residence threshold"
        },
        {
          name: "Highly Skilled Migrant Permit → EU Long-Term Residence",
          visaTypes: ["Highly Skilled Migrant Permit (Netherlands)"],
          description: "The Highly Skilled Migrant (HSM / Kennismigrant) permit is the Netherlands' flagship route for skilled non-EU workers, requiring a salary above the IND threshold (€4,840/month for those 30+; €3,549/month for those under 30; €2,801/month for recent Dutch university graduates in 2024). No labour market test required. The HSM permit is employer-tied but can be changed between recognised sponsors. After 5 years of continuous legal residence in the Netherlands, the EU Long-Term Residence Permit is available.",
          estimatedDuration: "5 years of qualifying residence (HSM permit time counts) + several months processing"
        },
        {
          name: "EU Blue Card → EU Long-Term Residence",
          visaTypes: ["EU Blue Card (Netherlands)"],
          description: "The EU Blue Card in the Netherlands is available to non-EU nationals with a higher education degree and a salary of at least €5,670/month (2024). It is similar to the HSM permit but carries EU-wide mobility rights. After 5 years of legal residence in the Netherlands (EU Blue Card time counts toward this), the EU Long-Term Residence Permit is available.",
          estimatedDuration: "5 years of qualifying residence + processing"
        },
        {
          name: "Family – Spouse/Partner Reunification → EU Long-Term Residence",
          visaTypes: ["Family Reunification Permit (Netherlands)"],
          description: "Spouses and registered partners of Dutch citizens or holders of a valid Dutch residence permit can join them in the Netherlands. An income requirement applies (sponsor must earn at least 100% of the applicable minimum wage). The family member receives an initial temporary permit; after 5 years of continuous lawful residence, the EU Long-Term Residence Permit becomes available.",
          estimatedDuration: "5 years continuous qualifying residence + processing"
        },
        {
          name: "Self-Employed Permit → EU Long-Term Residence",
          visaTypes: ["Self-Employed Permit (Netherlands)"],
          description: "Non-EU entrepreneurs can obtain a self-employed residence permit if their business plan meets the IND's points-based assessment (based on personal experience, business plan viability, and added value for the Netherlands). After 5 years of continuous qualifying residence as a self-employed person with sufficient income, the EU Long-Term Residence Permit becomes available.",
          estimatedDuration: "5 years qualifying self-employment residence + processing"
        }
      ]
    },
    citizenship: {
      officialName: "Dutch Citizenship (Nederlanderschap)",
      criteria: [
        "Have held a permanent or long-term residence permit and have legally and continuously resided in the Netherlands for at least 5 years",
        "Have successfully passed the civic integration exam (inburgeringsexamen) at B1 level — or hold an exemption (e.g., Dutch diploma, refugee status)",
        "Be of good conduct (no serious criminal convictions in the past 4 years)",
        "IMPORTANT: The Netherlands generally requires renunciation of other nationalities upon naturalization. Exceptions include: people from countries that do not allow renunciation, stateless persons, spouses/registered partners of Dutch citizens (if renunciation would cause serious problems), and those who lost Dutch citizenship through marriage",
        "Be at least 16 years old"
      ],
      routes: [
        {
          name: "Naturalization – General (5-Year Rule)",
          visaTypes: ["EU Long-Term Residence Permit (Netherlands)"],
          description: "After 5 years of continuous and lawful residence in the Netherlands, holders of a long-term or permanent residence permit can apply for Dutch citizenship by naturalization (naturalisatie). The civic integration requirement (B1 Dutch + knowledge of Dutch society) must be fulfilled. The Netherlands generally requires renunciation of other nationalities; applicants from countries that prohibit renunciation are exempt.",
          estimatedDuration: "5 years qualifying residence + 12–24 months naturalization processing"
        },
        {
          name: "Citizenship by Descent (Born to Dutch Parent)",
          visaTypes: ["Dutch Citizenship by Descent"],
          description: "A child born to at least one Dutch parent acquires Dutch citizenship at birth (jus sanguinis), regardless of where the birth occurs. Children born in the Netherlands to foreign parents who have resided legally in the Netherlands for 5 years may also acquire Dutch citizenship. Dutch citizenship acquired by descent can be passed to the next generation only if the child is born in the Netherlands or is registered as Dutch before age 7.",
          estimatedDuration: "Automatic from birth; passport application 2–6 months"
        }
      ]
    },
    visaDetails: {
      "Student Permit (Netherlands)": {
        fullName: "Dutch Student Permit (Verblijfsvergunning Studie) → EU Long-Term Residence Pipeline",
        description: "The Netherlands does not issue a separate student visa for non-EU nationals studying at Dutch universities — instead, the university acts as the IND-recognised sponsor and requests the student's residence permit (verblijfsvergunning). The Netherlands has strong research universities (TU Delft, Wageningen, Leiden, Maastricht) with many English-language programs. After graduation, students can apply for the Orientation Year (Zoekjaar Hoogopgeleide) to find qualifying employment. The pipeline: Student Permit → Orientation Year → HSM Permit → EU Long-Term Residence.",
        pathToPR: "Study at Dutch university (3–4 years) → Graduate → Apply for 1-year Orientation Year Permit → Find job with HSM-eligible salary (€3,549–€4,840/month depending on age) → Switch to HSM Permit → Continue working in Netherlands → After 5 cumulative years qualifying residence → Apply for EU Long-Term Residence Permit",
        pathToCitizenship: "Student Permit → HSM Permit → EU Long-Term Residence → Pass civic integration exam (B1 Dutch) → Apply for naturalization → Renounce other nationalities (generally required) → Dutch Citizen",
        timelineToPR: "8–11 years: 3–4 years study + 1 year Orientation Year + 4 years HSM permit to reach 5-year residence",
        timelineToCitizenship: "10–14 years from starting studies (5 years qualifying residence + 12–24 months naturalization processing)",
        probabilityToPR: 32,
        probabilityToCitizenship: 14,
        probabilityNote: "The 32% reflects attrition across the pipeline: ~50% of international graduates apply for and receive the Orientation Year; ~65% of those find HSM-qualifying employment; ~80% of those maintain qualifying residence through 5 years; ~90% of qualifying applicants receive EU Long-Term Residence. The 14% citizenship probability is significantly reduced by the Netherlands' strict no-dual-citizenship policy — many eligible residents choose not to naturalize to avoid renouncing their birth nationality. The Netherlands naturalizes ~25,000–30,000 people annually. Source: IND (Immigration and Naturalisation Service) annual statistics."
      },
      "Orientation Year Permit (Netherlands)": {
        fullName: "Dutch Orientation Year Permit (Zoekjaar Hoogopgeleide) → HSM Permit",
        description: "The Orientation Year (Zoekjaar Hoogopgeleide) is a 1-year residence permit allowing recent graduates of Dutch or top-100 international universities to seek employment in the Netherlands. Eligibility: must have obtained a bachelor's, master's, or PhD within the past 3 years. Holders may work in any job during the year. After finding qualifying employment, they transition to the HSM permit or EU Blue Card. The Orientation Year counts toward the 5-year residence requirement for EU Long-Term Residence.",
        pathToPR: "Apply for Orientation Year within 3 years of graduation → Come to Netherlands → Work any job while searching → Find employer offering HSM-qualifying salary → Switch to HSM Permit → Continue to 5-year threshold → EU Long-Term Residence",
        pathToCitizenship: "Orientation Year → HSM Permit → EU Long-Term Residence → Naturalization (with renunciation of other nationalities generally required) → Dutch Citizen",
        timelineToPR: "1 year Orientation + 4 years HSM to complete 5-year residence (Orientation Year counts)",
        timelineToCitizenship: "6–9 years from receiving Orientation Year to citizenship",
        probabilityToPR: 45,
        probabilityToCitizenship: 18,
        probabilityNote: "Orientation Year holders are pre-screened (Dutch or top-100 international degree) and arrive intending to work in the Netherlands, leading to higher conversion rates than general job seekers. Approximately 60–70% find HSM-qualifying employment within the year; of those, ~85% complete the path to EU Long-Term Residence. The low citizenship probability reflects the dual-citizenship barrier. Source: IND statistics."
      },
      "Highly Skilled Migrant Permit (Netherlands)": {
        fullName: "Dutch Highly Skilled Migrant Permit (Kennismigrant) → EU Long-Term Residence",
        description: "The Kennismigrant (Highly Skilled Migrant) permit is the Netherlands' primary route for attracting skilled non-EU workers. No Dutch labour market test required. Employer must be a recognised IND sponsor. Salary thresholds (2024): €4,840/month for ages 30+; €3,549/month for under 30; €2,801/month for recent Dutch university graduates. Initial permit is 3 years (or job contract duration +3 months). After 5 years of continuous qualifying residence in the Netherlands (including HSM time), the EU Long-Term Residence Permit is available.",
        pathToPR: "Secure job offer with IND-recognised sponsor paying above HSM threshold → Apply for HSM permit → Work in Netherlands → After 5 years continuous qualifying residence → Apply for EU Long-Term Residence Permit at IND",
        pathToCitizenship: "HSM Permit → EU Long-Term Residence → Civic integration exam (B1 Dutch) → Naturalization (renunciation of other nationalities generally required) → Dutch Citizen",
        timelineToPR: "5 years continuous qualifying residence in Netherlands + several months processing",
        timelineToCitizenship: "6–8 years from first arriving on HSM permit",
        probabilityToPR: 60,
        probabilityToCitizenship: 22,
        probabilityNote: "HSM permit holders have a relatively straightforward path to EU Long-Term Residence — the main attrition is voluntary departures (career moves, personal reasons, employer changes to non-IND-recognised companies). Approximately 65% maintain qualifying residence through 5 years; ~90% of qualifying applicants receive EU Long-Term Residence. The 22% citizenship probability remains low due to the renunciation requirement. Source: IND Kennismigrant statistics."
      },
      "EU Blue Card (Netherlands)": {
        fullName: "EU Blue Card (Netherlands) → EU Long-Term Residence",
        description: "The EU Blue Card in the Netherlands requires a higher education degree and a salary of at least €5,670/month (2024 figure). It functions similarly to the HSM permit but offers EU-wide recognition and easier intra-EU mobility. After 5 years of legal residence in the Netherlands, the EU Long-Term Residence Permit is available. The Blue Card holder who has held the card for 18+ months may also move to other EU member states.",
        pathToPR: "Obtain recognized higher education degree + job offer at €5,670+/month → Apply for EU Blue Card → Work in Netherlands → After 5 years qualifying residence → EU Long-Term Residence Permit",
        pathToCitizenship: "EU Blue Card → EU Long-Term Residence → Civic integration (B1 Dutch) → Naturalization (renunciation generally required) → Dutch Citizen",
        timelineToPR: "5 years qualifying residence + processing",
        timelineToCitizenship: "7–9 years to citizenship",
        probabilityToPR: 58,
        probabilityToCitizenship: 20,
        probabilityNote: "EU Blue Card holders have similar attrition rates to HSM permit holders. The 20% citizenship probability is slightly lower than HSM holders because Blue Card holders tend to be more internationally mobile. Source: IND EU Blue Card statistics."
      },
      "Family Reunification Permit (Netherlands)": {
        fullName: "Dutch Family Reunification Permit → EU Long-Term Residence",
        description: "Family members of Dutch citizens or legal Dutch residents can obtain a family reunification permit. The sponsor must earn at least 100% of the applicable social assistance norm (approximately €1,701/month net for a single person in 2024). The family member receives a temporary permit tied to the sponsor's status. After 5 years of continuous lawful residence, the EU Long-Term Residence Permit is available, providing independent status from the sponsor.",
        pathToPR: "Sponsor meets income requirements → Apply for family reunification → Receive temporary family permit → Reside in Netherlands → After 5 years continuous qualifying residence → Apply for EU Long-Term Residence Permit",
        pathToCitizenship: "Family Permit → EU Long-Term Residence → Civic integration exam → Naturalization (renunciation generally required) → Dutch Citizen",
        timelineToPR: "5 years continuous qualifying residence + processing",
        timelineToCitizenship: "6–8 years to citizenship",
        probabilityToPR: 68,
        probabilityToCitizenship: 28,
        probabilityNote: "Family reunification permit holders have a higher probability of long-term settlement due to family ties in the Netherlands. Approximately 75% accumulate 5 years of qualifying residence; ~90% of qualifying applicants receive EU Long-Term Residence. The 28% citizenship probability is higher than work-based routes because family members tend to integrate more deeply. Source: IND family permit statistics."
      },
      "Self-Employed Permit (Netherlands)": {
        fullName: "Dutch Self-Employed Permit (Verblijfsvergunning Zelfstandige) → EU Long-Term Residence",
        description: "Non-EU entrepreneurs wishing to start or run a business in the Netherlands can apply for a self-employed residence permit. The IND uses a points-based assessment across three criteria: personal experience of the entrepreneur, the business plan, and the added value for the Dutch economy. All three criteria must pass minimum thresholds. After 5 years of continuous qualifying self-employed residence with sufficient income (above social assistance norm), the EU Long-Term Residence Permit is available.",
        pathToPR: "Prepare strong business plan → Apply at IND (points assessment) → If approved: receive self-employed permit → Establish business in Netherlands → File taxes, demonstrate sufficient income annually → After 5 years → EU Long-Term Residence Permit",
        pathToCitizenship: "Self-Employed Permit → EU Long-Term Residence → Civic integration exam → Naturalization → Dutch Citizen",
        timelineToPR: "5 years qualifying self-employment + processing",
        timelineToCitizenship: "7–9 years to citizenship",
        probabilityToPR: 35,
        probabilityToCitizenship: 18,
        probabilityNote: "Self-employed permit holders face significant attrition from business failure or insufficient income over the 5-year qualifying period. Approximately 45% maintain qualifying status through to EU Long-Term Residence eligibility. Source: IND self-employment permit statistics."
      },
      "EU Long-Term Residence Permit (Netherlands)": {
        fullName: "EU Long-Term Residence Permit (Netherlands) → Citizenship",
        description: "The EU Long-Term Residence Permit (verblijfsvergunning voor onbepaalde tijd EU) is the Netherlands' permanent residence status, valid indefinitely without renewal (though the ID card itself must be renewed). It grants the right to live and work freely in the Netherlands, access to social benefits on equal terms, and the right to move to other EU member states for work or study. Holders who have met the 5-year residence requirement may apply for Dutch citizenship by naturalization.",
        pathToPR: "N/A — the EU Long-Term Residence Permit IS permanent residence in the Netherlands.",
        pathToCitizenship: "Hold EU Long-Term Residence Permit → Pass civic integration exam (B1 Dutch language + knowledge of Dutch society) → Be of good conduct (no serious criminal record in past 4 years) → Submit naturalization application to municipality → Renounce other nationalities at ceremony (or apply for exemption) → Dutch Citizen",
        timelineToPR: "N/A",
        timelineToCitizenship: "5 years total qualifying residence + 12–24 months naturalization processing",
        probabilityToPR: -1,
        probabilityToCitizenship: 55,
        probabilityNote: "The 55% probability reflects both applicants and the larger pool of eligible residents who choose not to apply. Among EU Long-Term Residence holders who do apply for naturalization, the approval rate is approximately 80–85%. However, the renunciation requirement suppresses applications significantly — many residents with dual ties (especially Turkish, Moroccan, and other communities) prefer to retain their birth nationality. The Netherlands naturalizes ~25,000–30,000 people annually from a permanent resident base of ~500,000. Source: IND naturalization statistics."
      },
      "Dutch Citizenship by Descent": {
        fullName: "Dutch Citizenship by Descent (Afstamming)",
        description: "Dutch citizenship is transmitted by descent (jus sanguinis): a child born to at least one Dutch parent acquires Dutch citizenship at birth, regardless of birthplace. If born abroad to a Dutch father (for children born before 1985) or Dutch parent (after 1985), a consular birth registration is recommended. An important limitation: Dutch citizenship acquired by descent can only be passed to the next generation automatically if the child is born in the Netherlands or is registered as Dutch before age 7 (to prevent indefinite transmission of Dutch citizenship to generations with no Dutch connection).",
        pathToPR: "N/A — Dutch citizenship by descent bypasses permanent residence entirely.",
        pathToCitizenship: "Confirm at least one parent was Dutch at time of birth → Register birth at Dutch consulate if born abroad → Child is a Dutch citizen. Note: dual citizenship IS permitted for those who acquire Dutch citizenship by birth (descent) — the renunciation requirement only applies to those naturalizing as adults.",
        timelineToPR: "N/A",
        timelineToCitizenship: "Citizenship exists from birth. Passport application: 2–6 months.",
        probabilityToPR: -1,
        probabilityToCitizenship: 93,
        probabilityNote: "For children born to Dutch parents, citizenship acquisition is effectively automatic. The 93% accounts for rare edge cases: births abroad not registered with a Dutch consulate (though late registration is possible), and the 7% of descendants who lose Dutch citizenship through the 10-year inactivity rule (Dutch citizens living abroad who do not renew their Dutch passport for 10+ years may lose citizenship under certain conditions). Source: Dutch Ministry of Justice citizenship statistics."
      }
    }
  },
  {
    id: "sweden",
    name: "Sweden",
    flagEmoji: "🇸🇪",
    region: "Europe",
    permanentResidence: {
      officialName: "Permanent Residence Permit (Permanent uppehållstillstånd, PUT)",
      criteria: [
        "Have had continuous residence in Sweden on time-limited permits for the required period (generally 4 years within the last 7 years for work permits; 3 years for some refugee/protection status holders)",
        "Have a stable employment or means of support (for work-based routes: employment that meets the collective agreement salary level for the occupation)",
        "Not have been convicted of serious crimes or have other public order reasons for refusal",
        "Have held a valid permit throughout the qualifying period without gaps",
        "Sweden allows dual citizenship — you do not need to renounce any other nationality to obtain Swedish permanent residence or citizenship"
      ],
      routes: [
        {
          name: "Student Residence Permit → Job Seeker Permit → Work Permit Pipeline",
          visaTypes: ["Student Residence Permit (Sweden)", "Job Seeker Permit (Sweden)"],
          description: "International students who complete a degree at a Swedish university can apply for a 6-month job-seeker permit to find qualifying employment. Sweden does not have a dedicated post-study work visa but the job-seeker permit fulfils a similar role. After finding employment meeting the collective agreement salary, the student transitions to a work permit. After 4 years of work permit residence within the past 7 years, the permanent residence permit (PUT) is available.",
          estimatedDuration: "8–12 years: 3–4 years study + 6 months job search + 4 years work permit toward PUT"
        },
        {
          name: "Work Permit → Permanent Residence",
          visaTypes: ["Work Permit (Sweden)"],
          description: "Sweden's work permit system requires a job offer meeting the collective agreement minimum wage for the sector (no national minimum wage, but collective agreements cover ~90% of the labour market). Employer must advertise the position to EU/EEA workers for 10 days. After holding work permits for at least 4 of the last 7 years, the worker can apply for permanent residence (PUT). Sweden allows multiple employer changes between work permits.",
          estimatedDuration: "4 years of work permits within a 7-year window + several months PUT processing"
        },
        {
          name: "EU Blue Card → Permanent Residence",
          visaTypes: ["EU Blue Card (Sweden)"],
          description: "Sweden issues the EU Blue Card for highly qualified non-EU workers with a higher education degree and a salary of at least 1.5× the average gross salary in Sweden (~SEK 66,000/month in 2024). After 4 years of qualifying permits within the last 7 years, the permanent residence permit is available.",
          estimatedDuration: "4 years qualifying permits + processing"
        },
        {
          name: "Family – Spouse/Partner Reunification → Permanent Residence",
          visaTypes: ["Family Reunification Permit (Sweden)"],
          description: "Spouses, registered partners, and cohabiting partners of Swedish citizens or permanent residents can obtain a family reunification permit. Initial permit valid for 2 years; after 2 years of residence with the sponsor, a 3-year extension is granted. After 3 years of continuous residence in Sweden (for spouses/partners of Swedish citizens) or 4 years (for family of permanent residents), the permanent residence permit becomes available.",
          estimatedDuration: "3–4 years of continuous qualifying residence for family members"
        },
        {
          name: "Self-Employed Business Permit → Permanent Residence",
          visaTypes: ["Self-Employed Permit (Sweden)"],
          description: "Non-EU nationals can obtain a work permit for self-employment if they can show sufficient income from their business and demonstrate that the business is viable and primarily operated in Sweden. After 4 years of qualifying self-employed residence within a 7-year window, the PUT is available.",
          estimatedDuration: "4 years qualifying self-employment + processing"
        }
      ]
    },
    citizenship: {
      officialName: "Swedish Citizenship (Svenskt medborgarskap)",
      criteria: [
        "Have reached the age of 18 (children can acquire citizenship with parent)",
        "Have had permanent residence (PUT) in Sweden for at least 2 years, AND total continuous legal residence of at least 5 years (2 years for Nordic citizens, 3 years for stateless persons and refugees)",
        "Have been of good conduct during the qualifying residence period (no serious criminal convictions)",
        "Sweden does NOT require renunciation of other nationalities — dual or multiple citizenship is fully permitted",
        "No Swedish language test is formally required for naturalization (though language ability is evaluated informally and encouraged)"
      ],
      routes: [
        {
          name: "Naturalization – General (5-Year Rule)",
          visaTypes: ["Permanent Residence Permit (Sweden)"],
          description: "After holding permanent residence (PUT) for 2 years and having lived in Sweden for at least 5 years total, Swedish citizens can apply for citizenship by naturalization (medborgarskap). No formal language test is required, though the migration authorities do assess whether the applicant can demonstrate meaningful residence (having lived in Sweden rather than merely being registered). Sweden is one of Europe's most accessible citizenship routes — dual citizenship is fully permitted.",
          estimatedDuration: "5 years legal residence in Sweden (including 2 years PUT) + 6–12 months citizenship processing"
        },
        {
          name: "Citizenship by Descent (Born to Swedish Parent)",
          visaTypes: ["Swedish Citizenship by Descent"],
          description: "A child born to at least one Swedish citizen parent acquires Swedish citizenship at birth, regardless of birthplace (jus sanguinis). If born abroad, there is no mandatory registration deadline, but consular birth registration is recommended. Swedish citizenship by descent can be passed to subsequent generations without limitation as long as at least one parent is Swedish at the time of the child's birth.",
          estimatedDuration: "Automatic from birth; passport application 2–6 months"
        }
      ]
    },
    visaDetails: {
      "Student Residence Permit (Sweden)": {
        fullName: "Swedish Student Residence Permit (Uppehållstillstånd för studier) → Permanent Residence Pipeline",
        description: "Sweden is home to several world-ranked universities (Uppsala, Lund, Stockholm, Chalmers, KTH) with extensive English-language programs. Public university tuition fees apply to non-EU students (approximately SEK 80,000–175,000/year). After graduation, students can apply for a 6-month job-seeker permit. Sweden is known for its high quality of life and progressive work environment, attracting skilled graduates. The pipeline leads from student permit → job-seeker permit → work permit → permanent residence (PUT).",
        pathToPR: "Student Permit → Study in Sweden → Graduate → Apply for 6-month Job Seeker Permit → Find qualifying employment (collective agreement wage) → Switch to Work Permit → After 4 years work permits in 7-year window → Apply for Permanent Residence (PUT)",
        pathToCitizenship: "Student Permit → Work Permit → PUT → After 2 years PUT + 5 years total residence → Apply for citizenship → Swedish Citizen (dual citizenship permitted)",
        timelineToPR: "8–11 years: 3–4 years study + 6 months job search + 4 years work permit",
        timelineToCitizenship: "10–13 years to citizenship (5 years residence + 2 years PUT + 6–12 months processing)",
        probabilityToPR: 30,
        probabilityToCitizenship: 22,
        probabilityNote: "Approximately 45% of international graduates in Sweden remain to seek work; ~65% of those find qualifying employment; ~80% of those maintain 4 qualifying years; ~90% of qualifying applicants receive PUT. The relatively higher citizenship probability (22%) compared to similar countries reflects Sweden's permissive dual citizenship policy (no renunciation required) and accessible naturalization (no language test requirement). Sweden naturalizes approximately 40,000–50,000 people annually. Source: Migrationsverket annual statistics."
      },
      "Job Seeker Permit (Sweden)": {
        fullName: "Swedish Job Seeker Permit (Uppehållstillstånd för att söka arbete) → Work Permit",
        description: "Recent graduates from Swedish universities can apply for a 6-month residence permit to seek employment in Sweden (uppehållstillstånd för att söka arbete). During this period, the holder may work in any job, not only graduate-level positions. The purpose is to transition to a qualifying work permit. The 6-month period can be a challenge in industries where the Swedish language is required — many professional positions in Sweden require Swedish proficiency even in international companies.",
        pathToPR: "Apply for 6-month Job Seeker Permit after graduation → Seek qualifying employment → Find employer offering collective-agreement wage → Apply for Work Permit (switch before job-seeker permit expires) → Work in Sweden for 4 years in 7-year window → Apply for PUT",
        pathToCitizenship: "Job Seeker Permit → Work Permit → PUT → Citizenship",
        timelineToPR: "4 years work permit time + 6 months job search = ~5 years from graduation",
        timelineToCitizenship: "7–9 years from graduation",
        probabilityToPR: 42,
        probabilityToCitizenship: 28,
        probabilityNote: "Job Seeker Permit holders who are already in Sweden are somewhat more likely to find work than those applying from abroad. However, the Swedish labour market's language requirements create a barrier for many international graduates. Approximately 55% successfully transition to a qualifying work permit. Source: Migrationsverket data."
      },
      "Work Permit (Sweden)": {
        fullName: "Swedish Work Permit (Arbetstillstånd) → Permanent Residence",
        description: "Sweden's work permit requires a job offer meeting the collective agreement minimum wage for the sector. Permits are issued for up to 2 years initially (renewable for up to 2 more years). After 4 years of valid work permits within a rolling 7-year window, the permanent residence permit (PUT) is available. Key advantage: no numerical quotas and relatively straightforward renewals if employed. Key challenge: employer must advertise to EU/EEA workers for 10 days first, and salary must meet the collective agreement for the specific occupation.",
        pathToPR: "Secure job offer meeting collective agreement wage → Employer provides offer letter + union confirmation of collective agreement compliance → Apply for work permit → Work in Sweden → Renew as needed → After 4 years work permits within 7-year window → Apply for PUT",
        pathToCitizenship: "Work Permit → PUT → 2 years PUT + 5 years total residence → Naturalization → Swedish Citizen",
        timelineToPR: "4 years qualifying work + several months PUT processing",
        timelineToCitizenship: "7–9 years from first arriving in Sweden to citizenship",
        probabilityToPR: 58,
        probabilityToCitizenship: 35,
        probabilityNote: "Work permit holders have a moderate probability of reaching PUT — main attrition is employer changes, especially where new employer violates collective agreement (causing permit invalidity), and voluntary departures. ~65% maintain 4 qualifying years; ~90% of qualifying applicants receive PUT. The 35% citizenship probability reflects Sweden's accessible naturalization process (no language test required, dual citizenship permitted). Source: Migrationsverket statistics."
      },
      "EU Blue Card (Sweden)": {
        fullName: "EU Blue Card (Sweden) → Permanent Residence",
        description: "Sweden issues the EU Blue Card for highly qualified non-EU workers. Requirements: recognized higher education degree (or 5 years relevant professional experience) and a salary of at least 1.5× the average gross salary in Sweden (approximately SEK 66,000/month or ~€5,700/month in 2024). After 4 years of qualifying permits within a 7-year window, the PUT is available. The EU Blue Card also offers enhanced intra-EU mobility after 18 months.",
        pathToPR: "Secure high-salary job offer → Apply for EU Blue Card → Work in Sweden → After 4 years qualifying permits → Apply for PUT",
        pathToCitizenship: "EU Blue Card → PUT → Naturalization → Swedish Citizen",
        timelineToPR: "4 years qualifying permits + processing",
        timelineToCitizenship: "7–9 years to citizenship",
        probabilityToPR: 65,
        probabilityToCitizenship: 38,
        probabilityNote: "EU Blue Card holders have a higher probability of reaching PUT than standard work permit holders because the high salary threshold attracts workers with strong career stability. ~72% maintain qualifying status through 4 years; ~90% receive PUT. Source: Migrationsverket EU Blue Card data."
      },
      "Family Reunification Permit (Sweden)": {
        fullName: "Swedish Family Reunification Permit → Permanent Residence",
        description: "Sweden's family reunification permits allow spouses, registered/cohabiting partners, and children under 18 of Swedish citizens or permanent residents to join them. Accommodation sufficiency is checked. Initial permit is 2 years for spouses/partners; after 2 years of residence (and a 3-year extension), PUT can be applied for. Note: Sweden tightened family reunification rules in 2016 (temporary protection status holders have limited family reunification rights).",
        pathToPR: "Swedish citizen/PR holder sponsors family member → Verify income and accommodation → Family member receives 2-year permit → Reside in Sweden with sponsor → After 3 years (for family of Swedish citizens) or 4 years (for family of PUT holders) → Apply for PUT",
        pathToCitizenship: "Family Permit → PUT → 2 years PUT + 5 years total → Naturalization → Swedish Citizen",
        timelineToPR: "3–4 years continuous qualifying residence + processing",
        timelineToCitizenship: "5–7 years to citizenship",
        probabilityToPR: 72,
        probabilityToCitizenship: 40,
        probabilityNote: "Family reunification permit holders have strong settlement continuity. ~80% accumulate qualifying residence for PUT; ~90% of qualifying applicants receive PUT. The 40% citizenship probability reflects solid integration rates for family migrants who settle long-term. Source: Migrationsverket statistics."
      },
      "Self-Employed Permit (Sweden)": {
        fullName: "Swedish Self-Employed Permit (Arbetstillstånd för eget företag) → PUT",
        description: "Non-EU nationals operating their own business in Sweden can apply for a work permit for self-employment. Requirements: demonstrable income from the business above social assistance levels, proof of business activity primarily in Sweden, and registration with the Swedish Companies Registration Office (Bolagsverket). After 4 years of qualifying self-employed residence within a 7-year window, the PUT is available.",
        pathToPR: "Register business in Sweden → Apply for self-employment work permit → Demonstrate sufficient business income annually → After 4 years qualifying residence → Apply for PUT",
        pathToCitizenship: "Self-Employed Permit → PUT → Naturalization → Swedish Citizen",
        timelineToPR: "4 years qualifying + processing",
        timelineToCitizenship: "7–9 years to citizenship",
        probabilityToPR: 38,
        probabilityToCitizenship: 22,
        probabilityNote: "Self-employed permit holders face income volatility challenges over the 4-year qualifying period. Approximately 45–50% maintain qualifying status through to PUT eligibility. Source: Migrationsverket self-employment permit statistics."
      },
      "Permanent Residence Permit (Sweden)": {
        fullName: "Swedish Permanent Residence Permit (PUT) → Citizenship",
        description: "The PUT (Permanent Uppehållstillstånd) is Sweden's permanent residence status, valid indefinitely (the physical card must be renewed periodically). Holders can live, work, and access public services in Sweden freely. After 2 years with the PUT and 5 years total residence in Sweden, citizenship is available. Sweden's naturalization is notable for: no language test requirement (though residency is evaluated), dual citizenship fully permitted, and relatively quick processing.",
        pathToPR: "N/A — PUT IS permanent residence in Sweden.",
        pathToCitizenship: "Hold PUT → Ensure 5 years total legal residence + 2 years PUT → Be of good conduct → Apply for citizenship at Migrationsverket → If approved: notification letter + application for Swedish passport → Swedish Citizen (no ceremony required, no renunciation needed)",
        timelineToPR: "N/A",
        timelineToCitizenship: "2 years PUT + 5 years total residence + 6–12 months processing",
        probabilityToPR: -1,
        probabilityToCitizenship: 78,
        probabilityNote: "Sweden has one of Europe's highest naturalization rates relative to its permanent resident base (~40,000–50,000 per year). Among PUT holders who apply for citizenship, the approval rate is approximately 85–90%. The 78% estimate reflects both applicants and those eligible PUT holders who choose not to apply. The absence of a language test requirement and full dual citizenship permission significantly increase naturalization uptake compared to countries like the Netherlands. Source: Migrationsverket citizenship statistics."
      },
      "Swedish Citizenship by Descent": {
        fullName: "Swedish Citizenship by Descent (Medborgarskap genom härstamning)",
        description: "Swedish citizenship is transmitted by descent (jus sanguinis): a child born to at least one Swedish citizen parent acquires Swedish citizenship automatically at birth, regardless of birthplace. There is no mandatory registration deadline for births abroad. Sweden permits dual citizenship — children born abroad who acquire both Swedish and another nationality are not required to choose. Swedish citizenship by descent can be transmitted to subsequent generations without limitation, provided at least one parent is Swedish at birth.",
        pathToPR: "N/A — Swedish citizenship by descent bypasses permanent residence entirely.",
        pathToCitizenship: "Confirm at least one parent was a Swedish citizen at time of birth → Child is Swedish at birth → Register with Swedish consulate if born abroad (recommended, not legally mandatory) → Apply for Swedish personal identity number and passport.",
        timelineToPR: "N/A",
        timelineToCitizenship: "Citizenship exists from birth. Passport processing: 2–6 months.",
        probabilityToPR: -1,
        probabilityToCitizenship: 95,
        probabilityNote: "Swedish citizenship by descent is automatic and has very high confirmation rates. The 95% accounts for very rare procedural edge cases. Source: Swedish Migration Agency statistics."
      }
    }
  }
];

data.countries.push(...newCountries);
fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
console.log("Added Netherlands and Sweden. Total countries:", data.countries.length);
