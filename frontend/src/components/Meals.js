import mealsStore from "../stores/mealsStore";
import React from 'react';
import CreateForm from './MealCreateForm';
import UpdateForm from "./MealUpdateForm";
import DateAccordion from "./MealsDateAccordion";
import Accordion from 'react-bootstrap/Accordion';

export default function Meals({log_id}) {
    const store = mealsStore();
    const set = new Set();
    const arr = [];

    function convertSet(set) {
        for(const item of set) {
            arr.push(item);
        }
    }

    return(
        <div className="central-items">
            <h2>Meals</h2>

            {store.meals && store.meals.map(meal => {
                if(meal.log && meal.log.localeCompare(log_id.id) === 0){
                    set.add(meal.date);
                }
            })}

            {convertSet(set)}

            <Accordion>
                {arr && arr.map(date => {
                    return <DateAccordion date={date} log_id={log_id} key={date}/>
                })}
            </Accordion>

            <CreateForm log_id={log_id} />
            <button onClick={() => store.toggleCreate()}>Create New Meal</button>
            <UpdateForm />
        </div>
    );
}
