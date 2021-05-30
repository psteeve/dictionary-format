import { createReadStream, writeFileSync } from 'fs';
import { normalize } from 'path';
import { createInterface, Interface } from 'readline';
import { format } from './format';

const outname = `out-${Date.now()}.json`;

const filename = process.env.npm_config_f
  ? normalize(process.env.npm_config_f)
  : // tslint:disable-next-line:no-magic-numbers
  process.argv[2];

const rl: Interface = createInterface({
  input: createReadStream(filename),
  output: process.stdout,
  terminal: false
});

format(rl).then(data => {
  writeFileSync(`./${outname}`, JSON.stringify(data));
  // tslint:disable-next-line:no-console
  console.log(`Formating ${filename} to ${outname}`);
});
