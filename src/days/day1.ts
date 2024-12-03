import { IDay, IPart } from '../internalTypes';
import { AOCInput } from '../utils/input';

const part1: IPart = (input) => {
  const {list1, list2} = parseInput(input);

  const sum = list1.reduce((acc, val, i)=> {
    return acc + Math.abs(val - list2[i]);
  }, 0);

  return sum;
};

const part2: IPart = (input) => {
  const {list1, list2} = parseInput(input);

  const sum = list1.reduce((acc, val)=> {
    return acc + (list2.filter(cell=>cell === val).length * val); 
  }, 0);

  return sum;
};

const parseInput = (input: AOCInput) => {
  const lines = input.toLines();
  const numbers = lines.map(line => line.split(/\s+/).map(Number));
  const list1 = numbers.map(([a]) => a).sort((a, b) => a - b);
  const list2 = numbers.map(([, b]) => b).sort((a, b) => a - b);

  return {list1, list2};

};

  
export const Day: IDay = {
  part1,
  part2
};

