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
  let rgbArr = [];
  for (let i = 0; i < imgData.length; i += 4) {
    rgbArr.push(imgData[i], imgData[i + 1], imgData[i + 2]);
  }
  hexArr = [];
  tempArr = [];
  for (let i = 0; i < rgbArr.length; i++) {
    if (tempArr.length == 3) {
      hexArr.push(rgbToHex(tempArr[0], tempArr[1], tempArr[2]));
      tempArr = [];
    }
    tempArr.push(rgbArr[i]);
  }
  hexArr.push(rgbToHex(tempArr[0], tempArr[1], tempArr[2]));
  tempArr = [];
  let sortedHexArr = hexArr.sort();
  let oopsArr = hexArr.filter(function (x) {
    return x.length > 7;
  });

  let pixelSorted = document.getElementById("pixelSorted");

  pixelSorted.height = image.height;
  pixelSorted.width = image.width;

  let ctx2 = pixelSorted.getContext("2d");
  let x = 0;
  let y = 0;

  for (let i = 0; i < sortedHexArr.length; i++) {
    if (x == pixelSorted.width) {
      x = 0;
      y++;
    }
    ctx2.fillStyle = sortedHexArr[i];
    ctx2.fillRect(x, y, 1, 1);
    x++;
  }
};
