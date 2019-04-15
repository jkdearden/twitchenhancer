var embedURL = "https://player.twitch.tv/?channel="
chrome.tabs.onUpdated.addListener(
	function(tabId, changeInfo, tab) {
		if (changeInfo.url) {
			var prevUrl = changeInfo.url
			var matches = prevUrl.match("http[s?]://(www.)?twitch.tv/([^/]*)$")
			if (matches && !matches.includes("directory") && !matches.includes("videos")
				&& !matches.includes("friends") && !matches.includes("inventory")
				&& !matches.includes("subscriptions") && !matches.includes("payments")
				&& !matches.includes("settings")) {
					chrome.history.deleteUrl({"url": prevUrl})
					chrome.tabs.update(tabId, {url: prevUrl.replace("www.", "").replace("twitch.tv/", "player.twitch.tv/?channel=")})
			}
		}
	}
);