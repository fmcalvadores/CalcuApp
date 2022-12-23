let mybutton = document.getElementById("myBtn");
//window.onscroll = function() {scrollFunction()};

function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        mybutton.style.display = "block";
    } else {
        mybutton.style.display = "none";
    }
}

var wwOpenInstalled;
if (wwOpenInstalled || parent.wwOpenInstalled) {
  if (window.Event) {
    document.addEventListener(Event.MOUSEUP);
  }
  document.onmouseup = (parent.wwOpenInstalled) ? parent.wwOnMouseUp : wwOnMouseUp;
}

function currencies() {
    var currenciesSelector = document.getElementById("currencySelector");
    if (currenciesSelector != null) {
        let currencies = JSON.stringify(obj);
        let strArr = currencies.replace('{', '').replace('}', '').split(',');
        for (let inc = 0; inc < strArr.length; inc++) {
            var option = document.createElement('option');
            option.value = strArr[inc].replace(/"/g, "").split(':')[0];;
            option.innerHTML = strArr[inc].replace(/"/g, "").split(':')[1];
            currenciesSelector.appendChild(option);
        }
    }

}

function topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}

function validateInputs(field, value) {

    if ((value == null) || (value == 0) || (isNaN(value))) {
        alert('Please check your inputs and retry - invalid value for ' + field.getAttribute('data-field') + '.', 'danger');
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

function loadTermsInYear() {
    var terms = document.getElementById("terms");
    var maxYear = 32;
    for (var i = 0; i <= maxYear; i++) {
        var option = document.createElement('option');

        if (i == 0) {
            option.value = i;
            option.innerHTML = "-- Please select a term --";
        } else if (i == 31) {
            option.value = 3;
            option.innerHTML = 3 + " months";
        } else if (i == 32) {
            option.value = 6;
            option.innerHTML = 6 + " months";
        } else {
            option.value = i * 12;
            option.innerHTML = i + (i == 1 ? " year" : " years");
        }

        terms.appendChild(option);
    }
}

function addMonths(date, months) {
    return moment(date).add(months, 'months').format('MM/DD/YYYY');
}


function moneyFormatter(currencyCode, amount) {
    if ((currencyCode == null) || (currencyCode == '')) {
        currencyCode = 'USD';
    }
    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currencyCode
    });
    return formatter.format(amount);
}