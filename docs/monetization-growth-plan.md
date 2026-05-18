# DevToolBox Monetization Growth Plan

Last updated: 2026-05-18

## Current baseline

- Revenue network: Adsterra.
- Search discovery is part of the revenue engine: `/sitemap.xml` now resolves to the sitemap index, and legacy `/sitemaps/*.xml` requests redirect to the live sitemap route so Google/Bing do not hit dead sitemap URLs.
- Live placements seen in production HTML:
  - Top leaderboard iframe: `NEXT_PUBLIC_ADSTERRA_TOP_KEY`.
  - Tool sidebar rectangle iframe: `NEXT_PUBLIC_ADSTERRA_SIDEBAR_KEY`.
  - Bottom native banner is injected client-side via `NEXT_PUBLIC_ADSTERRA_NATIVE_SCRIPT` and `NEXT_PUBLIC_ADSTERRA_NATIVE_KEY`.
- Former AdSense slots are disabled; the remaining AdSense script has been removed from the layout.
- `/ads.txt` is served by `src/app/ads.txt/route.ts`. It declares `OWNERDOMAIN=viadreams.cc` and can inject the exact Adsterra seller line from `ADSTERRA_ADS_TXT_SELLER_LINE`; that env value still needs to be copied from the Adsterra dashboard.

## Revenue levers

1. Increase ad impressions per monetized session without breaking the tool experience.
2. Raise RPM by separating placements, then keeping the winners and removing weak slots.
3. Grow high-intent organic traffic to tool pages and comparison/tutorial blog pages.
4. Add non-ad revenue where intent is strong: affiliate links, sponsorships, and downloadable templates.

## New configurable ad slots

The codebase now supports separate Adsterra keys for high-signal placements:

| Environment variable | Placement |
| --- | --- |
| `NEXT_PUBLIC_ADSTERRA_HOME_INLINE_KEY` | Homepage inline slot, below popular tools |
| `NEXT_PUBLIC_ADSTERRA_TOOL_TOP_KEY` | Tool page, above the tool body |
| `NEXT_PUBLIC_ADSTERRA_TOOL_MID_KEY` | Tool page, after the main tool card and before share/comment actions |
| `NEXT_PUBLIC_ADSTERRA_TOOL_BOTTOM_KEY` | Tool page, after the tool content |
| `NEXT_PUBLIC_ADSTERRA_SIDEBAR_SECONDARY_KEY` | Tool sidebar, secondary 300x250 |
| `NEXT_PUBLIC_ADSTERRA_TOOLS_INDEX_TOP_KEY` | All tools index, above the sponsor CTA |
| `NEXT_PUBLIC_ADSTERRA_TOOLS_INDEX_BOTTOM_KEY` | All tools index, after the category sections |
| `NEXT_PUBLIC_ADSTERRA_BLOG_TOP_KEY` | Blog listing, above article cards |
| `NEXT_PUBLIC_ADSTERRA_BLOG_BOTTOM_KEY` | Blog listing, below article cards |
| `NEXT_PUBLIC_ADSTERRA_BLOG_ARTICLE_TOP_KEY` | Blog article, below article header |
| `NEXT_PUBLIC_ADSTERRA_BLOG_ARTICLE_MID_KEY` | Blog article, after the article body and before share/newsletter actions |
| `NEXT_PUBLIC_ADSTERRA_BLOG_ARTICLE_BOTTOM_KEY` | Blog article, after newsletter/related tools |
| `NEXT_PUBLIC_ADSTERRA_BLOG_ARTICLE_SIDEBAR_KEY` | Blog article desktop sidebar 300x250 |
| `NEXT_PUBLIC_ADSTERRA_CATEGORY_TOP_KEY` | Category landing page, above the tool grid |
| `NEXT_PUBLIC_ADSTERRA_CATEGORY_BOTTOM_KEY` | Category landing page, after the tool grid |
| `NEXT_PUBLIC_ADSTERRA_MOBILE_STICKY_KEY` | Mobile-only bottom sticky banner |
| `NEXT_PUBLIC_ADSTERRA_MOBILE_STICKY_WIDTH` | Optional sticky banner width, default `320` |
| `NEXT_PUBLIC_ADSTERRA_MOBILE_STICKY_HEIGHT` | Optional sticky banner height, default `50` |
| `NEXT_PUBLIC_ADSTERRA_SOCIAL_BAR_SCRIPT` | Optional sitewide Social Bar / high-yield script format |
| `NEXT_PUBLIC_ADSTERRA_SOCIAL_BAR_DELAY_MS` | Optional Social Bar load delay, default `15000` |
| `NEXT_PUBLIC_ADSTERRA_SOCIAL_BAR_SESSION_CAP` | Optional Social Bar session cap, default enabled; set `false` to disable |
| `NEXT_PUBLIC_ADSTERRA_DIRECT_LINK_URL` | Optional Smart Direct Link / Smartlink URL shown in partner-offer surfaces |
| `NEXT_PUBLIC_ADSTERRA_DIRECT_LINK_SUB_ID_PARAM` | Optional Smartlink sub ID parameter, default `psid` |
| `NEXT_PUBLIC_COPY_SUCCESS_NUDGE_THRESHOLD` | Optional copy-success nudge threshold, default `2`, valid range `1`-`5` |

