import AccountsTable from "./accounts_table";


export default function AccountsTablePanel({ accounts, exchangeRates, accountCashflows }) {

    let routineAccounts = accounts.filter((acc) => acc.type === 0);
    let savingsAccounts = accounts.filter((acc) => acc.type === 2);

    return (
        <div className="col-lg-6 col-md-12">
            <div className="card">
                <div className="card-header">
                    <h3 className="card-title">Accounts</h3>
                </div>
                <div className="card-body">
                    <AccountsTable accounts={routineAccounts} exchangeRates={exchangeRates} accountCashflows={accountCashflows} />
                    <AccountsTable accounts={savingsAccounts} exchangeRates={exchangeRates} accountCashflows={accountCashflows} />
                </div>
            </div>
        </div>
    )
}