import Table from 'react-bootstrap/Table';
import foodsStore from '../stores/foodsStore';
import Food from './Food';

export default function FoodsTable({meal_id}) {
    const store = foodsStore();
    let protein = 0, carbs = 0, fat = 0, calories = 0;

    return(
    <form form="update" onSubmit={store.updateFood}>
    <Table striped bordered hover variant="dark">
        <thead>
        <tr>
            <th>Serving</th>
            <th>Food</th>
            <th>Protein</th>
            <th>Carbs</th>
            <th>Fat</th>
            <th>Calories</th>
            <th>Notes</th>
            <th colSpan={2}>Actions</th>
        </tr>
        </thead>
        <tbody>
            {/* eslint-disable-next-line*/}
            {store.foods && store.foods.map(food => {
                try {
                    if (food.meal && food.meal.localeCompare(meal_id) === 0) {
                        if(food.protein) protein += parseInt(food.protein);
                        if(food.carbs) carbs += parseInt(food.carbs);
                        if(food.fat) fat += parseInt(food.fat);
                        if(food.calories) calories += parseInt(food.calories);
                        return <Food food={food} key={food._id} />;
                    }
                } catch(err) {
                    console.log(err);
                }
            })}
            <tr>
                <th></th>
                <th>Totals:</th>
                <th>{protein}</th>
                <th>{carbs}</th>
                <th>{fat}</th>
                <th>{calories}</th>
                <th></th>
                <th></th>
                <th></th>
            </tr>
        </tbody>
    </Table>
    <button onClick={(e) => store.createFood(e, meal_id)}>Add</button>
    {store.updateForm._id && <button type="submit">Update</button>}
    </form>
    );
}
