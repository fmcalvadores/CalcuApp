function getValues() {
    let age = document.getElementById("age");
    let height = document.getElementById("height");
    let weight = document.getElementById("weight");
    
    let resultDiv = document.getElementById("Result");
    resultDiv.innerHTML = "";

    if (!validateInputs(age, age.value)) {
        return;
    }

    if (!validateInputs(height, height.value)) {
        return;
    }

    if (!validateInputs(weight, weight.value)) {
        return;
    }

    resultDiv.innerHTML += calculateBMI(age.value,height.value,weight.value);
}

function calculateBMI(age,height,weight){
    let bmi = Number(weight) / (((Number(height) / 100) * Number(height)) / 100);
    return "<hr><h3>BMI Breakdown</h3>" +
    "<b>BMI:</b> " + bmi.toFixed(2) + "<br />" +
    "<b>Result:</b> " + verdict(bmi.toFixed(2)) + "<br />";
}

function verdict(bmi) {
    let result;
    if (bmi < 18.5) {
        result = "Underweight";
    } else if (18 < bmi && bmi < 25) {
        result = "Healthy";
    } else if (25 < bmi && bmi < 30) {
        result = "Overweight";
    } else if (bmi > 30 ) {
        result = "Obesity";
    }
    
    let statuses = Array.from(document.getElementsByClassName("weight-status"));
    let element = document.getElementById(result.toLowerCase());
    statuses.forEach(status => {
        status.classList.remove('table-primary');
    });
    
    element.classList.add('table-primary');
    return result;
}