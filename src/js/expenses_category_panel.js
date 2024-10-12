import {tooltipOptions, decimalToRgbA} from "./utils";
import {Doughnut} from "react-chartjs-2";

export default function ExpensesCategoryPanel({categoryAmounts}) {
    let labels = [];
    let amounts = [];
    let colors = [];
    let borderColors = [];
    for (const category_amt of categoryAmounts) {
        if (category_amt.amount >= 0){
            labels.push(category_amt.category.name);
            amounts.push(category_amt.amount);
            colors.push(decimalToRgbA(category_amt.category.color, 0.75));
            borderColors.push(decimalToRgbA(category_amt.category.color, 1));
        }
    }
    const chartData = {
        labels: labels,
        datasets: [
            {
                data: amounts,
                borderColor: borderColors,
                backgroundColor: colors,
                backgroundOpacity: 0.5
            }
        ]
    };
    const chartOptions = {
        maintainAspectRatio: true,
        responsive: true,
        tooltips: tooltipOptions,
        plugins: {
            legend: {
                position: 'bottom',
                fontColor: '#ffffff'
            },
        }
    };
    return (
        <div className="col-lg-6 col-md-12">
            <div className="card">
                <div className="card-header">
                    <h3 className="card-title">Expenses by category</h3>
                </div>
                <div className="card-body">
                    <div className="chart-area">
                        <Doughnut data={chartData} options={chartOptions}/>
                    </div>
                </div>
            </div>
        </div>
    )
}