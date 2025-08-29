import { userService } from "../../services/user.service.js"
import { store, SET_USER, SET_USER_BALANCE } from "../store.js"

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

export function setUserBalance(balance) {
    const user = userService.getLoggedinUser()
    if (user) {
        const updatedUser = { ...user, balance }
        return userService.update(updatedUser)
            .then(savedUser => {
                store.dispatch({ type: SET_USER_BALANCE, balance })
                return savedUser
            })
    }
    return Promise.reject('No logged in user')
}