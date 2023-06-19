import supabase from './supabaseClient';


async function fetchTodos() {
  const { data, error } = await supabase
    .from('todos')
    .select()

  if (data) {
    console.log(data)
  } else {
    console.log(error)
  }

  return data;
}



async function getFalseTodos() {
  const todos = await fetchTodos();
  return todos?.filter(todo => {
    return todo.status === false;
  });
}


async function getTrueTodos() {
  const todos = await fetchTodos();
  return todos?.filter(todo => {
    return todo.status === true;
  });
}


async function deleteAllCompleted() {
  const { error } = await supabase
    .from('todos')
    .delete()
    .eq('status', true)
  if (error) {
    console.log(error);
  } else {
    console.log("All deleted!")
  }
}



const percentage = async () => {
  const { data, error } = await supabase
    .from('todos')
    .select()
    .eq('status', false)

  const total = await fetchTodos();
  let percent = (((data!.length / total!.length) * 100) as unknown) as string;
  if (percent == undefined) {
    percent = "";
  }

  if (error) {
    console.log(error);
  }

  const value = {
    "percentage": String(percent),
    "total": total!.length,
    "completed": data!.length
  }

  return value;
}


const newTodo = async (id: string, todo: string, status: boolean) => {
  const { error } = await supabase
    .from('todos')
    .insert({ id: id, todo: todo, status: status })
  if (error) {
    console.log(error)
  }
}


export { fetchTodos, newTodo, percentage, getTrueTodos, getFalseTodos, deleteAllCompleted }
