// Select the input field
const resultInput = document.querySelector('#result');

// Select all buttons
const buttons = document.querySelectorAll('.input button');

// Initialize variables for the calculation
let currentInput = ''; // Current user input
let expression = ''; // Full mathematical expression

// Add event listeners to all buttons
buttons.forEach(button => {
  button.addEventListener('click', () => {
    const value = button.textContent; // Get button text

    if (button.classList.contains('number') || button.classList.contains('decimal')) {
      // Append number or decimal to the input field
      currentInput += value;
      resultInput.value = currentInput;
    } else if (button.classList.contains('operation')) {
      // Handle specific operations
      if (value === 'x²') {
        if (currentInput) {
          const squaredValue = parseFloat(currentInput) ** 2; // Calculate square
          resultInput.value = squaredValue; // Display square in the input field
          currentInput = squaredValue.toString(); // Update current input
        }
      } else if (value === '√') {
        if (currentInput) {
          const squareRootValue = Math.sqrt(parseFloat(currentInput)); // Calculate square root
          resultInput.value = squareRootValue; // Display square root
          currentInput = squareRootValue.toString(); // Update current input
        }
      } else if (value === '%') {
        if (currentInput) {
          const percentageValue = parseFloat(currentInput) / 100; // Calculate percentage
          resultInput.value = percentageValue; // Display percentage
          currentInput = percentageValue.toString(); // Update current input
        }
      } else if ('+-*/'.includes(value)) {
        // Add operator to the expression
        if (currentInput) {
          expression += currentInput + ` ${value} `;
          currentInput = ''; // Reset current input after an operator
        }
        resultInput.value = expression.trim();
      }
    } else if (button.classList.contains('clear')) {
      // Clear the input field and reset everything
      currentInput = '';
      expression = '';
      resultInput.value = '';
    } else if (button.classList.contains('equals')) {
      // Perform the calculation
      try {
        if (currentInput) {
          expression += currentInput; // Add the last number to the expression
        }
        const sanitizedExpression = expression.replace(/×/g, '*').replace(/÷/g, '/'); // Replace visual symbols
        const result = eval(sanitizedExpression); // Evaluate the expression
        resultInput.value = result;
        currentInput = result.toString();
        expression = ''; // Reset expression after calculation
      } catch (error) {
        resultInput.value = 'Error'; // Handle invalid expressions
        currentInput = '';
        expression = '';
      }
    }
  });
});