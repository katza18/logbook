import mealsStore from "../stores/mealsStore";
import React, {useEffect} from 'react';
import Card from 'react-bootstrap/Card';
import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';
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
      // eslint-disable-next-line
    }, []);

    return (
        <div key={meal._id}>
          <Accordion className="card">
            <Accordion.Item eventKey={meal._id}>
            <Accordion.Header>
              <h3>{meal.title}</h3>
              <span className="material-symbols-outlined delete" onClick={() => store.deleteMeal(meal._id)}>delete</span>
              <span className="material-symbols-outlined edit" onClick={() => store.toggleUpdate(meal)}>edit_square</span>
            </Accordion.Header>
            <Accordion.Body eventKey="0">
              <FoodsTable meal_id={meal._id} />
            </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </div>
      );
}
