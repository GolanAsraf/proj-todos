import { todoService } from "../../services/todo.service.js"
import { store, SET_TODOS, SET_LOADING } from "../store.js"

export function loadTodos() {
    store.dispatch({ type: SET_LOADING, isLoading: true })
    return todoService.query()
        .then(todos => {
            store.dispatch({ type: SET_TODOS, todos })
        })
        .finally(() => {
            store.dispatch({ type: SET_LOADING, isLoading: false })
        })
}

