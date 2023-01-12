/* import {dbConnect} from '../../../utils/mongoose'
import Task from '../../../models/Task' */
//↓ Ahora puedo importar directamente sin los ../../ gracias a la configuración ALIASES hecha en el archivo jsconfig.json (buscar documentación oficial) NOTA: Recuerda recargar npm run dev para que lea correctamente los datos, ya que jsconfig.json es un archivo de configuración inicial (primario-fuera de cualquier carpeta o documento)
import Task from "models/Task";
import { dbConnect } from "utils/mongoose";

dbConnect();

export default async function handler(req, res) {
  const { method, body } = req; //<- para evitarme tener que estar escribiendo los params -method && body- a cada rato para las peticiones POST, PUT y DELETE que siguen

  switch (req.method) {
    case "GET": //<-Recuerda GET lee y presenta los datos existentes en el servidor
      try {
        //<- Recuerda que para cada método GET, POST, PUTH, DELETE debe llevar su -Try/Catch para informarle al usuario QUÉ paso con su petición
        const tasks = await Task.find();
        return res.status(200).json(tasks);
      } catch (error) {
        return res.status(500).json({ error: error.msg });
      }

    case "POST": //<-POST añade y guarda los datos en el servidor
      try {
        const newTask = new Task(body);
        const saveTask = await newTask.save();
        return res.status(201).json(saveTask);
      } catch (error) {
        return res.status(400).json({ error: error.message });
      }

    default:
      return res.status(400).json({ msg: "this method is not supported" });
  }
}
