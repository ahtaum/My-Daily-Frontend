import { createContext, useReducer } from 'react'

export const DailyContext = createContext()

export const dailyReducer = (state, action) => {
    switch (action.type) {
        case 'SET_DAILY':
          return { 
            daily: action.payload 
          }
        case 'GET_SINGLE_DAILY':
          return {
            daily: state.daily.filter(w => w._id === action.payload._id)
          }
        case 'CREATE_DAILY':
          return { 
            daily: [action.payload, ...state.daily] 
          }
        case 'DELETE_DAILY':
          return { 
            daily: state.daily.filter(w => w._id !== action.payload._id) 
          }
        default:
          return state
    }
}

export const DailyContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(dailyReducer, { 
        daily: null
    })
    
    return (
      <DailyContext.Provider value={{ ...state, dispatch }}>
        { children }
      </DailyContext.Provider>
    )
}