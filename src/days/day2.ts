import { IDay, IPart } from '../internalTypes';

const part1: IPart = (input) => {
  const reports = input.split('\n').map(report => report.split(' ').map(Number));
  const validReports = reports.filter(isSafe);

  return validReports.length;
};

const isSafe = (level: number[]) => {
  const differences: number[] = [];
  for(let i = 1; i < level.length; i++) {
    differences.push(level[i] - level[i-1]);
  }
  const increasing = differences.every(diff => diff >=1 && diff <= 3);
  const decreasing = differences.every(diff => diff <=-1 && diff >= -3);

  return increasing || decreasing;
};

const part2: IPart = (input) => {
  const reports = input.split('\n').map(report => report.split(' ').map(Number));
  const validReports = reports.filter(report=>{
    if(isSafe(report)) return true;
    for(let i = 0; i < report.length; i++) {
      const newReport = report.filter((_, idx) => idx !== i);
      if(isSafe(newReport)){
        return true;
      }
    }
    return false;
  });
  return validReports.length;
};

export const Day: IDay = {
  part1,
  part2
};

