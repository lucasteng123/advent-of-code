import { IDay, IPart } from '../internalTypes';
import { AOCInput } from '../utils/input';

interface INode {
  x: number;
  y: number;
}

interface IAntenna extends INode {
  frequecy: string;
}

interface IInput {
  antennas: {[freq: string]: IAntenna[]}
  matrix: string[][]
}

const parseInput = (input: AOCInput): IInput => {
  const antennas: {[freq: string]: IAntenna[]} = {};
  const matrix = input.toMatrix();

  matrix.forEach((line, y) => {
    line.forEach((chr, x)=>{
      if(chr !== '.') {
        (antennas[chr] ??= []).push({frequecy: chr, x, y});
      }
    }); 
  });

  return {
    antennas,
    matrix,
  };
};

const part1: IPart = (input) => {
  const antiNodes = new Set<Stringified<INode>>();
  
  const {antennas, matrix} = parseInput(input);
  
  Object.values(antennas).forEach((antennaGroup)=>{
    for(let i = 0; i<antennaGroup.length; i++) {
      for (let j = i+1; j<antennaGroup.length; j++) {
        const antiNode1 = getAntiNode(antennaGroup[i], antennaGroup[j], matrix);
        const antiNode2 = getAntiNode(antennaGroup[j], antennaGroup[i], matrix);

        if(antiNode1 !== false) antiNodes.add(JSON.stringify(antiNode1));
        if(antiNode2 !== false) antiNodes.add(JSON.stringify(antiNode2));

      }
    }
  });

  return antiNodes.size;
};

const getAntiNode = (antenna1: IAntenna | INode, antenna2: IAntenna | INode, matrix: string[][]): INode | false => {
  const antiNode = {
    x: 2 * antenna1.x - antenna2.x,
    y: 2 * antenna1.y - antenna2.y,
  };
  if(antiNode.x < 0 || antiNode.x >= matrix[0].length) return false;
  if(antiNode.y < 0 || antiNode.y >= matrix.length) return false;
  
  return antiNode;
  
};

const getRecursiveAntiNodes = (node1: IAntenna | INode, node2: IAntenna | INode, matrix: string[][]): INode[] => {
  const antiNode = getAntiNode(node1, node2, matrix);
  if (antiNode === false) return [];
  return [antiNode, ...getRecursiveAntiNodes(antiNode, node1, matrix)];
};

const part2: IPart = (input) => {
  const {antennas, matrix} = parseInput(input);
  
  const antiNodes = new Set<Stringified<INode>>();

  Object.values(antennas).forEach((antennaGroup)=>{
    for(let i = 0; i<antennaGroup.length; i++) {
      antiNodes.add(JSON.stringify({x: antennaGroup[i].x, y: antennaGroup[i].y}));
      for (let j = i+1; j<antennaGroup.length; j++) {
        const temp: INode[] = [
          ...getRecursiveAntiNodes(antennaGroup[i], antennaGroup[j], matrix),
          ...getRecursiveAntiNodes(antennaGroup[j], antennaGroup[i], matrix)
        ];

        temp.forEach(antiNode => antiNodes.add(JSON.stringify(antiNode)));
      }
    }
  });

  return antiNodes.size;
};

export const Day: IDay = {
  part1,
  part2
};
