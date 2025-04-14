import { ScriptDefinition } from "../../types/index.js";

const saveCurrentCameraSettings: ScriptDefinition = {
  name: "saveCurrentCameraSettings",
  description: "Save the current camera settings (ISO, Shutter Speed, Aperture) from Capture One for later comparison.",
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

      do shell script "defaults write photo.lostcause.CameraWarning iso " & theISO
      do shell script "defaults write photo.lostcause.CameraWarning shutterSpeed " & theShutter
      do shell script "defaults write photo.lostcause.CameraWarning aperture " & theAperture

      return "{\\"iso\\": \\"" & theISO & "\\", \\"shutter\\": \\"" & theShutter & "\\", \\"aperture\\": \\"" & theAperture & "\\"}"
    on error errMsg number errNum
      error "Failed to save camera settings: " & errMsg
    end try
  `,
};

export default saveCurrentCameraSettings;
