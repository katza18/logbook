import { create } from 'zustand';
import axios from 'axios';

const logsStore = create((set) => ({
    logs: null,

    createForm: {
        title: "",
        body: "",
        type: "",
        _id: null
    },

    updateForm: {
        title: "",
        body: "",
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

    fetchLogs: async () => {
        const res = await axios.get("/logs");
        set({
            logs: res.data.logs
        });
    },

    createLog: async (e) => {
        const { createForm, logs } = logsStore.getState();
        e.preventDefault();
        const res = await axios.post("/logs", createForm);

        set({
            logs: [...logs, res.data.log],
            createForm: { title: "", body: "", type: ""},
            create: false
        });
    },

    deleteLog: async (_id) => {
        const { logs } = logsStore.getState();

        //Delete logbook
        await axios.delete(`/logs/${_id}`);

        const newLogs = logs.filter((log) => {
            return log._id !== _id;
        });

        set({
            logs: newLogs
        });
    },

    toggleUpdate: (log) => {
        set({
            updateForm: {
                title: log.title,
                body: log.body,
                _id: log._id
            }
        });
    },

    updateLog: async (e) => {
        e.preventDefault();
        const {updateForm: {title, body, _id}, logs} = logsStore.getState();
        const res = await axios.put(`/logs/${_id}`, {title, body});

        const newLogs = [...logs];
        const logIndex = logs.findIndex((log) => {
            return log._id === _id;
        });
        newLogs[logIndex] = res.data.log;

        set({
            logs: newLogs,
            updateForm: {
                title: "", body: "", _id: null
            }
        });
    },

    workoutsOrMeals: (type) => {
        if (type.localeCompare("Exercise") === 0)
            return "workouts";
        else
            return "meals";
    }
  }));

export default logsStore;
