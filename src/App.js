import React from 'react';

import TodoView from './screens/TodoView';

import {ViewModelContext} from './contexts';
import { TodoViewModel } from './models';

const todoViewModel = new TodoViewModel({ storage: window.localStorage });

function App() {
  return (
    <ViewModelContext.Provider value={{todoViewModel}}>
      <TodoView />
    </ViewModelContext.Provider>
  );
}

export default App;
