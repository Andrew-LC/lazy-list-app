import { Show, createResource, For } from "solid-js";
import CheckBox from '../components/checkbox';
import PageWrapper from './wrapper'
import { getTrueTodos, deleteAllCompleted } from '../lib/api';

const Finished = () => {
    const [todos, { refetch }] = createResource<any>(getTrueTodos, {
        deferStream: true,
    })


    {/* Delete all completed todos */ }
    const onClick = () => {
        deleteAllCompleted().then(() => refetch());
    }


    return (
        <PageWrapper>
            <div class="lg:w-[70%] mx-auto lg:mt-10">

                <div class="w-full flex justify-between items-center pr-5 pl-5">
                    <h2 class="font-bold text-xl">Completed Todos: </h2>
                    <button onClick={onClick} class="btn btn-sm btn-error text-slate-300">Delete all todos</button>
                </div>
                <div class="divider"></div>
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

export default Finished;
