import { createSignal, createEffect, Show, createResource, For } from "solid-js";
import CheckBox from '../components/checkbox';
import PageWrapper from './wrapper'
import { fetchTodos, newTodo, getFalseTodos } from '../lib/api';
import supabase from '../lib/supabaseClient';
import { UserProps } from '../types';

let initialData: UserProps = {
    email: "",
    id: ""
}

const Home = () => {
    const [todo, setTodo] = createSignal("");
    const [user, setUser] = createSignal<UserProps>(initialData);
    const [todos, { refetch }] = createResource<any>(getFalseTodos, {
        deferStream: true,
    })


    {/* Get user details */ }
    createEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setUser({ email: session?.user.email, id: session?.user.id })
        })
    })


    const newTodoController = () => {
        newTodo(user().id, todo(), false).then(() => refetch());
    }


    return (
        <PageWrapper>
            <div class="lg:w-[70%] mx-auto lg:mt-10">
                {/* Form */}
                <div class="flex items-center p-2 pr-3 pl-3 gap-1">
                    <input value={todo()} onChange={(e) => setTodo(e.currentTarget.value)} class="input input-bordered border-slate-600 flex-1" placeholder="New Todo" />
                    <button class="btn" onClick={newTodoController}>new todo</button>
                </div>

                {/* Todo Component */}
                <div class="bg-slate-700 p-3 m-3 rounded-md flex flex-col gap-4">
                    <Show when={!todos.loading} fallback={<span class="mx-auto loading loading-dots loading-md"></span>}>
                        <For each={todos()} fallback={<span>No Todos</span>}>
                            {(item) => <CheckBox id={item.todo_id} status={item.status} todo={item.todo} />}
                        </For>
                    </Show>
                </div>
            </div>
        </PageWrapper>
    );
}

export default Home;
