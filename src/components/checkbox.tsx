import supabase from '../lib/supabaseClient';
import { createSignal } from 'solid-js';

interface CheckProps {
    status: boolean,
    todo: string,
    id: string
}


const CheckBox = (props: CheckProps) => {
    const [status, setStatus] = createSignal(props.status);

    const updateTodo = async (e: any) => {
        const id = e.currentTarget.id;
        const { data, error } = await supabase
            .from('todos')
            .update({ status: !status() })
            .eq('todo_id', id)
            .select()

        if (error) {
            console.log(error);
        } else {
            setStatus(!status()); // Update the status state
            console.log(data);
        }
    }

    return (
        <div class="form-control text-lg p-3">
            <label class="flex items-center gap-4 cursor-pointer">
                <input id={props.id} onClick={updateTodo} type="checkbox" checked={props.status} class="checkbox" />
                <div class="flex-1 flex items-between justify-between">
                    <span class="text-regular">{props.todo}</span>
                    <span class="indicator-item badge badge-secondary">01/09/2023</span>
                </div>
            </label>
        </div>
    );
}

export default CheckBox;
