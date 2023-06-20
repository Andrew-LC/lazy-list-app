import { createSignal, createEffect, Show } from "solid-js";
import supabase from '../lib/supabaseClient';
import Login from './login';
import NavBar from '../components/navbar';


function PageWrapper(props: any) {
    const [session, setSession] = createSignal();

    createEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session)
        })

        supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session)
        })
    })

    return (
        <Show when={session()} fallback={<Login />}>
            <NavBar />
            <br />
            <br />
            <br />
            <br />
            {props.children}
        </Show>
    );
}


export default PageWrapper;
