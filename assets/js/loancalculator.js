loadTermsInYear();

var wwOpenInstalled;
if (wwOpenInstalled || parent.wwOpenInstalled) {
	if (window.Event) {
		document.addEventListener(Event.MOUSEUP);
	}
	document.onmouseup = (parent.wwOpenInstalled) ? parent.wwOnMouseUp : wwOnMouseUp;
}

Date.prototype.toDateInputValue = (function() {
    var local = new Date(this);
    local.setMinutes(this.getMinutes() - this.getTimezoneOffset());
    return local.toJSON().slice(0,10);
});

document.getElementById('dateStart').value = new Date().toDateInputValue();


function loadTermsInYear()
{
	var terms = document.getElementById("terms");
	var maxYear = 32;
	for(var i=0; i <= maxYear; i++)
	{
		var option = document.createElement('option');

		if(i == 0)
		{
			option.value = i;
			option.innerHTML = "-- Please select a term --";
		}
		else if(i == 31)
		{
			option.value = 3;
			option.innerHTML = 3 + " months";
		}
		else if(i == 32)
		{
			option.value = 6;
			option.innerHTML = 6 + " months";
		}
		else 
		{
			option.value = i * 12;
			option.innerHTML = i + (i == 1 ? " year" : " years");
		}
		
		terms.appendChild(option);
	}
}

function getValues()
{
	
	var balance = document.getElementById("principal");
	var interestRate =  document.getElementById("interest");
	var terms = document.getElementById("terms");
	var dateStart = document.getElementById("dateStart");
	
	var resultDiv = document.getElementById("Result");
	resultDiv.innerHTML = "";
	//console.log(parseFloat(interestRate.value));
	if (!validateInputs(document.getElementById("principal"), parseFloat(balance.value))) { return; }
	if (!validateInputs(document.getElementById("interest"), parseFloat(interestRate.value))) { return; }
	if (!validateInputs(document.getElementById("terms"), parseInt(terms.value))) { return; }
	
	resultDiv.innerHTML += calculateAmortization(parseFloat(balance.value), parseFloat(interestRate.value), parseInt(terms.value), dateStart.value);
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
function calculateAmortization(balance, interestRate, terms, dateStart)
{
    
	var monthlyRate = interestRate/ 100.00 / 12;
	var payment = balance * (monthlyRate/(1-Math.pow(
        1+monthlyRate, -terms)));
	    
	
    var result = "<hr><h3>Loan Breakdown</h3>"+
		"<b>Loan Amount:</b> "  + balance.toFixed(2) +  "<br />" + 
        "<b>Interest Rate:</b> " + interestRate.toFixed(2) +  "%<br />" +
        "<b>Number of Months:</b> " + terms + "<br />" +
        "<b>Monthly Payment:</b> " + payment.toFixed(2) + "<br />" +
        "<b>Total Payment:</b> " + (payment * terms).toFixed(2) + "<br /><br />";
        
	result += "<table class='table'>" +
				 "<thead>"+
					"<tr>"+
						"<th>Month #</th>" +
						"<th>Balance</th>" + 
        				"<th>Interest</th>" + 
						"<th>Principal</th></thead>";
	let csvFileData = [
			['Loan Amount:', balance.toFixed(2)],
			['Interest Rate:', (interestRate).toFixed(2)],
			['Loan Amount:', terms],
			['Number of Months:', payment.toFixed(2)],
			['Total Payment:',  (payment * terms).toFixed(2)],
			["Month", "Balance", "Interest", "Principal"]
		];
	
	for (var count = 0; count < terms; ++count)
	{ 
		let interest = 0;
		let monthlyPrincipal = 0;
		result += "<tr>";
		let date = addMonths(dateStart,(count + 1));
		result += "<td>" + date + "</td>";
		result += "<td>" + balance.toFixed(2) + "</td>";
		interest = balance * monthlyRate;
		result += "<td>" + interest.toFixed(2) + "</td>";
		monthlyPrincipal = payment - interest;
		result += "<td>" + monthlyPrincipal.toFixed(2) + "</td>";
		result += "</tr>";
		balance = balance - monthlyPrincipal;
		csvFileData.push([date,balance.toFixed(2),interest.toFixed(2),monthlyPrincipal.toFixed(2)]);
	}

    result += "</table>";

	csvData = csvFileData;
	var downloadBtn = '<a id="downloadBtn" class="btn btn-link" onClick="download_csv_file()">Export as CSV</a>';
	result += "<br>" + downloadBtn;
    return result;
}

function addMonths(date, months) {
	let [year,month,day] = date.split('-');
	var parsedDate = new Date(+year,(month + months) - 1, +day);
	let parsedMonth = (parsedDate.getMonth() + 1);
    return parsedDate.getDate() + "/" + (parsedMonth <= 9 ? "0"+ parsedMonth : parsedMonth) + "/" + parsedDate.getFullYear();
}


function download_csv_file() {

    var csv = '';    
    csvData.forEach(function(row) {
            csv += row.join(',');
            csv += "\n";
    });
    
    var hiddenElement = document.getElementById('downloadBtn');
    hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csv);
    hiddenElement.target = '_blank';
    hiddenElement.download = 'Loan Calculator.csv';
}

function validateInputs(field, value)
{

	if ((value == null) || (value == 0) || (isNaN(value)))
	{
		alert('Please Check your inputs and retry - invalid value for ' + field.getAttribute('data-field') + '.', 'danger');
		return false;
	}
	alertPlaceholder.innerHTML = "";
	return true;
	
}


const alertPlaceholder = document.getElementById('alertPlaceholder');

const alert = (message, type) => {
	
	const wrapper = document.createElement('div')
  	wrapper.innerHTML = [
    	`<div class="alert alert-${type} alert-dismissible" role="alert">`,
    	`   <div>${message}</div>`,
    	'   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
    	'</div>'
  ].join('')
  alertPlaceholder.innerHTML = "";
  alertPlaceholder.append(wrapper)
}
