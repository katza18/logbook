import { create } from 'zustand';
import axios from 'axios';

const foodsStore = create((set) => ({
    foods: null,

    emptyFood: {
        serving: "",
        name: "",
        protein: "",
        carbs: "",
        fat: "",
        calories: "",
        notes: "",
        meal: null,
        log: null
    },

    updateForm: {
        serving: "",
        name: "",
        protein: "",
        carbs: "",
        fat: "",
        calories: "",
        notes: "",
        meal: null,
        log: null,
        _id: null
    },

    updateUpdateFormField: (e) => {
        const {name, value} = e.target;

        set(state => {
            return {
                updateForm: {
                    ...state.updateForm,
                    [name]: value
                }
            }
        });
    },

    fetchFoods: async (_id) => {
        const res = await axios.get(`/meals/${_id}/foods`);
        set({
            foods: res.data.foods
        });
    },

    createFood: async (e, mealId) => {
        //create an empty food that will be updated
        e.preventDefault();

        //get log id
        const meal = await axios.get(`/meals/${mealId}`);

        set((state) => {
            return {
                emptyFood: {
                    ...state.emptyFood,
                    meal: mealId,
                    log: meal.data.log
                }
            };
        });

        const { emptyFood, foods } = foodsStore.getState();

        const res = await axios.post("/foods", emptyFood);

        set({
            foods: [...foods, res.data.myFood]
        });
        set((state) => {
            return {
                emptyFood: {
                    ...state.emptyFood,
                    meal: null,
                    log: null
                }
            };
        });
    },

    deleteFood: async (_id) => {
        const { foods } = foodsStore.getState();

        await axios.delete(`/foods/${_id}`);

        const newFoods = foods.filter((food) => {
            return food._id !== _id;
        });

        set({
            foods: newFoods
        });
    },

    toggleUpdate: (food) => {
        set({
            updateForm: {
                serving: food.serving,
                name: food.name,
                protein: food.protein,
                carbs: food.carbs,
                fat: food.fat,
                calories: food.calories,
                notes: food.notes,
                _id: food._id,
                meal: food.meal,
                log: food.log
            }
        });
    },

    updateFood: async (e) => {
        e.preventDefault();
        const {updateForm: {serving, name, protein, carbs, fat, calories, notes, _id, meal, log}, foods} = foodsStore.getState();
        const res = await axios.put(`/foods/${_id}`, {serving, name, protein, carbs, fat, calories, notes, meal, log});

        const newFoods = [...foods];
        const foodIndex = foods.findIndex((food) => {
            return food._id === _id;
        });
        newFoods[foodIndex] = res.data.myFood;

        set({
            foods: newFoods,
            updateForm: {
                serving: "",
                name: "",
                protein: "",
                carbs: "",
                fat: "",
                calories: "",
                notes: "",
                _id: null,
                log: null,
                meal: null
            }
        });
    }
  }));

export default foodsStore;
