# analytics web component 

## Usage 

Include the `<analytics>` tag in the page. The User Agent depending on its
configured policy will ignore or process the tag. Processing the tag will cause
the User Agent to POST the analytics object to the `to` URL and depending on
its configuration prompt the user for confirmations or not. The `<analytics>`
tag may contain other tags to request additional information, which the User
Agent may or not relay to the requesting URL. 

User Agents may chose different representations for `<analytics>`. Examples
include no display at all, showing a badge on the status bar, a popup
requesting policy confirmation or a block in the page. In the last case the
`<analytics>` tag should be rendered as a `<div>` in the flow and cannot be
styled. 

```
<analytics to="https://example.com">
	<persistentTracker />
	<basicDemographics />
  <note>Please do not block us, we like to know about you</note>
</analytics>
```

## Analytics Object

```
{
	"basic": {
		"fromUrl": "full url of the page including the tag",
		"sessionId": "volatile session ID as determined by the User Agent",
		"user-agent": "browser version string",
		"browser-version": "chrome/53",
		"rendering-engine": "blink",
		"os": "android",
		"platform": "mobile"	
	},
	"persistentTracker": {
		"id": "as determined by the User Agent"
	},
	"basicDemographics": {
		"city": "gotham",
		"country": "gilead",
		"sex": "x",
		"age": 33
	}
}
```
