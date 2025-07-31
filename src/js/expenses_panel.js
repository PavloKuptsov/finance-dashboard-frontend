import ExpensesSubcategoryPanel from "./expenses_subcategory_panel";
import ExpensesCategoryPanel from "./expenses_category_panel";

export default function ExpensesPanel({subcategoryAmounts, categoryAmounts, onChartClick, year, month, timeframe}) {
    return (
        <div className="row">
            <ExpensesSubcategoryPanel 
                subcategoryAmounts={subcategoryAmounts}
                onChartClick={onChartClick}
                year={year}
                month={month}
                timeframe={timeframe}
            />
            <ExpensesCategoryPanel 
                categoryAmounts={categoryAmounts}
                onChartClick={onChartClick}
                year={year}
                month={month}
                timeframe={timeframe}
            />
        </div>
    )
}