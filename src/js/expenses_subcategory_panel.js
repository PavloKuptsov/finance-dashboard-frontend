import {tooltipOptions, decimalToRgbA} from "./utils";
import {Bar} from "react-chartjs-2";

export default function ExpensesSubcategoryPanel({subcategoryAmounts}) {
    let labels = [];
    let amounts = [];
    let colors = [];
    let borderColors = [];
    for (const subcategory_amt of subcategoryAmounts) {
        if (subcategory_amt.amount >= 0) {
            labels.push(subcategory_amt.category.name);
            amounts.push(subcategory_amt.amount);
            colors.push(decimalToRgbA(subcategory_amt.category.color, 0.75));
            borderColors.push(decimalToRgbA(subcategory_amt.category.color, 1));
        }
    }

    const chartData = {
        labels: labels,
        datasets: [
            {
                data: amounts,
                borderColor: borderColors,
                backgroundColor: colors,
                backgroundOpacity: 0.5,
                minBarLength: 5
            }
        ]
    };
    const chartOptions = {
        indexAxis: 'y',
        aspectRatio: 1,
        responsive: true,
        tooltips: tooltipOptions,
        plugins: {
            legend: {
                display: false
            },
        },
        scales: {
            x: {
                grid: {
                    color: 'rgba(255, 255, 255, 0.1)'
                }
            },
            y: {
                ticks: {
                    stepSize: 1,
                    autoSkip: false
                },
                grid: {
                    color: 'rgba(255, 255, 255, 0)'
                }
            }
        }
    };

    return (
        <div className="col-lg-6 col-md-12">
            <div className="card">
                <div className="card-header">
                    <h3 className="card-title">Expenses by subcategory</h3>
                </div>
                <div className="card-body">
                    <div className="chart-area">
                        <Bar data={chartData} options={chartOptions}/>
                    </div>
                </div>
            </div>
        </div>
    )
}