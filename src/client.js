import Port from './port';

export default class Client extends Port {
	constructor() {

		super(window.parent, '*');

		this.lastHeight = 0;

	}
	adjustHeight() {
		var height = document.body.scrollHeight;
		if(height != this.lastHeight) {
			this.lastHeight = height;
			this.sendEventRaw('height', height);
		}
	}
	connect() {
		var me = this;
		return new Promise((resolve, reject) => {

			var hasCsrfToken = false;
			me.onEvent('csrf', function(data) {
					localStorage['XSRF.Token@' + data.origin] = data.token;
					if(!hasCsrfToken) {
						hasCsrfToken = true;
						super.connect();
						resolve();
					}
				});

			me.open();
			me.sendEventRaw('ready');
			setInterval(me.adjustHeight.bind(me), 100);

		});
	}
	navigate(url) {
		this.sendEvent('navigate', url);
	}
	setTitle(title) {
		this.sendEvent('title', title);
	}
}
