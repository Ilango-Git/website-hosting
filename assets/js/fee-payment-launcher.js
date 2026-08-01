const feeAppLink = document.querySelector("[data-fee-app-link]");
const feeAppStatus = document.querySelector("[data-fee-app-status]");
const configuredFeeAppUrl = String(window.THULIR_FEE_APP_URL || "").trim();
const isValidFeeAppUrl = /^https:\/\/script\.google\.com\/macros\/s\/[A-Za-z0-9_-]+\/exec$/.test(configuredFeeAppUrl);

if (feeAppLink && feeAppStatus) {
  if (isValidFeeAppUrl) {
    feeAppLink.href = configuredFeeAppUrl;
    feeAppLink.target = "_blank";
    feeAppLink.rel = "noopener noreferrer";
    feeAppLink.removeAttribute("aria-disabled");
    feeAppStatus.textContent = "The secure form opens in a new tab.";
  } else {
    feeAppLink.addEventListener("click", (event) => event.preventDefault());
    feeAppStatus.textContent = "The online fee form is being configured. Please contact the academy.";
  }
}