Create each as a separate Adsterra placement so reports can show RPM by location. Do not reuse the same key everywhere unless you only need aggregate impressions.

To avoid waiting on every dedicated unit before revenue ramps, leaderboard slots temporarily reuse `NEXT_PUBLIC_ADSTERRA_TOP_KEY` when their placement-specific key is missing. This applies to `home-inline`, `tool-top`, `tool-mid`, `tool-bottom`, `tools-index-top`, `tools-index-bottom`, `blog-list-top`, `blog-list-bottom`, `blog-article-top`, `blog-article-mid`, `blog-article-bottom`, `category-top`, and `category-bottom`. The layout exposes this public key to client-side ad slots through `window.__DEVTOOLBOX_ADS__`, so runtime Vercel env values still work in client-rendered tool surfaces. Create dedicated Adsterra units for winners as soon as they show meaningful impressions, then set the placement-specific env var to restore clean RPM reporting.

Tool pages also use the existing 300x250 sidebar key as a temporary fallback for `tool-sidebar-secondary` when `NEXT_PUBLIC_ADSTERRA_SIDEBAR_SECONDARY_KEY` is missing. Blog article pages reuse the same sidebar key for `blog-article-sidebar` until `NEXT_PUBLIC_ADSTERRA_BLOG_ARTICLE_SIDEBAR_KEY` exists. This increases rectangle opportunities on high-intent tool and long-read article pages while dedicated units are still waiting to be created, and the sidebar key is exposed through the same runtime `window.__DEVTOOLBOX_ADS__` config so Vercel env values are available to client-rendered slots.

The homepage, tools index, category pages, blog listing, and blog article pages include a direct `/advertise` sponsor CTA. These links pass `source` and `category` query parameters into the advertise page, and the default sponsorship email includes that context in the inquiry body. This captures commercial interest even before a paid ad network slot is configured for that surface.

The homepage sponsor surface is now a configurable Adsterra placement. Set `NEXT_PUBLIC_ADSTERRA_HOME_INLINE_KEY` to run a dedicated homepage inline banner below the popular tools block. If the key is missing or the iframe appears empty, the same surface falls back to a direct sponsorship CTA through `home-inline-ad-fallback` or `home-inline-ad-empty`, keeping homepage traffic measurable instead of mixing it into only the global top/bottom placements.

Homepage inline, mobile sticky, and selected sitewide fallback surfaces are now packaged as Sitewide Visibility inventory on `/advertise`. This gives broad-reach sponsor demand a specific offer instead of forcing homepage/mobile inquiries into only category, article, or generic partner-test packages.

The `/advertise` page now behaves like a lightweight media kit. It recommends a starter package from the incoming `source` and `category`, shows sellable inventory for each package, and sends the selected package in the sponsorship inquiry. Package-level CTA clicks use `monetization_click` IDs such as `advertise-package-category-sponsor`, so GA can show which commercial offer is getting buyer intent.

