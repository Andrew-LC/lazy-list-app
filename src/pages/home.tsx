import { createSignal, createEffect, Show, createResource, For } from "solid-js";
import CheckBox from '../components/checkbox';
import PageWrapper from './wrapper'
import { newTodo, getFalseTodos } from '../lib/api';
import supabase from '../lib/supabaseClient';
import Toastify from 'toastify-js';
import { UserProps } from '../types';

let initialData: UserProps = {
    email: '',
    id: ''
}

const Home = () => {
    const [todo, setTodo] = createSignal("");
    const [user, setUser] = createSignal<UserProps>(initialData);
    {/* This signal fetches the data asynchronously and allows us to mutate it without writing more code */ }
    const [todos, { mutate, refetch }] = createResource<any>(getFalseTodos);


    {/* Get user details */ }
    createEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setUser({
                email: session?.user.email,
                id: session?.user.id
            } as UserProps);
        })
        refetch();
    })


    {/* Mutate the todos after the newtodo is successfully addded to the database */ }
    const newTodoController = () => {
        newTodo(user().id, todo(), false)
            .then(async (data) => {
                // FIXED: Mutation adds the new todo but no access to the newly created todo_id
                mutate((prev) => [...prev, { todo_id: data.todo_id, status: false, todo: todo() }]);
                toastME("New Todo !");
            });
    }


    const deleteMutateState = (id: string) => {
        mutate((prev: any) => [...prev.filter((item: any) => item.todo_id !== id)]);
    }


    const toastME = (message: string) => {
        Toastify({
            text: message,
            duration: 500,
            className: "info",
            close: true,
            gravity: "top",
            position: "center",
            newWindow: true,
            style: {
                background: "rgba(51, 65, 85, 0.2)",
                backdropFilter: "blur(5px)",
                padding: "1rem",
                borderRadius: "0px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                zIndex: "100",
                marginTop: "3rem",
                marginBottom: "0px",
                fontSize: "1.2rem",
                position: "absolute",
                right: "0px",
                left: "0px",
            }
        }).showToast();
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
                            {(item) => <CheckBox id={item.todo_id} status={item.status} todo={item.todo} created_date={item.created_at} pageType="inbox" mutateState={deleteMutateState} />}
                        </For>
                    </Show>
                </div>

            </div>
        </PageWrapper>
    );
}

export default Home;
