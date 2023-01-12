//Configuramos este módulo para dar al usuario de consultar un ID en específico, modificarlo o eliminarlo
import { dbConnect } from "utils/mongoose";
import Task from "models/Task";

dbConnect();

export default async (req, res) => {
  const {
    method,
    body,
    query: { id },
  } = req;

  //console.log(req.query)

  switch (method) {
    case "GET":
      try {
        const task = await Task.findById(id);
        if (!task) return res.status(404).json({ msg: "Task not found" });
        return res.status(200).json(task);
      } catch (error) {
        return res.status(400).json({ msg: error.message });
      }
    case "PUT":
      try {
        const updateTask = await Task.findByIdAndUpdate(id, body, {new: true}); //<- Esta última propiedad {new: true} es para que te devuelva el objeto nuevo, es decir, el modificado por el usuario previamente
        if(!updateTask)return res.status(404).json({ msg: "Task not found" });
        return res.status(200).json(updateTask);
      } catch (error) {
        return res.status(400).json({ msg: error.message });
      }

    case "DELETE":
      try {
        const deleteTask = await Task.findByIdAndDelete(id);
        if (!deleteTask) res.status(400).json({ msg: "Task not found" });
        return res.status(204).json({ msg: "Task delete!" });
      } catch (error) {
        return res.status(400).json({ msg: error.message });
      }

    default:
      return res.status(400).json({ msg: "this method is not supported" });
  }
};
