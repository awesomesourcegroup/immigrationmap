"use client";

import Link from "next/link";
import type { Country } from "@/lib/types";
import { useLanguage } from "@/lib/languageContext";
import { translations } from "@/lib/translations";
import { TX } from "@/app/components/TX";

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-8">
      <h2 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">{title}</h2>
      {children}
    </div>
  );
}

function Row({ label, values }: { label: string; values: (string | number | React.ReactNode)[] }) {
  return (
    <div className="grid gap-px" style={{ gridTemplateColumns: `160px repeat(${values.length}, 1fr)` }}>
      <div className="bg-gray-50 px-3 py-3 text-xs font-semibold text-gray-500 flex items-center">{label}</div>
      {values.map((v, i) => (
        <div key={i} className="bg-white px-3 py-3 text-sm text-gray-800 flex items-center">
          {v ?? <span className="text-gray-300">—</span>}
        </div>
      ))}
    </div>
  );
}

export default function CompareClient({ countries }: { countries: Country[] }) {
  const { lang } = useLanguage();
  const t = translations[lang];

  if (countries.length < 2) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-500 text-lg mb-6">{t.compareSelectMore}</p>
        <Link href="/" className="text-blue-600 font-semibold hover:underline">← {t.backLink.replace("← ", "")}</Link>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <Link href="/" className="text-sm text-gray-500 hover:text-gray-800 transition-colors">{t.backLink}</Link>
        <span className="text-gray-300">·</span>
        <h1 className="text-2xl font-extrabold text-gray-900">{t.compareTitle}</h1>
      </div>

      {/* Country header row */}
      <div
        className="grid gap-px mb-1 rounded-t-2xl overflow-hidden"
        style={{ gridTemplateColumns: `160px repeat(${countries.length}, 1fr)` }}
      >
        <div className="bg-gray-100 px-3 py-4" />
        {countries.map((c) => (
          <Link
            key={c.id}
            href={`/${c.id}`}
            className="bg-white px-3 py-4 flex flex-col items-center gap-1 hover:bg-blue-50 transition-colors"
          >
            <span className="text-4xl">{c.flagEmoji}</span>
            <span className="text-sm font-bold text-gray-800 text-center leading-tight">{c.name}</span>
            <span className="text-xs text-gray-400">{t.regions[c.region] ?? c.region}</span>
          </Link>
        ))}
      </div>

      {/* Divider */}
      <div className="h-px bg-gray-100 mb-6" />

      <Section title={t.comparePRRoutes}>
        <div className="rounded-xl overflow-hidden border border-gray-100 divide-y divide-gray-100">
          <Row
            label={t.comparePRRoutes}
            values={countries.map((c) => (
              <span className="font-bold text-blue-600">{c.permanentResidence.routes.length}</span>
            ))}
          />
          {[0, 1, 2].map((i) => (
            <Row
              key={i}
              label={`${t.routeUnit} ${i + 1}`}
              values={countries.map((c) => {
                const r = c.permanentResidence.routes[i];
                return r ? (
                  <div>
                    <TX className="font-medium text-gray-800 text-xs">{r.name}</TX>
                    {r.estimatedDuration && (
                      <TX className="text-gray-400 text-[11px] mt-0.5 block">{r.estimatedDuration}</TX>
                    )}
                  </div>
                ) : null;
              })}
            />
          ))}
        </div>
      </Section>

      <Section title={t.compareCitRoutes}>
        <div className="rounded-xl overflow-hidden border border-gray-100 divide-y divide-gray-100">
          <Row
            label={t.compareCitRoutes}
            values={countries.map((c) => (
              <span className="font-bold text-amber-600">{c.citizenship.routes.length}</span>
            ))}
          />
          {[0, 1].map((i) => (
            <Row
              key={i}
              label={`${t.routeUnit} ${i + 1}`}
              values={countries.map((c) => {
                const r = c.citizenship.routes[i];
                return r ? (
                  <div>
                    <TX className="font-medium text-gray-800 text-xs">{r.name}</TX>
                    {r.estimatedDuration && (
                      <TX className="text-gray-400 text-[11px] mt-0.5 block">{r.estimatedDuration}</TX>
                    )}
                  </div>
                ) : null;
              })}
            />
          ))}
        </div>
      </Section>

      <Section title={t.compareRequirements}>
        <div className="rounded-xl overflow-hidden border border-gray-100 divide-y divide-gray-100">
          {[0, 1, 2, 3].map((i) => (
            <Row
              key={i}
              label={`#${i + 1}`}
              values={countries.map((c) => {
                const req = c.permanentResidence.criteria[i];
                return req ? <TX className="text-xs text-gray-700">{req}</TX> : null;
              })}
            />
          ))}
        </div>
      </Section>

      <div className="text-center mt-10 pb-24">
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 text-white font-semibold rounded-xl hover:bg-gray-800 transition-colors"
        >
          {t.backLink}
        </Link>
      </div>
    </div>
  );
}
