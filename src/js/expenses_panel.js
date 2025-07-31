import ExpensesSubcategoryPanel from "./expenses_subcategory_panel";
import ExpensesCategoryPanel from "./expenses_category_panel";

export default function ExpensesPanel({subcategoryAmounts, categoryAmounts, onChartClick, year, month}) {
    return (
        <div className="row">
            <ExpensesSubcategoryPanel 
                subcategoryAmounts={subcategoryAmounts}
                onChartClick={onChartClick}
                year={year}
                month={month}
            />
            <ExpensesCategoryPanel 
                categoryAmounts={categoryAmounts}
                onChartClick={onChartClick}
                year={year}
                month={month}
            />
        </div>
    )
}