import {accountBalanceInDefaultCurrency, currencySymbol, decimalToRgbA, truncate} from "./utils";

export default function AccountsTable({ accounts, exchangeRates, accountCashflows }) {
    const rows = [];
    let total = 0;

    accounts.forEach(account => {
        if (!account.is_archived){


            account.inflow = accountCashflows[account.id] ? accountCashflows[account.id].inflow : 0;
            account.outflow = accountCashflows[account.id] ? accountCashflows[account.id].outflow : 0;
            rows.push(<AccountTableRow key={account.id} account={account} />)
            let balance = accountBalanceInDefaultCurrency(account, exchangeRates);
            total += balance;
        }
    });

    return (
        <div className="table-responsive">
            <table className="table tablesorter accounts-table">
                <thead className="text-primary">
                    <AccountTableHeader total={total} />
                </thead>
                <tbody>
                    { rows }
                </tbody>
            </table>
        </div>
    )
}

function AccountTableHeader({total}) {
    const classes = (total >= 0) ? 'text-right income' : 'text-right expense'
    return (
        <tr>
            <th>Total</th>
            <th className={classes}>{currencySymbol()}{truncate(total)}</th>
            <th className="text-right">Inflow</th>
            <th className="text-right">Outflow</th>
        </tr>
    )
}


function AccountTableRow({account}) {
    const prefix = currencySymbol(account.currency)
    const classes = (account.balance >= 0) ? 'text-right income' : 'text-right expense'
    return (
        <tr>
            <td className="text-primary font-weight-bold" style={{ color: decimalToRgbA(account.color, 1) }}
>{account.name}</td>
            <td className={classes}>{prefix}{truncate(account.balance)}</td>
            <td className="text-right">+{truncate(account.inflow)}</td>
            <td className="text-right">-{truncate(account.outflow)}</td>
        </tr>
    )
}