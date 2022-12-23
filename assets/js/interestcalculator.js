$(function () {
    loadTermsInYear();
    currencies();
    // Enables popover
    $("#hint-popover").popover({
      html: true,
      content: function () {
        return $("#popover-context").html();
      },
      title: function () {
        return 'Equation';
      }
    });
  });



  function getValues() {
    let principal = document.getElementById("principal");
    let interestRate = document.getElementById("interest");
    let terms = document.getElementById("terms");
    var currencySelector = document.getElementById("currencySelector");
	selectedCurrency = currencySelector.value;
    
    let resultDiv = document.getElementById("Result");
    resultDiv.innerHTML = "";

    let rate = parseFloat(interestRate.value) / 100;
    
    if (!validateInputs(principal, parseFloat(principal.value))) {
		return;
	}

    if (!validateInputs(interestRate, parseFloat(interestRate.value))) {
		return;
	}

    if (!validateInputs(terms, parseFloat(terms.value))) {
		return;
	}
    

    let calculatedInterest = parseFloat(principal.value) * (1 + (rate * parseInt(terms.value)));
    resultDiv.innerHTML = "<hr>" +
      "<b>Total Accrued Amount:</b> " + moneyFormatter(selectedCurrency,calculatedInterest.toFixed(2)) + "<br>" +
      "<b>Principal Amount:</b> " + moneyFormatter(selectedCurrency,principal.value) + "<br>" +
      "<b>Rate of Interest per year:</b> " + (rate) + "<br>" +
      "<b>Rate of Interest per year (%):</b> " + (interestRate.value) + "%<br>" +
      "<b>Time Period involved in months:</b> " + (terms.value) + "<br>" +
      "<b>Result:</b><br> <u>" + moneyFormatter(selectedCurrency,calculatedInterest.toFixed(2)) + "</u> = " + moneyFormatter(selectedCurrency,principal.value) + "(1 + (" + rate + " * " + terms.value + "))";
  }