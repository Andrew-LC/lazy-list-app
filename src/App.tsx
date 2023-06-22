import type { Component } from 'solid-js';
import { Routes, Route } from "@solidjs/router";
import Home from './pages/home';
import Login from './pages/login';
import SignUp from './pages/signup';
import Progress from './pages/progress';
import Finished from './pages/finished';
import Help from './pages/help';


const App: Component = () => {
    return (
        <>
            <Routes>
                <Route path="/" component={Home} />
                <Route path="/finished" component={Finished} />
                <Route path="/progress-report" component={Progress} />
                <Route path="/help" component={Help} />
                <Route path="/login" component={Login} />
                <Route path="/signup" component={SignUp} />
            </Routes>
        </>
    );
};

export default App;
