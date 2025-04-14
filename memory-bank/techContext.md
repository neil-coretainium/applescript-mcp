# Technical Context: Capture One MCP Server

## 1. Core Technologies
*(List the primary languages, frameworks, and libraries used.)*
- Language: TypeScript
- Runtime: Node.js
- Key Libraries:
    - `@modelcontext/server`: MCP Server framework
    - `applescript`: Node.js library for executing AppleScript
- Build/Package Manager: npm / TypeScript Compiler (tsc)

## 2. Development Environment Setup
*(Instructions for setting up a local development environment.)*
- Prerequisites: Node.js, npm, Capture One Pro
- Installation Steps:
    1. `git clone <repository_url>`
    2. `cd applescript-mcp`
    3. `npm install`
- Running the Server: `npm start` (or relevant script)

## 3. AppleScript Integration
*(Details on how AppleScript is used and managed.)*
- Execution Method: (e.g., `applescript` library, direct `osascript` calls)
- Script Location: `src/AppleScripts/`
- Error Handling: (How are AppleScript errors caught and reported?)
- Key Scripts: (List important or complex scripts)

## 4. Dependencies & Integrations
*(List external systems, APIs, or significant dependencies.)*
- Capture One Pro (Requires installation and running application)
- macOS (AppleScript execution is OS-dependent)

## 5. Technical Constraints & Considerations
*(Any limitations, performance considerations, or specific technical challenges.)*
- macOS only.
- Relies on Capture One's AppleScript dictionary stability.
- Potential performance impact of frequent AppleScript execution.
