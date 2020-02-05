import React from 'react';

import TodoView from './screens/TodoView';

import {ViewModelContext} from './contexts';
import { todoViewModel } from './models';

function App() {
  return (
    <ViewModelContext.Provider value={{todoViewModel}}>
      <TodoView />
    </ViewModelContext.Provider>
  );
}

export default App;
