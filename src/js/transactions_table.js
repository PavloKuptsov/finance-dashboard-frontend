import {truncate} from "./utils";

export default function TransactionsTable({transactions, year, month, timeframe}) {
    let rows = [];
    transactions.forEach(transaction => rows.push(
        <TransactionsTableRow
            key={transaction.id}
            transaction={transaction}
            year={year}
            month={month}
            timeframe={timeframe}
        />)
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

function TransactionsTableRow({transaction, year, month, timeframe}) {
    let date = new Date(transaction.date * 1000);
    let date_query = `y=${date.getFullYear()}&m=${date.getMonth() + 1}&d=${date.getDate()}`;
    let acc_query = `account_id=${transaction.account.id}`;
    let cat_query = `category_id=${transaction.category.id}&y=${year}`;
    let parent_cat_query = `category_id=${transaction.category.parent_category_id ? transaction.category.parent_category_id : ''}&y=${year}`
    if (timeframe === 'month'){
        acc_query = acc_query + `&m=${month}`
        cat_query = cat_query + `&m=${month}`
        parent_cat_query = parent_cat_query + `&m=${month}`
    }

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