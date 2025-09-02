import { useEffect, useState } from "react"
import axios from "axios"
import { Link } from "react-router-dom"
import { Table } from "react-bootstrap"
function GetDeleteComponent() {    
    const [todos, setTodos] = useState([])      
        const getAllTodos = async () => {
        try {
            const response = await axios.get('/api/todo')
            setTodos(response.data)
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        getAllTodos()
    }, [])

    const toggleComplete = async (id, status) => {
        try {
            await axios.patch(`/api/todo/${id}`, { completed: status });
            getAllTodos();
        } catch (error) {
            console.error('Error toggling complete status:', error);
        }
    };

    const deleteTodo = async (id) => {
        try {
            await axios.delete(`/api/todo/${id}`)
            getAllTodos()
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div className="container">
            <h2 className="text-center">List Todos </h2>
            <Link to="/add"> <button className="btn btn-outline-success"> Add Todo</button></Link>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th> Task </th>                        
                        <th className="text-center"> Actions </th>
                    </tr>
                </thead>
                <tbody>
                    {todos.map(todo => (
                        <tr key={todo._id}>
                            <td style={{ textDecorationLine: todo.completed ? 'line-through' : '', color: todo.completed ? 'red' : 'black' }}>
                                <input
                                    type="checkbox"
                                    checked={!!todo.completed}
                                    onChange={() => toggleComplete(todo._id, !todo.completed)}
                                    style={{ width: '20px', height: '20px', marginRight: '10px' }}
                                />
                                <span className="text-capitalize">{todo.task}</span>
                            </td>                            
                            <td>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                    <Link to={`/edit/${todo._id}`}>
                                        <button className="btn btn-success"> Update</button>
                                    </Link>
                                    <button className="btn btn-danger" onClick={() => deleteTodo(todo._id)}>Delete</button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    )
}

export default GetDeleteComponent