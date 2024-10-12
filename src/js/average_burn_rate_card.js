import {currencySymbol, truncate} from "./utils";

export default function AverageBurnRateCard({averageRaw, averageAdjusted}) {

    return (
        <div className="col-sm-6 text-right contains_table">
            <table className="card-title h4-textsize margin-bottom-0">
                <tbody>
                    <tr>
                        <td><span>Average raw:</span></td>
                        <td><span className="burn-rate-raw">{currencySymbol()}{truncate(averageRaw)}</span></td>
                    </tr>
                    <tr>
                        <td><span>Average adjusted:</span></td>
                        <td><span className="burn-rate-adjusted">{currencySymbol()}{truncate(averageAdjusted)}</span></td>
                    </tr>
                </tbody>
            </table>
        </div>
)
}