Sponsor CTA blocks now display the recommended starter package and entry budget directly on the source surface before the click. They also pass a `package` query parameter into `/advertise`, so homepage/mobile/sitewide CTAs land on Sitewide Visibility, blog CTAs land on Article Sponsor, category CTAs land on Category Sponsor, and generic partner/sidebar CTAs land on Partner Test.

The `/advertise` page also emits sponsor impressions for the main contact CTA and every visible package card, and includes OfferCatalog JSON-LD for the sponsorship packages. This makes the advertiser funnel measurable from landing-page view to package-level inquiry click.

The `/advertise` page now includes a tracked media-kit download CTA. The static kit lives at `/devtoolbox-media-kit.md` and gives prospective sponsors a self-serve summary of audience fit, packages, available inventory, measurement, creative requirements, and contact details. The CTA emits `monetization_impression` with `id=advertise-media-kit` and `monetization_click` with `id=advertise-media-kit-download`.

The sponsorship packages now include visible starter budget anchors: Partner Test at US$99-US$299, Article Sponsor at US$149-US$499, Sitewide Visibility at US$199-US$599/week, and Category Sponsor at US$299-US$799/month. These ranges are also exposed in the media kit and OfferCatalog JSON-LD so buyers, search systems, and AI crawlers see that the inventory is immediately purchasable while still leaving room for custom pricing.

The `/advertise` page now includes a structured sponsor brief form. It collects product/company, work email, website, package, budget range, timeline, and campaign notes, then opens a prefilled sponsorship email and provides a one-click copy fallback. The form emits `monetization_impression` with `id=advertise-inquiry-form`, submit clicks with `id=advertise-inquiry-form-submit`, and copy clicks with `id=advertise-inquiry-copy`. This reduces lead friction without storing valuable sponsor inquiries in Vercel's non-durable local filesystem.

The header now includes a tracked Advertise link to `/<lang>/advertise/?source=header-nav&category=site`. It emits `monetization_impression` and `monetization_click` with `placement=header-nav`, giving direct sponsorship demand a site-wide entry point without waiting for users to scroll into page-level sponsor blocks. When `NEXT_PUBLIC_ADSTERRA_DIRECT_LINK_URL` is configured, the header also shows a compact Smart Direct Link entry with `placement=header-direct-link`, creating a site-wide Adsterra click test that is separate from the direct sponsorship funnel.

The footer Advertise link now routes to `/<lang>/advertise/?source=footer-nav&category=site` and emits sponsor `monetization_impression` / `monetization_click` events with `placement=footer-nav`. This makes the persistent bottom navigation sponsorship entry point comparable with the header and in-page sponsor CTAs.

The sitemap now treats `/advertise/` as a commercial discovery page instead of a generic low-priority static page. Localized advertise URLs include hreflang/x-default alternates and use a stronger sitemap priority, helping search engines discover the sponsor media-kit funnel across languages.

The LLM discovery routes now describe the current commercial reality accurately: DevToolBox is free and ad-supported, active locales are `en`, `zh`, and `ru`, and AI/search systems are pointed to `/en/advertise/` plus the downloadable media kit. The old static `public/llms.txt` copy was removed so `/llms.txt` has one authoritative source. This avoids outdated "zero ads" claims while turning AI citations and crawler summaries into another sponsorship discovery path.

The localized 404 page now recovers dead-link traffic into high-value navigation paths and a tracked sponsor surface with `placement=not-found-sponsor`. If `NEXT_PUBLIC_ADSTERRA_DIRECT_LINK_URL` is configured, that same surface also shows a Smart Direct Link with its own `psid`, turning invalid URLs into a measurable recovery and monetization test instead of the default dead end.

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

Blog article pages now include a configurable post-content Adsterra slot with `placement=blog-article-mid`. Configure `NEXT_PUBLIC_ADSTERRA_BLOG_ARTICLE_MID_KEY` as a separate unit to measure long-read RPM independently from the article top and bottom slots. If the key is missing or the iframe appears empty, the surface falls back to an Article Sponsor CTA through `blog-article-mid-ad-fallback` or `blog-article-mid-ad-empty`.

