import React, {useState, useEffect} from 'react';
import Style from './style';
import fetch from 'isomorphic-fetch';

const Root = () => {
    const [todos, setTodos] = useState([]);
    const [input, setInput] = useState('');

    useEffect(()=> {
        fetch('/api/todos').then( res => res.json().then( res=> setTodos(res)))}
    ,[] )

    function keyDownHandler(e){
        if(e.key === 'Enter'){
            setInput('');
            setTodos(prev => [...prev,input])
            fetch('/api/todos',{
                method:'POST',
                headers:{
                    'Content-Type':'application/json',
                },
                body: JSON.stringify({
                    value:input
                })
            })
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