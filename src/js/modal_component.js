import React from 'react';
import TransactionsTable from "./transactions_table";

export default function Modal({ isOpen, onClose, title, transactions }) {
    if (!isOpen) return null;

    return (
        <div className="modal fade show" tabIndex="-1" role="dialog">
            <div className="modal-dialog" role="document">
                <div className="modal-content card">
                    <div className="card-header">
                        <h4 className="modal-title">{title}</h4>
                    </div>
                    <div className="card-body">
                        <TransactionsTable transactions={transactions} />
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