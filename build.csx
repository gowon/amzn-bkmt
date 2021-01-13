#!/usr/bin/env dotnet-script
#r "nuget:NUglify,1.13.1"
#r "nuget:Pastel,2.1.0"

using System.Runtime.CompilerServices;
using System.Drawing;
using NUglify;
using Pastel;

public static string GetScriptFolder([CallerFilePath] string path = null) => Path.GetDirectoryName(path);

string minified;
var contents = File.ReadAllText(Path.Combine(GetScriptFolder(), @".\src\amzn-bkmt.js"));
var result = Uglify.Js(contents);
minified = result.Code;

if(Args.Count > 0 && !string.IsNullOrWhiteSpace(Args[0])){
    minified = minified.Replace(",\"\")", $",\"{Args[0]}\")");
    Console.WriteLine($"Injecting default affiliate code '{Args[0]}'.".Pastel(Color.FromArgb(165, 229, 250)));
}

File.WriteAllText(Path.Combine(GetScriptFolder(), @".\src\amzn-bkmt.min.js"), minified);
Console.WriteLine("Generated minified bookmarklet.".Pastel(Color.FromArgb(165, 229, 250)));

var bookmarklet = $"javascript:{minified}";
var readmeContents = File.ReadAllText(Path.Combine(GetScriptFolder(), @".\README.template.md"));
readmeContents = readmeContents.Replace("BOOKMARKLETCODE", bookmarklet);
File.WriteAllText(Path.Combine(GetScriptFolder(), @".\README.md"), readmeContents);
Console.WriteLine("Generated readme.\n".Pastel(Color.FromArgb(165, 229, 250)));

Console.WriteLine("--COPY BOOKMARKLET CODE BELOW--\n");
Console.WriteLine($"javascript:{minified}\n".Pastel(Color.FromArgb(241, 210, 46)));
Console.WriteLine("--END BOOKMARKLET CODE--\n");