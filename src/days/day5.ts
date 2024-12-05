import { IDay, IPart } from '../internalTypes';
type IRule = number[][];

const part1: IPart = (input) => {
  const [rulesInput, manualsInput] = input.toLines('\n\n');
  const rules: IRule = [];

  const manuals = manualsInput.split('\n').map((manual) => manual.split(',').map(Number));

  rulesInput.split('\n').forEach((rule) => {
    const [key, value] = rule.split('|');
    if(!rules[Number(key)]) rules[Number(key)] = [];
    rules[Number(key)].push(Number(value));
  });

  // two pointer time
  
  const middlePageSum = manuals.reduce<number>((acc, manual) => {
    for(let right = manual.length-1; right >= 0; right--) {
      if(!rules[manual[right]]) continue;
      for(let left = 0; left < right; left++) {
        if(rules[manual[right]].includes(manual[left])) {
          return acc;
        }
      }
    }
    return acc + manual[Math.floor(manual.length/2)];
  },0);


  return middlePageSum;
};

const part2: IPart = (input) => {
  const [rulesInput, manualsInput] = input.toLines('\n\n');
  const rules: IRule = [];

  const manuals = manualsInput.split('\n').map((manual) => manual.split(',').map(Number));

  rulesInput.split('\n').forEach((rule) => {
    const [key, value] = rule.split('|');
    if(!rules[Number(key)]) rules[Number(key)] = [];
    rules[Number(key)].push(Number(value));
  });

  // two pointer time
  const incorrectManuals = manuals.reduce<number>((acc, manual)=> {
    for(let right = manual.length-1; right >= 0; right--) {
      if(!rules[manual[right]]) continue;
      for(let left = 0; left < right; left++) {
        if(rules[manual[right]].includes(manual[left])) {
          const filtered = manual.sort((a,b) => rules[a]?.includes(b) ? -1:1);
          return acc + filtered[Math.floor(filtered.length/2)];
        }
      }
    }
    return acc;
  }, 0);



  return incorrectManuals;
};

export const Day: IDay = {
  part1,
  part2
};

