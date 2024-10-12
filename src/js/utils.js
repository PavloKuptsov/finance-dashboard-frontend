export const defaultCurrencyCode = 'UAH';
const currencySymbols = {'UAH': '₴', 'USD': '$', 'EUR': '€'};
export const apiUrl = 'http://localhost:8000';

export const tooltipOptions = {
    backgroundColor: '#f5f5f5',
    titleFontColor: '#333',
    bodyFontColor: '#666',
    bodySpacing: 4,
    xPadding: 12,
    mode: "nearest",
    intersect: 0,
    position: "nearest"
}

export const requestInit = {
    method: 'GET',
    mode: 'cors',
    headers: {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'}
}

export function truncate(number){
    return Number(number).toLocaleString('en', {minimumFractionDigits: 2, maximumFractionDigits: 2})
}

export function accountBalanceInCurrency(account, exchangeRates, convertTo) {
    if (!exchangeRates || !Object.keys(exchangeRates).length) {
        return 0
    }

    const rate = exchangeRates[account.currency.name_short][convertTo];
    return account.balance * rate;
}

export function accountBalanceInDefaultCurrency(account, exchangeRates) {
    return accountBalanceInCurrency(account, exchangeRates, defaultCurrencyCode)
}

export function amountInCurrency(amount, exchangeRates, fromCurr, convertTo) {
    if (!exchangeRates || !Object.keys(exchangeRates).length) {
        return 0
    }

    const rate = exchangeRates[fromCurr][convertTo]
    return amount * rate
}

export function currencySymbol(code=defaultCurrencyCode) {
    return currencySymbols[code]
}

export function hexToRgbA(hex, opacity){
    let c;
    if(/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)){
        c = hex.substring(1).split('');
        if(c.length === 3){
            c = [c[0], c[0], c[1], c[1], c[2], c[2]];
        }
        c = '0x'+c.join('');
        return 'rgba('+[(c>>16)&255, (c>>8)&255, c&255].join(',')+','+opacity+')';
    }
    throw new Error('Bad Hex');
}

export function decimalToRgbA(decimal, opacity) {
    let hexString = '#' + decimal.toString(16);
    return hexToRgbA(hexString, opacity);
}

export function getMonthName(month_num){
    let names_short = {1: 'Jan', 2: 'Feb', 3: 'Mar', 4: 'Apr', 5: 'May', 6: 'Jun', 7: 'Jul', 8: 'Aug', 9: 'Sep',
        10: 'Oct', 11: 'Nov', 12: 'Dec'}
    return names_short[month_num]
}