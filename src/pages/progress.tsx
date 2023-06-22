import { createResource, Show } from 'solid-js';
import PageWrapper from './wrapper';
import ProgressCircle from '../components/progressCircle';
import { percentage } from '../lib/api';

const Progress = () => {
    const [percent] = createResource(percentage, { deferStream: true })

    return (
        <PageWrapper>
            <div class="w-full h-full p-4 pt-10 flex flex-col items-center gap-4">
                <Show when={!percent.loading} fallback={<span class="mx-auto loading loading-dots loading-md"></span>}>
                    <h1 class="font-semibold text-2xl mb-8">Progress Report</h1>

                    {/* Progress Component */}
                    <Show when={percent()!.completed > 0} fallback={<div class="text-xl">Geez you haven't done a single job yet !</div>}>
                        <ProgressCircle value={Number(percent()!.percentage)} />
                    </Show>

                    <div class="w-full lg:w-[70%] p-4 pt-8 pb-8 rounded-md mt-10 text-xl bg-slate-700">
                        <span><span class="font-semibold text-xl mr-4">Total tasks to takle:</span>{percent()!.total}</span>
                        <br />
                        <span><span class="font-semibold text-xl mr-4" >Completed tasks:</span>{percent()!.completed}</span>
                    </div>
                </Show>
            </div>
        </PageWrapper >
    );
}


export default Progress;
