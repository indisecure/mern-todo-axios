function ToDo({todo,setToDos}) {
   //UPDATE Operation
  const updateToDo=async(todoId,todoStatus)=>{
  //back tick used with url
  const res= await fetch(`/api/todo/${todoId}`,{
        method: "PUT",
        body: JSON.stringify({status: todoStatus }),
        headers: {
          "Content-Type": "application/json"
        }
         });
    const data = await res.json();
    if(data.acknowledged){
      setToDos((curentTodos)=>{
        return curentTodos.map((current)=>{
          if(current._id===todoId){
            return { ...current, status:!current.status}
          }
          else return current
        })
      })
    }
  }
   //DELETE  Operation
   const deleteToDo=async(todoId)=>{
  //back tick used with url
  const res= await fetch(`/api/todo/${todoId}`,{
        method: "DELETE"        
         });
    const data = await res.json();
    if(data.acknowledged){
      setToDos((curentTodos)=>{
        return curentTodos.filter((current)=>
          (current._id!=todoId))
      })
    }
  }
  return (
      <div className='todos'>          
          <p>{todo.task}</p>
          <div>
            <button 
            className='button_update'
            onClick={()=>updateToDo(todo._id,todo.status)}            
            >
              {(todo.status) ? <input type="checkbox" defaultChecked /> : <input type="checkbox" /> }
              Tick & Click
            </button>
           <button
            className='button_delete'
            onClick={()=>deleteToDo(todo._id)}  
            >
            <i className="fas fa-trash"></i></button>
          </div>
        </div>
  )
}

export default ToDo