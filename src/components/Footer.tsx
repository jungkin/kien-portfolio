import { personalInfo } from "@/data/projects";

const footerLinks = [
  { label: "LinkedIn", url: personalInfo.links.linkedin },
  { label: "GitHub", url: personalInfo.links.github },
  { label: "ArtStation", url: personalInfo.links.artstation },
  { label: "Sketchfab", url: personalInfo.links.sketchfab },
  { label: "GrabCAD", url: personalInfo.links.grabcad },
];

export default function Footer() {
  return (
    <footer id="contact" className="border-t border-border bg-surface">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div>
            <p className="text-lg font-semibold text-foreground">
              {personalInfo.name}
            </p>
            <p className="text-sm text-foreground/50 mt-1">
              {personalInfo.title}
            </p>
            <a
              href={`mailto:${personalInfo.email}`}
              className="text-sm text-cyan hover:underline mt-2 inline-block"
            >
              {personalInfo.email}
            </a>
          </div>

          <div className="flex flex-wrap gap-6">
            {footerLinks.map((link) => (
              <a
                key={link.label}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-foreground/50 hover:text-cyan transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-border text-center">
          <p className="text-xs text-foreground/30">
            &copy; {new Date().getFullYear()} {personalInfo.name}
          </p>
        </div>
      </div>
    </footer>
  );
}
