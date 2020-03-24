import { configureStore } from '@reduxjs/toolkit'

import taskSlice from "./modules/tasks/taskSlice";

const store  = configureStore({
  reducer : taskSlice,
});

export default  store;