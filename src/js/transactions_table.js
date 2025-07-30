import {truncate} from "./utils";

export default function TransactionsTable({transactions, year, month}) {
    let rows = [];
    transactions.forEach(transaction => rows.push(
        <TransactionsTableRow key={transaction.id} transaction={transaction} year={year} month={month}/>)
    )

    return (
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
    )
}

function TransactionsTableRow({transaction, year, month}) {
    let date = new Date(transaction.date * 1000);
    let date_query = `y=${date.getFullYear()}&m=${date.getMonth() + 1}&d=${date.getDate()}`;
    let acc_query = `y=${year}&m=${month}&account_id=${transaction.account.id}`;
    let cat_query = `y=${year}&m=${month}&category_id=${transaction.category.id}`;
    let parent_cat_query = `y=${year}&m=${month}&category_id=${transaction.category.parent_category_id ? transaction.category.parent_category_id : ''}`

    return (
        <tr>
            <td><span className="filterable" data-query={date_query}>{date.toDateString()}</span></td>
            <td><span className="filterable" data-query={acc_query}>
                {transaction.account ? transaction.account.name : ''}
            </span></td>
            <td>
                <span className="filterable" data-query={cat_query}>{transaction.category.name}</span>
                {transaction.category.parent_category ? <span> &#47; </span> : ''}
                {transaction.category.parent_category ? <span className="filterable" data-query={parent_cat_query}>
                    {transaction.category.parent_category.name}
                </span> : ''}
            </td>
            <td>{transaction.notes}</td>
            <td><b>{truncate(transaction.amount)}</b></td>
        </tr>
    )
}