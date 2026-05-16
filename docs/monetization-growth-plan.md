# DevToolBox Monetization Growth Plan

Last updated: 2026-05-16

## Current baseline

- Revenue network: Adsterra.
- Search discovery is part of the revenue engine: `/sitemap.xml` now resolves to the sitemap index, and legacy `/sitemaps/*.xml` requests redirect to the live sitemap route so Google/Bing do not hit dead sitemap URLs.
- Live placements seen in production HTML:
  - Top leaderboard iframe: `NEXT_PUBLIC_ADSTERRA_TOP_KEY`.
  - Tool sidebar rectangle iframe: `NEXT_PUBLIC_ADSTERRA_SIDEBAR_KEY`.
  - Bottom native banner is injected client-side via `NEXT_PUBLIC_ADSTERRA_NATIVE_SCRIPT` and `NEXT_PUBLIC_ADSTERRA_NATIVE_KEY`.
- Former AdSense slots are disabled; the remaining AdSense script has been removed from the layout.
- `ads.txt` exists and now declares `OWNERDOMAIN=viadreams.cc`, but the exact Adsterra seller line still needs to be copied from the Adsterra dashboard.

## Revenue levers

1. Increase ad impressions per monetized session without breaking the tool experience.
2. Raise RPM by separating placements, then keeping the winners and removing weak slots.
3. Grow high-intent organic traffic to tool pages and comparison/tutorial blog pages.
4. Add non-ad revenue where intent is strong: affiliate links, sponsorships, and downloadable templates.

## New configurable ad slots

The codebase now supports separate Adsterra keys for high-signal placements:

| Environment variable | Placement |
| --- | --- |
| `NEXT_PUBLIC_ADSTERRA_TOOL_TOP_KEY` | Tool page, above the tool body |
| `NEXT_PUBLIC_ADSTERRA_TOOL_BOTTOM_KEY` | Tool page, after the tool content |
| `NEXT_PUBLIC_ADSTERRA_SIDEBAR_SECONDARY_KEY` | Tool sidebar, secondary 300x250 |
| `NEXT_PUBLIC_ADSTERRA_TOOLS_INDEX_TOP_KEY` | All tools index, above the sponsor CTA |
| `NEXT_PUBLIC_ADSTERRA_TOOLS_INDEX_BOTTOM_KEY` | All tools index, after the category sections |
| `NEXT_PUBLIC_ADSTERRA_BLOG_TOP_KEY` | Blog listing, above article cards |
| `NEXT_PUBLIC_ADSTERRA_BLOG_BOTTOM_KEY` | Blog listing, below article cards |
| `NEXT_PUBLIC_ADSTERRA_BLOG_ARTICLE_TOP_KEY` | Blog article, below article header |
| `NEXT_PUBLIC_ADSTERRA_BLOG_ARTICLE_BOTTOM_KEY` | Blog article, after newsletter/related tools |
| `NEXT_PUBLIC_ADSTERRA_CATEGORY_TOP_KEY` | Category landing page, above the tool grid |
| `NEXT_PUBLIC_ADSTERRA_CATEGORY_BOTTOM_KEY` | Category landing page, after the tool grid |
| `NEXT_PUBLIC_ADSTERRA_MOBILE_STICKY_KEY` | Mobile-only bottom sticky banner |
| `NEXT_PUBLIC_ADSTERRA_MOBILE_STICKY_WIDTH` | Optional sticky banner width, default `320` |
| `NEXT_PUBLIC_ADSTERRA_MOBILE_STICKY_HEIGHT` | Optional sticky banner height, default `50` |

Create each as a separate Adsterra placement so reports can show RPM by location. Do not reuse the same key everywhere unless you only need aggregate impressions.

The homepage, tools index, category pages, blog listing, and blog article pages include a direct `/advertise` sponsor CTA. These links pass `source` and `category` query parameters into the advertise page, and the default sponsorship email includes that context in the inquiry body. This captures commercial interest even before a paid ad network slot is configured for that surface.

The `/advertise` page now behaves like a lightweight media kit. It recommends a starter package from the incoming `source` and `category`, shows sellable inventory for each package, and sends the selected package in the sponsorship inquiry. Package-level CTA clicks use `monetization_click` IDs such as `advertise-package-category-sponsor`, so GA can show which commercial offer is getting buyer intent.

## Non-ad revenue configuration

