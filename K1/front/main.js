


const getTask = async () => {
  const res = await fetch("http://localhost:5000/todos/", {
    method: "GET",
  })
  console.log(res);
}
getTask()
