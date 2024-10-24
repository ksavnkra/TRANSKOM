const API_KEY = "ce9c8c2d11cd2e814fe0c957";
const API_BASE_URL = 'https://api.exchangerate-api.com/v4/latest/';
const TRANSACTION_FEE = 0.015; // 1.5%
let currentMode = 'buy';
let rateData = null;
async function fetchExchangeRate(baseCurrency) {
    try {
        const response = await fetch(`${API_BASE_URL}${baseCurrency}`);
        if (!response.ok) throw new Error('Failed to fetch exchange rates');
        return await response.json();
    } catch (error) {
        console.error('Error fetching exchange rates:', error);
        document.getElementById('exchangeRate').innerHTML = 'Error fetching exchange rates. Please try again later.';
        return null;
    }
}
async function updateConversion() {
    const loadingIndicator = document.getElementById('loadingIndicator');
    loadingIndicator.style.display = 'inline';
    const payAmount = parseFloat(document.getElementById('payAmount').value) || 0;
    const payCurrency = document.getElementById('payCurrency').value;
    const receiveCurrency = document.getElementById('receiveCurrency').value;
    if (payCurrency && receiveCurrency) {
        rateData = await fetchExchangeRate(payCurrency);
        if (rateData) {
            const rate = rateData.rates[receiveCurrency];
            const convertedAmount = payAmount * rate;
            const amountAfterFee = convertedAmount * (1 - TRANSACTION_FEE);
            document.getElementById('receiveAmount').value = amountAfterFee.toFixed(2);
            document.getElementById('exchangeRate').innerHTML =
                `1 ${payCurrency} = ${rate.toFixed(4)} ${receiveCurrency}`;
            const feeAmount = convertedAmount * TRANSACTION_FEE;
            document.getElementById('feeInfo').innerHTML =
                `Transkom's Transaction Fee: 1.5% (${receiveCurrency} ${feeAmount.toFixed(2)})`;
        }
    }
    loadingIndicator.style.display = 'none';
}
function setActiveTab(tab, mode) {
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    currentMode = mode;
    document.getElementById('exchangeForm').reset();
    document.getElementById('exchangeRate').innerHTML = 'Select currencies to see exchange rate';
    document.getElementById('feeInfo').innerHTML = 'Transkom\'s Transaction Fee: 1.5%';
}

function handleSubmit(event) {
    event.preventDefault();
    const payAmount = document.getElementById('payAmount').value;
    const payCurrency = document.getElementById('payCurrency').value;
    const receiveCurrency = document.getElementById('receiveCurrency').value;
    const receiveAmount = document.getElementById('receiveAmount').value;
    alert(`Transaction Summary:\n\nMode: ${currentMode}\nAmount: ${payAmount} ${payCurrency}\nTo: ${receiveAmount} ${receiveCurrency}\nIncludes 1.5% Transkom fee`);
}
document.addEventListener('DOMContentLoaded', updateConversion);