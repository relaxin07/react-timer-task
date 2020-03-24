import {createSlice} from "@reduxjs/toolkit";

const getTasks = JSON.parse(localStorage.getItem('tasks'));

const tasksSlice = createSlice({
    name: " tasks",
    initialState: {
      tasks: getTasks === null ? [] : getTasks,
      statusModal: false,
      taskItem: {},
    },
    reducers: {
      addItem: (state, action) => {
        state.tasks = state.tasks.filter((item) => {
          return item.statusTask !== 'progress'
        })
        state.tasks.push(action.payload);
      }
    }
  }
);
const {addItem} = tasksSlice.actions;

export {addItem};

/*const reducers = (state = initialState, action) => {
    let {tasks, statusModal, taskItem} = state;
    switch (action.type) {
        case "GENERATE_TASKS":
            localStorage.setItem('tasks', JSON.stringify(action.payload));
            tasks = action.payload;
            return {...state, tasks};

        case "GET_TASK" :
            const filterTask = tasks.filter((item) => {
                return item.taskName === action.payload;
            });

            taskItem = filterTask[0];

            return {...state, taskItem};


        case "DELETE_TASK":
            const itemName = action.payload;
            const ind = tasks.findIndex((item) => {
                return item.taskName === itemName;
            });

            tasks = [...tasks.slice(0, ind), ...tasks.slice(ind + 1)];
            localStorage.setItem('tasks', JSON.stringify(tasks));
            return {...state, tasks};

        case "ADD_TASK":
            let indProgressTask = tasks.findIndex(item => item.statusTask === 'progress');
            tasks = [...tasks.slice(0, indProgressTask), ...tasks.slice(indProgressTask + 1), action.payload];
            localStorage.setItem('tasks', JSON.stringify(tasks));
            return {...state, tasks};

        case "ADD_PROGRESS_TASK":

            tasks = [...tasks, action.payload];
            localStorage.setItem('tasks', JSON.stringify(tasks));
            return {...state, tasks};

        case "SHOW_MODAL":
            statusModal = !statusModal;
            return {...state, statusModal};

        default:
            return state;
    }

};*/

export default tasksSlice;