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

    return (
        <Accordion.Item eventKey={date}>
            <Accordion.Header>
                {date.substring(0, 10)}
            </Accordion.Header>
            <Accordion.Body>
                {store.meals && store.meals.map(meal => {
                    if(meal.log && meal.date && meal.log.localeCompare(log_id.id) === 0 && meal.date.localeCompare(date) === 0){
                        return <Meal meal={meal} key={meal._id} />
                    }
                })}
            </Accordion.Body>
        </Accordion.Item>
    )
}
