import { Interface } from 'readline';

import * as templateJson from './template.json';

interface TemplateFormat {
    [key: string]: number; // index of the splitted line string from filename
}
interface FormatedObject {
    [key: string]: string;
}

const template: TemplateFormat = templateJson;

const separator = '\t'; // Supposed the input data will be formatted as tabulation separated field

// Split each line by tabulation and create a list of object based on the template file
// to fead writeFilesync to create a json file from object collected in this function
// There is no control on the index used in the template json
export function format(rl: Interface) {
    let allFormatedObjectByLines: Array<FormatedObject> = [];

    return new Promise((resolve, _reject) => {
        rl.on('line', line => {
            const lineSplitedByTab = line.split(separator);
            const formatedObject: FormatedObject = {};

            Object.keys(template).forEach(key => {
                // start counting to 1 in template json, there is no boundary check
                const index = template[key] - 1;

                formatedObject[key] = lineSplitedByTab[index];
            });

            allFormatedObjectByLines.push(formatedObject);
        });

        rl.on('close', () => {
            resolve(allFormatedObjectByLines);
        });
    });
}
