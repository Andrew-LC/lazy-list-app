import ProgressCircle from '../components/progressCircle';


const Progress = () => {
    return (
        <div class="w-full h-full p-4 pt-10 flex flex-col items-center gap-4">
            <h1 class="font-semibold text-2xl mb-8">Progress Report</h1>
            <ProgressCircle />

            <div class="w-full p-4 pt-8 pb-8 rounded-md mt-10 text-xl bg-slate-700">
                <span><span class="font-semibold text-xl">Total:</span> 20</span>
                <br />
                <span><span class="font-semibold text-xl" >Completed:</span> 20</span>
            </div>
        </div>
    );
}


export default Progress;
