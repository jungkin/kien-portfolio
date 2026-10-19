"use client";

import { motion, useReducedMotion } from "framer-motion";
import SectionHeading from "@/components/global/SectionHeading";
import { skillGroups, certification } from "@/data/about";

export default function SkillsSection() {
  const reduce = useReducedMotion();

  return (
    <section id="skills" className="relative py-20 md:py-32">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
        <SectionHeading index="04" title="Skills" kicker="Bill of materials." />

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_260px]"
        >
          <table className="w-full border-collapse border border-ink text-left">
            <caption className="sr-only">Skills bill of materials</caption>
            <thead className="hidden bg-ink text-paper md:table-header-group">
              <tr className="font-mono text-[11px] uppercase tracking-[0.08em]">
                <th scope="col" className="w-24 px-4 py-3 font-normal">Item no.</th>
                <th scope="col" className="w-52 px-4 py-3 font-normal">Category</th>
                <th scope="col" className="px-4 py-3 font-normal">Components</th>
                <th scope="col" className="w-16 px-4 py-3 text-right font-normal">Qty</th>
              </tr>
            </thead>
            <tbody className="block md:table-row-group">
              {skillGroups.map((g, i) => (
                <tr
                  key={g.category}
                  className="block border-b border-rule p-4 last:border-b-0 md:table-row md:p-0"
                >
                  <td className="block font-mono text-xs text-ink-3 md:table-cell md:border-b md:border-rule md:px-4 md:py-4 md:align-top">
                    <span className="md:hidden">ITEM </span>
                    {String(i + 1).padStart(2, "0")}
                  </td>
                  <th
                    scope="row"
                    className="block font-display text-xl font-normal tracking-tight text-ink md:table-cell md:border-b md:border-rule md:px-4 md:py-4 md:align-top"
                  >
                    {g.category}
                  </th>
                  <td className="mt-3 block md:mt-0 md:table-cell md:border-b md:border-rule md:px-4 md:py-4 md:align-top">
                    <ul className="flex flex-wrap gap-1.5">
                      {g.items.map((it) => (
                        <li
                          key={it}
                          className="border border-rule px-2 py-1 font-mono text-[11px] tracking-[0.04em] text-ink-2"
                        >
                          {it}
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td className="mt-3 block font-mono text-xs text-ink-3 md:mt-0 md:table-cell md:border-b md:border-rule md:px-4 md:py-4 md:text-right md:align-top">
                    <span className="md:hidden">QTY </span>
                    {String(g.items.length).padStart(2, "0")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <aside className="reg-marks h-fit border border-ink bg-paper-2 p-6">
            <p className="label">Certification</p>
            <p className="mt-4 font-display text-5xl leading-none tracking-tight text-ink">
              {certification.short}
            </p>
            <p className="mt-3 text-ink-2">{certification.name}</p>
            <p className="mt-6 inline-block border border-signal px-2 py-0.5 font-mono text-[11px] uppercase tracking-[0.08em] text-signal-ink">
              SolidWorks
            </p>
          </aside>
        </motion.div>
      </div>
    </section>
  );
}
