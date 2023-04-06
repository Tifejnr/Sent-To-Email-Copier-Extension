chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  const urlTitle = changeInfo.title;
  const tabUrlActive = tab.url;

  if (urlTitle) {
    const urlTitleSplitted = urlTitle.split(" ");

    //Page only fires after complete loading of the url Title
    if (urlTitleSplitted.length > 1 && tab.status == "complete") {
      chrome.tabs.query(
        { active: true, currentWindow: true, status: "complete" },
        function (tabs) {
          if (
            tabs[0] &&
            tabs[0].url.match("https://mail.google.com/mail/u/*")
          ) {
            const activeTab = tabs[0];
            const currentTabUrl = activeTab.url;
            const currentTabUrlSplited = currentTabUrl.split("/");
            const sentId = "#sent";
            const sentIdresult = currentTabUrlSplited.find(
              (element) => element == sentId
            );

            if (currentTabUrlSplited.length > 7 && sentIdresult) {
              //send message
              chrome.tabs.sendMessage(activeTab.id, {
                ready: true,
              });
            } else {
              chrome.tabs.sendMessage(activeTab.id, {
                hideCopyBtn: true,
              });
            }
          }
        }
      );
    }
  }
});
