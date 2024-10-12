import TotalCashflowCard from "./total_cashflow_card";
import {Bar} from "react-chartjs-2";

export default function CashflowPanel({monthlies, totals, exchangeRates}) {
    const labels = Object.keys(monthlies);
    const incomes = Object.values(monthlies).map(item => item.income);
    const expenses = Object.values(monthlies).map(item => item.expense);
    const chartData = {
        labels: labels,
        datasets: [
            {
                label: 'Income',
                data: incomes,
                backgroundColor: 'rgb(72,235,54, 0.5)',
                borderColor: 'rgb(72,235,54, 1)',
                borderWidth: 1,
            },
            {
                label: 'Expense',
                data: expenses,
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1,
            }
        ]
    };
    const chartOptions = {
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false
            }
        },
        scales: {
            x: {
                stacked: false,
                alignToPixels: true,
                grid: {
                    color: 'rgba(255,255,255,0.1)',
                },
            },
            y: {
                stacked: false,
                alignToPixels: true,
                ticks: {
                    beginAtZero: true,
                },
                grid: {
                    color: 'rgba(255,255,255,0.1)',
                },
            },
        }
    }

    return (
        <div className="row">
            <div className="col-12">
                <div className="card card-chart">
                    <div className="card-header">
                        <div className="row">
                            <div className="col-sm-6 text-left">
                                <h2 className="card-title">Cashflow</h2>
                            </div>
                            <TotalCashflowCard totals={totals} exchangeRates={exchangeRates}/>
                        </div>
                    </div>
                    <div className="card-body">
                        <div className="chart-area">
                            <Bar data={chartData} options={chartOptions}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}