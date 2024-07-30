// script.js

document.addEventListener('DOMContentLoaded', () => {
    const display = document.getElementById('display');
    const operationDisplay = document.getElementById('operationDisplay');
    let currentInput = '0';
    let previousInput = '';
    let operator = '';
    let resultDisplayed = false;

    function updateDisplay() {
        display.innerText = currentInput;
        operationDisplay.innerText = `${previousInput} ${operator}`;
    }

    function handleNumber(value) {
        if (currentInput === '0' || resultDisplayed) {
            currentInput = value;
        } else {
            currentInput += value;
        }
        resultDisplayed = false;
        updateDisplay();
    }

    function handleOperator(op) {
        if (operator && !resultDisplayed) return;
        if (previousInput && currentInput && !resultDisplayed) {
            performCalculation();
        }
        operator = op;
        previousInput = currentInput;
        currentInput = '0';
        updateDisplay();
    }

    function performCalculation() {
        let result;
        const prev = parseFloat(previousInput);
        const curr = parseFloat(currentInput);
        if (isNaN(prev) || isNaN(curr)) return;
        switch (operator) {
            case '+':
                result = prev + curr;
                break;
            case '-':
                result = prev - curr;
                break;
            case '*':
                result = prev * curr;
                break;
            case '/':
                result = prev / curr;
                break;
            default:
                return;
        }
        currentInput = result.toString();
        operator = '';
        previousInput = '';
        resultDisplayed = true;
        updateDisplay();
    }

    function handleClear() {
        currentInput = '0';
        previousInput = '';
        operator = '';
        updateDisplay();
    }

    function handleEquals() {
        if (previousInput && currentInput && operator) {
            performCalculation();
        }
    }

    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('click', () => {
            const value = button.getAttribute('data-value');
            if (button.classList.contains('number')) {
                handleNumber(value);
            } else if (button.classList.contains('operator')) {
                handleOperator(value);
            } else if (button.classList.contains('clear')) {
                handleClear();
            } else if (button.classList.contains('equal')) {
                handleEquals();
            }
        });
    });

    updateDisplay();
});
