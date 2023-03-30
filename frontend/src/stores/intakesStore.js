import { create } from 'zustand';

const intakesStore = create((set) => ({
    dailyIntakes: null,

    intakeTemplate: {
        calories: "",
        protein: "",
        carbs: "",
        fat: "",
        date: null,
        log: ""
    },

    createDailyIntake: (log, date, e) => {
        e.preventDefault();

        //1. Set the empty intake temp up for the log/date provided
        set((state) => {
            return {
                intakeTemplate: {
                    ...state.intakeTemplate,
                    date: date,
                    log: log
                }
            };
        });

        //2. Retrieve the state of the template and dailyIntakes
        const { intakeTemplate, dailyIntakes } = intakesStore.getState();

        //3. Set dailyIntakes state to include the new intake
        set({
            dailyIntakes: [...dailyIntakes, intakeTemplate]
        });

        //4. Reset intake temp
        set((state) => {
            return {
                intakeTemplate: {
                    ...state.intakeTemplate,
                    date: null,
                    log: null
                }
            };
        });
    },

    updateDailyIntake: (calories, protein, fat, carbs, date, log) => {
        e.preventDefault();

        //1. Create an array of the intakes
        const newIntakes = [...dailyIntakes];

        //2. Setup the intakeTemplate
        set({
            intakeTemplate: {
                calories: calories,
                protein: protein,
                fat: fat,
                carbs: carbs,
                date: date,
                log: log
            }
        });

        //3. Get the intake
        const intake = intakesStore.getState().intakeTemplate;

        //4. Find the index of the element with the correct date
        const intakeIndex = dailyIntakes.findIndex((intake) => {
            return intake.date === date;
        });

        //5. Update the element
        newIntakes[intakeIndex] = intake;

        //6. Set dailyIntakes and reset the template
        set({
            dailyIntakes: newIntakes,
            intakeTemplate: {
                calories: "",
                protein: "",
                carbs: "",
                fat: "",
                date: null,
                log: null
            }
        });
    }
}));

/**
 * 1. Create dailyIntakes in DB
 * 2. DIs have calories, protein, carbs, fat, date, user, log
 * 3. Display these for summaries
 *
 * OR
 *
 * 1. Create dailyIntakes in mealsStore
 * 2. dailyIntakes holds DI objects with calories, pro, etc.
 * 3. use a function to create a daily intake for each date
 * 4. everytime foods is updated, update DI for that date
 * 5. everytime foods is deleted, update DI for that date
 */
