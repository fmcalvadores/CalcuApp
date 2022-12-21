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
	
	var balance = parseFloat(document.getElementById("principal").value);
	var interestRate =  parseFloat(document.getElementById("interest").value/100.0);
	var terms = parseInt(document.getElementById("terms").value);
	
	var div = document.getElementById("Result");
	div.innerHTML = "";
	var balVal = validateInputs(document.getElementById("principal").name,balance);
	var intrVal = validateInputs(document.getElementById("interest").name,interestRate);
    var trmVal = validateInputs(document.getElementById("terms").name,terms);

	if (balVal && intrVal)
	{
		div.innerHTML += calculateAmortization(balance, interestRate, terms);
	}
	else
	{
		div.innerHTML += "Please Check your inputs and retry - invalid values.";
	}
}

function showMenu() {
	var x = document.getElementById("myLinks");
	if (x.style.display === "block") {
	  x.style.display = "none";
	} else {
	  x.style.display = "block";
	}
  }


function calculateAmortization(balance, interestRate, terms)
{
    
	var monthlyRate = interestRate / 12;
    var payment = balance * (monthlyRate/(1 - Math.pow(1 + monthlyRate, -terms)));
	    
    var result = "Loan Amount: "  + balance.toFixed(2) +  "<br />" + 
        "Interest Rate: " + (interestRate*100).toFixed(2) +  "%<br />" +
        "Number of Months: " + terms + "<br />" +
        "Monthly Payment: " + payment.toFixed(2) + "<br />" +
        "Total Paid: " + (payment * terms).toFixed(2) + "<br /><br />";
        
	result += "<table class='table'>" +
				 "<thead>"+
					"<tr>"+
						"<th>Month #</th>" +
						"<th>Balance</th>" + 
        				"<th>Interest</th>" + 
						"<th>Principal</th></thead>";
    
	for (var count = 0; count < terms; ++count)
	{ 
		var interest = 0;
		var monthlyPrincipal = 0;
		result += "<tr>";
		result += "<td>" + (count + 1) + "</td>";
		result += "<td>" + balance.toFixed(2) + "</td>";
		interest = balance * monthlyRate;
		result += "<td>" + interest.toFixed(2) + "</td>";
		monthlyPrincipal = payment - interest;
		result += "<td>" + monthlyPrincipal.toFixed(2) + "</td>";
		result += "</tr>";
		balance = balance - monthlyPrincipal;		
	}
    result += "</table>";
    return result;
}

function validateInputs(field, value)
{
	if ((value == null) || (value == ""))
	{

		return false;
	}
	return true;
	
}
