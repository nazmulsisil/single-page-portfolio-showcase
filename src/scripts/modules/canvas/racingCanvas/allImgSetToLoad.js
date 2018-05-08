import {
  PicDetails
} from './PicDetails';
import {
  findObjFromArray
} from './helperFunctions';

export const allImgSetToLoad = (whichLayout) => {
  const htmlTags = {};
  const uniquePicCodes = [...new Set(whichLayout)];
  const picturesToLoad = uniquePicCodes.length;

  const picCodeDetails = [];
  picCodeDetails.push(new PicDetails('road', 0, '../img/road.png'));
  picCodeDetails.push(new PicDetails('wall', 1, '../img/tile.png'));
  picCodeDetails.push(new PicDetails('blueCar', 2, '../img/blue_car.png'));
  picCodeDetails.push(new PicDetails('greenCar', 6, '../img/green_car.png'));
  picCodeDetails.push(new PicDetails('goal', 3, '../img/goal.png'));
  picCodeDetails.push(new PicDetails('tree', 4, '../img/tree.png'));
  picCodeDetails.push(new PicDetails('flag', 5, '../img/flag.png'));
  // immediately end the function if all code not found in picture set picCodeDetails array
  if (!allCodesFoundInPicCodeDetailsArray()) {
    console.log('PicCodes used in the layout was not found in picCodeDetails array');
    return false;
  }
  // create htmlTags object with all picCode used and making their respective src = filePath
  uniquePicCodes.forEach(picCode => {
    htmlTags[picCode] = document.createElement('img');
    htmlTags[picCode].src = findObjFromArray(picCodeDetails, 'layoutCode', picCode).filePath;
  });

  // mini helper function
  function allCodesFoundInPicCodeDetailsArray() {
    let allCodesFound = true;
    uniquePicCodes.forEach(code => {
      let codeFound = false;
      picCodeDetails.forEach(el => {
        if (el.layoutCode === code) codeFound = true;
      });
      if (!codeFound) allCodesFound = false;
    });
    return allCodesFound;
  }

  return {
    htmlTags,
    uniquePicCodes,
    picturesToLoad,
  };
};
