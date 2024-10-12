import {truncate} from "./utils";

export default function TransactionsPanel({transactions}) {
    let rows = [];
    transactions.forEach(transaction => rows.push(
        <TransactionsTableRow key={transaction.id} transaction={transaction} />)
    )


    return (
        <div className="row">
            <div className="col-12">
                <div className="card">
                    <div className="card-header">
                        <h2 className="card-title">Transactions</h2>
                    </div>
                    <div className="card-body">
                        <div className="table-responsive">
                            <table className="table tablesorter" id="transactions-table">
                                <thead className="text-light">
                                <tr>
                                    <th>Date</th>
                                    <th>Account</th>
                                    <th>Category</th>
                                    <th>Notes</th>
                                    <th>Amount</th>
                                </tr>
                                </thead>
                                <tbody>
                                    { rows }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

function TransactionsTableRow({transaction}) {
    let date = new Date(transaction.date * 1000);

    return (
        <tr>
            <td><span className="filterable">{date.toDateString()}</span></td>
            <td><span className="filterable">{transaction.account ? transaction.account.name : ''}</span></td>
            <td>
                <span className="filterable">{transaction.category.name}</span>
                {transaction.category.parent_category ? <span> &#47; </span> : ''}
                {transaction.category.parent_category ? <span className="filterable">{transaction.category.parent_category.name}</span> : ''}
            </td>
            <td>{transaction.notes}</td>
            <td>{truncate(transaction.amount)}</td>
        </tr>
    )
}