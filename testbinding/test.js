// let num1 = Number(document.getElementById("num1").innerHTML)
// let num2 = Number(document.getElementById("num2").innerHTML)
// document.getElementById("result").innerHTML = num1 + num2
document.getElementById("taxform").addEventListener('submit', function (event) {
    event.preventDefault()

    let basic_salary = Number(document.getElementById("basic_salary").value)
    let benefits = Number(document.getElementById("benefits").value)

    function grossSalary(basic_salary, benefits) {
        return basic_salary + benefits;
    }

    function calculate_Nhif(grossSalary) {
        if (grossSalary >= 100000) return 1700;
        else if (grossSalary >= 90000) return 1600;
        else if (grossSalary >= 80000) return 1500;
        else if (grossSalary >= 70000) return 1400;
        else if (grossSalary >= 60000) return 1300;
        else if (grossSalary >= 50000) return 1200;
        else return 500;
    }

    function calcNssf(grossSalary) {
        return grossSalary * 0.06;
    }

    function calcNhdf(grossSalary) {
        return grossSalary * 0.015;
    }

    function taxableIncome(grossSalary, nssf, nhdf, nhif) {
        return grossSalary - (nssf + nhdf + nhif);
    }

    function calcPayee(taxableIncome) {
        let personalRelief = 2400;
        let tax = 0;

        if (taxableIncome <= 24000) {
            tax = taxableIncome * 0.10;
        } else if (taxableIncome <= 32333) {
            tax = (24000 * 0.10) + ((taxableIncome - 24000) * 0.25);
        } else if (taxableIncome <= 500000) {
            tax = (24000 * 0.10) + (8333 * 0.25) + ((taxableIncome - 32333) * 0.30);
        } else if (taxableIncome <= 800000) {
            tax = (24000 * 0.10) + (8333 * 0.25) + (467667 * 0.30) + ((taxableIncome - 500000) * 0.325);
        } else {
            tax = (24000 * 0.10) + (8333 * 0.25) + (467667 * 0.30) + (300000 * 0.325) + ((taxableIncome - 800000) * 0.35);
        }

        return Math.max(tax - personalRelief, 0);
    }
    function net_Salary(grossSalary, nssf, nhdf, nhif,payee) {
        return grossSalary - (nssf + nhdf + nhif + payee);
    }

    // Input
    // let basicSalary = parseFloat(prompt("Enter basic salary:"));
    // let benefits = parseFloat(prompt("Enter benefits:"));

    // Calculations
    let gross = grossSalary(basic_salary, benefits);
    let nhif = calculate_Nhif(gross);
    let nssf = calcNssf(gross);
    let nhdf = calcNhdf(gross);
    let taxable = taxableIncome(gross, nssf, nhdf, nhif);
    let payee = calcPayee(taxable);
    let Salary=net_Salary(gross, nssf, nhdf, nhif,payee)

    // Output
    console.log(`Gross Salary: ${gross.toFixed(2)}`);
    console.log(`NHIF Deduction: ${nhif.toFixed(2)}`);
    console.log(`NSSF Deduction: ${nssf.toFixed(2)}`);
    console.log(`NHDF Deduction: ${nhdf.toFixed(2)}`);
    console.log(`Taxable Income: ${taxable.toFixed(2)}`);
    console.log(`PAYE: ${payee.toFixed(2)}`);
    console.log(`Salary: ${Salary.toFixed(2)}`);

    document.getElementById("gross").innerHTML = gross
    document.getElementById("nhif").innerHTML = nhif
     document.getElementById("nssf").innerHTML = nssf
    document.getElementById("nhdf").innerHTML = nhdf
    document.getElementById("taxable").innerHTML = taxable
    document.getElementById("payee").innerHTML = payee
    document.getElementById("Salary").innerHTML = Salary


})
