const { createStore } = Redux

// Action types
export const SET_TODOS = 'SET_TODOS'
export const ADD_TODO = 'ADD_TODO'
export const UPDATE_TODO = 'UPDATE_TODO'
export const REMOVE_TODO = 'REMOVE_TODO'

export const SET_LOADING = 'SET_LOADING'
export const SET_FILTER_BY = 'SET_FILTER_BY'

export const SET_USER = 'SET_USER'
export const SET_USER_BALANCE = 'SET_USER_BALANCE'

const initialState = {
    todos: [],
    isLoading: false,
    filterBy: {
        txt: '',
        importance: '',
        status: 'all' // 'all' | 'active' | 'completed'
    },
    user: null
}

export function appReducer(state = initialState, cmd = {}) {
    switch (cmd.type) {
        case SET_TODOS:
            return { ...state, todos: cmd.todos }
        case ADD_TODO:
            return { ...state, todos: [...state.todos, cmd.todo] }
        case UPDATE_TODO:
            return {
                ...state,
                todos: state.todos.map(todo =>
                    todo._id === cmd.todo._id ? cmd.todo : todo
                )
            }
        case REMOVE_TODO:
            return {
                ...state,
                todos: state.todos.filter(todo => todo._id !== cmd.todoId)
            }
        case SET_LOADING:
            return { ...state, isLoading: cmd.isLoading }
        case SET_FILTER_BY:
            return { ...state, filterBy: { ...state.filterBy, ...cmd.filterBy } }
        case SET_USER:
            return { ...state, user: cmd.user }
        case SET_USER_BALANCE:
            return { ...state, user: { ...state.user, balance: cmd.balance } }

        default:
            return state
    }
}

export const store = createStore(appReducer)
window.gStore = store