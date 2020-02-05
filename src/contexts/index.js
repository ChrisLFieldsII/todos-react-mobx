import React from 'react';

import {todoViewModel} from '../models';

const ViewModelContext = React.createContext({
  todoViewModel,
});

export { ViewModelContext }
