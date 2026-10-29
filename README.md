# lead-touchpoints

Lead by touchpoint report: one row per lead, one card per touchpoint.

- `public/index.html` is the page. It asks for a product ID, then shows made up demo data from `public/demo.js`.
- `api/report.js` is the server route. It reads the latest leads and their journeys from the Hyros API and returns them as touchpoints.

## Vercel environment variables

| Name | What it is |
| --- | --- |
| `HYROS_API_KEY` | API key of the Hyros account to report on |
| `REPORT_PASSWORD` | Password the page asks for before loading real leads |

The repo is public, so never commit keys, lead emails, or client data.
