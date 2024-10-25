(function() {
    let screen = document.querySelector('#screen');
    let buttons = document.querySelectorAll('button');
    let clear = document.querySelector('.btn-clear');
    let equal = document.querySelector('.btn-equal');

    let currentInput = ''; // To store the current input number
    let operator = ''; // To store the last operator
    let previousInput = ''; // To store the previous number

    buttons.forEach(function(button) {
        button.addEventListener('click', function(e) {
            let value = e.target.dataset.num;
            if (value !== undefined) {
                // If the clicked button is an operator
                if (['+', '-', '*', '/'].includes(value)) {
                    handleOperator(value);
                } else {
                    handleNumber(value);
                }
            }
        });
    });

    equal.addEventListener('click', function(e) {
        if (currentInput === '') {
            screen.value = "Please enter";
        } else {
            try {
                // Calculate the result and display it
                let answer = calculate(previousInput, currentInput, operator);
                screen.value = answer; // Show the result

                // Reset for further calculations
                previousInput = answer; // Set previous input to answer for continuous calculations
                currentInput = '';
                operator = '';
            } catch (error) {
                screen.value = "Error";
            }
        }
    });

    clear.addEventListener('click', function(e) {
        screen.value = "";
        currentInput = '';
        previousInput = '';
        operator = '';
    });

    function handleNumber(value) {
        currentInput += value; // Append the number to current input
        screen.value = previousInput + ' ' + operator + ' ' + currentInput; // Update the display with full expression
    }

    function handleOperator(value) {
        // If there's already an operator and current input, calculate first
        if (currentInput === '' && operator !== '') {
            // If an operator is pressed again, just update the operator
            operator = value;
            screen.value = previousInput + ' ' + operator + ' '; // Update display with the new operator
            return;
        }

         if (currentInput) {
            if (operator) {
                previousInput = calculate(previousInput, currentInput, operator); // Calculate the result
            } else {
                previousInput = currentInput; // Store the current input as previous if there's no calculation yet
            }
            currentInput = ''; // Reset current input after calculation
        }

        operator = value; // Set the new operator
        screen.value = previousInput + ' ' + operator + ' '; // Update display with the current operation
    }

    function calculate(a, b, operator) {
        const num1 = parseFloat(a);
        const num2 = parseFloat(b);

        if (isNaN(num1) || isNaN(num2)) {
            return "Error";
        }

        switch (operator) {
            case '+':
                return num1 + num2;
            case '-':
                return num1 - num2;
            case '*':
                return num1 * num2;
            case '/':
                return num2 !== 0 ? num1 / num2 : "Error"; // Handle division by zero
            default:
                return b; // Return the current input if no valid operator is found
        }
    }
})();


