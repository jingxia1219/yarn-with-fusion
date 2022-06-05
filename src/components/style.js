export default function Style(){
return (
    <style>
{
    `
    body{
        background-color: #f5f5f5;
        front: 24x 'Helvetica Neue', Helvetica, Arial, sans-serif;
    }
    h1{
        color: rgba(175, 47, 47, 0.15);
        font-size: 100px;
        font-weight: 100;
        text-align:center;
    }
    .container {
        background:#ffffff;
        border: 1px solid #ededed;
        margin: 0 auto;
        width: 550px;
    }
    input {
        border:none;
        font-size:24px;
        font-weight: 300;
        padding:15px;
        width: 520px;
    }
    input::placeholder {
        color: #e6e6e6;
        font-style:italic;
        font-weight:100;
    }
    .todo{
        border-top:1px solid #ededed;
        padding: 15px;
    }
    .todo-text {
        font-weight: 300;
    }
    .todo{
        width:520px;
        display: flex;
        justify-content: space-between;
    }
    .delete-x{
        cursor: pointer;
    }
    `
}
</style>
)
}

