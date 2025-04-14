import { ScriptDefinition } from "../../types/index.js";

const clearSavedCameraSettings: ScriptDefinition = {
  name: "clearSavedCameraSettings",
  description: "Clear the saved camera settings from persistent storage.",
  schema: {
    type: "object",
    properties: {},
    required: [],
  },
  script: () => `
    use AppleScript version "2.5"
    use scripting additions

    try
      do shell script "defaults delete photo.lostcause.CameraWarning"
      return "{\\"success\\": true}"
    on error errMsg number errNum
      error "Failed to clear camera settings: " & errMsg
    end try
  `,
};

export default clearSavedCameraSettings;
