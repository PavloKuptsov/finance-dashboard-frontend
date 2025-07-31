import {useEffect, useState} from "react";
import Chart from 'chart.js/auto';
import {CategoryScale} from 'chart.js';
import {apiUrl, requestInit} from "./utils";
import PerfectScrollbar from "react-perfect-scrollbar";
import DatePicker from "./datepicker";
import CashflowPanel from "./cashflow_panel";
import BurnRatePanel from "./burn_rate_panel";
import DailyBalancesPanel from "./daily_balances_panel";
import SavingsPanel from "./savings_panel";
import ExpensesPanel from "./expenses_panel";
import TransactionsPanel from "./transactions_panel";
import AccountsTablePanel from "./accounts_table_panel";
import ExchangeRates from "./exchange_rates";
import Modal from './modal_component';
import { useTransactionModal } from './transaction_modal_hook';

Chart.register(CategoryScale);
Chart.defaults.color = 'rgba(255, 255, 255, 0.7)';
Chart.defaults.font.family = "'Montserrat', sans-serif";

function App() {
    const [timeframe, setTimeframe] = useState('month');
    const [year, setYear] = useState(new Date().getFullYear());
    const [month, setMonth] = useState(new Date().getMonth() + 1);
    const [accounts, setAccounts] = useState([]);
    const [exchangeRates, setExchangeRates] = useState(null);
    const [totals, setTotals] = useState(null);
    const [monthlies, setMonthlies] = useState({});
    const [burnRates, setBurnRates] = useState([]);
    const [subcategoryAmounts, setSubcategoryAmounts] = useState([]);
    const [categoryAmounts, setCategoryAmounts] = useState([]);
    const [transactions, setTransactions] = useState([]);
    const [savingsData, setSavingsData] = useState([]);
    const [dailyBalancesData, setDailyBalancesData] = useState([]);
    const [accountCashflows, setAccountCashflows] = useState([]);

    const {
        isModalOpen,
        transactions: modalTransactions,
        isLoading,
        modalTitle,
        handleCellClick,
        handleChartClick,
        handleCloseModal
    } = useTransactionModal();

    const handleFetch = (timeframe, year, month) => {
        let queryParams = `y=${year}`
        if (month && timeframe === 'month') {
            queryParams = queryParams + `&m=${month}`;
        }

        fetch(`${apiUrl}/accounts`, requestInit)
            .then(response => response.json())
            .then(inputData => { setAccounts(inputData); return inputData });

        fetch(`${apiUrl}/exchange_rates`, requestInit)
            .then(response => response.json())
            .then(inputData => { setExchangeRates(inputData); return inputData });

        fetch(`${apiUrl}/account_cashflows?${queryParams}`, requestInit)
            .then(response => response.json())
            .then(inputData => { setAccountCashflows(inputData); return inputData });

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

        fetch(`${apiUrl}/savings?${queryParams}`, requestInit)
            .then(response => response.json())
            .then(inputData => { setSavingsData(inputData); return inputData });

        fetch(`${apiUrl}/daily_balances?${queryParams}`, requestInit)
            .then(response => response.json())
            .then(inputData => { setDailyBalancesData(inputData); return inputData });

        setTimeframe(timeframe);
        setYear(year);
        setMonth(month);
    }

    useEffect(() => {
        handleFetch(timeframe, year, month); // eslint-disable-next-line
    }, []);

    return (
        <div className="wrapper" onClick={handleCellClick}>
            <PerfectScrollbar>
                <div className="main-panel">
                    <div className="content">
                        <div className="row header">
                            <DatePicker timeframe={timeframe} year={year} month={month} handleFetch={handleFetch}/>
                            <ExchangeRates exchangeRates={exchangeRates}/>
                        </div>
                        <div className="row">
                            <AccountsTablePanel accounts={accounts} exchangeRates={exchangeRates} accountCashflows={accountCashflows} />
                            <CashflowPanel monthlies={monthlies} totals={totals} exchangeRates={exchangeRates} />
                        </div>
                        <BurnRatePanel burnRates={burnRates} />
                        <DailyBalancesPanel dailyBalancesData={dailyBalancesData} />
                        <SavingsPanel savingsData={savingsData} />
                        <ExpensesPanel 
                            categoryAmounts={categoryAmounts} 
                            subcategoryAmounts={subcategoryAmounts}
                            onChartClick={handleChartClick}
                            year={year}
                            month={month}
                        />
                        <TransactionsPanel transactions={transactions} year={year} month={month}/>
                    </div>
                </div>
            </PerfectScrollbar>
            
            <Modal 
                isOpen={isModalOpen} 
                onClose={handleCloseModal}
                title={isLoading ? 'Loading...' : modalTitle}
                transactions={modalTransactions}
                year={year}
                month={month}
            />
        </div>
    );
}

export default App;