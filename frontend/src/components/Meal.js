import mealsStore from "../stores/mealsStore";
import React from 'react';
import { useNavigate } from "react-router-dom";

export default function Meal({meal}) {
    const store = mealsStore(store => {
        return {
            deleteMeal: store.deleteMeal,
            toggleUpdate: store.toggleUpdate
        };
    });

    const navigate = useNavigate();

    return (
        <div key={meal._id}>
          <h3>{meal.title}</h3>
          <h4>{meal.date.substring(0, 10)}</h4>
          <button onClick={() => store.deleteMeal(meal._id)}>Delete</button>
          <button onClick={() => store.toggleUpdate(meal)}>Update</button>
          <button onClick={() => navigate(`/meals/${meal._id}/foods`)}>View</button>
        </div>
      );
}
