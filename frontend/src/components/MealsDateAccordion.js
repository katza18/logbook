import React from 'react';
import Accordion from 'react-bootstrap/Accordion';
import mealsStore from '../stores/mealsStore';
import Meal from './Meal';

export default function DateAccordion({date, log_id}) {
    const store = mealsStore(store => {
        return {
            meals: store.meals
        }
    });

    let calories = 0, protein = 0, carbs = 0, fat = 0;

    return (
        <Accordion.Item eventKey={date} className="card">
            <Accordion.Header>
                {store.meals && store.meals.forEach(meal => {
                    if (meal.date === date) {
                        calories += parseInt(meal.calories);
                        fat += parseInt(meal.fat);
                        carbs += parseInt(meal.carbs);
                        protein += parseInt(meal.protein);
                    }
                })}
                {date.substring(5,10)}: Calories - {calories} | Protein - {protein} | Carbs - {carbs} | fat - {fat} |
            </Accordion.Header>
            <Accordion.Body>
                {/* eslint-disable-next-line */}
                {store.meals && store.meals.map(meal => {
                    if(meal.log && meal.date && meal.log.localeCompare(log_id.id) === 0 && meal.date.localeCompare(date) === 0){
                        return <Meal meal={meal} log_id={meal.log} key={meal._id} />
                    }
                })}
            </Accordion.Body>
        </Accordion.Item>
    )
}
