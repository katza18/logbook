import { create } from 'zustand';
import axios from 'axios';

const workoutsStore = create((set) => ({
    workouts: null,

    createForm: {
        title: "",
        body: "",
        date: "",
        log: null,
        _id: null
    },

    updateForm: {
        title: "",
        body: "",
        date: null,
        _id: null
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

    fetchWorkouts: async (_id) => {
        const res = await axios.get(`/logs/${_id.id}/workouts`);
        set({
            workouts: res.data.workouts
        });
    },

    createWorkout: async (e, log_id) => {
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

        const { createForm, workouts } = workoutsStore.getState();

        const res = await axios.post("/workouts", createForm);

        set({
            workouts: [...workouts, res.data.workout],
            createForm: { title: "", body: "", date: "", logbook: null, _id: null},
            create: false
        });
    },

    deleteWorkout: async (_id) => {
        const { workouts } = workoutsStore.getState();

        await axios.delete(`/workouts/${_id}`);

        const newWorkouts = workouts.filter((workout) => {
            return workout._id !== _id;
        });

        set({
            workouts: newWorkouts
        });
    },

    toggleUpdate: (workout) => {
        set({
            updateForm: {
                title: workout.title,
                body: workout.body,
                date: workout.date,
                _id: workout._id
            }
        });
    },

    updateWorkout: async (e) => {
        e.preventDefault();
        const {updateForm: {title, body, date, _id}, workouts} = workoutsStore.getState();
        const res = await axios.put(`/workouts/${_id}`, {title, body, date});

        const newWorkouts = [...workouts];
        const workoutIndex = workouts.findIndex((workout) => {
            return workout._id === _id;
        });
        newWorkouts[workoutIndex] = res.data.workout;

        set({
            workouts: newWorkouts,
            updateForm: {
                title: "", body: "", _id: null, date: null
            }
        });
    }
  }));

export default workoutsStore;
