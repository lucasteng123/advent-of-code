import aocLoader from 'aoc-loader';
import open from 'open';
import dotenv from 'dotenv';
dotenv.config();

import fs from 'fs';

const TEST_DAY = process.argv[2];

if(!TEST_DAY) throw new Error('Please supply a day');

fs.access(`./src/days/day${TEST_DAY}.ts`, fs.constants.F_OK, err=>{
  if(err){
    fs.copyFile('./src/days/day0.ts', `./src/days/day${TEST_DAY}.ts`, ()=>{});
    fs.copyFile('./test/day0.test.ts', `./test/day${TEST_DAY}.test.ts`, ()=>{});
    console.log("add import to days.ts");
    aocLoader(Number(process.env.AOC_YEAR), Number(TEST_DAY), process.env.AOC_SESSION);
    open(`https://adventofcode.com/${process.env.AOC_YEAR}/day/${TEST_DAY}`, {wait: false});
  }
});
