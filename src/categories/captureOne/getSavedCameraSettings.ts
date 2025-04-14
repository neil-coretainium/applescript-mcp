import { ScriptDefinition } from "../../types/index.js";

const getSavedCameraSettings: ScriptDefinition = {
  name: "getSavedCameraSettings",
  description: "Retrieve the saved camera settings (ISO, Shutter Speed, Aperture) from persistent storage.",
  schema: {
    type: "object",
    properties: {},
    required: [],
  },
  script: () => `
    use AppleScript version "2.5"
    use scripting additions

    try
      set theISO to do shell script "defaults read photo.lostcause.CameraWarning iso"
      set theShutter to do shell script "defaults read photo.lostcause.CameraWarning shutterSpeed"
      set theAperture to do shell script "defaults read photo.lostcause.CameraWarning aperture"
      return "{\\"iso\\": \\"" & theISO & "\\", \\"shutter\\": \\"" & theShutter & "\\", \\"aperture\\": \\"" & theAperture & "\\"}"
    on error errMsg number errNum
      error "Failed to get saved camera settings: " & errMsg
    end try
  `,
};

export default getSavedCameraSettings;