The all-tools index and category landing pages now have an affiliate-backed partner strip. It only renders when matching `NEXT_PUBLIC_AFFILIATE_*` URLs are configured, adds a category sponsorship link, and tracks impressions/clicks with `placement=tools-index-partner-strip` or `placement=category-partner-strip`.

After a visitor successfully copies tool output twice in one session by default, the site now shows a lightweight support/sponsor nudge. The threshold can be tuned with `NEXT_PUBLIC_COPY_SUCCESS_NUDGE_THRESHOLD` from `1` to `5`. It waits until the cookie notice is dismissed, frequency-caps dismissal for 24 hours, links to `NEXT_PUBLIC_SUPPORT_URL` or `/advertise`, and tracks `monetization_impression` / `monetization_click` with `placement=copy-success-nudge`. When `NEXT_PUBLIC_ADSTERRA_DIRECT_LINK_URL` is configured, the same nudge adds a tracked Smart Direct Link offer so high-intent tool usage can contribute Adsterra click revenue without adding another page-level ad slot.

When a visitor gives a tool a 5-star rating, the sidebar rating widget now shows a compact support/sponsor follow-up. This captures a high-satisfaction moment, sends support clicks to `NEXT_PUBLIC_SUPPORT_URL`, routes sponsor interest to `/advertise/?source=tool-rating-thanks&category=<tool-id>`, optionally shows an Adsterra Smart Direct Link offer, and tracks `monetization_impression` / `monetization_click` with `placement=tool-rating-thanks`.

When a visitor shares a tool on X/LinkedIn or copies the page link from the tool-page share bar, the site now records a `tool_share` event with method, tool ID, category, and placement. The share bar then shows a compact support/sponsor follow-up, routes sponsor interest to `/advertise/?source=share-bar-thanks&category=<tool-id>`, optionally shows an Adsterra Smart Direct Link offer, and tracks `monetization_impression` / `monetization_click` with `placement=share-bar-thanks`.

When a visitor submits tool feedback in the comment section, the success state now includes a support/sponsor follow-up. Sponsor clicks route to `/advertise/?source=comment-success-nudge&category=<tool-id>`, the same state can show an Adsterra Smart Direct Link offer, and impressions/clicks are tracked with `placement=comment-success-nudge`.

When a reader marks a blog guide as helpful, the helpful-vote widget now records a `content_feedback` event and shows a support/sponsor follow-up. Sponsor clicks route to `/advertise/?source=blog-helpful-thanks&category=<post-slug>`, the same state can show an Adsterra Smart Direct Link offer, and impressions/clicks are tracked with `placement=blog-helpful-thanks`.

When a visitor subscribes to the newsletter from the footer, tool sidebar, or blog article, the site now records a `newsletter_signup` event with placement and category. The success state includes a support/sponsor follow-up, sponsor links preserve the source as `<placement>-newsletter-success`, optionally shows an Adsterra Smart Direct Link offer, and impressions/clicks are tracked with `placement=newsletter-success-nudge`.

When a homepage search returns zero tools, the site now records a privacy-safe `tool_search_no_results` event with query length, language, and placement, without sending the raw search text. The no-results state also shows a sponsor CTA with `placement=home-search-no-results`, turning unmet tool demand into a measurable sponsorship signal.

The footer and tool-sidebar support buttons now emit `monetization_impression` as well as `monetization_click`, with the tool sidebar passing the current tool category. When `NEXT_PUBLIC_ADSTERRA_DIRECT_LINK_URL` is configured, the same support surfaces add a secondary Smart Direct Link offer with placements such as `footer-support-direct-link` and `tool-sidebar-support-direct-link`. This makes support CTR and Adsterra Direct Link CTR measurable by page surface and category instead of only counting outbound clicks.

Bottom Adsterra slots now fall back to a direct sponsorship CTA when the corresponding Adsterra key is not configured. When a bottom slot does have a key but the client iframe still appears empty after load time, it falls back with placements such as `tool-bottom-ad-empty` and `blog-article-bottom-ad-empty`. The global bottom native banner also falls back through `site-bottom-native-ad-fallback` or `site-bottom-native-ad-empty`. This applies to tool pages, tools index, blog list, blog articles, category pages, and the site-wide footer ad surface, so unfilled, blocked, or regionally unreachable ad inventory still becomes a measurable sponsor opportunity.

