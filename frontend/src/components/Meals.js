import mealsStore from "../stores/mealsStore";
import React, { useEffect } from 'react';
import CreateForm from './MealCreateForm';
import UpdateForm from "./MealUpdateForm";
import DateAccordion from "./MealsDateAccordion";
import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';

export default function Meals({log_id}) {
    const store = mealsStore(store => {
        return {
            meals: store.meals,
            toggleCreate: store.toggleCreate,
            fetchMeals: store.fetchMeals
        }
    });
    const set = new Set();
    const arr = [];

    function convertSet(set) {
        for(const item of set) {
            arr.push(item);
        }
    }
    useEffect(() => {
        store.fetchMeals(log_id);
    }, [])

    return(
        <div className="central-items">
            <h1>Meals</h1>

            {/* create a unique list of dates */}
            {store.meals && store.meals.map(meal => {
                if(meal.log && meal.log.localeCompare(log_id.id) === 0)
                    set.add(meal.date);
            })}
            {/* Convert the set of dates to an array */}
            {convertSet(set)}

            <Accordion alwaysOpen>
                {arr && arr.map(date => {
                    return <DateAccordion date={date} log_id={log_id} key={date}/>
                })}
            </Accordion>

            <Button className="create-button" onClick={() => store.toggleCreate()}>Create New Meal</Button>
            <CreateForm log_id={log_id} />
            <UpdateForm />
        </div>
    );
}
