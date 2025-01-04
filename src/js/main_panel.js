import PerfectScrollbar from 'react-perfect-scrollbar';
import CashflowPanel from "./cashflow_panel";
import BurnRatePanel from "./burn_rate_panel";
import ExpensesPanel from "./expenses_panel";
import TransactionsPanel from "./transactions_panel";
import SavingsPanel from "./savings_panel";

export default function MainPanel({totals, monthlies, burnRates, categoryAmounts, subcategoryAmounts, transactions,
                                      exchangeRates, savingsData}) {
    return (
        <PerfectScrollbar>
            <div className="main-panel">
                <div className="content">
                    <CashflowPanel monthlies={monthlies} totals={totals} exchangeRates={exchangeRates} />
                    <BurnRatePanel burnRates={burnRates} />
                    <SavingsPanel savingsData={savingsData} />
                    <ExpensesPanel categoryAmounts={categoryAmounts} subcategoryAmounts={subcategoryAmounts} />
                    <TransactionsPanel transactions={transactions} />
                </div>
            </div>
        </PerfectScrollbar>
    )
}