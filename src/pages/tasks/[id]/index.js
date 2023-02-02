import { useState } from "react";
import { useRouter } from "next/router";
import { Button, Grid, GridColumn, GridRow, Confirm, Loader } from "semantic-ui-react";
import Error from 'next/error'


export default function TaskDetail({ task, error }) {
  const { query, push } = useRouter();   //QUEDAMOS EN 2:04

  const [confirm, setConfirm] = useState(false); //<-- TODAS estas 3 lineas de const las hacemos para darle funcionalidad al -Confirm- (si desea eliminar la tarea). RECUERDA: Para que una constante -const- se guarde en una variable* debe estar definida en un estado, de ahí que hay que importar el -useState- y así poder usar el modal Confirm. También me sirvió para el handleDelete y a cada const que haya en esta function TaskDetail
  const open = () => setConfirm(true); //* Leer -->
  const close = () => setConfirm(false); //* Leer -->
  const [isDeleting, setIsDeleting] = useState(false)

  const deleteTask = async () => {
    const { id } = query;
    try {
      await fetch(`http://localhost:3000/api/tasks/${id}`, {
        method: "DELETE",
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = () => {
    setIsDeleting(true)
    deleteTask();
    close();
    push("/");
  };

  return (
    <Grid
      centered
      verticalAlign="middle"
      columns="1"
      style={{ height: "95vh" }}
    >
      <GridRow>
        <GridColumn textAlign="center" >    
        <h1>{task.title}</h1>
          <p>{task.description}</p>
          <div>
            <Button color="red" onClick={open} loading={isDeleting} >
              Delete
            </Button>
          </div>
        </GridColumn>
      </GridRow>
      <Confirm open={confirm} onConfirm={handleDelete} onCancel={close} />
    </Grid>
  );
}

export async function getServerSideProps({ query: { id } }) {
  const res = await fetch(`http://localhost:3000/api/tasks/${id}`);

  if (res.status === 200) {
    const task = await res.json();
    return {
      props: {
        task,
      },
    };
  }

  return {
    props: {
      error: {
        statusCode: res.status,
        statusText: "Invalid Id",
      },
    },
  };
}
