(function() {


	function random () {
		return crypto.getRandomValues(new Uint16Array(8)).join('-');
	}

	function cachedId(s) {
		let idKey = 'analytics-component-id';
		var id = s.getItem(idKey);
		if (!id) {
			id = random();
			s.setItem(idKey, id);
		}
		return id;
	}

	let subtags = {
		'PERSISTENT-TRACKER': function(d) {
			d['persistent-tracker'] = {
				id: cachedId(localStorage)
			}
			return d;
		},
		'BASIC-DEMOGRAPHICS': function(d) {
			d['basic-demographics'] = {
				city: null,
				country: null,
				sex: null,
				age: null
			}
		}
	}

	function process(d, t) {
		if (!t) return d; 

		return process(
			subtags[t.tagName] ? subtags[t.tagName](d) : d,
			t.nextElementSibling);
	}

	class Analytics extends HTMLElement {
		constructor() {
			super();
	
			var p = {};
			var dest;

			if (this.hasAttribute('to')) {
				dest = this.getAttribute('to');
			} else {
				return;
			}

			p['basic'] = {
				'session-id': cachedId(sessionStorage),
				'from-url': document.location.href,
				'user-agent': navigator.userAgent,
				'browser-version': navigator.appVersion,
				'rendering-engine': "idk",
				'os': "igiveup",
				'platform': navigator.platform,	
			};

			process(p, this.firstElementChild);	

			navigator.sendBeacon(
				this.getAttribute('to'), 
				JSON.stringify(p)
			);
		}
	}


	customElements.define('analytics-beacon', Analytics);
	Object.getOwnPropertyNames(subtags).forEach(x => {
		customElements.define(x.toLowerCase(), 
			class extends HTMLElement {constructor() {super();}}
		);
	});

}());
