import {amountInCurrency, currencySymbol, truncate} from "./utils";

export default function TotalCashflowCard({totals, exchangeRates}) {
    const totalIncome = totals ? totals.sum_income : 0;
    const totalExpenses = totals ? totals.sum_expenses : 0;
    const totalBalance = totalIncome - totalExpenses;
    const diffClass = (totalBalance >= 0) ? 'income' : 'expense';
    const diffSign = (totalBalance >= 0) ? '+' : '-';

    const totalIncomeText = `+${currencySymbol()}${truncate(totalIncome)}`
    const totalExpensesText = `-${currencySymbol()}${truncate(totalExpenses)}`
    const totalBalanceText = `${diffSign}${currencySymbol()}${truncate(
        Math.abs(totalBalance))}`
    const totalIncomeTextUSD = `+${currencySymbol('USD')}${truncate(
        Math.abs(amountInCurrency(totalIncome, exchangeRates, 'UAH', 'USD'))
    )}`
    const totalExpensesTextUSD = `-${currencySymbol('USD')}${truncate(
        Math.abs(amountInCurrency(totalExpenses, exchangeRates, 'UAH', 'USD'))
    )}`
    const totalBalanceTextUSD = `${diffSign}${currencySymbol('USD')}${truncate(
        Math.abs(amountInCurrency(totalBalance, exchangeRates, 'UAH', 'USD'))
    )}`

    return (
        <div className="col-8 text-right contains_table">
            <table className="card-title h4-textsize margin-bottom-0">
                <tbody>
                    <tr>
                        <td><span className="income"> {totalIncomeText}</span> |</td>
                        <td><span className="expense"> {totalExpensesText}</span> |</td>
                        <td><span className={diffClass}> {totalBalanceText}</span></td>
                    </tr>
                    <tr>
                        <td><span className="income"> {totalIncomeTextUSD}</span> |</td>
                        <td><span className="expense"> {totalExpensesTextUSD}</span> |</td>
                        <td><span className={diffClass}> {totalBalanceTextUSD}</span></td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}