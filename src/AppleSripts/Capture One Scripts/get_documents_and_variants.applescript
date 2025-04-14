on run
	try
		tell application "System Events"
			set c1Apps to every process whose name starts with "Capture One"
			if (count of c1Apps) is 0 then
				return "{\"error\": \"Capture One is not running\"}"
			end if
			set c1Name to name of item 1 of c1Apps
		end tell
		
		set docList to {}
		
		tell application c1Name
			set openDocs to documents
			repeat with currentDoc in openDocs
				set docData to {|id|:id of currentDoc, name:name of currentDoc}
				
				try
					set docData's |path| to (path of currentDoc as text)
				on error
					set docData's |path| to ""
				end try
				
				try
					set docData's kind to (kind of currentDoc as text)
				on error
					set docData's kind to "unknown"
				end try
				
				set varList to {}
				set docVariants to variants of currentDoc
				
				repeat with currentVar in docVariants
					set varData to {|id|:id of currentVar, name:name of currentVar}
					
					try
						set varData's rating to rating of currentVar
					on error
						set varData's rating to 0
					end try
					
					try
						set varData's colorTag to color tag of currentVar
					on error
						set varData's colorTag to 0
					end try
					
					try
						set varData's position to position of currentVar
					on error
						set varData's position to 0
					end try
					
					try
						set varData's isPick to pick of currentVar
					on error
						set varData's isPick to false
					end try
					
					set end of varList to varData
				end repeat
				
				set docData's variants to varList
				set end of docList to docData
			end repeat
			
			set jsonStr to "{"
			repeat with i from 1 to count of docList
				set doc to item i of docList
				if i > 1 then set jsonStr to jsonStr & ","
				
				set jsonStr to jsonStr & "\"" & (id of doc) & "\":{"
				set jsonStr to jsonStr & "\"id\":\"" & (|id| of doc) & "\","
				set jsonStr to jsonStr & "\"name\":\"" & (my escapeJSON(name of doc)) & "\","
				set jsonStr to jsonStr & "\"path\":\"" & (my escapeJSON(|path| of doc)) & "\","
				set jsonStr to jsonStr & "\"kind\":\"" & (kind of doc) & "\","
				set jsonStr to jsonStr & "\"variants\":["
				
				set varList to variants of doc
				repeat with j from 1 to count of varList
					set var to item j of varList
					if j > 1 then set jsonStr to jsonStr & ","
					
					set jsonStr to jsonStr & "{"
					set jsonStr to jsonStr & "\"id\":\"" & (|id| of var) & "\","
					set jsonStr to jsonStr & "\"name\":\"" & (my escapeJSON(name of var)) & "\","
					set jsonStr to jsonStr & "\"rating\":" & (rating of var) & ","
					set jsonStr to jsonStr & "\"colorTag\":" & (colorTag of var) & ","
					set jsonStr to jsonStr & "\"position\":" & (position of var) & ","
					set jsonStr to jsonStr & "\"isPick\":" & (my boolToString(isPick of var))
					set jsonStr to jsonStr & "}"
				end repeat
				
				set jsonStr to jsonStr & "]}"
			end repeat
			set jsonStr to jsonStr & "}"
			
			return jsonStr
		end tell
	on error errMsg number errNum
		return "{\"error\": \"AppleScript Error: " & (my escapeJSON(errMsg)) & " (" & errNum & ")\"}"
	end try
end run

on escapeJSON(str)
	set str to my replaceText(str, "\\", "\\\\")
	set str to my replaceText(str, "\"", "\\\"")
	set str to my replaceText(str, "\n", "\\n")
	set str to my replaceText(str, "\r", "\\r")
	set str to my replaceText(str, "\t", "\\t")
	return str
end escapeJSON

on replaceText(sourceText, searchText, replacementText)
	set AppleScript's text item delimiters to searchText
	set textItems to text items of sourceText
	set AppleScript's text item delimiters to replacementText
	set changedText to textItems as text
	set AppleScript's text item delimiters to ""
	return changedText
end replaceText

on boolToString(bool)
	if bool then
		return "true"
	else
		return "false"
	end if
end boolToString
