import { headers } from "next.config";
import { useRouter } from "next/router";
import { useState } from "react";
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
 const router = useRouter()



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
    
    await createTask()   //2<-- Último paso, darle la propiedad al handleSubmit de enviar el servidor (una vez creada la función abajo) para hacerlo llamando a la funcion
    await router.push('/') //3<--
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


  const handleChange = (e) => {
    setNewTask({ ...newTask, [e.target.name]: e.target.value });
    console.log(newTask);
  };

  return (
    <Grid
      centered
      verticalAlign="middle"
      columns={3}
      style={{ height: "80vh" }}
    >
      <GridRow>
        <GridColumn textAlign="center">
          <h1>Create Task</h1>
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
            />
            <FormTextArea
              label="Description"
              placeholder="Description"
              name="description"
              onChange={handleChange}
              error={
                errors.title
                  ? { content: errors.description/*acá lo pongo así, pero bien pude haverlo puesto a mano como con el title*/, pointing: "below" } //*<--  leer línea 11
                  : null
              }
            />
            <Button primary>Save</Button>
          </Form>
        </GridColumn>
      </GridRow>
    </Grid>
  );
}
