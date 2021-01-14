/* eslint-disable react/prop-types */
import { createContext, useReducer, useContext } from 'react';

const Context = createContext();
Context.displayName = 'Context';

function reducer(state, action) {
  switch (action.type) {
    case 'update-football-info':
      return { ...state, football: action.football };
    case 'update-twitter-info':
      return { ...state, twitter: action.twitter };
    case 'update-us-election-info':
      return { ...state, USElection: action.USElection };
    case 'update-line-graph':
      return { ...state, activeLineGraph: action.activeLineGraph };
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

function Provider({ children }) {
  const [state, dispatch] = useReducer(reducer, {
    twitter: null,
    USElection: { state: 'Alaska' },
    football: { team: 'France' },
    activeLineGraph: 'football',
  });
  const value = [state, dispatch];
  return <Context.Provider value={value}>{children}</Context.Provider>;
}

function useCustomContext() {
  const context = useContext(Context);
  if (context === undefined) {
    throw new Error(`useUser must be used within a Provider`);
  }

  return context;
}

export { Provider, useCustomContext };
