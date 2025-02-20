   // Add event listener for Enter key
   document.getElementById("numberInput").addEventListener("keyup", function(event) {
    if (event.key === "Enter") {
        checkArmstrong();
    }
});

function checkArmstrong() {
    // Get the input value
    const inputElement = document.getElementById('numberInput');
    const num = inputElement.value.trim();
    const resultDiv = document.getElementById('result');
    
    // Validate input
    if (!num || isNaN(num) || num < 0 || !Number.isInteger(parseFloat(num))) {
        inputElement.style.borderColor = 'var(--error-color)';
        resultDiv.innerHTML = `
            <div class="result-title">
                <i class="fas fa-exclamation-circle"></i> Invalid Input
            </div>
            <p>Please enter a valid positive integer.</p>
        `;
        resultDiv.className = "result not-armstrong show";
        resultDiv.classList.add("pulse");
        setTimeout(() => resultDiv.classList.remove("pulse"), 1000);
        return;
    }
    
    inputElement.style.borderColor = '#e0e0e0';
    
    // Convert to string to count digits and process each digit
    const numStr = num.toString();
    const numDigits = numStr.length;
    
    let sum = 0;
    let calculationSteps = [];
    
    // Calculate sum of each digit raised to the power of number of digits
    for (let i = 0; i < numStr.length; i++) {
        const digit = parseInt(numStr.charAt(i));
        const power = Math.pow(digit, numDigits);
        sum += power;
        calculationSteps.push({
            digit: digit,
            power: numDigits,
            result: power
        });
    }
    
    // Check if it's an Armstrong number
    const isArmstrong = (sum == num);
    
    // Build calculation display
    let calculation = calculationSteps.map(step => 
        `<span class="digit-power">${step.digit}<sup>${step.power}</sup> = ${step.result}</span>`
    ).join(" + ");
    
    // Display result with calculation details
    if (isArmstrong) {
        resultDiv.innerHTML = `
            <div class="result-title">
                <i class="fas fa-check-circle"></i> ${num} is an Armstrong number!
            </div>
            <p>The sum of each digit raised to the power of ${numDigits} equals the original number.</p>
            <div class="calculation">
                ${calculation} = ${sum}
            </div>
        `;
        resultDiv.className = "result armstrong show";
    } else {
        resultDiv.innerHTML = `
            <div class="result-title">
                <i class="fas fa-times-circle"></i> ${num} is not an Armstrong number
            </div>
            <p>The sum of each digit raised to the power of ${numDigits} does not equal the original number.</p>
            <div class="calculation">
                ${calculation} = ${sum} ≠ ${num}
            </div>
        `;
        resultDiv.className = "result not-armstrong show";
    }
    
    resultDiv.classList.add("pulse");
    setTimeout(() => resultDiv.classList.remove("pulse"), 1000);
    
    // Scroll to result if needed
    resultDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}