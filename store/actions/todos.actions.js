import { todoService } from "../../services/todo.service.js"
import { store, SET_TODOS, SET_LOADING, REMOVE_TODO, UPDATE_TODO, ADD_TODO, SET_FILTER_BY } from "../store.js"

export function loadTodos(filterBy) {
    store.dispatch({ type: SET_LOADING, isLoading: true })
    return todoService.query(filterBy)
        .then(todos => {
            store.dispatch({ type: SET_TODOS, todos })
            console.log(todos);
            
        })
        .finally(() => {
            store.dispatch({ type: SET_LOADING, isLoading: false })
        })
}

export function setFilterBy(filterBy) {
    store.dispatch({ type: SET_FILTER_BY, filterBy })
}

export function removeTodo(todoId) {
    return todoService.remove(todoId)
        .then(() => { store.dispatch({ type: REMOVE_TODO, todoId }) })
}

export function saveTodo(todo) {
    const type = todo._id ? UPDATE_TODO : ADD_TODO

    return todoService.save(todo)
        .then(savedTodo => store.dispatch({ type, todo: savedTodo }))
}