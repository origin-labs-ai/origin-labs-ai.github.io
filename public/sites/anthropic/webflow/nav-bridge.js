(function () {
  function isExternal(href) {
    return /^[a-z]+:/i.test(href) && !/^https?:\/\/(www\.)?anthropic\.com/i.test(href);
  }
  document.addEventListener("click", function (event) {
    var anchor = event.target && event.target.closest ? event.target.closest("a") : null;
    if (!anchor) return;
    var href = anchor.getAttribute("href");
    if (!href || href.charAt(0) === "#") return;
    if (anchor.target === "_blank" || anchor.hasAttribute("download")) return;
    var path = null;
    if (href.charAt(0) === "/") {
      path = href;
    } else {
      var match = href.match(/^https?:\/\/(?:www\.)?anthropic\.com(\/.*)?$/i);
      if (match) path = match[1] || "/";
    }
    if (path === null || isExternal(href)) return;
    event.preventDefault();
    try {
      window.top.location.href = path;
    } catch (error) {
      window.location.href = path;
    }
  });
})();
