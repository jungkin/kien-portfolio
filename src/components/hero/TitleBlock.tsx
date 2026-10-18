const CELLS = [
  { label: "Name", value: "Kien Nguyen" },
  { label: "School", value: "Univ. of South Florida" },
  { label: "Degree", value: "B.S. Mech. Eng. · May 2027" },
  { label: "GPA", value: "3.84" },
  { label: "Cert", value: "CSWA" },
  { label: "Location", value: "Tampa, FL" },
];

export default function TitleBlock() {
  return (
    <dl className="grid grid-cols-2 border-l border-t border-ink md:grid-cols-3 lg:grid-cols-6">
      {CELLS.map((c) => (
        <div key={c.label} className="border-b border-r border-ink px-3 py-3 sm:px-4">
          <dt className="label">{c.label}</dt>
          <dd className="mt-1 text-sm font-medium text-ink">{c.value}</dd>
        </div>
      ))}
    </dl>
  );
}
