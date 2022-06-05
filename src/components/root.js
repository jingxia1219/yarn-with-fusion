import React, {useState} from 'react';
import Style from './style'

const Root = () => {
    const [todos, setTodos] = useState([]);
    const [input, setInput] = useState('');

    function keyDownHandler(e){
        if(e.key === 'Enter'){
            setInput('');
            setTodos(prev => [...prev,input])
        }
    }

    function changeHandler(e){
        setInput(e.currentTarget.value)
    }
    function deleteHandler(e){
        setTodos( prev => prev.filter( 
            (todo,idx) => 
            {
                return idx!== +e.target.id
        }
            ))
    }
    return (
        <>
        <Style/>
            <h1>todos</h1>
            <div className='container'>
                <input onChange={changeHandler} 
                onKeyDown={keyDownHandler}
                placeholder='What needs to be done?'
                value={input}
                type='text'
                ></input>
                {
                    todos.map( (item,idx) => {
                        return <div className='todo' key={idx}> 
                        
                            <div className='todo-text'>
                                {item}
                            </div>
                            <div id={idx} className='delete-x' onClick={deleteHandler}> x </div>
                        </div>
                    })
                }
            </div>
        </>
    )
}

export default <Root />;