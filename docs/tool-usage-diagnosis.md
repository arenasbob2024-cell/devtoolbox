# Tool Usage Diagnosis

The Adsterra target depends on repeat tool usage, not just blog pageviews. Use these events to separate three different questions:

1. Do visitors reach a tool workspace?
2. Do they actually use the tool?
3. Which tools create enough qualified usage to deserve more SEO/internal-link focus?

## Events

| Event | Meaning | Primary fields |
| --- | --- | --- |
| `tool_workspace_seen` | The tool workspace card became visible. This is stronger than a pageview but still not usage. | `tool_id`, `tool_category`, `language`, `placement` |
| `tool_engagement_start` | The visitor made the first meaningful action inside the tool workspace: input, change, paste, drop, or a tool button click. | `tool_id`, `tool_category`, `language`, `placement`, `action` |
| `tool_engagement_qualified` | The visitor used the tool enough to count as real engagement: at least two meaningful actions, or 30 seconds after the first action. | `tool_id`, `tool_category`, `language`, `placement`, `action_count` |
| `content_feedback` | The visitor rated a blog/tool surface as helpful or not helpful. | `content_type`, `content_id`, `feedback_value` |
| `tool_search_no_results` | A homepage search had no matching tool. This is unmet demand. | `query_length`, `language`, `placement` |

## Core Metrics

| Metric | Formula | Interpretation |
| --- | --- | --- |
| Tool activation rate | `tool_engagement_start / tool_workspace_seen` | Low rate means users landed but did not understand or need the tool. |
| Qualified usage rate | `tool_engagement_qualified / tool_workspace_seen` | Low rate means the tool may not solve the job well enough. |
| Tool quality signal | Helpful votes, comments, repeat visits, qualified usage | Use this before adding more content or ads around a tool. |
| Unmet demand | `tool_search_no_results` queries and blog posts with high exits | Build or improve tools around these queries. |

## Weekly Read

1. Rank tools by `tool_workspace_seen`.
2. For the top 20, calculate activation and qualified usage rates.
3. Mark tools into buckets:
   - `Scale`: high views, high qualified usage.
   - `Fix`: high views, low qualified usage.
   - `Investigate`: high blog traffic, low tool entry.
   - `Ignore for now`: low views and low usage.
4. For `Fix` tools, inspect the page manually:
   - Does the first screen show the actual input area?
   - Is the default example useful?
   - Does the output appear instantly?
   - Is copy/download obvious?
   - Is the tool solving the keyword intent from the blog/search query?
5. Only after a tool is `Scale` or repaired should it receive stronger blog CTAs, related links, or extra ad experiments.

## Goal Gate

Do not treat pageviews as tool demand. The operating target should be:

```text
qualified tool usage sessions up, repeat tool visitors up, then Adsterra revenue up
```

The monetization gate remains `npm run adsterra:gate`, but this diagnosis tells us whether the product engine underneath Adsterra is healthy.
