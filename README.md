# Trung Le Portfolio

Personal portfolio site for Trung Le, an Automation Test Engineer focused on test automation, software quality management, and reliable QA processes.

This portfolio presents my QA automation background, technical skills, selected automation frameworks, project experience, and contact links.

## QA Technical Focus

- **UI Automation**: Playwright, Selenium WebDriver, Appium, Robot Framework
- **API Testing**: Postman, RestSharp, Playwright API testing
- **Languages**: TypeScript, JavaScript, Python, C#, Java, SQL
- **Frameworks & Libraries**: NUnit, SpecFlow, TestNG, Maven
- **CI/CD & Tools**: Azure DevOps, AWS, Git, Jira, GitHub Copilot
- **Testing Practices**: regression testing, accessibility testing, test design, test case creation, defect tracking, Agile testing

## Career Direction

With significant enthusiasm in test automation and software quality management, I am passionate about exploring and implementing new technologies to enhance software efficiency and quality.

My career goal is to advance in QA automation and progress toward a fullstack QA role to contribute comprehensively to product quality and delivery.

## Scripts

| Command             | Description                                 |
| ------------------- | ------------------------------------------- |
| `npm run dev`       | Start the local dev server on port **3000** |
| `npm run build`     | Typecheck and create the production build   |
| `npm run preview`   | Serve the production build locally          |
| `npm run typecheck` | Typecheck only (`vue-tsc -b`)               |

## Content

- **Main profile copy**: `src/i18n/messages/namespaces/common/en.json`
- **Hero name**: `src/features/home/components/Hero.vue`
- **Profile details box**: `src/features/home/components/BoxDetails.vue`
- **Social links**: `src/content/social.ts`
- **SEO metadata**: `index.html`
- **Project details**: `src/content/projects/{en,de}/<slug>.ts`
- **Project previews**: `src/content/projects/previews/`
- **Tags**: `src/components/tagVariants.ts`

## Deployment Notes

Before deploying, update the placeholder domain in `index.html`:

```html
https://your-domain.com/
```

Replace it with the production domain used for the portfolio.

### GitHub Pages

This repository is configured for GitHub Pages deployment through a `gh-pages` branch published by GitHub Actions.

- The build base is taken from `VITE_BASE_URL` in the workflow.
- The site URL used in metadata comes from `VITE_SITE_URL`.
- Deep links such as `/project/<slug>` are preserved via `public/404.html` and `src/composables/useRouteObserver.ts`.

After the first successful deploy, set `Settings` -> `Pages` -> `Build and deployment` -> `Source` to `Deploy from a branch`, then select the `gh-pages` branch and `/ (root)`.

If you want to use a custom domain later, set `VITE_BASE_URL=/` and update the metadata URLs in `index.html`.

## Credits & Attribution

This project was originally created and designed by David Heckhoff.

If you use this project or substantial parts of its source code as a base for your own portfolio or work, attribution must be preserved.

Please keep:

- existing credit comments in the source code
- this attribution section in the README
- a visible reference to the original project/repository in derivative works

Original portfolio:
https://david-hckh.com

Commercial reuse or redistribution of substantial portions of this project without permission is prohibited.
