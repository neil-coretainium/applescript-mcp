import { ScriptDefinition } from "../../types/index.js";

const getCaptureOneVersion: ScriptDefinition = {
  name: "getCaptureOneVersion",
  description: "Get the installed version of the Capture One application.",
  schema: {
    type: "object",
    properties: {},
    required: [],
  },
  script: () => `
    use AppleScript version "2.5"
    use scripting additions

    try
      set appVersion to version of application "Capture One"
      return "{\\"version\\": \\"" & appVersion & "\\"}"
    on error errMsg number errNum
      error "Failed to get Capture One version: " & errMsg
    end try
  `,
};

export default getCaptureOneVersion;
