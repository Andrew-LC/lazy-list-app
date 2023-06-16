import { createSignal, createEffect, Show, createResource, For, lazy } from "solid-js";
import supabase from '../lib/supabaseClient';
import Login from './login';
import CheckBox from '../components/checkbox';
import { UserProps, TodoProps } from '../types';


let initialData: UserProps = {
    email: "",
    id: ""
}


async function fetchTodos() {
    const { data, error } = await supabase
        .from('todos')
        .select()

    if (data) {
        console.log(data)
    } else {
        console.log(error)
    }

    return data;
}


const Home = () => {
    const [session, setSession] = createSignal<any>(null);
    const [user, setUser] = createSignal<UserProps>(initialData);
    const [todo, setTodo] = createSignal("");
    const [todos, { refetch }] = createResource<any>(fetchTodos, {
        deferStream: true,
    })

    createEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session)
            setUser({ email: session?.user.email, id: session?.user.id })
        })

        supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session)
        })
    })

    const newTodo = async (todo: string, status: boolean) => {
        const { error } = await supabase
            .from('todos')
            .insert({ id: user().id, todo: todo, status: status })
        if (error) {
            console.log(error)
        }
        setTodo("");
        refetch();
    }


    return (
        <Show when={session()} fallback={<Login />}>


            <div class="lg:w-[70%] mx-auto lg:mt-10">
                {/* Form */}
                <div class="flex items-center p-2 pr-3 pl-3 gap-1">
                    <input value={todo()} onChange={(e) => setTodo(e.currentTarget.value)} class="input input-bordered border-slate-600 flex-1" placeholder="New Todo" />
                    <button class="btn" onClick={() => newTodo(todo(), true)}>new todo</button>
                </div>

                {/* Todo Component */}
                <div class="bg-slate-700 p-3 m-3 rounded-md flex flex-col gap-4">
                    <Show when={!todos.loading} fallback={<span>fetching...</span>}>
                        <For each={todos()} fallback={<span>No Todos</span>}>
                            {(item) => <CheckBox status={item.status} todo={item.todo} />}
                        </For>
                    </Show>
                </div>
            </div>
        </Show>
    );
}

export default Home;
