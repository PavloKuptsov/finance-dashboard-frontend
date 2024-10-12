import {accountBalanceInDefaultCurrency, currencySymbol, truncate} from "./utils";

export default function AccountsTable({ accounts, exchangeRates }) {
    const rows = [];
    let total = 0;

    accounts.forEach(account => {
        if (!account.is_archived){
            rows.push(<AccountTableRow key={account.id} account={account} />)
            let balance = accountBalanceInDefaultCurrency(account, exchangeRates);
            total += balance;
        }
    });

    return (
        <div className="table-responsive">
            <table className="table tablesorter">
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
        </tr>
    )
}


function AccountTableRow({account}) {
    const prefix = currencySymbol(account.currency)
    const classes = (account.balance >= 0) ? 'text-right income' : 'text-right expense'
    return (
        <tr>
            <td className="text-primary">{account.name}</td>
            <td className={classes}>{prefix}{truncate(account.balance)}</td>
        </tr>
    )
}