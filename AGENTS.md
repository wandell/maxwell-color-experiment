# Maxwell Color Experiment - Agent Guidance

## Project Overview
This repository contains an interactive educational web application that illustrates James Clerk Maxwell's 1855–1860 color-matching experiments and apparatus.
It serves as an interactive companion piece for Chapter 4 (*Wavelength Encoding*) of the book *Foundations of Image Systems Engineering* (FISE), available at <https://wandell.github.io/FISE-2025/>.

- **Author & Attribution:** Created by Koh Terai under the guidance of Prof. Brian Wandell for Psych 221 (Image Systems Engineering) at Stanford University.
- **Original Upstream:** <https://github.com/kohterai/maxwell-color-experiment>
- **Published Live URL:** <https://wandell.github.io/maxwell-color-experiment/>

## Technology Stack
- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Interactivity:** React 18, `rc-slider`

## GitHub Pages & Static Export Rules (CRITICAL)
This site is statically exported and hosted on GitHub Pages under the subpath `/maxwell-color-experiment`.

1. **Configuration (`next.config.js`):**
   - Must retain `output: 'export'`.
   - Must retain `basePath: '/maxwell-color-experiment'`.
   - Must retain `images: { unoptimized: true }` (Next.js dynamic image optimization requires a Node.js server, which static GitHub Pages does not support).
   - Exports `NEXT_PUBLIC_BASE_PATH: '/maxwell-color-experiment'`.

2. **Image Paths in Components:**
   - In Next.js static exports, string image paths (e.g., `<Image src="/figure-1.png">`) do NOT automatically inherit `basePath`.
   - Always wrap image paths with the `asset()` helper (e.g., `src={asset("/figure-1.png")}`) so the browser requests `/maxwell-color-experiment/...` rather than the domain root.

## Deployment Workflow
- The deployment action lives in `.github/workflows/deploy.yml`.
- **Zero Automated Deployments:** The workflow is strictly configured with `on: workflow_dispatch:`. It does **not** deploy on push.
- To redeploy after making changes, run:
  ```bash
  gh workflow run deploy.yml
  ```
  or click **Run workflow** under the **Actions** tab on GitHub.

## Key Source Files
- `src/app/page.tsx`: Main educational narrative, sliders, equation walkthrough, and experimental results.
- `src/app/components/MaxwellApparatus.tsx`: Interactive SVG rendering of the optical box, ray tracing, prisms, and slits.
- `src/app/components/MaxwellApparatusWrapper.tsx`: Slider state controllers for slit positions and slit widths.
- `src/app/helper/color-conversion.ts`: Wavelength (nm) to RGB conversions.
- `src/app/helper/cie-conversion-table.ts`: CIE conversion reference data.
