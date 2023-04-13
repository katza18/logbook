import mealsStore from "../../stores/mealsStore";
import React from 'react';
import CreateForm from './MealCreateForm';
import UpdateForm from "./MealUpdateForm";
import DateAccordion from "./MealsDateAccordion";
import Accordion from 'react-bootstrap/Accordion';
import MealsGraph from "./MealsGraph";
import accountStore from "../../stores/accountStore";

export default function Meals({log_id}) {

    const store = mealsStore(store => {
        return {
            toggleCreate: store.toggleCreate,
            fetchMeals: store.fetchMeals
        }
    });
    const meals = mealsStore((state) => state.meals);
    const dateCaloriesMap = mealsStore((state) => state.dateCaloriesMap);
    const set = new Set();
    const arr = [];
    const dates = Object.keys(dateCaloriesMap);
    const calories = Object.values(dateCaloriesMap);
    const recCal = accountStore((state) => state.user.calories);

    function convertSet(set) {
        for(const item of set) {
            arr.push(item);
        }
    }

    return(
        <div className="central-items">
            <h1>Meals</h1>
            <MealsGraph dates={dates} calories={calories} recCal={recCal}/>

            {/* create a unique list of dates */}
            {meals && meals.map(meal => {
                if(meal.log && meal.log.localeCompare(log_id.id) === 0)
                    set.add(meal.date);
            })}
            {/* Convert the set of dates to an array */}
            {convertSet(set)}

            <Accordion alwaysOpen className="central-items">
                {arr && arr.map(date => {
                    return <DateAccordion date={date} log_id={log_id} key={date}/>
                })}
            </Accordion>

            <CreateForm log_id={log_id} />
            <UpdateForm />
        </div>
    );
}
