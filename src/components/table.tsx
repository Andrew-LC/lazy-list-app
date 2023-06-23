interface TableProps {
    total: number,
    completed: number
}

const Table = (props: TableProps) => {
    return (
        <>
            <table class="lg:mt-10 lg:h-[150px] table table-zero p-1 border-2 border-slate-600 text-lg rounded-md mt-10">
                <tbody>
                    <tr class="bg-gray-800 font-bold p-3">
                        <td class="">Total Todos</td>
                        <td>{props.total}</td>
                    </tr>
                    <tr class="bg-gray-800 font-bold p-3">
                        <td>Completed Todos</td>
                        <td>{props.completed}</td>
                    </tr>
                </tbody>
            </table>
        </>
    );
}

export default Table;
