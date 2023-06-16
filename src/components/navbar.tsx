import { createSignal, createEffect } from 'solid-js';


const drawerCSS = [
    {"open": "drawer-end"},
    {"closed": "drawer-side"}
]


const Drawer = () => {
    const [state, setState] = createSignal(false);

    const handleClick = (e) => {
	setState((prev) => !prev)
	console.log(state())
    }

    return(
	<div class="drawer">
	  <input id="my-drawer" type="checkbox" class="drawer-toggle" />
	  <div class="drawer-content">
	    {/* Page content here */}
	    <button onClick={handleClick} class="drawer-button btn btn-square btn-ghost">
	      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="inline-block w-5 h-5 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
	    </button>
	  </div> 
	  <div classList={{'drawer-end': state() == true, 'drawer-side': state() == false }} class="h-screen">
	    <ul class="menu p-4 w-80 h-full bg-base-200 text-base-content">
	      {/* Sidebar content here */}
	      <li><a>Sidebar Item 1</a></li>
	      <li><a>Sidebar Item 2</a></li>
	    </ul>
	  </div>
	</div>
    );
}


const NavBar = () => {
    return(
	<div class="navbar bg-base-100">
	  <div class="flex-none">
	   <Drawer /> 
	  </div>
	  <div class="flex-1">
	    <a class="btn btn-ghost normal-case text-xl">Inbox</a>
	  </div>
	  <div class="flex-none">
	    <button class="btn btn-square btn-ghost">
	      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="inline-block w-5 h-5 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"></path></svg>
	    </button>
	  </div>
	</div>
    );
}

export default NavBar;
