//Receiver Email Adress Copier Content Script

// Listen to message from Background Script
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  if (message.ready) {
    newTabLoaded();
  }
});

async function newTabLoaded() {
  const menuOptionsClass = "G-Ni";
  const copyBtnExists = document.getElementsByClassName(menuOptionsClass)[5];

  if (!copyBtnExists) {
    const copyBtn = document.createElement("img");
    copyBtn.src = chrome.runtime.getURL("assets/copy-32.png");
    copyBtn.classList.add("G-Ni", "J-J5-Ji");
    copyBtn.title = "Click to copy receiver email address";
    copyBtn.addEventListener("mouseover", function () {
      this.style.cursor = "pointer";
    });
    var $Osc = {
      hover: function (event) {
        event.target.style.backgroundColor = "rgba(0, 0, 255, 0.1)";
      },
      out: function (event) {
        event.target.style.backgroundColor = "white";
      },
    };
    copyBtn.addEventListener("mouseover", $Osc.hover, false);
    copyBtn.addEventListener("mouseout", $Osc.out, false);
    copyBtn.addEventListener("click", getReceiverEmail);

    const menusContainerClass = "G-tF";
    const gmailMoreIcon =
      document.getElementsByClassName(menusContainerClass)[0];

    if (gmailMoreIcon) {
      gmailMoreIcon.appendChild(copyBtn);
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
      const copyBtn = document.getElementsByClassName("G-Ni")[5];
      copyBtn.style.backgroundColor = "rgba(255, 0, 0, 0.35)";

      setTimeout(() => {
        copyBtn.style.backgroundColor = "";
      }, 3000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  }
}
