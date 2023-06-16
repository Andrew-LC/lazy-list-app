import { createSignal, createEffect, Show } from "solid-js";
import supabase from '../lib/supabaseClient';
import Login from './login';
import NavBar from '../components/navbar';
import CheckBox from '../components/checkbox';

interface UserProps {
    email: string,
    id: string,
}


let initialData: UserProps = {
    email: "",
    id: ""
}


const Home = () => {
    const [session, setSession] = createSignal<any>(null);
    const [user, setUser] = createSignal<UserProps>(initialData);
    const [sample, setSample] = createSignal(["andrew", "todo"]);

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
               <NavBar /> 
	       <br />
               <Show when={sample()} fallback={<div class="w-full h-full flex justify-center items-center"><span class="loading loading-dots loading-lg"></span></div>}>
		 <div class="bg-slate-700 p-3 m-3 rounded-md flex flex-col gap-4">
		   <CheckBox state={true} todo="Just Enjoy Coding" />
		   <CheckBox state={true} todo="Just Enjoy Coding" />
		   <CheckBox state={true} todo="Just Enjoy Coding" />
		   <CheckBox state={true} todo="Just Enjoy Coding" />
		 </div>
	      </Show>
            </div>
        </Show>
    );
}

export default Home;
