import { headers } from "next.config";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import {
  Button,
  Form,
  FormInput,
  FormTextArea,
  Grid,
  GridColumn,
  GridRow,
} from "semantic-ui-react";

export default function TaskFormPage() {
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
  });
  const [errors, setErrors] = useState({}); //<--1↓ 

//3Por último establemos el router para que pueda cambiar a la página principal una vez creada la tarea en el formulario. 
 const {query, push} = useRouter()



  //1Establecidos en handleSubmit y el handleChange tenemos que envíar los datos al servidor, pero ANTES hacemos un constante para validar los datos. Esto es buena práctica hacerlo arriba de los handles's
  const validate = () => {  //1<--
    
    const errors = {};
    if (!newTask.title) errors.title = "Title is required";
    if (!newTask.description) errors.description = "description is required";
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let errors = validate(); //1<-- leer línea 28

    if (Object.keys(errors).length) return setErrors(errors); //1<--  leer línea 28
    
    if (query.id){
      await updateTask()
    } else{
      await createTask()
    }  //2<-- Último paso, darle la propiedad al handleSubmit de enviar el servidor (una vez creada la función abajo) para hacerlo llamando a la funcion
    await push('/') //3<--
  };

//↓↓(2)Ahora sí, luego de haber configurado toda la validación(1), nos disponemos a enviar al servidor(2) 
const createTask = async () => {
try {
  await fetch('http://localhost:3000/api/tasks', {
    method: 'POST',
    body: JSON.stringify(newTask),
    headers: {
      'Content-Type':'application/json'
    }
  })
} catch (error) {
  console.log(error)
}
}

const updateTask = async ()=> {
  try {
    await fetch('http://localhost:3000/api/tasks/' +query.id, {
      method: 'PUT',
      body: JSON.stringify(newTask),
      headers: {
        'Content-Type':'application/json'
      }
    })
  } catch (error) {
    console.log(error)
  }
}


  const handleChange = (e) => {
    setNewTask({ ...newTask, [e.target.name]: e.target.value });
    //console.log(newTask);
  };

  const getTask = async ()=> {
    const res = await fetch('http://localhost:3000/api/tasks/' + query.id)
    const data = await res.json()
    setNewTask({title: data.title, description: data.description})
    //console.log(data)
  }

  useEffect(() => {
    if (query.id) getTask();
  }, []);
  

  return (
    <Grid
      centered
      verticalAlign="middle"
      columns={3}
      style={{ height: "80vh" }}
    >
      <GridRow>
        <GridColumn textAlign="center">
          <h1>{query.id ? "Update Task" : "Create Task"}</h1>
          <Form onSubmit={handleSubmit}>
            <FormInput
              label="Title"
              placeholder="Title"
              name="title"
              onChange={handleChange}
              error={
                errors.title
                  ? { content: "Please enter a title", pointing: "below" } //*<--  leer línea 11
                  : null
              }
              value={newTask.title}
            />
            <FormTextArea
              label="Description"
              placeholder="Description"
              name="description"
              onChange={handleChange}
              error={
                errors.title
                  ? { content: errors.description/*acá lo pongo así, pero bien pude haberlo puesto a mano como con el title*/, pointing: "below" } //*<--  leer línea 11
                  : null
              }
              value={newTask.description}
            />
            <Button primary>{query.id ? "Update Task" : "Create Task"}</Button>
          </Form>
        </GridColumn>
      </GridRow>
    </Grid>
  );
}
