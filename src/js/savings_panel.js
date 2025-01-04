import {Line} from "react-chartjs-2";
import SavingsChangeCard from "./savings_change_card";
import {decimalToRgbA} from "./utils";

export default function SavingsPanel({savingsData}) {
    const labels = savingsData.labels;
    const colors = savingsData.colors;
    const savingsChange = savingsData.change;
    let datasets = [];

    if (savingsData.data) {
        for (const [name, balances] of Object.entries(savingsData.data)) {
            datasets.push({
                label: name,
                data: balances,
                backgroundColor: decimalToRgbA(colors[name], 1),
                borderColor: decimalToRgbA(colors[name], 1)
            })
        }
    }

    const chartData = {
            labels: labels,
            datasets: datasets
        };
    const chartOptions = {
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false,
            }
        },
        scales: {
            x: {
                stacked: true,
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
    };

    return (
        <div className="row">
            <div className="col-12">
                <div className="card card-chart">
                    <div className="card-header">
                        <div className="row">
                            <div className="col-sm-6 text-left">
                                <h2 className="card-title">Savings</h2>
                            </div>
                            <SavingsChangeCard savingsChange={savingsChange}/>
                        </div>
                    </div>
                    <div className="card-body">
                        <div className="chart-area">
                            <Line data={chartData} options={chartOptions}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}