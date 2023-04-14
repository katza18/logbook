import { create } from 'zustand';
import axios from 'axios';

const mealsStore = create((set) => ({
    meals: null,

    dateCaloriesMap: {},

    protein: [],

    createForm: {
        title: "",
        body: "",
        date: "",
        protein: "",
        carbs: "",
        fat: "",
        calories: "",
        log: null,
        _id: null
    },

    updateForm: {
        title: "",
        body: "",
        date: null,
        _id: null
    },

    macroForm: {
        protein: "",
        carbs: "",
        fat: "",
        protein: ""
    },

    updateCreateFormField: (e) => {
        const {name, value} = e.target;
        set((state) => {
            return {
                createForm: {
                    ...state.createForm,
                    [name]: value
                }
            };
        });
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

    fetchMeals: async (_id) => {
        const res = await axios.get(`/logs/${_id.id}/meals`);
        set({
            meals: res.data.meals
        });
    },

    createMeal: async (e, log_id) => {
        e.preventDefault();

        //add logbook to the createForm
        set(state => {
            return {
                createForm: {
                    ...state.createForm,
                    log: log_id.id
                }
            }
        });

        const { createForm, meals } = mealsStore.getState();

        const res = await axios.post("/meals", createForm);

        set({
            meals: [...meals, res.data.meal],
            createForm: { title: "", body: "", date: "", logbook: null, _id: null},
            create: false
        });
    },

    deleteMeal: async (_id) => {
        const { meals } = mealsStore.getState();

        await axios.delete(`/meals/${_id}`);

        const newMeals = meals.filter((meal) => {
            return meal._id !== _id;
        });

        set({
            meals: newMeals
        });
    },

    toggleUpdate: (meal) => {
        set({
            updateForm: {
                title: meal.title,
                body: meal.body,
                date: meal.date,
                _id: meal._id
            }
        });
    },

    updateMeal: async (e) => {
        e.preventDefault();
        const {updateForm: {title, body, date, _id}, meals} = mealsStore.getState();
        const res = await axios.put(`/meals/${_id}`, {title, body, date});

        const newMeals = [...meals];
        const mealIndex = meals.findIndex((meal) => {
            return meal._id === _id;
        });
        newMeals[mealIndex] = res.data.meal;

        set({
            meals: newMeals,
            updateForm: {
                title: "", body: "", _id: null, date: null
            }
        });
    },

    updateDateCaloriesMap: (date, calories) => {
        set(state => {
            return {
                dateCaloriesMap: {
                    ...state.dateCaloriesMap,
                    [date]: calories,
                }
            }
        });
    },

    updateProtein: (protein) => {
        set(state => {
            return {
                protein: [
                    ...state.protein,
                    protein
                ]
            }
        })
    }
  }));

export default mealsStore;
