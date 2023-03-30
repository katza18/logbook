import foodsStore from "../stores/foodsStore";
import mealsStore from "../stores/mealsStore";

export default function FoodUpdate({food}) {
    const store = foodsStore();
    const store2 = mealsStore();

    return(
        <tr key={food._id}>
            <td><input name="serving" value={store.updateForm.serving} onChange={store.updateUpdateFormField} /></td>
            <td><input name="name" value={store.updateForm.name} onChange={store.updateUpdateFormField} /></td>
            <td><input name="protein" value={store.updateForm.protein} onChange={store.updateUpdateFormField} /></td>
            <td><input name="carbs" value={store.updateForm.carbs} onChange={store.updateUpdateFormField} /></td>
            <td><input name="fat" value={store.updateForm.fat} onChange={store.updateUpdateFormField} /></td>
            <td><input name="calories" value={store.updateForm.calories} onChange={store.updateUpdateFormField} /></td>
            <td><input name="notes" value={store.updateForm.notes} onChange={store.updateUpdateFormField} /></td>
            <td className="delete"onClick={() => {store.deleteFood(food._id); store2.fetchMeals()}}><span className="material-symbols-outlined delete">delete</span></td>
            <td></td>
        </tr>
    );
}
