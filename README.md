# Voluntary Analytics 

## Abstract

This document describes a mechanism for cooperative we analytics that respects
the will of the user and provides the publisher a simple way of requesting
browsing data.

## Introduction

Web Analytics is currently a battle field. Users try to protect themselves from
permanent invasion with ad and tracker blockers while publishers resort to ever
deeper subterfuges and illegal practices to track and extract value from users
without their knowledge. 
The European Union first tried to tackle this first with the misguided 
"cookie law" and more recently with a comprehensive personal data regulation 
(GDPR) which a few good actors follow to their own disadvantage and most either
ignore or wilfully disrespect with consent requests diametrically opposed to
the letter and spirit of GDPR.

The current state shows while a regulatory component is essential it is not
sufficient to ensure a fair playing field and a good experience to users. The
hostile stance by the industry and User Agents relegating themselves to defence
via wilfully breaking site functionality results in a poor, confusing and not
effectively protected browsing experience. 

Blocking is a blunt instrument which while protecting the user deprives good
actors of useful and reasonable analytics over published content. The Web
should provide users and publishers with a cooperative way to share viewership
data under the control of the data owner. 

## Declarative approach

The main paradigm of the Web is declarative while the current web analytics
technologies are imperative. This impedance mismatch causes the User Agent not
to be able to represent the User and instead be a computing subtract for the
publisher. This specification introduces a new HTML tag `<analytics>` which
declaratively requests the UA to submit specific data to the publisher. The UA
intersects the information requested with the User's expressed share policy and
submits the result. The UA may also make the request and response visible to
the user.

## Usage 

### Tag

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

### Data elements

#### persistentTracker

The publisher requests the User Agent to generate and store a persistent ID
which should be submitted upon processing each request for this domain. The
User Agent may or not honour this request. As such it is not necessary to
prescribe exact interpretation to domain. The User Agent should follow the two
rightmost hostname labels convention. 

#### basicDemographics

The publisher requests the User submit demographic information such as 

 * city and country of residence
 * age
 * sex

The User Agent may submit any subset of the fields. 

#### note

A short text the User Agent may display as part of rendering the tag.

#### Extension

The format is fully extensible with new elements.

### Analytics Object

The User Agent submits a JSON object of the form

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
		"age": null
	}
}
```

Fields the User Agent elects not to submit must have value `null`. 

## Other tracking methods

User Agents should treat any other attempts to collect User data as hostile and
should actively prevent them as per User policy. Publishers not following this
specification have no expectation of cooperation by the User Agent. 

