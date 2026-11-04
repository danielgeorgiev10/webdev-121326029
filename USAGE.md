# Usage

One row per agent session. In Gemini CLI, type `/stats` before you quit and copy the input and output tokens. Copilot shows credits instead of tokens: write those in the credits column. The free tier charges nothing, so record what the session **would cost at the provider's published list price**, and note once below the table which price list you used. Leave the cost empty for rows that only show credits.

| Date     | Tool     | Input tokens | Output tokens | Credits (if no tokens) | List-price cost |
|2026-11-03|Gemini CLI|24,931        |63             |---                     |$0.01306         |
|2026-11-03|Gemini CLI|24,985        |63             |---                     |$0.01309         |
|2026-11-03|Gemini CLI|66,371	     |2,192          |---                     |$0.04160         |
|2026-10-21|Gemini CLI|12,424        |659            |---                     |$0.01179         |
|2026-10-21|Gemini CLI|27,278        |104            |---                     |$0.01386         |

Price list used
- Gemini 3 Flash Preview: input $0.50/M, cached input $0.05/M, output $3.00/M.
- Gemini 3.5 Flash-Lite: input $0.30/M, output $2.50/M.
- Gemini 3.8 Flash: input $0.75/M, output $3.75/M
- Other models: zero token usage, so no cost.
