import App from 'fusion-react';
import Root from './components/root';
import TodosPlugin from './plugins/todos';

export default async function start(){
    // const root = <div>Hello World</div>
    const app = new App(Root);
    if(__NODE__){
        app.middleware(require('koa-bodyparser')());
        app.middleware(TodosPlugin)
    }
    return app;
}