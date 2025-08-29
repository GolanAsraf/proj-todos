const { Link, NavLink } = ReactRouterDOM
const { useNavigate } = ReactRouter
const { useSelector } = ReactRedux
const { useEffect } = React

import { UserMsg } from "./UserMsg.jsx"
import { LoginSignup } from './LoginSignup.jsx'
import { showErrorMsg } from '../services/event-bus.service.js'
import { logout, initializeUser } from '../store/actions/user.actions.js'

export function AppHeader() {
    const navigate = useNavigate()
    const user = useSelector(state => state.user)
    const todos = useSelector(state => state.todos)

    // Calculate progress percentage
    const completedTodos = todos.filter(todo => todo.isDone).length
    const totalTodos = todos.length
    const progressPercentage = totalTodos > 0 ? Math.round((completedTodos / totalTodos) * 100) : 0

    useEffect(() => {
        initializeUser()
    }, []);

    function onLogout() {
        logout()
            .then(() => {
                navigate('/')
            })
            .catch((err) => {
                showErrorMsg('OOPs try again')
            })
    }

    function onSetUser() {
        navigate('/')
    }
    return (
        <header className="app-header full main-layout">
            <section className="header-container">
                <h1>React Todo App</h1>

                {/* Todos Progress Bar */}
                {totalTodos > 0 && (
                    <section className="todos-progress">
                        <article className="progress-info">
                            <span>Progress: {completedTodos}/{totalTodos} ({progressPercentage}%)</span>
                        </article>
                        <article className="progress-bar">
                            <article
                                className={`progress-fill ${progressPercentage === 100 ? 'completed' : ''}`}
                                style={{ width: `${progressPercentage}%` }}
                            ></article>
                        </article>
                    </section>
                )}

                {user ? (
                    < section >
                        <Link to={`/user/${user._id}`}>Hello {user.fullname} [Balance: {user.balance}]</Link>
                        <button onClick={onLogout}>Logout</button>
                    </ section >
                ) : (
                    <section>
                        <LoginSignup onSetUser={onSetUser} />
                    </section>
                )}
                <nav className="app-nav">
                    <NavLink to="/" >Home</NavLink>
                    <NavLink to="/about" >About</NavLink>
                    <NavLink to="/todo" >Todos</NavLink>
                    <NavLink to="/dashboard" >Dashboard</NavLink>
                </nav>

            </section>
            <UserMsg />
        </header>
    )
}
