import { createSignal, createEffect, Show } from "solid-js";
import { useNavigate } from "@solidjs/router";
import supabase from '../lib/supabaseClient';
import Login from './login';

interface UserProps {
    email: string,
    id: string,
}


let initialData: UserProps = {
    email: "",
    id: ""
}


async function newTodo(id: string) {
    const { error } = await supabase
        .from('todos')
        .insert({ id: id, due_date: '06/16/2023', todo: 'make this really work' });

    if (error) {
        console.log(error)
    }
}

const Home = () => {
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
            <div>
                Home / Dashboard
                <br />
                <button onClick={() => newTodo(user().id)}>Add a new todo</button>
            </div>
        </Show>
    );
}

export default Home;
