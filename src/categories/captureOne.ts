// src/categories/captureOne.ts
import { ScriptCategory } from "../types/index.js";
import saveCurrentCameraSettings from "./captureOne/saveCurrentCameraSettings.js";
import checkCameraSettings from "./captureOne/checkCameraSettings.js";
import clearSavedCameraSettings from "./captureOne/clearSavedCameraSettings.js";
import getSavedCameraSettings from "./captureOne/getSavedCameraSettings.js";
import getCurrentCameraSettings from "./captureOne/getCurrentCameraSettings.js";
import getCaptureOneVersion from "./captureOne/getCaptureOneVersion.js";

/**
 * Capture One automation scripts.
 * - batch_rename_collection: Sorts current collection by date and batch renames all variants.
 */
export const captureOneCategory: ScriptCategory = {
  name: "captureOne",
  description: "Capture One automation and workflow tools",
  scripts: [
    {
      name: "batch_rename_collection",
      description: "Sorts the current collection by date (ascending) and batch renames all variants. Optionally resets the counter to 1.",
      schema: {
        type: "object",
        properties: {
          resetCounter: {
            type: "boolean",
            description: "If true, counter is set to 1. If false, counter is set based on the first variant's name.",
            default: false,
          },
        },
        required: [],
      },
      script: (args) => `
        use AppleScript version "2.5"
        use framework "Foundation"
        use scripting additions

        set resetCounter to ${args.resetCounter ? "true" : "false"}

        tell front document of application "Capture One 23"
          set sorting order of current collection to by date
          set sorting reversed of current collection to false

          set theVariants to every variant of current collection
          log "Renaming " & number of theVariants & " variants"

          if resetCounter then
            set counter of batch rename settings to 1
          else
            set firstVar to first variant of current collection
            set firstCount to my readCounter(name of firstVar, "\\\\d+$")
            set counter of batch rename settings to firstCount
          end if

          batch rename variants theVariants
        end tell

        property |app| : a reference to current application
        on readCounter(theText, thePattern)
          set foundationString to |app|'s NSString's stringWithString:theText
          set match to (foundationString's rangeOfString:thePattern options:(|app|'s NSRegularExpressionSearch))
          set mStart to match's location()
          set mEnd to (match's |length|()) + mStart
          set match to characters (mStart + 1) thru mEnd of theText as string
          return match as integer
        end readCounter
      `,
    },
    saveCurrentCameraSettings,
    checkCameraSettings,
    clearSavedCameraSettings,
    getSavedCameraSettings,
    getCurrentCameraSettings,
    getCaptureOneVersion,
  ],
};
