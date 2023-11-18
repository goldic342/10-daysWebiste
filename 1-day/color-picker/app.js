// cerated with https://youtu.be/OaNICHKM5KM?si=lwVwzgdSCm7BA4jT

const colls = document.querySelectorAll(".col");

document.addEventListener("keydown", (event) => {
  event.preventDefault();
  event.code === "Space" ? setRandomColors() : null;
});

// Event delegation
document.addEventListener("click", (event) => {
  const type = event.target.dataset.type;

  if (type === "lock") {
    const node =
      event.target.tagName.toLowerCase() === "i"
        ? event.target
        : event.target.firstElementChild;
    // delete if have add if not
    node.classList.toggle("fa-lock-open");
    node.classList.toggle("fa-lock");
  } else if (type === "copy") {
    copyToClipBoard(event.target.textContent);
  }
});

function generateRandomHexCode() {
  const hexsCodes = "0123456789abcdef";
  let hexColor = "";
  for (i = 0; i < 6; i++) {
    hexColor += hexsCodes[Math.floor(Math.random() * hexsCodes.length)];
  }
  return `#${hexColor}`;
}

function setRandomColors(isInitial) {
  const colors = isInitial ? getColorsFromHash() : [];

  colls.forEach((col, index) => {
    // Varibles
    const isLocked = col.querySelector("i").classList.contains("fa-lock");
    const text = col.querySelector("h2");
    const button = col.querySelector("button");

    if (isLocked) {
      colors.push(text.textContent);
      return 
    }

    const color = isInitial
      ? colors[index]
        ? colors[index]
        : generateRandomHexCode()
      : generateRandomHexCode(); // chorma.random()

    if (!isInitial) {
      colors.push(color);
    }
    col.style.backgroundColor = color;
    text.textContent = color;

    setTextColor(color, text);
    setTextColor(color, button);
  });

  console.log(colors);
  updateColorsHash(colors);
}

function copyToClipBoard(text) {
  return navigator.clipboard.writeText(text);
}

function setTextColor(color, text) {
  const luminance = chroma(color).luminance();
  text.style.color = luminance > 0.5 ? "#000" : "#fff";
  return null;
}

function updateColorsHash(colors = []) {
  document.location.hash = colors
    .map((color) => {
      return color.substring(1);
    })
    .join("-");
}

function getColorsFromHash() {
  if (document.location.hash.length > 1) {
    return document.location.hash
      .substring(1)
      .split("-")
      .map((color) => "#" + color);
  }
  return [];
}

setRandomColors(true);
