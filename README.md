# Kien Nguyen — Portfolio

Personal portfolio of **Le Trung Kien Nguyen**, mechanical engineering student at the University of South Florida
(actuators, mechanisms, legged robots). Built with Next.js, Tailwind CSS, react-three-fiber and Framer Motion.
Deployed on Vercel: every push to `main` goes live automatically.

Design brief: [DESIGN.md](DESIGN.md) ("The Drawing Sheet").

## Run it locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Where to change things

| What | File |
|---|---|
| Case studies (text, metrics, images) | `src/data/projects.ts` |
| Experience | `src/data/experience.ts` |
| Skills, awards, bio, portrait | `src/data/about.ts` |
| Photo / video gallery | `src/data/gallery.ts` (section appears once it has items) |
| Contact details | `src/components/Footer.tsx` |
| Résumé download | replace `public/cv.pdf` |
| Colors & fonts | `src/app/globals.css`, `src/app/layout.tsx` |

**Adding photos:** put images in `public/images/projects/` (JPG/WebP, ~1600px wide), then set
`thumbnail` / `images` for that project in `src/data/projects.ts`, e.g. `"/images/projects/airbrake-1.jpg"`.

**Publishing a change:** commit and push to GitHub. Vercel rebuilds the site in about a minute.

## Credits

Started from [Web-Portfolio-Template](https://github.com/Murathanx12/Web-Portfolio-Template) by Murathan Abdullaev (MIT License, see `LICENSE`).
