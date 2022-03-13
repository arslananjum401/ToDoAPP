import React, { useContext, useState } from 'react'
import { useEffect } from 'react';
import './ToDoCom.css'
import { Context } from '../App'
const ToDoCom = (props) => {
    const CredentialContext = useContext(Context);
    // console.log(CredentialContext);
    const [ToDos, setToDos] = useState([]);
    const [Text, setText] = useState("");
    const [NewTask, setNewTask] = useState([])
    const [ChkText, setChkText] = useState(true);
    const Update = (UpdatedData) => {
        fetch('http://localhost:4000/todo',
            {
                method: 'put',
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': `${localStorage.getItem("Token")}`
                },
                body: JSON.stringify(UpdatedData)
            })
    }
    const ToggleToDo = (index) => {
        const RadioToDo = [...ToDos];
        RadioToDo[index].checked = !RadioToDo[index].checked;
        const UpdatedData = {
            checked: RadioToDo[index].checked,
            text: RadioToDo[index].Task
        }
        console.log(UpdatedData);
        setToDos(RadioToDo);
        if (RadioToDo) {

            Update(UpdatedData)
        }
    }

    const SendToDoBackEnd = async (NewToDo) => {

        fetch('http://localhost:4000/todo',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': `${localStorage.getItem("Token")}`
                },
                body: JSON.stringify(NewToDo)
            })



    }
    useEffect(() => {
        setNewTask({ checked: false, text: Text })
    }, [Text]);

    useEffect(() => {
        if (props.todoList.todoList !== undefined) {

            setToDos(props.todoList.todoList)
        }
    }, [props.todoList]);

    const SendValue = (e) => {
        e.preventDefault()

        if (!Text) {
            setChkText(false)
            return 0
        };

        const Data = [...ToDos, { checked: false, text: Text }]
        setNewTask({ checked: false, text: Text });
        setToDos(Data)
        const newdata = { checked: false, Task: Text };

        setNewTask(newdata);
        setText("")

        SendToDoBackEnd(NewTask)
    }



    return (

        <>
            <div className='ToDoListContainer'>
                {ToDos && ToDos.map((value, index, arr) => {
                    // console.log(value)
                    return (
                        <div className='ToDos' key={index}>
                            <input onChange={() => { ToggleToDo(index) }} type="checkbox" />
                            <label >  {value.Task || value.text}</label>
                        </div>
                    )
                })}
            </div>

            <form className='ToDoForm' onSubmit={SendValue}>
                {!ChkText && <h3 style={{ color: "red" }}>Please Enter a Task</h3>}
                <input
                    value={Text}
                    // if we on page render Text does not have any value,It would have undefined or null value. React would consider it unControlled compononet. But when you change the value of the Text variable. It would change the input tag value from null to "something else". this makes it a Controlled component. React sends this as a warning. To prevent from this try adding "" in setState("") where Text is declared.
                    onChange={(e) => {
                        setChkText(true)
                        setText(e.target.value)
                    }}
                    type="text" placeholder='Enter task' />
                <input type="submit" value="Add" />

            </form>
        </>

    )
}

export default ToDoCom