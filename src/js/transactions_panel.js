import TransactionsTable from "./transactions_table";

export default function TransactionsPanel({transactions, year, month, timeframe}) {
    return (
        <div className="row">
            <div className="col-12">
                <div className="card">
                    <div className="card-header">
                        <h2 className="card-title">Transactions</h2>
                    </div>
                    <div className="card-body">
                        <TransactionsTable
                            transactions={transactions}
                            year={year}
                            month={month}
                            timeframe={timeframe}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}