High-visibility empty ad surfaces now also recover into sponsor inventory. The global top leaderboard falls back through `site-top-leaderboard-ad-fallback` / `site-top-leaderboard-ad-empty`, while tool pages recover `tool-top`, `tool-mid`, `tool-sidebar-secondary`, and `tool-sidebar-primary` into tracked sponsor CTAs. This prevents the most valuable above-the-fold, post-tool, and sidebar areas from disappearing when Adsterra keys are missing, blocked, or unfilled.

Above-the-fold Adsterra iframe units now load eagerly instead of using browser lazy loading. This applies to the site top leaderboard, page-level top leaderboards, the tool and blog article sidebar rectangles, and the mobile sticky unit so the highest-viewability requests are not delayed; mid-page and bottom inventory remains lazy.

The global layout also preconnects to the Adsterra iframe script host and the configured native-banner script origin. This keeps the first ad request from paying the full DNS/TLS setup cost on every fresh session, especially for the top leaderboard and bottom native unit.

Tool pages now include a post-tool Adsterra slot with `placement=tool-mid`. Configure `NEXT_PUBLIC_ADSTERRA_TOOL_MID_KEY` as a separate unit to measure revenue from visitors who reached the tool body and are still engaged enough to share, comment, or continue browsing. If the key is missing or the iframe appears empty, the surface falls back to a Category Sponsor CTA through `tool-mid-ad-fallback` or `tool-mid-ad-empty`.

The mobile sticky slot now also recovers into a compact direct-sponsor bar. If `NEXT_PUBLIC_ADSTERRA_MOBILE_STICKY_KEY` is not configured, the site shows a dismissible mobile-only sponsor CTA with `placement=mobile-sticky-ad-fallback` after the cookie notice is dismissed; if the configured mobile iframe appears empty after load time, it recovers through `placement=mobile-sticky-ad-empty` after the notice is dismissed. The real Adsterra mobile iframe still mounts as soon as the page is ready so cookie-banner dismissal does not delay the ad request. Closing the bar is remembered for 24 hours in local storage so the test can monetize mobile visibility without reappearing on every reload.

The optional Adsterra Social Bar / high-yield script slot is disabled unless `NEXT_PUBLIC_ADSTERRA_SOCIAL_BAR_SCRIPT` is configured and the site is rebuilt/redeployed. When enabled, it loads after a delay, deduplicates the script tag, caps loading to once per browser session by default, and records an Adsterra impression with `placement=site-social-bar`. Treat it as an experiment: compare revenue per session, mobile bounce rate, and returning-user behavior before keeping it permanently.

The optional Adsterra Smart Direct Link slot is disabled unless `NEXT_PUBLIC_ADSTERRA_DIRECT_LINK_URL` is configured and the site is rebuilt/redeployed. When enabled, it appears as a sponsored offer in high-intent partner surfaces: header navigation, tool sidebar partner cards, blog article partner blocks, all-tools partner strips, category partner strips, sponsor fallback CTAs, copy-success nudges, post-action thanks nudges, support-button surfaces, and the mobile sticky fallback. Each URL gets a `psid` sub ID by default, such as `dtb_tool_sidebar_partner_card_en_formatter`, so Adsterra reports can be grouped by `placement_sub_id` and weak surfaces can be removed quickly.

Clicks are sent to Google Analytics as `monetization_click` with `monetization_type`, `monetization_id`, `tool_category`, and `placement` parameters. Sponsor CTAs and Adsterra containers also emit `monetization_impression` when at least half of the monetized surface is visible, so GA can calculate CTR and viewable opportunity by surface. Use these events to decide which categories deserve stronger partner offers and which ad slots deserve dedicated Adsterra placements.

## Weekly operating loop

Run the API report after generating an Adsterra Publisher API token:

