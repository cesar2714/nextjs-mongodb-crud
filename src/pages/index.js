import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardGroup,
  Container,
  Grid,
  GridColumn,
  GridRow,
} from "semantic-ui-react";

export default function HomePage({ tasks }) {
  //console.log(tasks);
  if (tasks.length === 0)
    return (
      <Grid
        centered
        verticalAlign="middle"
        columns="1"
        style={{ height: "95vh" }}
      >
        <GridRow centered  >
          <GridColumn textAlign="center">
            <h1>There are no tasks yet</h1>
            <img
              src="https://i0.wp.com/www.complexsql.com/wp-content/uploads/2017/12/No-data-found-banner.png?fit=761%2C347"
              alt="No tasks yet"
            />
            <div>
              <Button primary>Create a task</Button>
            </div>
          </GridColumn>
        </GridRow>
      </Grid>
    );

  return (
    <Container style={{padding: '20px'}} >
      <CardGroup itemsPerRow={4}>
        {tasks.map((task) => (
          <Card key={task._id}>
            <CardContent>
              <CardHeader>{task.title}</CardHeader>
              <pa>{task.description}</pa>
              <CardContent>
                <CardContent extra>
                  <Button primary>View</Button>
                  <Button secondary>Edit</Button>
                </CardContent>
              </CardContent>
            </CardContent>
          </Card>
        ))}
      </CardGroup>
    </Container>
  );
}

export const getServerSideProps = async (context) => {
  //<-- Se ejecuta en el backend. Esta maravilla (getServerSideProps) te da acceso a los datos de backend al frontend (parecido al useEffect en React)y los pre-renderiza, obteniendo un SEO optimo de la página. Y esto era en Next12, seguramente en Next13 traerá cosas aún mucho mejores

  const res = await fetch("http://localhost:3000/api/tasks");
  const tasks = await res.json();

  return {
    props: {
      tasks,
    },
  };
};