The sidebar recommendation card can now use real partner/referral URLs without code changes:

| Environment variable | Offer |
| --- | --- |
| `NEXT_PUBLIC_AFFILIATE_VERCEL_URL` | Vercel |
| `NEXT_PUBLIC_AFFILIATE_DIGITALOCEAN_URL` | DigitalOcean |
| `NEXT_PUBLIC_AFFILIATE_CLOUDFLARE_URL` | Cloudflare |
| `NEXT_PUBLIC_AFFILIATE_GITHUB_COPILOT_URL` | GitHub Copilot |
| `NEXT_PUBLIC_AFFILIATE_JETBRAINS_URL` | JetBrains |
| `NEXT_PUBLIC_AFFILIATE_TAILWIND_UI_URL` | Tailwind UI |
| `NEXT_PUBLIC_AFFILIATE_SUPABASE_URL` | Supabase |
| `NEXT_PUBLIC_AFFILIATE_SENTRY_URL` | Sentry |
| `NEXT_PUBLIC_AFFILIATE_POSTMAN_URL` | Postman |
| `NEXT_PUBLIC_AFFILIATE_1PASSWORD_URL` | 1Password |
| `NEXT_PUBLIC_SUPPORT_URL` | Support / donation CTA |
| `NEXT_PUBLIC_SPONSOR_CONTACT_URL` | Sponsor inquiry link for `/advertise` |

Tool sidebar partner cards only show affiliate links whose env vars are configured. If no relevant affiliate URL exists, the slot falls back to the internal `/advertise` sponsorship CTA instead of sending high-intent traffic to unpaid external homepages. The card now emits `monetization_impression` for each visible affiliate offer and for the sidebar sponsor link with `placement=tool-sidebar-partner-card`, so GA can calculate CTR by tool category.

Blog article pages now include an inline partner-offer block after the newsletter signup. It matches configured affiliate offers against the article slug and keywords, tracks affiliate impressions/clicks with `placement=blog-article-partner-offer`, and falls back to an article sponsorship inquiry when no affiliate URL is configured.

After a visitor successfully copies tool output three times in one session, the site now shows a lightweight support/sponsor nudge. It waits until the cookie notice is dismissed, frequency-caps dismissal for 24 hours, links to `NEXT_PUBLIC_SUPPORT_URL` or `/advertise`, and tracks `monetization_impression` / `monetization_click` with `placement=copy-success-nudge`. This turns high-intent tool usage into a non-ad revenue opportunity without adding another page-level ad slot.

Clicks are sent to Google Analytics as `monetization_click` with `monetization_type`, `monetization_id`, `tool_category`, and `placement` parameters. Sponsor CTAs and Adsterra containers also emit `monetization_impression` when at least half of the monetized surface is visible, so GA can calculate CTR and viewable opportunity by surface. Use these events to decide which categories deserve stronger partner offers and which ad slots deserve dedicated Adsterra placements.

## Weekly operating loop

Run the API report after generating an Adsterra Publisher API token:

```bash
ADSTERRA_API_KEY=... npm run adsterra:report -- stats --days=7 --group-by=placement
ADSTERRA_API_KEY=... npm run adsterra:report -- stats --days=7 --group-by=country
```

Then decide:

- Keep or expand placements with strong CPM and acceptable bounce rate.
- Remove or move placements with weak CPM, low fill, or UX complaints.
- Build new content for countries with high CPM and visible search demand.
- Add `placement_sub_id` tracking for Smartlink experiments before putting Smartlinks into content.

## Next experiments

1. Fill the exact Adsterra `ads.txt` seller line from the dashboard.
2. Create separate Adsterra placements for tool top, tool bottom, blog top, and blog article bottom.
3. Create a 320x50 mobile banner in Adsterra and test it with `NEXT_PUBLIC_ADSTERRA_MOBILE_STICKY_KEY`. Watch mobile bounce rate and revenue/session for at least 7 days.
4. Replace generic affiliate links with real partner/referral links and track clicks by category.
5. Publish the prepared Dev.to and social posts in `content/` to drive referral traffic and backlinks.
6. Use GA `monetization_click` counts to identify which tool categories produce buyer-intent clicks and sell those categories through `/advertise`.
7. Review `copy-success-nudge` impressions, support clicks, and sponsor clicks weekly; if CTR is weak, test copy threshold `2` vs `3` and alternate support text.
