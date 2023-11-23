//  A / B  * 100% (filed) => unfield

const countedOrg = document.querySelectorAll(".org-counted");
const totalOrg = document.querySelectorAll(".org-total");

const fieldProgress = document.querySelectorAll(".field-progress");
const unfieldProgress = document.querySelectorAll(".unfield-progress");

console.log(countedOrg);
console.log(totalOrg);
console.log(fieldProgress);
console.log(unfieldProgress);

function calcPercent(countedArr, totalArr) {
  const counted = [];
  for (let index = 0; index < totalArr.length; index++) {
    const elementTotal = totalArr[index];
    const elementCounted = countedArr[index];
    counted.push((elementCounted.textContent / elementTotal.textContent) * 100);
  }
  return counted
}

// [70, 30, 80]

function setColors(counted) {
  fieldProgress.forEach((element, index) => {
    element.style.width = `${counted[index]}%`;
  });
  unfieldProgress.forEach((element, index) => {
    element.style.width = `${100 - counted[index]}%`;
  });
}


console.log(calcPercent(countedOrg, totalOrg))

setColors(calcPercent(countedOrg, totalOrg))