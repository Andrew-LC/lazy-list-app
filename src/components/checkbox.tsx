import supabase from '../lib/supabaseClient';

interface CheckProps {
    status: boolean,
    todo: string
}


const CheckBox = (props: CheckProps) => {

    const updateTodo = async () => {
        const { error } = await supabase
            .from('todos')
            .update({ name: 'Australia' })
            .eq('id', 1)
    }

    return (
        <div class="form-control text-lg p-3">
            <label class="flex items-center gap-4 cursor-pointer">
                <input type="checkbox" checked={props.status ? "checked" : ""} className="checkbox" />
                <div class="flex-1 flex items-between justify-between">
                    <span class="text-regular">{props.todo}</span>
                    <span class="indicator-item badge badge-secondary">01/09/2023</span>
                </div>
            </label>
        </div>
    );
}

export default CheckBox;
