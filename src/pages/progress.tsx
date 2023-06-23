import { createResource, Show } from 'solid-js';
import PageWrapper from './wrapper';
import ProgressCircle from '../components/progressCircle';
import Table from '../components/table';
import { percentage } from '../lib/api';

const Progress = () => {
    const [percent] = createResource(percentage, { deferStream: true })

    return (
        <PageWrapper>
            <div class="w-full h-full lg:mx-auto lg:mt-10 lg:w-[70%] p-4 pt-10 flex flex-col items-center gap-4">
                <Show when={!percent.loading} fallback={<span class="mx-auto loading loading-dots loading-md"></span>}>
                    <h1 class="font-semibold text-2xl mb-8 lg:mb-20">Progress Report</h1>

                    {/* Progress Component */}
                    <Show when={percent()!.completed > 0} fallback={<div class="text-xl">Geez you haven't done a single job yet !</div>}>
                        <ProgressCircle value={Number(percent()!.percentage)} />
                    </Show>

                    <Table total={percent()!.total} completed={percent()!.completed} />
                </Show>
            </div>
        </PageWrapper >
    );
}


export default Progress;
