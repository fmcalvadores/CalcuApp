loadTermsInYear();
var wwOpenInstalled;
if (wwOpenInstalled || parent.wwOpenInstalled) {
	if (window.Event) {
		document.addEventListener(Event.MOUSEUP);
	}
	document.onmouseup = (parent.wwOpenInstalled) ? parent.wwOnMouseUp : wwOnMouseUp;
}


function loadTermsInYear()
{
	var terms = document.getElementById("terms");
	var maxYear = 30;
	for(var i=0; i <= maxYear; i++)
	{
		var option = document.createElement('option');
		if(i == 0)
		{
			option.value = "";
			option.innerHTML = "-- Please select a term --";
		}
		else 
		{
			option.value = i * 12;
			option.innerHTML = i;
		}
		
		terms.appendChild(option);
	}
}

function getValues()
{
	
	var balance = parseFloat(document.getElementById("principal").value);
	var interestRate =  parseFloat(document.getElementById("interest").value/100.0);
	var terms = parseInt(document.getElementById("terms").value);
	
	var div = document.getElementById("Result");
	div.innerHTML = "";
	var balVal = validateInputs(balance);
	var intrVal = validateInputs(interestRate);
    var trmVal = validateInputs(terms);

	if (balVal && intrVal)
	{
		div.innerHTML += calculateAmortization(balance, interestRate, terms);
		document.getElementById("loanBreakdown").style.display = 'block';
	}
	else
	{
		div.innerHTML += "Please Check your inputs and retry - invalid values.";
		document.getElementById("loanBreakdown").style.display = 'none';
	}
}


function calculateAmortization(balance, interestRate, terms)
{
    
	var monthlyRate = interestRate / 12;
    var payment = balance * (monthlyRate/(1 - Math.pow(1 + monthlyRate, -terms)));
	    
    var result = "Loan amount: $" + balance.toFixed(2) +  "<br />" + 
        "Interest rate: " + (interestRate*100).toFixed(2) +  "%<br />" +
        "Number of months: " + terms + "<br />" +
        "Monthly payment: $" + payment.toFixed(2) + "<br />" +
        "Total paid: $" + (payment * terms).toFixed(2) + "<br /><br />";
        
	result += "<table border='1'>" +
					"<tr>"+
						"<th>Month #</th>" +
						"<th>Balance</th>" + 
        				"<th>Interest</th>" + 
						"<th>Principal</th>";
    
	for (var count = 0; count < terms; ++count)
	{ 
		var interest = 0;
		var monthlyPrincipal = 0;
		result += "<tr align=center>";
		result += "<td>" + (count + 1) + "</td>";
		result += "<td> $" + balance.toFixed(2) + "</td>";
		interest = balance * monthlyRate;
		result += "<td> $" + interest.toFixed(2) + "</td>";
		monthlyPrincipal = payment - interest;
		result += "<td> $" + monthlyPrincipal.toFixed(2) + "</td>";
		result += "</tr>";
		balance = balance - monthlyPrincipal;		
	}
    result += "</table>";
    return result;
}

function validateInputs(value)
{
	if ((value == null) || (value == ""))
	{
		return false;
	}
	return true;
	
}
