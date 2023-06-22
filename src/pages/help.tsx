import PageWrapper from './wrapper'
import Mascot from '../../public/mascot.png';


const Help = () => {
    return (
        <PageWrapper>
            <div class="lg:w-[70%] mx-auto mt-4 p-4 pr-4 pl-4 lg:mt-10 text-xl">
                <div class="shadow-md w-full bg-slate-800 p-5 rounded-md">
                    <h1 class="font-bold text-2xl mb-2">What is lazy list ?</h1>
                    <p>Lazy List is no nonsense todo app, the concept is that todos don't have a deadline, it'll stay active till you complete it</p>
                    <p>You can view active todos in the inbox and the completed in the finished page and delete them after viewing it one last time.</p>
                    <p>There's a progress page to track how much todos you have completed but there's no reward, make your own reward !</p>
                </div>
                <br />
                <div class="shadow-md w-full bg-slate-800 p-5 rounded-md">
                    <h1 class="font-bold text-2xl">How to use it ?</h1>
                    <ul>
                        <li>
                            1. Add a new todo !
                        </li>
                        <li>
                            2. Tick it once you're done
                        </li>
                        <li>
                            3. Delete all the list after your'e done
                        </li>
                    </ul>
                </div>
                <br />
                <hr />
                <br />
                <div class="w-full flex items-center justify-center">
                    <a class="btn btn-md" target="_blank" href="https://github.com/Andrew-LC/lazy-list-app">Source Code</a>
                </div>
            </div>
        </PageWrapper>
    );
}


export default Help;
