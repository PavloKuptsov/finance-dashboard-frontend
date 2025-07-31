import TransactionsTable from "./transactions_table";
import TransactionsTotalCard from "./transactions_total_card";

export default function Modal({ isOpen, onClose, title, transactions, year, month }) {
    if (!isOpen) return null;
    let total = transactions.reduce((partialSum, a) => partialSum + a.amount, 0);

    return (
        <div className="modal fade show" tabIndex="-1" role="dialog">
            <div className="modal-dialog" role="document">
                <div className="modal-content card">
                    <div className="card-header">
                        <div className="row">
                            <div className="col-sm-6">
                                <h4 className="modal-title">{title}</h4>
                            </div>
                            <TransactionsTotalCard total={total}/>
                        </div>
                    </div>
                    <div className="card-body">
                        <TransactionsTable transactions={transactions} year={year} month={month}/>
                    </div>
                </div>
            </div>
            <div 
                className="modal-backdrop fade show" 
                onClick={onClose}
            ></div>
        </div>
    );
}