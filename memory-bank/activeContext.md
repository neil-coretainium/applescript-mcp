# Active Context: Capture One MCP Server

## 1. Current Focus
Exposing existing Capture One AppleScript automation scripts as MCP server tools and implementing new document/variant management functionality.

## 2. Recent Changes & Decisions
- Created a new category `captureOneCategory` in `src/categories/captureOne.ts`.
- Exposed the `batch_rename_collection` AppleScript as an MCP tool with a `resetCounter` parameter.
- Registered `captureOneCategory` in the MCP server (`src/index.ts`).
- Implemented new `listDocumentsAndVariants` tool for retrieving open documents and their variants.
- Decided to work with variants (rather than just images) to capture all editing states and metadata.

## 3. Next Steps
- Test the new listDocumentsAndVariants functionality with various document types and variant states.
- Expose additional AppleScripts (e.g., resume_counter, apply_keywords, navigation scripts) as MCP tools.
- Document tool schemas and usage.
- Test the MCP server integration with Capture One.
- Update documentation and Memory Bank as new tools are added.

## 4. Open Questions & Considerations
- Are there any scripts that require special input/output handling?
- Should all scripts be exposed as-is, or should some be combined/abstracted for a better API?
- How to handle errors and user feedback from AppleScript execution?
