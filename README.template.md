# amzn-bkmt

An Amazon affiliate Link bookmarklet generator.

## Usage

Copy the following string into you bookmark URL field:

```js
BOOKMARKLETCODE
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
