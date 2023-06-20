import { createSignal, createEffect } from 'solid-js';
import supabase from '../lib/supabaseClient';
import { A } from "@solidjs/router";


async function signOut() {
    const { error } = await supabase.auth.signOut()
}

const NavBar = () => {
    return (
        <div class="navbar fixed top-0 lg:w-[70%] lg:left-[15%] lg:mt-4 shadow-lg bg-base-100/20 backdrop-blur-xl">
            <div class="navbar-start">
                <div class="dropdown">
                    <label tabindex="0" class="btn btn-ghost btn-circle">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h7" /></svg>
                    </label>
                    <ul tabindex="0" class="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                        <li><A href="/">Inbox</A></li>
                        <li><A href="/finished">Completed</A></li>
                        <li><A href="/progress-report">Progress</A></li>
                        <li></li>
                        <li><a onClick={signOut}>Log out</a></li>
                    </ul>
                </div>
            </div>
            <div class="navbar-center">
                <a class="btn btn-ghost normal-case text-xl">Lazy List</a>
            </div>
            <div class="navbar-end">
            </div>
        </div>);
}

export default NavBar;
