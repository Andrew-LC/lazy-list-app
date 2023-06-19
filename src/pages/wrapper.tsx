import { children } from 'solid-js';
import { createSignal, createEffect, Show } from "solid-js";
import supabase from '../lib/supabaseClient';
import Login from './login';
import NavBar from '../components/navbar';
import { UserProps } from '../types';

let initialData: UserProps = {
    email: "",
    id: ""
}

function PageWrapper(props: any) {
    const [session, setSession] = createSignal<any>(null);
    const [user, setUser] = createSignal<UserProps>(initialData);

    createEffect(() => {
	supabase.auth.getSession().then(({ data: { session } }) => {
	    setSession(session)
	    setUser({ email: session?.user.email, id: session?.user.id })
	})

	supabase.auth.onAuthStateChange((_event, session) => {
	    setSession(session)
	})
    })

    return (
        <Show when={session()} fallback={<Login />}>
            <NavBar />
            <br />
	    {props.children}
        </Show>
    );
}


export default PageWrapper;
