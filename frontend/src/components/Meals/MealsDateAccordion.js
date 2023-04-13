import React, {useEffect} from 'react';
import Accordion from 'react-bootstrap/Accordion';
import mealsStore from '../../stores/mealsStore';
import Meal from './Meal';
import { ProgressBar } from 'react-bootstrap';
import accountStore from '../../stores/accountStore';

export default function DateAccordion({date, log_id}) {
    const store = mealsStore(store => {
        return {
            fetchMeals: store.fetchMeals,
            updateDateCaloriesMap: store.updateDateCaloriesMap
        }
    });
    const fetchUser = accountStore(state => state.fetchUser);
    const user = accountStore(state => state.user);
    const meals = mealsStore(state => state.meals);

    useEffect(() => {
        store.fetchMeals(log_id);
        fetchUser();
        store.updateDateCaloriesMap(date, calories);
        // eslint-disable-next-line
      }, []);

    let calories = 0, protein = 0, carbs = 0, fat = 0;

    return (
        <Accordion.Item eventKey={date} className="card">
            <Accordion.Header className="accordion-header">
                {meals && meals.forEach(meal => {
                    if (meal.date === date) {
                        calories += parseInt(meal.calories);
                        fat += parseInt(meal.fat);
                        carbs += parseInt(meal.carbs);
                        protein += parseInt(meal.protein);
                    }
                })}

                <div><h3>{date.substring(5,10)}</h3></div>
                <div className="daily-intake"><h5>{calories} Calories | {protein}g Protein | {carbs}g Carbs | {fat}g Fat </h5></div>
            </Accordion.Header>
            <Accordion.Body className="accordion-body">
                <ProgressBar now={calories / user.calories * 100} label={`Calories (${calories}/${user.calories})`} />
                <ProgressBar now={protein / user.protein * 100} label={`Protein (${protein}/${user.protein})`} />
                {/* eslint-disable-next-line */}
                {meals && meals.map(meal => {
                    if(meal.log && meal.date && meal.log.localeCompare(log_id.id) === 0 && meal.date.localeCompare(date) === 0){
                        return <Meal meal={meal} log_id={meal.log} key={meal._id} />
                    }
                })}
            </Accordion.Body>
        </Accordion.Item>
    )
}
