// https://stackoverflow.com/a/8578840
// https://code.tutsplus.com/tutorials/create-bookmarklets-the-right-way--net-18154
!(function (window, document, affiliateId) {
    var js,
        s = 'script',
        namespace = 'aalb_',
        id = window._aalcopyAffiliateLink || namespace + uuidv4(),
        pStyle = 'text-align: center; font-family: inherit; text-transform: uppercase; letter-spacing: .1em; font-size: 1.1em; line-height: 1em; margin-top: 14px; margin-bottom: 14px';

    window._aalcopyAffiliateLink = id;

    if (document.getElementById(id)) { launchAffiliateDialog(); return; }

    fjs = document.getElementsByTagName(s)[0];
    js = document.createElement(s);
    js.id = id;
    js.setAttribute("src", "https://cdnjs.cloudflare.com/ajax/libs/loadjs/4.2.0/loadjs.min.js");
    js.setAttribute("integrity", "sha512-kA5njTcOKIwpz6cEPl//I31UH3ivohgL+WSVjdO/iMQWbuzHqxuAdPjRvLEHXTa+M/4AtZNMI6aOEvBtOof7Iw==");
    js.setAttribute("crossorigin", "anonymous");
    js.onload = function () {
        loadjs([
            "https://cdnjs.cloudflare.com/ajax/libs/clipboard.js/2.0.6/clipboard.min.js",
            "https://cdnjs.cloudflare.com/ajax/libs/vex-js/4.1.0/js/vex.combined.min.js",
            "https://cdnjs.cloudflare.com/ajax/libs/vex-js/4.1.0/css/vex.min.css",
            "https://cdnjs.cloudflare.com/ajax/libs/vex-js/4.1.0/css/vex-theme-top.min.css"
        ], function () {
            launchAffiliateDialog();
        });
    };
    fjs.parentNode.insertBefore(js, fjs);

    function uuidv4() {
        // xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx
        return 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    function generateLink(productId, affiliateId) {
        if (affiliateId) {
            return `https://amzn.com/${productId}?tag=${affiliateId}`;
        }
        return `https://amzn.com/${productId}`;;
    }

    function launchAffiliateDialog() {
        var match = document.location.href.match("/([a-zA-Z0-9]{10})(?:[/?]|$)");
        if (!match) {
            vex.dialog.alert({
                unsafeMessage: `<p style="${pStyle}">Can\'t find the product ID</p>`,
                className: "vex-theme-top"
            });
            return;
        }

        var productId = match[1];

        // https://github.com/zenorocha/clipboard.js/issues/357
        var affiliateLink = 'x' + uuidv4();
        var copyAffiliateLink = 'x' + uuidv4();
        var copyProductLink = 'x' + uuidv4();
        var vexDialog = 'x' + uuidv4();
        var affiliateInput = 'x' + uuidv4();

        var body = `<p style="${pStyle}">Amazon Affiliate Id</p><input id="${affiliateInput}" type="text" value="${affiliateId}" /><p style="${pStyle}">Shortened Link</p><input id="${affiliateLink}" type="text" value="${generateLink(productId, affiliateId)}" readonly="readonly" data-product-link="${generateLink(productId)}" />`;

        // instantiate new modal
        vex.dialog.open({
            input: body,
            className: "vex-theme-top " + vexDialog,
            buttons: [
                {
                    text: 'Copy',
                    type: 'submit',
                    className: `vex-dialog-button-primary ${copyAffiliateLink}`,
                    click: function yesClick() {
                        this.value = true
                    }
                },
                {
                    text: 'Product Link Only',
                    type: 'submit',
                    className: `vex-dialog-button-secondary ${copyProductLink}`,
                    click: function yesClick() {
                        this.value = true
                    }
                }
            ],
        });

        new ClipboardJS(`.${copyProductLink}`, {
            text: function () {
                return generateLink(productId);
            }
        });

        new ClipboardJS(`.${copyAffiliateLink}`, {
            target: function () {
                return document.getElementById(affiliateLink);
            }
        });

        // update link when id changes
        document.getElementById(affiliateInput).addEventListener("input", function () {
            document.getElementById(affiliateLink).value = generateLink(productId, this.value);
        });
    }
})(window, document, "");