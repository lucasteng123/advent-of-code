import { IDay, IPart } from '../internalTypes';

interface ICalibrationEquation {
  testValue: number;
  equationValues: number[];
}

type IOperator = (a: number, b: number) => number;

const operators: {[key:string]: IOperator} = {
  multiply: (a: number, b: number) => a * b,
  add: (a: number, b: number) => a + b,
  concat: (a: number, b: number) => Number(`${a}${b}`),
};

const testEquation = (currentResult: number, remainingValues: number[], testValue: number, operators: IOperator[]): boolean => {
  if(remainingValues.length === 0) return currentResult === testValue;
  return operators.some(op => {
    const res = op(currentResult, remainingValues[0]);
    if(res<=testValue) return testEquation(res, remainingValues.slice(1), testValue, operators);
    return false;
  });

};


const part1: IPart = (input) => {
  const equations: ICalibrationEquation[] = input.toLines().map(ln => {
    const [testValue, equationValues] = ln.split(': ');
    return {testValue: Number(testValue), equationValues: equationValues.split(' ').map(Number)};
  });
  const res = equations.reduce((acc, eq) => {
    if(testEquation(eq.equationValues[0], eq.equationValues.slice(1), eq.testValue, [operators.add, operators.multiply])) return acc+eq.testValue;
    return acc;
  }, 0);
  
  return res;
};



const part2: IPart = (input) => {
  const equations: ICalibrationEquation[] = input.toLines().map(ln => {
    const [testValue, equationValues] = ln.split(': ');
    return {testValue: Number(testValue), equationValues: equationValues.split(' ').map(Number)};
  });
  const res = equations.reduce((acc, eq) => {
    if(testEquation(eq.equationValues[0], eq.equationValues.slice(1), eq.testValue, Object.values(operators))) return acc+eq.testValue;
    return acc;
  }, 0);
  
  return res;
};



export const Day: IDay = {
  part1,
  part2
};

