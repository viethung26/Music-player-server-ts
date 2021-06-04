import mongoose, {Mongoose, Model} from 'mongoose'

interface IKitten extends mongoose.Document{
    name: string,
    age: number,
}
const KittenSchema = new mongoose.Schema({
    name: String,
    age: Number
}, {timestamps: true})

const Kitten = mongoose.model<IKitten>('Kitten', KittenSchema)

export const create = (name, age, callback) => {
    Kitten.create({name, age}).then(doc => {
        callback(doc)
    }).catch(console.error)
}