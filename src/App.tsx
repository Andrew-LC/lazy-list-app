import type { Component } from 'solid-js';
import { Routes, Route } from "@solidjs/router";
import Home from './pages/home';
import Login from './pages/login';
import SignUp from './pages/signup';


const App: Component = () => {
    return (
        <>
            <Routes>
                <Route path="/" component={Home} />
                <Route path="/login" component={Login} />
                <Route path="/signup" component={SignUp} />
            </Routes>
        </>
    );
};

export default App;
