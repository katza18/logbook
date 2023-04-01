import axios from "axios";
import { create } from "zustand";

const accountStore = create((set) => ({
    units: "",

    updateForm: {
        bodyweight: "",
        sex: "",
        height: "",
        goal: "",
        unit: ""
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

    updateAccount: async (e) => {
        e.preventDefault();

        const {updateForm: {bodyweight, sex, height, goal, unit}} = accountStore.getState();
        let heightUnit, weightUnit;

        if (unit.localeCompare("metric") === 0) {
            heightUnit = "cm";
            weightUnit = "kg";
        } else {
            heightUnit = "in";
            weightUnit = "lb";
        }
        const unitBodyweight = bodyweight + weightUnit;
        const unitHeight = height + heightUnit;

        await axios.put('/account', {bodyweight: unitBodyweight, sex, height: unitHeight, goal});

        set({
            updateForm: {
                bodyweight: 0,
                height: 0,
                sex: "",
                goal: ""
            }
        });
    }
}));

export default accountStore;
