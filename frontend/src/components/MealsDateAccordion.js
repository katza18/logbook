import React from 'react';
import Accordion from 'react-bootstrap/Accordion';
import mealsStore from '../stores/mealsStore';
import Meal from './Meal';

export default function DateAccordion({date, log_id}) {
    const store = mealsStore(store => {
        return {
            meals : store.meals
        }
    });

    let calories = 0, protein = 0, carbs = 0, fat = 0;

    return (
        <Accordion.Item eventKey={date} className="card">
            <Accordion.Header>
                {date.substring(0, 10)}: Calories: {calories} | Protein: {protein} | Carbs: {carbs} | Fat: {fat}
            </Accordion.Header>
            <Accordion.Body>
                {store.meals && store.meals.map(meal => {
                    if(meal.log && meal.date && meal.log.localeCompare(log_id.id) === 0 && meal.date.localeCompare(date) === 0){
                        {/*
                        calories += meal.calories;
                        protein += meal.protein;
                        carbs += meal.carbs;
                        fat += meal.fats;
                        */}
                        return <Meal meal={meal} key={meal._id} />
                    }
                })}
            </Accordion.Body>
        </Accordion.Item>
    )
}
