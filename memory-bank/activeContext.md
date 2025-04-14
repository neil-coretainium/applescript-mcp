# Active Context: Capture One MCP Server

## 1. Current Focus
Exposing existing Capture One AppleScript automation scripts as MCP server tools, starting with batch renaming functionality.

## 2. Recent Changes & Decisions
- Created a new category `captureOneCategory` in `src/categories/captureOne.ts`.
- Exposed the `batch_rename_collection` AppleScript as an MCP tool with a `resetCounter` parameter.
- Registered `captureOneCategory` in the MCP server (`src/index.ts`).
- Decided to prioritize wrapping existing AppleScripts before implementing direct sdef-based tools.

## 3. Next Steps
- Expose additional AppleScripts (e.g., resume_counter, apply_keywords, navigation scripts) as MCP tools.
- Document tool schemas and usage.
- Test the MCP server integration with Capture One.
- Update documentation and Memory Bank as new tools are added.

## 4. Open Questions & Considerations
- Are there any scripts that require special input/output handling?
- Should all scripts be exposed as-is, or should some be combined/abstracted for a better API?
- How to handle errors and user feedback from AppleScript execution?
