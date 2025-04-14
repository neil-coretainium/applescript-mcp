import { describe, expect, it, jest } from "@jest/globals";
import listDocumentsAndVariants from "../listDocumentsAndVariants.js";
import type { ScriptDefinition } from "../../../types/index.js";

describe("listDocumentsAndVariants", () => {
  it("should have correct schema definition", () => {
    expect(listDocumentsAndVariants.name).toBe("listDocumentsAndVariants");
    expect(listDocumentsAndVariants.description).toBeDefined();
    expect(listDocumentsAndVariants.schema).toEqual({
      type: "object",
      properties: {},
      required: [],
    });
  });

  it("should generate valid AppleScript", () => {
    const scriptContent = typeof listDocumentsAndVariants.script === 'function' 
      ? listDocumentsAndVariants.script({})
      : listDocumentsAndVariants.script;
    
    // Verify script content contains essential components
    expect(scriptContent).toContain("on run");
    expect(scriptContent).toContain("tell application");
    expect(scriptContent).toContain("set docList to {}");
    expect(scriptContent).toContain("set varList to {}");
    expect(scriptContent).toContain("end run");
  });

  it("should include error handling", () => {
    const scriptContent = typeof listDocumentsAndVariants.script === 'function' 
      ? listDocumentsAndVariants.script({})
      : listDocumentsAndVariants.script;
    
    // Verify error handling components
    expect(scriptContent).toContain("on error");
    expect(scriptContent).toContain("error");
    expect(scriptContent).toContain("try");
  });

  it("should include JSON helpers", () => {
    const scriptContent = typeof listDocumentsAndVariants.script === 'function' 
      ? listDocumentsAndVariants.script({})
      : listDocumentsAndVariants.script;
    
    // Verify JSON helper functions
    expect(scriptContent).toContain("on escapeJSON");
    expect(scriptContent).toContain("on replaceText");
    expect(scriptContent).toContain("on boolToString");
  });
});