```bash
npm run adsterra:setup -- --vercel-scope=arenas-projects-ac293cdb --site-url=https://viadreams.cc
npm run adsterra:setup -- --vercel-scope=arenas-projects-ac293cdb --site-url=https://viadreams.cc --csv
npm run adsterra:readiness -- --vercel-scope=arenas-projects-ac293cdb --site-url=https://viadreams.cc
ADSTERRA_API_KEY=... npm run adsterra:report -- stats --days=7 --group-by=placement
ADSTERRA_API_KEY=... npm run adsterra:report -- stats --days=7 --group-by=country
ADSTERRA_API_KEY=... npm run adsterra:report -- stats --days=7 --group-by=placement_sub_id
ADSTERRA_API_KEY=... npm run adsterra:goal -- --days=7 --target=10
ADSTERRA_API_KEY=... npm run adsterra:report -- recommend --days=7 --min-impressions=1000
npm run adsterra:goal -- --sample
npm run adsterra:report -- recommend --sample
```

Then decide:

- Keep or expand placements with strong CPM and acceptable bounce rate.
- Remove or move placements with weak CPM, low fill, or UX complaints.
- Build new content for countries with high CPM and visible search demand.
- Review `placement_sub_id` tracking for Smartlink experiments and remove weak surfaces quickly.

If the Adsterra API token is not available, export placement and country reports from the dashboard as CSV and run:

```bash
npm run adsterra:report -- stats --file=exports/adsterra-placement.csv
npm run adsterra:goal -- --file=exports/adsterra-daily.csv --target=10
npm run adsterra:report -- recommend --placements-file=exports/placements.csv --countries-file=exports/countries.csv --min-impressions=1000
```

The CSV import path accepts common column names such as placement/ad unit/zone, country/geo, impressions/views/loads, clicks, CTR, CPM/eCPM, revenue/profit/earnings, and prints the same scale/review recommendations as the API flow.

The `adsterra:setup` command prints the operational checklist for creating Adsterra units and filling Vercel env vars. It groups required trust/proof items, active production units, high-impact experiments, and dedicated RPM placements; the `--csv` variant is designed for copy/paste into an operating sheet while creating units in the Adsterra dashboard. It does not print secret values.

The `adsterra:readiness` command checks local, optional Vercel environment, and optional live-site readiness without printing secret values. It reports whether the active Adsterra ad unit env vars are present, whether every supported dedicated placement key is configured for clean RPM reporting, whether high-impact experiments such as Smart Direct Link / mobile sticky / Social Bar are configured, whether `/ads.txt` still lacks the seller line env value or live seller line, whether an API token or CSV export is available for a real revenue goal check, and a prioritized next-action list with the exact Vercel env commands to run after creating the missing Adsterra units.

The `adsterra:goal` command is the revenue completion gate. It prints PASS only when the measured average daily Adsterra revenue is at least the target, and exits non-zero when the period is below target so deployment or optimization work is not mistaken for verified revenue.

## Next experiments

