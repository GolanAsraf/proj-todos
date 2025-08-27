import { userService } from "../../services/user.service.js"
import { store, SET_USER } from "../store.js"

export function login(user) {
    return userService.login(user)
        .then(user => {
            store.dispatch({ type: SET_USER, user })
        })
}

export function signup(user) {
    return userService.signup(user)
        .then(user => {
            store.dispatch({ type: SET_USER, user })
        })
}

export function logout() {
    return userService.logout()
        .then(() => {
            store.dispatch({ type: SET_USER, user: null })
        })
}