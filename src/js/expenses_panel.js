import ExpensesSubcategoryPanel from "./expenses_subcategory_panel";
import ExpensesCategoryPanel from "./expenses_category_panel";

export default function ExpensesPanel({subcategoryAmounts, categoryAmounts}) {
    return (
        <div className="row">
            <ExpensesSubcategoryPanel subcategoryAmounts={subcategoryAmounts}/>
            <ExpensesCategoryPanel categoryAmounts={categoryAmounts}/>
        </div>
    )
}