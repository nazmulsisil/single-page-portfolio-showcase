import {
  findObjFromArray
} from "./helperFunctions";

export const levelDesigns = (whichLevel) => {
  const htmlTagList = {};



  // returns all unique items of the array

  const uniquePicCodes = [...new Set(levels[whichLevel])];
  const picItemUsed = []; // pic names which are used as integer in the layout

  // push respective pic names used as integer in the layout
  uniquePicCodes.forEach(picCode => {
    picItemDetails.forEach(picItem => {
      if (picCode === picItem.layoutCode) {
        picItemUsed.push(picItem.type);
      }
    });
  });

  // create object of tags using picNamesUsed
  picItemUsed.forEach(picName => {
    htmlTagList[picName] = document.createElement('img');
    htmlTagList[picName].src = findFilePathOfPicName(picName);
  });

  // helper, find file path of picName
  function findFilePathOfPicName(whichPicName) {
    return findObjFromArray(picItemDetails, 'type', whichPicName).filePath;
  }

  return {
    layout: levels[whichLevel],
    htmlTagList
  };
};
