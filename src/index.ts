import aocLoader from 'aoc-loader';
import { Days } from './days/days';
import dotenv from 'dotenv';
import { IDay } from './internalTypes';
import { parseInput } from './utils/input';

dotenv.config();

const TEST_DAY = Number(process.argv[2]);

if(!TEST_DAY || Number.isNaN(TEST_DAY)){
  for(let i = 0; i < Days.length; i++){
    aocLoader(Number(process.env.AOC_YEAR), i+1, process.env.AOC_SESSION)
      .then((data) => {
        return runDay(Days[i],data, i+1);
      });
  }
  process.exit(0);
}

if(TEST_DAY > Days.length){
  throw new Error('Day not set up yet.');
}

aocLoader(Number(process.env.AOC_YEAR), TEST_DAY, process.env.AOC_SESSION)
  .then((data) => {
    runDay(Days[TEST_DAY-1],data, TEST_DAY);
  });


const runDay = async (day:IDay, input:string, dayNumber: number) => {
  console.log(`Day ${dayNumber}:`);

  const parsedInput = parseInput(input);
  console.log('Part 1');
  console.log(await day.part1(parsedInput));

  console.log('Part 2');
  console.log(await day.part2(parsedInput));
};