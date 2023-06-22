import { Show, createResource, For } from "solid-js";
import CheckBox from '../components/checkbox';
import PageWrapper from './wrapper'
import Toastify from 'toastify-js';
import { getTrueTodos, deleteAllCompleted } from '../lib/api';

const Finished = () => {
    const [todos, { refetch }] = createResource<any>(getTrueTodos, {
        deferStream: true,
    })


    {/* Delete all completed todos */ }
    const onClick = () => {
        deleteAllCompleted().then(() => refetch());
        toastME("Off to garabage !");
        refetch();
    }


    const toastME = (message: string) => {
        Toastify({
            text: message,
            duration: 500,
            className: "info",
            gravity: "top",
            position: "center",
            newWindow: true,
            close: true,
            style: {
                background: "rgba(255, 0, 0, 0.2)",
                backdropFilter: "blur(5px)",
                padding: "1rem",
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
            <div class="lg:w-[70%] mx-auto mt-4 lg:mt-10">

                <div class="w-full flex justify-between items-center pr-5 pl-5">
                    <h2 class="font-bold text-xl">Completed Todos: </h2>
                    <button onClick={onClick} class="btn btn-sm btn-error text-slate-300">Delete all todos</button>
                </div>
                <div class="divider"></div>
                {/* Todo Component */}
                <div class="bg-slate-700 p-3 m-3 rounded-md flex flex-col gap-4">
                    <Show when={!todos.loading} fallback={<span class="mx-auto loading loading-dots loading-md"></span>}>
                        <For each={todos()} fallback={<span>No Todos</span>}>
                            {(item) => <CheckBox id={item.todo_id} status={item.status} todo={item.todo} pageType="finished" mutateState={() => { }} />}
                        </For>
                    </Show>
                </div>
            </div>
        </PageWrapper>
    );
}

export default Finished;
