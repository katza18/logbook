import axios from "axios";
import { create } from "zustand";

const accountStore = create((set) => ({
    units: "",

    user: {
        calories: 0,
        protein: 150,
    },

    updateForm: {
        bodyweight: "",
        sex: "",
        height: "",
        goal: "",
        unit: "",
        activity: "",
        age: "",
        overrideCal: "",
        overridePro: ""
    },

    updated: false,

    setUpdated: (updated) => {
        set({
            updated
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

    imperial: () => set({units: "imperial"}),

    metric: () => set({units: "metric"}),

    fetchUser: async () => {
        const res = await axios.get("/user");
        set({
            user: res.data.user
        })
    },

    updateAccount: async (e) => {
        e.preventDefault();

        const {updateForm: {bodyweight, sex, height, goal, unit, age, activity}} = accountStore.getState();
        let metricWeight, metricHeight, calories, tdee, protein;

        //Convert imperial units to metric
        if (unit.localeCompare("imperial") === 0) {
            metricWeight = parseInt(bodyweight) / 2.2;
            metricHeight = parseInt(height) * 2.54;
        } else {
            metricWeight = parseInt(bodyweight);
            metricHeight = parseInt(height);
        }

        //Calculate TDEE (total daily energy expenditure)
        if (sex.localeCompare("Male") === 0) {
            //male equation
            tdee = ((10 * metricWeight) + (6.25 * metricHeight) - (5 * age) + 5) * activity;
        } else {
            //female equation
            tdee = ((10 * metricWeight) + (6.25 * metricHeight) - (5 * age) - 161) * activity;
        }

        //Calculate recommended calories/protein
        if(goal.localeCompare("Weight Gain") === 0) {
            //gain - 15% surplus
            calories = tdee * 1.15;
            protein = metricWeight * 2.2 * 0.8;
        } else if (goal.localeCompare("Weight Loss") === 0) {
            //lose - 15% deficit
            calories = tdee * 0.85;
            protein = metricWeight * 2.2;
        } else {
            //maintain - stays the same
            calories = tdee;
            protein = metricWeight * 2.2 * 0.8;
        }

        //Update Database
        await axios.put('/account', {bodyweight: metricWeight, sex, height: metricHeight, goal, age, activity, calories: Math.trunc(calories), protein: Math.trunc(protein)});

        set(state => {
            return {
            updateForm: {
                ...state.updateForm,
                bodyweight: "",
                height: "",
                sex: "",
                goal: "",
                activity: "",
                age: ""
            }
        }
        });
    },

    updateCalories: async (e) => {
        e.preventDefault();
        const {updateForm: {overrideCal}} = accountStore.getState();
        await axios.put('/account', {calories: overrideCal});

        set(state => {
            return {
                updateForm: {
                    ...state.updateForm,
                    overrideCal: ""
                }
        }});
    },

    updateProtein: async (e) => {
        e.preventDefault();
        const {updateForm: {overridePro}} = accountStore.getState();
        await axios.put('/account', {protein: overridePro});

        set(state => {
            return {
                updateForm: {
                    ...state.updateForm,
                    overridePro: ""
                }
        }});
    }

}));

export default accountStore;
