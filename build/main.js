// get DOM elements

const resultEl = document.getElementById("result");
const lengthEl = document.getElementById("length"); // password length
const uppercaseEl = document.getElementById("uppercase"); // uppercase letters
const lowercaseEl = document.getElementById("lowercase"); // lowercase letter
const numbersEl = document.getElementById("numbers"); // numbers
const symbolsEl = document.getElementById("symbols"); // symbols
const generateEl = document.getElementById("generate"); // generate button
const clipboardEl = document.getElementById("clipboard");

const randomFunc = {
  lower: getRandomLower,
  upper: getRandomUpper,
  number: getRandomNumber,
  symbol: getRandomSymbol,
};

// generate password click event listen

generateEl.addEventListener("click", () => {
  const length = +lengthEl.value; // lengthEl.value is a string and the + make it to number
  const hasLower = lowercaseEl.checked; // check the lowercase line has a pipe or not
  const hasUpper = uppercaseEl.checked; // check the uppercase line has a pipe or not
  const hasNumber = numbersEl.checked; // check the numbers line has a pipe or not
  const hasSymbols = symbolsEl.checked; // check the symbols line has a pipe or not

  resultEl.innerText = generatePassword(
    hasLower,
    hasUpper,
    hasNumber,
    hasSymbols,
    length
  );
});

// Copy password to the clipboard

clipboardEl.addEventListener("click", () => {
  const textarea = document.createElement("textarea");
  const password = resultEl.innerText;

  if (!password) {
    return;
  }

  textarea.value = password;
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  textarea.remove();
  alert("Password copied to clipboard!");
});

// Generate password function

function generatePassword(lower, upper, number, symbol, length) {
  // 1. Init password variables
  // 2. Filter out unchecked types
  // 3. Loop over length && call generator function for each type
  // 4. Add final password to the password variable and return it

  let generatedPassword = "";

  const typesCount = lower + upper + number + symbol; // counting the number of checked values

  //   console.log("typesCount ", typesCount);

  const typesArr = [{ lower }, { upper }, { number }, { symbol }].filter(
    (item) => Object.values(item)[0]
  ); // Array of object that has the key to unfill what we checked out

  //   console.log("typesArr ", typesArr);

  if (typesCount === 0) {
    return "";
  }

  for (let i = 0; i < length; i += typesCount) {
    typesArr.forEach((type) => {
      const funcName = Object.keys(type)[0];
      //   console.log("funcName: ", funcName);
      generatedPassword += randomFunc[funcName]();
    });
  }
  const finalPassword = generatedPassword.slice(0, length);

  return finalPassword;
}

// Generator functions - http://www.net-comber.com/charset.html
function getRandomLower() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 97); // one line to get the lowercase letters from Alphabets
}

function getRandomUpper() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 65); // one line to get the uppercase letters from Alphabets
}

function getRandomNumber() {
  return String.fromCharCode(Math.floor(Math.random() * 10) + 48); // one line to get random numbers from Alphabets
}

function getRandomSymbol() {
  const symbols = "!@#$%^&*(){}[]=<>/,."; // create a variable to use the all symbols
  return symbols[Math.floor(Math.random() * symbols.length)]; // to get any symbols and multiply it
}
