import { createSignal } from 'solid-js';
import supabase from '../lib/supabaseClient';
import { A, useNavigate } from "@solidjs/router";


interface SignUpProps {
    email: string;
    password: string;
}

let initialData: SignUpProps = {
    email: '',
    password: ''
};

async function signIn(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
    })
    if (error) {
        console.log(error);
        return error;
    } else {
        console.log("Logged in!");
    }
}

const Login = () => {
    const [form, setForm] = createSignal(initialData);
    const navigate = useNavigate();

    const onSubmit = () => {
        signIn(form().email, form().password).then((err) => {
            if (!err) {
                navigate('/');
            }
        })
        setForm(initialData);
    }

    return (
        <div class="flex h-[100vh] w-full items-center justify-center bg-gray-900 bg-cover bg-no-repeat" style="background-image:url('https://images.unsplash.com/photo-1640690821275-c6aa1e1ccee3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1632&q=80)">
            <div class="rounded-xl bg-gray-800 bg-opacity-50 px-16 py-10 shadow-lg backdrop-blur-md max-sm:px-8">
                <div class="text-white">
                    <div class="mb-8 flex flex-col items-center">
                        <img src="https://www.logo.wine/a/logo/Gmail/Gmail-Logo.wine.svg" width="150" alt="" srcset="" />
                        <h1 class="mb-2 text-2xl">Email</h1>
                        <span class="text-gray-300">Login details</span>
                    </div>
                    <div>
                        <div class="mb-4 text-lg">
                            <input
                                value={form().email}
                                onInput={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))}
                                class="rounded-3xl border-none bg-[#8596b2] bg-opacity-50 px-6 py-2 text-center text-inherit placeholder-slate-200 shadow-lg outline-none backdrop-blur-md"
                                type="text"
                                name="email"
                                placeholder="id@email.com"
                            />
                        </div>

                        <div class="mb-4 text-lg">
                            <input
                                value={form().password}
                                onInput={(e) => setForm((prev) => ({ ...prev, password: e.target.value }))}
                                class="rounded-3xl border-none bg-[#8596b2] bg-opacity-50 px-6 py-2 text-center text-inherit placeholder-slate-200 shadow-lg outline-none backdrop-blur-md"
                                type="password"
                                name="password"
                                placeholder="*********"
                            />
                        </div>
                        <div class="mt-8 flex justify-center text-lg text-black">
                            <button onClick={onSubmit} class="rounded-3xl bg-[#8596b2] bg-opacity-50 px-10 py-2 text-white shadow-xl backdrop-blur-md transition-colors duration-300 hover:bg-[#354056]">
                                Login
                            </button>
                        </div>
                        <div class="mt-4 underline flex justify-center text-sm text-blue-100">
                            <A href='/signup'>Sign up instead</A>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
