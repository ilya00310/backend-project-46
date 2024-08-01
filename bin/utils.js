import fs from 'fs';
import { cwd } from 'node:process';
import { parse } from 'yaml'

const doParseJson = (file) => JSON.parse(file);
const isFullPath = (path) => path[0] === '/';
const getExtension = (path) => path.split('.').pop();

const getParseContent = (path) => {
    switch (getExtension(path)) {
        case 'json':
            return isFullPath(path) ? doParseJson(fs.readFileSync(path, 'utf8')) : null

        case 'yaml':
            return isFullPath(path) ? parse(fs.readFileSync(path, 'utf8')) : null
        // return parse(yaml)
    }
}

export default (path1) => {
    console.log('+')
    const contentFileOne = getParseContent(path1);
    return contentFileOne; JSON.S

}