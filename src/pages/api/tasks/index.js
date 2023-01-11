/* import {dbConnect} from '../../../utils/mongoose'
import Task from '../../../models/Task' */
//↓ Ahora puedo importar directamente sin los ../../ gracias a la configuración ALIASES hecha en el archivo jsconfig.json (buscar documentación oficial) NOTA: Recuerda recargar npm run dev para que lea correctamente los datos, ya que jsconfig.json es un archivo de configuración inicial (primario-fuera de cualquier carpeta o documento)
import Task from 'models/Task'
import {dbConnect} from 'utils/mongoose'  

dbConnect()

export default async function handler(req, res) {

    switch (req.method) {

      case "GET":
        const tasks = await Task.find();
        return res.status(200).json(tasks);
        
      default:
        return res.status(400).json({ msg: "this method is not supported" });
    }

  }