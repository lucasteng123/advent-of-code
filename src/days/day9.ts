import { IDay, IPart } from '../internalTypes';
import { AOCInput } from '../utils/input';

const unpackDisk = (input: AOCInput): number[] => {
  const disk: number[] = [];
  const diskMap = input.string.split('').map(Number);

  let diskIndex = 0;
  let fileIndex = 0;
  for(let i=0; i<diskMap.length; i++){
    if(i%2===0) {
      //file
      for(let di = diskIndex; di < diskIndex+diskMap[i]; di++){
        disk[di] = fileIndex;
      }
      fileIndex++;
      diskIndex += diskMap[i];
    } else {
      //free space
      diskIndex+=diskMap[i];
    }
  }

  return disk;
};

const calculateChecksum = (disk:number[]) => {
  return disk.reduce((acc, block, idx)=>acc+(block*idx), 0);
};

const part1: IPart = (input) => {
  const disk = unpackDisk(input);

  let insertHead = 0;
  let readHead = disk.length-1;

  while(insertHead<readHead){
    if(disk[readHead]===undefined) {
      readHead--;
      continue;
    }
    if(disk[insertHead]!==undefined){
      insertHead++;
      continue;
    }
    disk[insertHead] = disk[readHead];
    delete disk[readHead];
    insertHead++;
    readHead--;
  }

  return calculateChecksum(disk);
};


//for now there is a simple option where it iterates over the array a pile of times, and when 
//decompressing it keeps track of the size of file blocks. 

//there is a way of doing this with the indeces of the free space sorted as heaps, corresponding to their size, but
//I ran out of December 9th. This is definitely one I want to come back to in future to clean up, 
//and make more efficient.

interface IDisk {
  id: number
  free: boolean,
  length: number
}
const part2: IPart = (input) => {

  const diskMap = input.string.split('').map(Number);

  let disk: IDisk[] = [];
  let id = 0;

  for (let i = 0; i < diskMap.length; i++) {
    if (i % 2 == 0) disk.push({ id: id++, free: false, length: diskMap[i] });
    else disk.push({ id: -1, free: true, length: diskMap[i] });
  }

  for (let i = id - 1; i >= 0; i--) {
    const file = disk.findIndex(block => block.id == i);
    const free = disk.findIndex(block => block.free && block.length >= disk[file].length);

    if (!disk[free] || file < free) continue;

    if (disk[free].length > disk[file].length) {
      disk = [ 
        ...disk.slice(0, free), 
        { id: disk[file].id, free: false, length: disk[file].length }, 
        { id: -1, free: true , length: disk[free].length - disk[file].length }, 
        ...disk.slice(free + 1) 
      ];
      disk[file + 1].id = -1;
      disk[file + 1].free = true;
    } else if (disk[free].length == disk[file].length) {
      disk[free].id = disk[file].id;
      disk[free].free = false;
      disk[file].id = -1;
      disk[file].free = true;
    }
  }

  for (let j = 0; j < disk.length - 1; j++){

    if (disk[j].free && disk[j + 1].free){
      disk = [ 
        ...disk.slice(0, j), 
        { id: -1, free: true, length: disk[j].length + disk[j + 1].length }, 
        ...disk.slice(j-- + 2) 
      ];
    }
  }

  let block = 0, checksum = 0;
  for (let i = 0; i < disk.length; i++) {
    if (disk[i].free) block += disk[i].length;
    else {
      for (let j = 0; j < disk[i].length; j++) {
        checksum += block * disk[i].id;
        block++;
      }
    }
  }

  return checksum;
};


export const Day: IDay = {
  part1,
  part2
};

