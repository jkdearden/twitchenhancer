window.addEventListener("load", main, false);

function cardLinkReplacer() {
	if (document.URL.includes("following")) {
		let followingCards = document.querySelectorAll("div.tw-pd-3 > div:nth-child(2) div.preview-card");
		followingCards.forEach(card => { replaceFollowing(card); })

		let hostingCards = document.querySelectorAll("div.tw-pd-3 > div:nth-child(4) div.preview-card");
		hostingCards.forEach(card => { replaceHosting(card); })		
	}
	else {
		let cards = document.querySelectorAll("div.preview-card")
		cards.forEach(card => { replaceFollowing(card); })
	}


	let sidenavCards = document.querySelectorAll("div.side-nav-card")
	sidenavCards.forEach(card => { replaceSidenav(card); })
}

function replaceFollowing(node) {
	var thumbLink = node.querySelector("div:nth-child(1) > a");
	var thumbFig = node.querySelector("div:nth-child(2) > div:nth-child(2) > div > a");

	var prevRef = thumbLink.href;
	var newRef = prevRef.replace("www.twitch.tv/", "player.twitch.tv/?channel=");	
	thumbLink.setAttribute("href", newRef);
	thumbLink.addEventListener("click", () => location.assign(newRef));
	thumbFig.setAttribute("href", newRef);
	thumbFig.addEventListener("click", () => location.assign(newRef));
}

function replaceHosting(node) {
	var thumbLink = node.querySelector("div:nth-child(1) > a");
	var thumbFig = node.querySelector("div:nth-child(2) > div:nth-child(2) > div > a");
	var hosterName = node.querySelector("div.preview-card-titles__subtitle-wrapper > div:nth-child(1) > p > a").textContent

	var newRef = "https://player.twitch.tv/?channel=" + hosterName
	thumbLink.setAttribute("href", newRef);
	thumbLink.addEventListener("click", () => location.assign(newRef));
	thumbFig.setAttribute("href", newRef);
	thumbFig.addEventListener("click", () => location.assign(newRef));
}

function replaceSidenav(node) {
	var link = node.querySelector("a.side-nav-card__link");

	if (!link.textContent.includes("Offline")) {
		var prevRef = link.href;
		var newRef = prevRef.replace("www.twitch.tv/", "player.twitch.tv/?channel=");
		link.setAttribute("href", newRef);
		node.addEventListener("click", () => location.assign(newRef));
	}
}

function domChangeCallback(mutationsList) {
	mutationsList.forEach(mut => {
		if (mut.addedNodes.length > 0) {
			cardLinkReplacer();
		}
	})
}

function main(evt) {
	var targetNode = document.querySelector(".twilight-main");
	var config = {subtree: true, childList: true}
	var observer = new MutationObserver(domChangeCallback);
	observer.observe(targetNode, config);
}