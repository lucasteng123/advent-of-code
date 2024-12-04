import { IDay, IPart } from '../internalTypes';

const part1: IPart = (input) => {
  const crossword = input.toLines();
  const matrix = crossword.map(x=>x.split(''));

  const horzontalCount = crossword.reduce((acc, line)=>acc+getXmasCountFromString(line),0);

  const rotatedCrossword = (matrix[0].map((_,i)=>matrix.map(r=>r[i]))).map(x=>x.join(''));
  const verticalCount = rotatedCrossword.reduce((acc, line)=>acc+getXmasCountFromString(line),0);

  const diagonalMatrix = makeMatrixDiagonal(matrix);
  const diagonalCount = diagonalMatrix.reduce((acc, line)=>acc+getXmasCountFromString(line),0);

  return horzontalCount + verticalCount + diagonalCount;
  
};


//don't look to hard at this. It's fine. 
//is it fine because the input is square? Yes.
//is it fine because it's readable? No.
//is it fine because it's efficient? No.
//is it fine because it's correct? Yes.

const makeMatrixDiagonal = (matrix: string[][]) => {
  const diagonalMatrix: string[]= [];
  for(let i=0;i<matrix.length;i++) {
    let str = '';
    for (let j=0;j<matrix.length-i;j++) {
      str += matrix[i+j][j];
    }
    diagonalMatrix.push(str);
  }

  for(let i=1;i<matrix.length;i++) {
    let str = '';
    for (let j=0;j<matrix.length-i;j++) {
      str += matrix[j][i+j];
    }
    diagonalMatrix.push(str);
  }

  for(let i=matrix.length-1;i>=0;i--) {
    let str = '';
    for (let j=0;j<=i;j++) {
      str += matrix[i-j][j];
    }
    diagonalMatrix.push(str);
  }

  for(let i=1;i<matrix.length;i++) {
    let str = '';
    for (let j=0;j<matrix.length-i;j++) {
      str += matrix[i+j][matrix.length-1-j];
    }
    diagonalMatrix.push(str);
  }

  return diagonalMatrix;
};

const getXmasCountFromString = (string: string) => (
  string.split('XMAS').length - 1
  + string.split('SAMX').length - 1
);

const part2: IPart = (input) => {
  const matrix = input.toLines().map(x=>x.split(''));
  let count = 0;
  for(let i=1;i<matrix.length-1;i++) {
    for(let j=1;j<matrix.length-1;j++) {
      if(matrix[i][j] !== 'A') continue;
      const corners = matrix[i-1][j-1] + matrix[i-1][j+1] + matrix[i+1][j-1] + matrix[i+1][j+1];
      if(['MSMS', 'MMSS', 'SMSM', 'SSMM'].includes(corners)) count++;
    }
  }
  return count;
};

export const Day: IDay = {
  part1,
  part2
};

