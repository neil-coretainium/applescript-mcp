import { ScriptDefinition } from "../../types/index.js";

const getCurrentCameraSettings: ScriptDefinition = {
  name: "getCurrentCameraSettings",
  description: "Get the current camera settings (ISO, Shutter Speed, Aperture) from Capture One.",
  schema: {
    type: "object",
    properties: {},
    required: [],
  },
  script: () => `
    use AppleScript version "2.5"
    use scripting additions

    try
      tell application "Capture One"
        set theISO to ISO of camera of current document
        set theShutter to shutter speed of camera of current document
        set theAperture to aperture of camera of current document
      end tell
      return "{\\"iso\\": \\"" & theISO & "\\", \\"shutter\\": \\"" & theShutter & "\\", \\"aperture\\": \\"" & theAperture & "\\"}"
    on error errMsg number errNum
      error "Failed to get current camera settings: " & errMsg
    end try
  `,
};

export default getCurrentCameraSettings;
