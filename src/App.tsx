import type { Component } from 'solid-js';
import { Routes, Route } from "@solidjs/router";
import Home from './pages/home';
import Login from './pages/login';
import SignUp from './pages/signup';
import Progress from './pages/progress';
import PageWrapper from './pages/wrapper';


const App: Component = () => {
    return (
        <>
            <Routes>
                <Route path="/" component={PageWrapper}>
                    <Route path="/" component={Home} />
                    <Route path="/progress-report" component={Progress} />
                </Route>
                <Route path="/login" component={Login} />
                <Route path="/signup" component={SignUp} />
            </Routes>
        </>
    );
};

export default App;