1. Fill the exact Adsterra `ads.txt` seller line from the dashboard by setting `ADSTERRA_ADS_TXT_SELLER_LINE` in Vercel production env and redeploying.
2. Create separate Adsterra placements for tool top, tool mid, tool bottom, blog top, blog article mid, and blog article bottom.
3. Create a 320x50 mobile banner in Adsterra and test it with `NEXT_PUBLIC_ADSTERRA_MOBILE_STICKY_KEY`. Watch mobile bounce rate and revenue/session for at least 7 days.
4. Replace generic affiliate links with real partner/referral links and track clicks by category.
5. Publish the prepared Dev.to and social posts in `content/` to drive referral traffic and backlinks.
6. Use GA `monetization_click` counts to identify which tool categories produce buyer-intent clicks and sell those categories through `/advertise`.
7. Review `copy-success-nudge` impressions, support clicks, sponsor clicks, and Direct Link clicks weekly; if CTR is weak or bounce rate changes, test `NEXT_PUBLIC_COPY_SUCCESS_NUDGE_THRESHOLD=3` vs the default `2` and alternate support text.
8. Review `tool-rating-thanks` impressions, support clicks, and sponsor clicks weekly; if CTR is weak, test showing the nudge after 4-star ratings or replacing the support CTA with a category-specific partner offer.
9. Review `tool_share` by method and compare it with `share-bar-thanks` clicks. If X/LinkedIn shares are low but copy-link shares are high, prioritize copy-link follow-up copy and category-specific partner offers.
10. Review `comment-success-nudge` impressions and clicks. If sponsor CTR is strong, prioritize direct sponsorship outreach for tools that receive repeated feedback submissions.
11. Review `content_feedback` and `blog-helpful-thanks` by post slug. If helpful votes cluster around a topic, sell that topic as sponsored guide inventory and create more articles for the same category.
12. Review `newsletter_signup` by placement and compare it with `newsletter-success-nudge` clicks. If tool-sidebar subscribers convert better than footer subscribers, prioritize category-specific sponsor packages for those tool categories.
13. Review `tool_search_no_results` counts by language and compare them with `home-search-no-results` sponsor clicks. Build new tools or category sponsorship pitches around repeated zero-result demand.
14. Review support-button impressions and clicks by `placement=tool-sidebar` versus `placement=footer`. If a category has strong support CTR, reuse that category for higher-priced sponsorship outreach.
15. Review bottom ad fallback sponsor impressions and clicks by placement, including `*-ad-fallback`, `*-ad-empty`, and `site-bottom-native-*`. If a fallback surface gets clicks before an Adsterra key is configured, or if an enabled key repeatedly appears empty, create a dedicated Adsterra unit for that surface, move the slot, or sell it as direct sponsorship inventory.
16. Review `placement=header-nav` sponsor CTR and `placement=header-direct-link` Adsterra CTR separately. If the direct-link CTR is high but sponsor CTR is weak, keep the header offer as an Adsterra surface; if sponsor CTR is stronger, emphasize the Advertise link and move the direct link to lower-intent surfaces.
17. Review `advertise-media-kit-download` clicks against package inquiry clicks. If downloads occur without follow-up, replace the static kit with a short form or add a stronger budget/timeline prompt inside the kit.
18. Compare `placement=footer-nav` against `placement=header-nav`. If footer clicks convert better, add stronger media-kit copy near the footer support/newsletter area.
19. Review `advertise-inquiry-form-submit` versus `advertise-inquiry-copy` weekly. If copy clicks are high but email replies are low, move the contact address closer to the brief preview or add a durable lead destination such as a CRM form endpoint.
20. Review `mobile-sticky-ad-fallback` and `mobile-sticky-ad-empty` impressions/clicks against mobile bounce rate. If sponsor CTR is weak but impressions are high, create a dedicated Adsterra 320x50 mobile unit; if bounce rate worsens, keep the 24-hour close cap and reduce mobile sticky usage to high-intent tool pages only.
21. Create a dedicated homepage inline Adsterra unit and configure `NEXT_PUBLIC_ADSTERRA_HOME_INLINE_KEY`. Compare `home-inline` RPM against global top leaderboard RPM; if homepage RPM is weak but fallback sponsor CTR is strong, sell the homepage block as direct sponsorship instead of running network ads there.
22. Review `advertise-package-sitewide-sponsor` clicks from `home-inline-*`, `mobile-sticky-*`, `header-nav`, and `footer-nav` sources. If broad-reach package clicks are stronger than Partner Test clicks, pitch Sitewide Visibility as the default launch package and keep Partner Test for smaller category-specific pilots.
23. Create an Adsterra Social Bar unit, configure `NEXT_PUBLIC_ADSTERRA_SOCIAL_BAR_SCRIPT`, redeploy, and run it for 7 days with the default delayed, once-per-session behavior. Keep it only if the added revenue per session offsets any change in mobile bounce rate or repeat-user engagement.
24. Create an Adsterra Smart Direct Link unit, configure `NEXT_PUBLIC_ADSTERRA_DIRECT_LINK_URL`, redeploy, and review `placement_sub_id` results after 7 days. Keep only the partner surfaces whose direct-link EPC and user behavior are acceptable.
25. Review `not-found-sponsor` impressions and direct-link `psid=dtb_not_found_sponsor_*` clicks. If dead-link traffic is meaningful, add a dedicated recovery article or category recommendation near the 404 sponsor surface.
