import {Line} from "react-chartjs-2";

export default function DailyBalancesPanel({dailyBalancesData}) {
    const labels = dailyBalancesData.labels;
    let datasets = [];

    if (dailyBalancesData.data) {
        datasets.push({
            label: 'Balances',
            data: dailyBalancesData.data,
        })
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
                    lineWidth: ({ tick }) => tick.value == 0 ? 3 : 1
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
                                <h2 className="card-title">Daily balances</h2>
                            </div>
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