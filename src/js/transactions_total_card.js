import {currencySymbol, truncate} from "./utils";

export default function TransactionsTotalCard({total}) {

    return (
        <div className="col-sm-6 text-right">
            <h4 className="card-title h4-textsize margin-bottom-0">
                <span className="expense">{currencySymbol('UAH')}{truncate(total)}</span>
            </h4>
        </div>
    )
}