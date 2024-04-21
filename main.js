//current step: add pixels to new canvas from sortedHexArr

function rgbToHex(r, g, b) {
  //code found in the deepest depths of purgatory itself
  return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

const canvas = document.getElementById("pixelSort");

let image = document.getElementById("img");
image.onload = function () {
  canvas.width = image.width;
  canvas.height = image.height;
  let ctx = canvas.getContext("2d");

  ctx.drawImage(image, 0, 0);

  let c = canvas.getContext("2d");

  canvas.style.backgroundColor = "green";
  let imgData = ctx.getImageData(0, 0, image.width, image.height).data;
  let rgbArr = imgData.filter(function (x) {
    if ((imgData[x] + 1) % 4 != 0) {
      return x;
    }
  });
//   console.log(rgbArr.length / imgData.length);
//this still comes out wrong but the other numbers are good idk what's up with that.
  hexArr = [];
  tempArr = [];
  for (let i = 0; i < rgbArr.length; i++) {
    if (tempArr.length == 3) {
      hexArr.push(rgbToHex(tempArr[0], tempArr[1], tempArr[2]));
      tempArr = [];
    }
    tempArr.push(i);
  }
  hexArr.push(rgbToHex(tempArr[0], tempArr[1], tempArr[2]));
  tempArr = [];
//   console.log(hexArr);
  let sortedHexArr = hexArr.sort();
//   console.log(sortedHexArr);
//   console.log(rgbArr.length)
  let oopsArr = hexArr.filter(function (x) {
    return x.length < 6;
  });
  console.log(oopsArr);
  //why are there hex values that are not six digits long (7 with #)????
  //it doesn't make sense how did those get there
};

let pixelSorted = document.getElementById("pixelSorted")

pixelSorted.height = image.height
pixelSorted.width = image.width

let ctx = pixelSorted.getContext("2d");
let drawX = 0
let drawY = 0