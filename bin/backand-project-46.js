#!/usr/bin/env node
import getJeneralLogic from '../src/general-logic.js';

console.log(getJeneralLogic(...process.argv.slice(2)));
