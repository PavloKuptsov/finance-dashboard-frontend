import Sidebar from "./sidebar";
import MainPanel from "./main_panel";
import {useEffect, useState} from "react";
import Chart from 'chart.js/auto';
import {CategoryScale} from 'chart.js';
import {apiUrl, requestInit} from "./utils";

Chart.register(CategoryScale);
Chart.defaults.color = 'rgba(255, 255, 255, 0.7)';
Chart.defaults.font.family = "'Montserrat', sans-serif";

function App() {
    const [timeframe, setTimeframe] = useState('year');
    const [year, setYear] = useState(new Date().getFullYear());
    const [month, setMonth] = useState(new Date().getMonth() + 1);
    const [exchangeRates, setExchangeRates] = useState(null);
    const [totals, setTotals] = useState(null);
    const [monthlies, setMonthlies] = useState({});
    const [burnRates, setBurnRates] = useState([]);
    const [subcategoryAmounts, setSubcategoryAmounts] = useState([]);
    const [categoryAmounts, setCategoryAmounts] = useState([]);
    const [transactions, setTransactions] = useState([]);


    const handleFetch = (timeframe, year, month) => {
        let queryParams = `y=${year}`
        if (month && timeframe === 'month') {
            queryParams = queryParams + `&m=${month}`;
        }

        fetch(`${apiUrl}/exchange_rates`, requestInit)
            .then(response => response.json())
            .then(inputData => { setExchangeRates(inputData); return inputData });

        fetch(`${apiUrl}/totals?${queryParams}`, requestInit)
            .then(response => response.json())
            .then(inputData => { setTotals(inputData); return inputData });

        fetch(`${apiUrl}/cashflow?${queryParams}`, requestInit)
            .then(response => response.json())
            .then(inputData => { setMonthlies(inputData); return inputData });

        fetch(`${apiUrl}/burn_rate?${queryParams}`, requestInit)
            .then(response => response.json())
            .then(inputData => { setBurnRates(inputData); return inputData });

        fetch(`${apiUrl}/subcategory_amounts?${queryParams}`, requestInit)
            .then(response => response.json())
            .then(inputData => { setSubcategoryAmounts(inputData); return inputData });

        fetch(`${apiUrl}/category_amounts?${queryParams}`, requestInit)
            .then(response => response.json())
            .then(inputData => { setCategoryAmounts(inputData); return inputData });

        fetch(`${apiUrl}/biggest_expenses?${queryParams}`, requestInit)
            .then(response => response.json())
            .then(inputData => { setTransactions(inputData); return inputData });

        setTimeframe(timeframe);
        setYear(year);
        setMonth(month);
    }


    useEffect(() => {
        handleFetch(timeframe, year, month); // eslint-disable-next-line
    }, []);

    return (
        <div className="wrapper">
            <Sidebar exchangeRates={exchangeRates} timeframe={timeframe} year={year} month={month}
                     handleFetch={handleFetch} />
            <MainPanel totals={totals} monthlies={monthlies} burnRates={burnRates} categoryAmounts={categoryAmounts}
                       subcategoryAmounts={subcategoryAmounts} transactions={transactions} exchangeRates={exchangeRates} />
        </div>
    );
}

export default App;
