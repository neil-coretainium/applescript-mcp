import { ScriptDefinition } from "../../types/index.js";

const checkCameraSettings: ScriptDefinition = {
  name: "checkCameraSettings",
  description: "Compare current camera settings in Capture One to the saved settings. Returns differences if any.",
  schema: {
    type: "object",
    properties: {},
    required: [],
  },
  script: () => `
    use AppleScript version "2.5"
    use scripting additions

    on getSettings()
      set theISO to do shell script "defaults read photo.lostcause.CameraWarning iso"
      set theShutter to do shell script "defaults read photo.lostcause.CameraWarning shutterSpeed"
      set theAperture to do shell script "defaults read photo.lostcause.CameraWarning aperture"
      return {iso:theISO, shutter:theShutter, aperture:theAperture}
    end getSettings

    try
      set savedSettings to getSettings()

      tell application "Capture One"
        set theISO to ISO of camera of current document
        set theShutter to shutter speed of camera of current document
        set theAperture to aperture of camera of current document
      end tell

      set differences to {}
      if iso of savedSettings is not equal to theISO then
        set end of differences to "ISO: expected " & iso of savedSettings & ", got " & theISO
      end if
      if shutter of savedSettings is not equal to theShutter then
        set end of differences to "Shutter: expected " & shutter of savedSettings & ", got " & theShutter
      end if
      if aperture of savedSettings is not equal to theAperture then
        set end of differences to "Aperture: expected " & aperture of savedSettings & ", got " & theAperture
      end if

      set match to (count of differences is 0)
      set resultJson to "{"
      set resultJson to resultJson & "\\"match\\": " & (if match then "true" else "false") & ", "
      set resultJson to resultJson & "\\"current\\": {\\"iso\\": \\"" & theISO & "\\", \\"shutter\\": \\"" & theShutter & "\\", \\"aperture\\": \\"" & theAperture & "\\"}, "
      set resultJson to resultJson & "\\"saved\\": {\\"iso\\": \\"" & (iso of savedSettings) & "\\", \\"shutter\\": \\"" & (shutter of savedSettings) & "\\", \\"aperture\\": \\"" & (aperture of savedSettings) & "\\"}, "
      set resultJson to resultJson & "\\"differences\\": ["
      repeat with i from 1 to count of differences
        set resultJson to resultJson & "\\"" & item i of differences & "\\""
        if i is not (count of differences) then
          set resultJson to resultJson & ", "
        end if
      end repeat
      set resultJson to resultJson & "]}"
      return resultJson
    on error errMsg number errNum
      error "Failed to check camera settings: " & errMsg
    end try
  `,
};

export default checkCameraSettings;
