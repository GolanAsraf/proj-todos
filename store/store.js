const { createStore } = Redux

export const INCREMENT = 'INCREMENT'

const initialState = {
    count: 109,
}

export function appReducer(state = initialState, cmd = {}) {
    switch (cmd.type) {
        case INCREMENT:
            return { ...state, count: state.count + 1 }

        default:
            return state
    }
}

export const store = createStore(appReducer)
window.gStore = store