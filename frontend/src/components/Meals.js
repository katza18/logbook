import mealsStore from "../stores/mealsStore";
import React from 'react';
import Meal from "./Meal";
import CreateForm from './MealCreateForm';
import UpdateForm from "./MealUpdateForm";

export default function Meals({log_id}) {
    const store = mealsStore();

    return(
        <div className="central-items">
            <h2>Meals</h2>
            {store.meals && store.meals.map(meal => {
                if(meal.log && meal.log.localeCompare(log_id.id) === 0){
                    return <Meal meal={meal} key={meal._id} />
                }
            })}
            <CreateForm log_id={log_id} />
            <button onClick={() => store.toggleCreate()}>Create New Meal</button>
            <UpdateForm />
        </div>
    );
}
