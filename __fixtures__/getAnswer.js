import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { doParseJson } from '../bin/utils.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
export default () => doParseJson(fs.readFileSync(join(__dirname, '..', '__fixtures__', 'answer.json'), 'utf8'));
