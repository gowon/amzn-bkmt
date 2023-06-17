// https://stackoverflow.com/a/8578840
// https://code.tutsplus.com/tutorials/create-bookmarklets-the-right-way--net-18154
!(function (window, document, basePath, affiliateId) {
    const namespace = '_' + uuidv4() + '_';
    const id = window[namespace] || namespace + 'loadJs';
    const affiliateInputId = namespace + 'affiliateId';
    const affiliateLinkId = namespace + 'affiliateLink';
    const productLinkId = namespace + 'productLink';
    var loadJs, pStyle = '';
    window[namespace] = id;

    // load dependencies
    if (document.getElementById(id)) { launchAffiliateDialog(); return; }

    loadJs = document.createElement('script');
    loadJs.id = id;
    loadJs.setAttribute("src", "https://cdnjs.cloudflare.com/ajax/libs/loadjs/4.2.0/loadjs.min.js");
    loadJs.setAttribute("integrity", "sha512-kA5njTcOKIwpz6cEPl//I31UH3ivohgL+WSVjdO/iMQWbuzHqxuAdPjRvLEHXTa+M/4AtZNMI6aOEvBtOof7Iw==");
    loadJs.setAttribute("crossorigin", "anonymous");
    loadJs.onload = function () {
        loadjs([
            "https://cdnjs.cloudflare.com/ajax/libs/vex-js/4.1.0/js/vex.combined.min.js",
            "https://cdnjs.cloudflare.com/ajax/libs/vex-js/4.1.0/css/vex.min.css",
            "https://cdnjs.cloudflare.com/ajax/libs/vex-js/4.1.0/css/vex-theme-top.min.css"
        ], function () {
            vex.defaultOptions.className = 'vex-theme-top';
            launchAffiliateDialog();
        });
    };

    document.getElementsByTagName('body')[0].appendChild(loadJs);

    // REF https://dirask.com/posts/JavaScript-UUID-function-in-Vanilla-JS-1X9kgD
    function uuidv4() {
        return 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            const r = Math.random() * 16 | 0;
            const v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    function generateLink(productId, affiliateId) {
        if (affiliateId) {
            return `${basePath}${productId}?tag=${affiliateId}`;
        }
        return `${basePath}${productId}`;
    }

    function launchAffiliateDialog() {
        const match = document.location.href.match("/([a-zA-Z0-9]{10})(?:[/?]|$)");
        if (!match) {
            vex.dialog.alert({
                unsafeMessage: `<p style="${pStyle}">Can\'t find the Amazon product ID.</p>`
            });
            return;
        }

        var productId = match[1];
        const body = `<style>.vex-dialog-input h1{text-align: center; font-family: inherit; text-transform: uppercase; letter-spacing: .1em; font-size: 1.1em; line-height: 1em; margin-bottom: 14px;}.vex-dialog-input p{font-size: .7em;}</style><h1>Amazon Affiliate Id</h1><input id="${affiliateInputId}" type="text" value="${affiliateId}"/><h1>Shortened Link</h1><input id="${affiliateLinkId}" type="text" value="${generateLink(productId, affiliateId)}" readonly="readonly"/><input id="${productLinkId}" type="hidden" value="${generateLink(productId)}"/><p>This tool was generated using <a href="https://github.com/gowon/amzn-bkmt" target="_blank">Amazon Affiliate Bookmarklet Studio</a>.</p>`;

        // instantiate new modal
        vex.dialog.open({
            input: body,
            buttons: [
                {
                    text: 'Copy',
                    type: 'button',
                    className: 'vex-dialog-button-primary',
                    click: function () {
                        navigator.clipboard.writeText(document.getElementById(affiliateLinkId).value);
                        this.close();
                    }
                },
                {
                    text: 'Product Link Only',
                    type: 'button',
                    className: 'vex-dialog-button-secondary',
                    click: function () {
                        navigator.clipboard.writeText(document.getElementById(productLinkId).value);
                        this.close();
                    }
                }
            ]
        });

        // update link when id changes
        document.getElementById(affiliateInputId).addEventListener("input", function () {
            document.getElementById(affiliateLinkId).value = generateLink(productId, this.value);
        });
    }
})(window, document, "{{AmazonBasePath}}", "{{AffiliateTag}}");