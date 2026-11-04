# Agent log

One entry per agent session, newest at the bottom. Be honest: what went wrong is the useful part.

<!-- Copy this block for each session:

## YYYY-MM-DD · <short title>
- Goal:
- Delegated:
- Checkpoints:
- Went wrong:
- Changed by hand:

-->

## 2026-11-03 · Build and test MCP lecture server

- Goal: Build an MCP server that provides tools to find a lecture by number and list all lectures.
- Delegated: Asked Gemini CLI to use the MCP tools to retrieve lecture information.
- Checkpoints: Tested `initialize`, `tools/list`, `tools/call`, error handling, and verified that all 12 checks passed.
- Went wrong: Initially, the server had an issue with `lecture.topics.join()` because topics could be a string instead of an array. The checker also failed to launch `npm` directly on Windows (`spawn npm ENOENT`).
- Changed by hand: Updated the topics handling to support both strings and arrays, improved the `find_lecture` description, added the npm start script, and ran the checker through `cmd.exe /c` on Windows.