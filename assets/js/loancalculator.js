
loadTermsInYear();
currencies();
// var wwOpenInstalled;
// if (wwOpenInstalled || parent.wwOpenInstalled) {
// 	if (window.Event) {
// 		document.addEventListener(Event.MOUSEUP);
// 	}
// 	document.onmouseup = (parent.wwOpenInstalled) ? parent.wwOnMouseUp : wwOnMouseUp;
// }

Date.prototype.toDateInputValue = (function () {
	var local = new Date(this);
	local.setMinutes(this.getMinutes() - this.getTimezoneOffset());
	return local.toJSON().slice(0, 10);
});

document.getElementById('dateStart').value = new Date().toDateInputValue();

function getValues() {

	var balance = document.getElementById("principal");
	var interestRate = document.getElementById("interest");
	var terms = document.getElementById("terms");
	var dateStart = document.getElementById("dateStart");
	var currencySelector = document.getElementById("currencySelector");
	selectedCurrency = currencySelector.value;
	var resultDiv = document.getElementById("Result");
	resultDiv.innerHTML = "";

	if (!validateInputs(balance, parseFloat(balance.value))) {
		return;
	}
	if (!validateInputs(interestRate, parseFloat(interestRate.value))) {
		return;
	}
	if (!validateInputs(terms, parseInt(terms.value))) {
		return;
	}

	resultDiv.innerHTML += calculateAmortization(parseFloat(balance.value), parseFloat(interestRate.value), parseInt(terms.value), dateStart.value,selectedCurrency);
}

function showMenu() {
	var x = document.getElementById("myLinks");
	if (x.style.display === "block") {
		x.style.display = "none";
	} else {
		x.style.display = "block";
	}
}

var csvData = [];

function calculateAmortization(balance, interestRate, terms, dateStart,currencyCode) {

	var monthlyRate = interestRate / 100.00 / 12;
	var payment = balance * (monthlyRate / (1 - Math.pow(
		1 + monthlyRate, -terms)));

		
	var result = "<hr><h3>Loan Breakdown</h3>" +
		"<b>Loan Amount:</b> " + moneyFormatter(currencyCode,balance.toFixed(2)) + "<br />" +
		"<b>Interest Rate:</b> " + interestRate.toFixed(2) + "%<br />" +
		"<b>Number of Months:</b> " + terms + "<br />" +
		"<b>Monthly Payment:</b> " + moneyFormatter(currencyCode,payment.toFixed(2)) + "<br />" +
		"<b>Total Paid Interest:</b> " + moneyFormatter(currencyCode,((payment * terms).toFixed(2) - balance.toFixed(2)).toFixed(2)) + "<br />" +
		"<b>Total Payment:</b> " + moneyFormatter(currencyCode, (payment * terms).toFixed(2)) + "<br /><br />";

	result += "<div class='table-responsive'><table class='table' style='font-size=smaller;'>" +
		"<thead>" +
		"<tr>" +
		"<th>Month #</th>" +
		"<th>Balance</th>" +
		"<th>Interest</th>" +
		"<th>Principal</th></thead>";
	// let csvFileData = [
	// 		['Loan Amount:', balance.toFixed(2)],
	// 		['Interest Rate:', (interestRate).toFixed(2)],
	// 		['Loan Amount:', terms],
	// 		['Number of Months:', payment.toFixed(2)],
	// 		['Total Payment:',  (payment * terms).toFixed(2)],
	// 		["Month", "Balance", "Interest", "Principal"]
	// 	];

	for (var count = 0; count < terms; ++count) {
		let interest = 0;
		let monthlyPrincipal = 0;
		result += "<tr>";
		let date = addMonths(dateStart, (count + 1));
		result += "<td>" + date + "</td>";
		result += "<td>" + moneyFormatter(currencyCode,balance.toFixed(2)) + "</td>";
		interest = balance * monthlyRate;
		result += "<td>" + moneyFormatter(currencyCode,interest.toFixed(2)) + "</td>";
		monthlyPrincipal = payment - interest;
		result += "<td>" + moneyFormatter(currencyCode,monthlyPrincipal.toFixed(2)) + "</td>";
		result += "</tr>";
		balance = balance - monthlyPrincipal;
		//	csvFileData.push([date,balance.toFixed(2),interest.toFixed(2),monthlyPrincipal.toFixed(2)]);
	}

	result += "</table></div>";

	//csvData = csvFileData;
	//var downloadBtn = '<a id="downloadBtn" class="btn btn-link" onClick="download_csv_file()">Export as CSV</a>';
	//result += "<br>" + downloadBtn;
	return result;
}



function download_csv_file() {

	var csv = '';
	csvData.forEach(function (row) {
		csv += row.join(',');
		csv += "\n";
	});

	var hiddenElement = document.getElementById('downloadBtn');
	hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csv);
	hiddenElement.target = '_blank';
	hiddenElement.download = 'Loan Calculator.csv';
}