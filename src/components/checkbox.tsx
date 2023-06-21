{/* 
 /* Here we are using Show component to render these two components for two differnet page. 
 /* I am not sure if this is a bad practice.
*/ }

import supabase from '../lib/supabaseClient';
import { createSignal, Show } from 'solid-js';

interface CheckProps {
    status: boolean,
    id: string,
    todo: string,
    pageType: string,
    mutateState(id: string): any 
}


const CheckBox = (props: CheckProps) => {
    const [status, setStatus] = createSignal(props.status);

    const updateTodo = async (e: any) => {
        const id = e.currentTarget.id;
        const { error } = await supabase
            .from('todos')
            .update({ status: !status() })
            .eq('todo_id', id)

        if (error) {
            console.log(error);
        } else {
            setStatus(!status()); // Update the status state
	    props.mutateState(id)
        }
    }

    return (
        < div class="form-control text-lg p-3" >
            <Show when={props.pageType == "inbox"}>
                <label class="flex items-center gap-4 cursor-pointer">
                    <input id={props.id} onClick={updateTodo} type="checkbox" checked={props.status} class="checkbox" />
                    <div class="flex-1 flex items-between justify-between">
                        <span class="text-regular">{props.todo}</span>
                        <div>
                            <span class="indicator-item badge badge-secondary">01/09/2023</span>
                        </div>
                    </div>
                </label>
            </Show>


            <Show when={props.pageType == "finished"}>
                <label class="flex items-center gap-4 cursor-pointer">
                    <input id={props.id} type="checkbox" checked={props.status} class="checkbox" disabled />
                    <div class="flex-1 flex items-between justify-between">
                        <span class="text-regular">{props.todo}</span>
                        <span class="indicator-item badge badge-secondary">01/09/2023</span>
                    </div>
                </label>
            </Show>
        </div >
    );
}

export default CheckBox;
