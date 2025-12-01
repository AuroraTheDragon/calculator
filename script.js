// Handles getting the display of the calculator and the button elements as well.
const display = document.getElementById("display");
const buttons = document.querySelectorAll("button");

// This keeps track of user input, which starts as blank / empty.
let currentInput = "";

// This code below is a code that loops through all the buttons and listen for clicks.
buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const value = button.textContent;

    // Next up is the code that handles the function of clear, and clear everything.
    if (value === "CE") {
      currentInput = "";
      display.value = "";
    } else if (value === "C") {
      currentInput = currentInput.slice(0, -1);
      display.value = currentInput;

      // Moving on, this code block right here handles the function for the equal operation. Also has an "Error" function that handles invalid expressions.
    } else if (value === "=") {
      try {
        currentInput = eval(currentInput).toString();
        display.value = currentInput;
      } catch {
        display.value = "Error";
        currentInput = "";
      }

      // Now this one right here handles the function for "%" operation, making it act like the actual "%" operation that a real calculator does.
    } else if (value === "%") {
      // Handle percentage relative to the first number
      let match = currentInput.match(/(\d+\.?\d*)([+\-*/])(\d+\.?\d*)$/);
      if (match) {
        let firstNum = parseFloat(match[1]);
        let operator = match[2];
        let secondNum = parseFloat(match[3]);

        // turn second number into a percentage of the first
        let percentValue = (firstNum * secondNum) / 100;

        // rebuild the expression
        currentInput = firstNum + operator + percentValue;
        display.value = currentInput;
      }

      // Handles all other buttons, updating the display.
    } else {
      currentInput += value;
      display.value = currentInput;
    }
  });
});
