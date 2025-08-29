import { userService } from '../services/user.service.js'
import { setUserBalance } from '../store/actions/user.actions.js'

const INCREASE_AMOUNT = 10

export function TodoPreview({ todo, onToggleTodo }) {

    function onIncreaseBalance() {
        console.log('Increasing balance for completed todo');
        const user = userService.getLoggedinUser()
        if (user) {

            const newBalance = user.balance + INCREASE_AMOUNT

            console.log('New Balance:', newBalance);
            
            setUserBalance(newBalance)
        }
    }

    function handleTodoClick() {
        onToggleTodo()
        if (!todo.isDone) {
            onIncreaseBalance()
        }
    }

    return (
        <article className="todo-preview" style={{ color: todo.color }}>
            <h2 className={(todo.isDone)? 'done' : ''} onClick={handleTodoClick}>
                Todo: {todo.txt}
            </h2>
            <h4 style={{ color: todo.color }}>Todo Importance: {todo.importance}</h4>
            <img src={`../assets/img/${'todo'}.png`} alt="" />
        </article>
    )
}
