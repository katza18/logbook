import { create } from 'zustand';
import axios from 'axios';

const exercisesStore = create((set) => ({
    exercises: null,

    updating: false,

    emptyExercise: {
        number: "",
        name: "",
        weight: "",
        sets: "",
        reps: "",
        intensity: "",
        muscle: "",
        notes: "",
        workout: null,
        log: null
    },

    updateForm: {
        name: "",
        weight: "",
        sets: "",
        reps: "",
        intensity: "",
        muscle: "",
        notes: "",
        _id: null,
        workout: null,
        log: null
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

    fetchExercises: async (_id) => {
        const res = await axios.get(`/workouts/${_id}/exercises`);
        set({
            exercises: res.data.exercises
        });
    },

    createExercise: async (e, workoutId) => {
        //create an empty exercise that will be updated
        e.preventDefault();

        //get log id
        const workout = await axios.get(`/workouts/${workoutId}`);

        set((state) => {
            return {
                emptyExercise: {
                    ...state.emptyExercise,
                    workout: workoutId,
                    log: workout.data.log
                }
            };
        });

        const { emptyExercise, exercises } = exercisesStore.getState();

        const res = await axios.post("/exercises", emptyExercise);

        set({
            exercises: [...exercises, res.data.myExercise]
        });
        set((state) => {
            return {
                emptyExercise: {
                    ...state.emptyExercise,
                    workout: null,
                    log: null
                }
            };
        });
    },

    deleteExercise: async (_id) => {
        const { exercises } = exercisesStore.getState();

        await axios.delete(`/exercises/${_id}`);

        const newExercises = exercises.filter((exercise) => {
            return exercise._id !== _id;
        });

        set({
            exercises: newExercises
        });
    },

    toggleUpdate: (exercise) => {
        set({
            updateForm: {
                name: exercise.name,
                weight: exercise.weight,
                sets: exercise.sets,
                reps: exercise.reps,
                intensity: exercise.intensity,
                muscle: exercise.muscle,
                notes: exercise.notes,
                _id: exercise._id,
                workout: exercise.workout,
                log: exercise.log
            },
            updating: true
        });
    },

    /*

    toggleCreate: (workout) => {
        set({
            create: true
        });
    },
    */

    updateExercise: async (e) => {
        e.preventDefault();
        const {updateForm: {name, weight, sets, reps, intensity, muscle, notes, _id, workout, log}, exercises} = exercisesStore.getState();
        const res = await axios.put(`/exercises/${_id}`, {name, weight, sets, reps, intensity, muscle, notes, workout, log});

        const newExercises = [...exercises];
        const exerciseIndex = exercises.findIndex((exercise) => {
            return exercise._id === _id;
        });
        newExercises[exerciseIndex] = res.data.myExercise;

        set({
            exercises: newExercises,
            updateForm: {
                name: "",
                weight: "",
                sets: "",
                reps: "",
                intensity: "",
                muscle: "",
                notes: "",
                _id: null,
                log: null,
                workout: null
            },
            updating: false
        });
    }
  }));

export default exercisesStore;
