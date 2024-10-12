import ExchangeRates from "./exchange_rates";
import DatePicker from "./datepicker";
import AccountsTable from "./accounts_table";
import {apiUrl, requestInit} from "./utils";
import {useEffect, useState} from "react";

export default function Sidebar({ exchangeRates,  timeframe, year, month, handleFetch}) {
    const [routineAccounts, setRoutineAccounts] = useState([]);
    const [savingsAccounts, setSavingsAccounts] = useState([]);

    useEffect(() => {
        let accounts = [];
        fetch(`${apiUrl}/accounts`, requestInit)
                .then(response => response.json())
                .then(inputData => { accounts = inputData; })
                .then(() => {
                    setRoutineAccounts(accounts.filter((acc) => acc.type === 0));
                    setSavingsAccounts(accounts.filter((acc) => acc.type === 2));
                })
    }, [])

    return (
        <div className="sidebar">
            <div className="sidebar-wrapper">
                <ExchangeRates exchangeRates={exchangeRates}/>
                <AccountsTable accounts={routineAccounts} exchangeRates={exchangeRates}/>
                <AccountsTable accounts={savingsAccounts} exchangeRates={exchangeRates}/>
                <DatePicker  timeframe={timeframe} year={year} month={month} handleFetch={handleFetch}/>
            </div>
        </div>
    )
}