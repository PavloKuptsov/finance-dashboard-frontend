import {currencySymbol, truncate} from "./utils";

export default function SavingsChangeCard({savingsChange}) {
    const diffClass = (savingsChange >= 0) ? 'income' : 'expense';

    return (
        <div className="col-sm-6 text-right contains_table">
            <table className="card-title h4-textsize margin-bottom-0">
                <tbody>
                    <tr>
                        <td><span>Change:</span></td>
                        <td><span className={diffClass}>{currencySymbol('USD')}{truncate(savingsChange)}</span></td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}