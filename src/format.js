"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.format = void 0;
var templateJson = __importStar(require("./template.json"));
var template = templateJson;
var separator = '\t'; // Supposed the input data will be formatted as tabulation separated field
// Split each line by tabulation and create a list of object based on the template file
// to fead writeFilesync to create a json file from object collected in this function
// There is no control on the index used in the template json
function format(rl) {
    var allFormatedObjectByLines = [];
    return new Promise(function (resolve, _reject) {
        rl.on('line', function (line) {
            var lineSplitedByTab = line.split(separator);
            var formatedObject = {};
            Object.keys(template).forEach(function (key) {
                // start counting to 1 in template json, there is no boundary check
                var index = template[key] - 1;
                formatedObject[key] = lineSplitedByTab[index];
            });
            allFormatedObjectByLines = __spreadArray(__spreadArray([], allFormatedObjectByLines), [formatedObject]);
        });
        rl.on('close', function () {
            resolve(allFormatedObjectByLines);
        });
    });
}
exports.format = format;
