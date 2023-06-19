import { createResource, Show } from 'solid-js';
import PageWrapper from './wrapper';
import ProgressCircle from '../components/progressCircle';
import { percentage } from '../lib/api';

const Progress = () => {
    const [percent] = createResource(percentage, { deferStream: true })

    return (
        <PageWrapper>
            <div class="w-full h-full p-4 pt-10 flex flex-col items-center gap-4">
                <Show when={!percent.loading} fallback={<div>Fetching...</div>}>
                    <h1 class="font-semibold text-2xl mb-8">Progress Report</h1>
                    <ProgressCircle value={Number(percent()!.percentage)} />

                    <div class="w-full p-4 pt-8 pb-8 rounded-md mt-10 text-xl bg-slate-700">
                        <span><span class="font-semibold text-xl mr-4">Total:</span>{percent()!.total}</span>
                        <br />
                        <span><span class="font-semibold text-xl mr-4" >Completed:</span>{percent()!.completed}</span>
                    </div>
                </Show>
            </div>
        </PageWrapper >
    );
}


export default Progress;
