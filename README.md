# amzn-bkmt

An Amazon affiliate Link bookmarklet generator.

## Usage

Copy the following string into you bookmark URL field:

```js
javascript:!function(n,t,i){function u(){return"xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx".replace(/[xy]/g,function(n){var t=Math.random()*16|0,i=n=="x"?t:t&3|8;return i.toString(16)})}function f(n,t){return t?`https://amzn.com/${n}?tag=${t}`:`https://amzn.com/${n}`}function h(){var e=t.location.href.match("/([a-zA-Z0-9]{10})(?:[/?]|$)");if(!e){vex.dialog.alert({unsafeMessage:`<p style="${o}">Can't find the product ID</p>`,className:"vex-theme-top"});return}var n=e[1],r="x"+u(),s="x"+u(),h="x"+u(),l="x"+u(),c="x"+u(),a=`<p style="${o}">Amazon Affiliate Id</p><input id="${c}" type="text" value="${i}" /><p style="${o}">Shortened Link</p><input id="${r}" type="text" value="${f(n,i)}" readonly="readonly" data-product-link="${f(n)}" />`;vex.dialog.open({input:a,className:"vex-theme-top "+l,buttons:[{text:"Copy",type:"submit",className:`vex-dialog-button-primary ${s}`,click:function(){this.value=!0}},{text:"Product Link Only",type:"submit",className:`vex-dialog-button-secondary ${h}`,click:function(){this.value=!0}}]});new ClipboardJS(`.${h}`,{text:function(){return f(n)}});new ClipboardJS(`.${s}`,{target:function(){return t.getElementById(r)}});t.getElementById(c).addEventListener("input",function(){t.getElementById(r).value=f(n,this.value)})}var r,s="script",e=n._aalcopyAffiliateLink||"aalb_"+u(),o="text-align: center; font-family: inherit; text-transform: uppercase; letter-spacing: .1em; font-size: 1.1em; line-height: 1em; margin-top: 14px; margin-bottom: 14px";if(n._aalcopyAffiliateLink=e,t.getElementById(e)){h();return}fjs=t.getElementsByTagName(s)[0];r=t.createElement(s);r.id=e;r.setAttribute("src","https://cdnjs.cloudflare.com/ajax/libs/loadjs/4.2.0/loadjs.min.js");r.setAttribute("integrity","sha512-kA5njTcOKIwpz6cEPl//I31UH3ivohgL+WSVjdO/iMQWbuzHqxuAdPjRvLEHXTa+M/4AtZNMI6aOEvBtOof7Iw==");r.setAttribute("crossorigin","anonymous");r.onload=function(){loadjs(["https://cdnjs.cloudflare.com/ajax/libs/clipboard.js/2.0.6/clipboard.min.js","https://cdnjs.cloudflare.com/ajax/libs/vex-js/4.1.0/js/vex.combined.min.js","https://cdnjs.cloudflare.com/ajax/libs/vex-js/4.1.0/css/vex.min.css","https://cdnjs.cloudflare.com/ajax/libs/vex-js/4.1.0/css/vex-theme-top.min.css"],function(){h()})};fjs.parentNode.insertBefore(r,fjs)}(window,document,"gowon-20")
```

## Developing

- Clone repository
- Restore .NET Tools
- Execute `build.csx` script

```powershell
dotnet tool restore
dotnet script build.csx
```

- You can also pass your Amazon affiliate ID as an argument to embed it into the  script.

```powershell
dotnet script build.csx -- gowon-20
```

## Dependencies

- [LoadJS](https://github.com/muicss/loadjs)
- [clipboard.js](https://clipboardjs.com/)
- [vex](https://github.hubspot.com/vex/docs/welcome/)
- [NUglify](https://github.com/trullock/NUglify)
- [Pastel](https://github.com/silkfire/Pastel)
- [dotnet script](https://github.com/filipw/dotnet-script)

## License

MIT
