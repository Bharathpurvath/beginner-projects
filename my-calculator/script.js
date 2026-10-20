const display = document.querySelector(".display");
const buttons = document.querySelector(".buttons");

let currentInput = "0";
let firstNumber = null;
let operator = null;
let waitingForSecondNumber = false;

function updateDisplay() {
  display.textContent = currentInput;
}

function enterNumber(number) {
  if (waitingForSecondNumber) {
    currentInput = number === "." ? "0." : number;
    waitingForSecondNumber = false;
  } else if (number === ".") {
    if (!currentInput.includes(".")) {
      currentInput += ".";
    }
  } else {
    currentInput = currentInput === "0" ? number : currentInput + number;
  }

  updateDisplay();
}

function chooseOperator(nextOperator) {
  const inputValue = Number(currentInput);

  if (operator && waitingForSecondNumber) {
    operator = nextOperator;
    return;
  }

  if (firstNumber === null) {
    firstNumber = inputValue;
  } else if (operator) {
    const result = calculate(firstNumber, inputValue, operator);
    currentInput = String(result);
    firstNumber = result;
    updateDisplay();
  }

  waitingForSecondNumber = true;
  operator = nextOperator;
}

function calculate(a, b, selectedOperator) {
  if (selectedOperator === "+") return a + b;
  if (selectedOperator === "-") return a - b;
  if (selectedOperator === "*") return a * b;
  if (selectedOperator === "/") return b === 0 ? "Error" : a / b;
}

function showResult() {
  if (operator === null || waitingForSecondNumber) return;

  const secondNumber = Number(currentInput);
  const result = calculate(firstNumber, secondNumber, operator);

  currentInput = typeof result === "number"
    ? String(Number(result.toPrecision(10)))
    : result;

  firstNumber = null;
  operator = null;
  waitingForSecondNumber = true;
  updateDisplay();
}

function clearCalculator() {
  currentInput = "0";
  firstNumber = null;
  operator = null;
  waitingForSecondNumber = false;
  updateDisplay();
}

function deleteLastDigit() {
  if (waitingForSecondNumber || currentInput === "Error") return;

  currentInput = currentInput.length > 1
    ? currentInput.slice(0, -1)
    : "0";

  if (currentInput === "-") currentInput = "0";
  updateDisplay();
}

buttons.addEventListener("click", (event) => {
  const button = event.target.closest("button");
  if (!button) return;

  if (button.dataset.number !== undefined) {
    enterNumber(button.dataset.number);
  } else if (button.dataset.operator) {
    chooseOperator(button.dataset.operator);
  } else if (button.dataset.action === "equals") {
    showResult();
  } else if (button.dataset.action === "clear") {
    clearCalculator();
  } else if (button.dataset.action === "delete") {
    deleteLastDigit();
  }
});

updateDisplay();