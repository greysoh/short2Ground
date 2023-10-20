// ==UserScript==
// @name         short2Ground
// @namespace    http://github.com/greysoh/
// @version      0.1.0
// @description  Neuters YouTube shorts.
// @author       @greysoh
// @match        *://*.youtube.com/*
// @grant        none
// @run-at       document-start
// ==/UserScript==

const firstSectionExpandedButtonsSelector = "div#items.style-scope.ytd-guide-section-renderer";
const sideButtonsSelector = "ytd-mini-guide-entry-renderer.style-scope.ytd-mini-guide-renderer";
const shortieSelector = "ytd-rich-shelf-renderer.style-scope.ytd-rich-section-renderer";

let oldHref = window.location.href;
let isRunningAdObserver = window.location.href.includes("watch?v=");

const observer = new MutationObserver((mutations) => {
  if (oldHref != window.location.href) {
    oldHref = window.location.href;
    isRunningAdObserver = window.location.href.includes("watch?v=");
  }
});

async function doMainPageAdsChecker() {
  const sideButtons = document.querySelectorAll(sideButtonsSelector);
  if (sideButtons && sideButtons.length == 5) sideButtons[1].remove();

  const sectionLists = document.querySelectorAll(firstSectionExpandedButtonsSelector);
  if (sectionLists.length != 0 && sectionLists[0].childNodes.length == 3) sectionLists[0].childNodes[1].remove();

  document.querySelectorAll(shortieSelector).forEach((i) => i.remove());
}

async function oneTrueMain() {
  while (true) {
    if (!isRunningAdObserver) await doMainPageAdsChecker();

    await new Promise((i) => setTimeout(i, 100));
  }
}

document.addEventListener("DOMContentLoaded", (e) => {
  oneTrueMain();

  observer.observe(document.querySelector("body"), {
    childList: true,
    subtree: true
  });
});