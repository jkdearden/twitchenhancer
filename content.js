window.addEventListener("load", main, false);

function linkReplacer() {
	let cards = document.querySelectorAll("div.live-channel-card");
	cards.forEach(card => {
		replaceLink(card);
	});
}

function replaceLink(node) {
	var thumbLink = node.querySelector("div > div > div:nth-child(1) > figure > div > a:nth-child(1)");
	var thumbFig = node.querySelector("div > div > div:nth-child(1) > figure");

	var prevRef = thumbLink.href;
	var newRef = prevRef.replace("www.twitch.tv/", "player.twitch.tv/?channel=");
	thumbLink.setAttribute("href", newRef);
	thumbFig.addEventListener("click", () => location.assign(newRef));
}


function domChangeCallback(mutationsList) {
	mutationsList.forEach(mut => {
		if (mut.addedNodes.length > 0) {
			console.log("replacing");
			linkReplacer();
		}
	})
}

function main(evt) {
	var targetNode = document.querySelector(".twilight-main");
	var config = {subtree: true, childList: true}
	var observer = new MutationObserver(domChangeCallback);
	observer.observe(targetNode, config);
}