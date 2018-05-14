function liveLinkReplacer() {
	let cards = document.querySelectorAll("div.live-channel-card");
	cards.forEach(card => {
		var thumbLink = card.querySelector("div > div > div:nth-child(1) > figure > div > a:nth-child(1)");
		var thumbFig = card.querySelector("div > div > div:nth-child(1) > figure");

		var prevRef = thumbLink.href;
		var newRef = prevRef.replace("www.twitch.tv/", "player.twitch.tv/?channel=");
		thumbLink.setAttribute('href', newRef);
		thumbFig.addEventListener('click', () => location.assign(newRef));
	});
}

function hostedLinkReplacer() {

}

window.addEventListener("load", main, false);

function main(evt) {
	var jsInitChecktimer = setInterval (checkForJS_Finish, 111);
    function checkForJS_Finish () {
        if (document.querySelector("div.live-channel-card")) {
            clearInterval (jsInitChecktimer);
			liveLinkReplacer()
        }
    }
}