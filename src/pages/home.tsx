import { createSignal, createEffect, Show, createResource, For } from "solid-js";
import CheckBox from '../components/checkbox';
import PageWrapper from './wrapper'
import { newTodo, getFalseTodos } from '../lib/api';
import supabase from '../lib/supabaseClient';
import { UserProps } from '../types';

let initialData: UserProps = {
    email: '',
    id: ''
}

const Home = () => {
    const [todo, setTodo] = createSignal("");
    const [user, setUser] = createSignal<UserProps>(initialData);
    {/* This signal fetches the data asynchronously and allows us to mutate it without writing more code */ }
    const [todos, { mutate }] = createResource<any>(getFalseTodos, {
        deferStream: true,
    })


    {/* Get user details */ }
    createEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setUser({
                email: session?.user.email,
                id: session?.user.id
            } as UserProps);
        })
    })


    {/* Mutate the todos after the newtodo is successfully addded to the database */ }
    const newTodoController = () => {
        newTodo(user().id, todo(), false)
            .then(() => mutate((prev) => [...prev, { id: user().id, status: false, todo: todo() }]));
    }



    return (
        <PageWrapper>
            <div class="lg:w-[70%] h-full mx-auto lg:mt-10">

                {/* Form */}
                <div class="flex items-center p-2 pr-3 pl-3 gap-1">
                    <input value={todo()}
                        onChange={(e) => setTodo(e.currentTarget.value)}
                        class="input input-bordered border-slate-600 flex-1" placeholder="New Todo" />
                    <button class="btn" onClick={newTodoController}>new todo</button>
                </div>

                {/* Todo Component */}
                <div class="bg-slate-700 p-3 m-3 rounded-md flex flex-col gap-4">
                    <Show when={!todos.loading} fallback={<span class="mx-auto loading loading-dots loading-md"></span>}>
                        <For each={todos()} fallback={<span class="mx-auto">Add Todos</span>}>
                            {(item) => <CheckBox id={item.todo_id} status={item.status} todo={item.todo} pageType="inbox" />}
                        </For>
                    </Show>
                </div>
            </div>
        </PageWrapper>
    );
}

export default Home;
