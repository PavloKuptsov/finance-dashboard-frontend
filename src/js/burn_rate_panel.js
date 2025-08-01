import {Bar} from "react-chartjs-2";
import AverageBurnRateCard from "./average_burn_rate_card";
import {formatDate, formatDateWithoutDay} from "./utils";

export default function BurnRatePanel({burnRates, onChartClick, year, month, timeframe}) {
    const labels = Object.keys(burnRates);
    const raw = Object.values(burnRates).map(item => item.raw_total ? item.raw_total / item.days : null);
    const adjusted = Object.values(burnRates).map(item => item.adjusted_total ? item.adjusted_total / item.days : null);
    const averageRaw = raw.length ? raw.reduce((partialSum, a) => partialSum + a, 0) / raw.length : 0;
    const averageAdjusted = adjusted.length ? adjusted.reduce(
        (partialSum, a) => partialSum + a, 0) / adjusted.length : 0;

    const handleBarClick = (event, elements) => {
        if (elements.length > 0 && onChartClick) {
            const clickedElement = elements[0];
            const clickedIndex = clickedElement.index;
            const datasetIndex = clickedElement.datasetIndex;

            let queryParams = `y=${year}&m=${month}`;
            if (timeframe === 'month') {
                queryParams += `&d=${clickedIndex + 1}`;
            }
            if (datasetIndex === 0) {
                queryParams += `&threshold=4000`;
            }

            let title = '';
            if (timeframe === 'month') {
                const title_date = new Date(year, month - 1, clickedIndex + 1);
                title = formatDate(title_date);
            } else {
                const title_date = new Date(year, clickedIndex, 1);
                title = formatDateWithoutDay(title_date);
            }

            onChartClick(queryParams, title);
        }
    };

    const chartData = {
            labels: labels,
            datasets: [
                {
                    label: 'Adjusted',
                    data: adjusted,
                    backgroundColor: 'rgba(255, 99, 132, 0.5)',
                    borderColor: 'rgba(255, 99, 132, 1)',
                    borderWidth: 1,
                    minBarLength: 5
                },
                {
                    label: 'Raw',
                    data: raw,
                    backgroundColor: 'rgba(54, 162, 235, 0.5)',
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 1,
                    minBarLength: 5
                }
            ]
        };

    const chartOptions = {
        maintainAspectRatio: false,
        onClick: handleBarClick,
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
        },
        onHover: (event, activeElements) => {
            event.native.target.style.cursor = activeElements.length > 0 ? 'pointer' : 'default';
        }
    };

    return (
        <div className="row">
            <div className="col-12">
                <div className="card card-chart">
                    <div className="card-header">
                        <div className="row">
                            <div className="col-sm-6 text-left">
                                <h2 className="card-title">Burn rate</h2>
                            </div>
                            <AverageBurnRateCard averageRaw={averageRaw} averageAdjusted={averageAdjusted}/>
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