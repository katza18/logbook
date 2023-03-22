import mealsStore from "../stores/mealsStore";
import React, {useEffect} from 'react';
import Card from 'react-bootstrap/Card';
import Accordion from 'react-bootstrap/Accordion';
import FoodsTable from "./FoodsTable";
import foodsStore from "../stores/foodsStore";
import { useAccordionButton } from "react-bootstrap/AccordionButton";


export default function Meal({meal}) {
    const store = mealsStore(store => {
        return {
            deleteMeal: store.deleteMeal,
            toggleUpdate: store.toggleUpdate
        };
    });
    const store2 = foodsStore(store2 => {
      return {
        fetchFoods: store2.fetchFoods
      }
    });

    useEffect(() => {
      store2.fetchFoods(meal._id);
    }, []);

    function CustomToggle({ children, eventKey }) {
      const decoratedOnClick = useAccordionButton(eventKey);
      return (
        <button onClick={decoratedOnClick}> {children} </button>
      );
    }

    return (
        <div key={meal._id}>
          <Accordion>
          <Card className="card">
            <Card.Header>
              <h3>{meal.title}</h3>
              <p>{meal.date.substring(0, 10)}</p>
              <button onClick={() => store.deleteMeal(meal._id)}>Delete</button>
              <button onClick={() => store.toggleUpdate(meal)}>Update</button>
              <CustomToggle eventKey="0">View</CustomToggle>
            </Card.Header>
            <Accordion.Collapse eventKey="0">
              <Card.Body><FoodsTable meal_id={meal._id} /></Card.Body>
            </Accordion.Collapse>
          </Card>
          </Accordion>
        </div>
      );
}
