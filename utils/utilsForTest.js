import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { doParseJson } from './utilsforGendiff.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
export default (condition) => {
  switch (condition) {
    case 'json-json':
      return doParseJson(fs.readFileSync(join(__dirname, '..', '__fixtures__', 'twoJson.json'), 'utf8'));
    default:
      throw new Error('extension do\'nt included');
  }
};
