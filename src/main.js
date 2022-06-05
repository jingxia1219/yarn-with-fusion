import App from 'fusion-react';
import Root from './components/root';
import HelmetPlugin from 'fusion-plugin-react-helmet-async';


export default async function start(){
    // const root = <div>Hello World</div>
    const app = new App(Root);
    app.register(HelmetPlugin)
    return app;
}