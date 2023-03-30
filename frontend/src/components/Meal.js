import mealsStore from "../stores/mealsStore";
import React, {useEffect} from 'react';
import Accordion from 'react-bootstrap/Accordion';
import FoodsTable from "./FoodsTable";
import foodsStore from "../stores/foodsStore";


export default function Meal({meal, log_id}) {
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
          <Accordion.Body>
            <FoodsTable meal_id={meal._id} log_id={log_id}/>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>
  );
}
