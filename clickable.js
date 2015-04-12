var replaceTextWithLinks = function (element) {
	if (element.classList.contains('linkified')) {
		return;
	}

	var text = element.textContent;
	var textWithLinks = text.replace(/<([^<>]*)>/g, '&lt;<a target="_blank" href="$1">$1</a>&gt;');
	element.innerHTML = textWithLinks;
	element.classList.add('linkified');
};

var observer = new MutationObserver(function(mutations) {
	mutations.forEach(function(mutation) {
		for (var i = 0; i < mutation.addedNodes.length; i++) {
			var element = mutation.addedNodes[i];
			if (!('querySelectorAll' in element)) {
				// some added elements do not have this method
				continue;
			}

			var messages = element.querySelectorAll('span.message');
			for (var j = 0; j < messages.length; j++) {
				replaceTextWithLinks(messages[j]);
			}
		}
	});
});

document.addEventListener('DOMContentLoaded', function() {
	var messages = document.querySelectorAll('span.message');
	for (var i = 0; i < messages.length; i++) {
		replaceTextWithLinks(messages[i]);
	}

	observer.observe(document, { childList: true, subtree: true });
});
