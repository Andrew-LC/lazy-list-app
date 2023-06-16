import { Outlet } from "@solidjs/router";
import NavBar from '../components/navbar';

function PageWrapper() {
    return (
        <div>
            <NavBar />
            <br />
            <Outlet />
        </div>
    );
}


export default PageWrapper;
