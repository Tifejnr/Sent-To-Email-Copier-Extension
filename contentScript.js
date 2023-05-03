//Receiver Email Adress Copier Content Script

// Listen to message from Background Script
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  if (message.ready) {
    newTabLoaded();
  }
  if (message.hideCopyBtn) {
    const copyBtnClass = "copy-btn";
    const copyBtnExists = document.getElementsByClassName(copyBtnClass)[0];

    if (copyBtnExists) {
      copyBtnExists.style.display = "none";
    }
  }
});

async function newTabLoaded() {
  const copyBtnClass = "copy-btn";
  const copyBtnExists = document.getElementsByClassName(copyBtnClass)[0];

  if (copyBtnExists) {
    copyBtnExists.style.display = "block";
  }

  if (!copyBtnExists) {
    const copyBtn = document.createElement("img");
    copyBtn.src = chrome.runtime.getURL("assets/copy-32.png");
    copyBtn.classList.add("copy-btn", "J-J5-Ji");
    copyBtn.style.display = "block";
    copyBtn.title = "Click to copy receiver email address";
    copyBtn.style.marginRight = "1rem";
    copyBtn.style.backgroundColor = "transparent";
    copyBtn.addEventListener("mouseover", function () {
      this.style.cursor = "pointer";
    });
    var $Osc = {
      hover: function (event) {
        event.target.style.backgroundColor = "rgba(0, 0, 255, 0.1)";
      },
      out: function (event) {
        event.target.style.backgroundColor = "transparent";
      },
    };
    copyBtn.addEventListener("mouseover", $Osc.hover, false);
    copyBtn.addEventListener("mouseout", $Osc.out, false);
    copyBtn.addEventListener("click", getReceiverEmail);

    const supportMenu = getSupportMenuContainer();
    if (supportMenu) {
      supportMenu.before(copyBtn);
    }
  }
}

function getReceiverEmail() {
  const emailClass = document.getElementsByClassName("g2");
  const email = emailClass[0].getAttribute("email");

  copyToClipboard(email);

  async function copyToClipboard(value) {
    try {
      await navigator.clipboard.writeText(value);
      const copyBtn = document.getElementsByClassName("copy-btn")[0];
      copyBtn.style.backgroundColor = "rgba(255, 0, 0, 0.65)";

      setTimeout(() => {
        copyBtn.style.backgroundColor = "";
      }, 3000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  }
}

function getSupportMenuContainer() {
  const divElement = document.getElementsByTagName("header")[0];

  const secondChildFirstFilial = divElement.children[1];
  if (secondChildFirstFilial) {
    const secondChildSecondFilial = secondChildFirstFilial.children[1];

    if (secondChildSecondFilial) {
      const secondChildThirdFilial = secondChildSecondFilial.children[2];

      return secondChildThirdFilial;
    }
  }
}
