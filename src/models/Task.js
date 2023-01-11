import {Schema, model, models} from 'mongoose'


const taskSchema = new Schema({
    title: {String,
        type: String,
        required: [true, 'Title is required'],
        unique: true,
        trim: true,
        maxlength: [40, 'Title must be less than 40 characters']
          },

    description:
          {
        type: String,
        required: true,
        trim: true,
        maxlength:[200, 'Description must be less than 200 characters']
          }
          

},{
    timestamps: true, //<- Añade fecha de creación y última modificación
    versionKey: false
})

export default models.Task || model('Task', taskSchema)