"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
var path_1 = require("path");
var readline_1 = require("readline");
var format_1 = require("./format");
var outname = "out-" + Date.now() + ".json";
var filename = process.env.npm_config_f
    ? path_1.normalize(process.env.npm_config_f)
    : // tslint:disable-next-line:no-magic-numbers
        process.argv[2];
var rl = readline_1.createInterface({
    input: fs_1.createReadStream(filename),
    output: process.stdout,
    terminal: false
});
format_1.format(rl).then(function (data) {
    fs_1.writeFileSync("./" + outname, JSON.stringify(data));
    // tslint:disable-next-line:no-console
    console.log("Formating " + filename + " to " + outname);
});
