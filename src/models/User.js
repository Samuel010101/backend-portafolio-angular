const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require('bcrypt-nodejs');

const UserSchema = new Schema({
    name: {type: String, require: true},
    email: {type: String, require: true},
    password: {type: String, require: true},
    date: {type: Date, default: Date.now}
});

// ENCRIPTAR LA CONTRASEÑA
UserSchema.methods.encryptPassword = async (password) => {
    try{
        const salt = await bcrypt.genSalt(10);
        const hash = bcrypt.hash(password, salt);
        return hash;
    } catch{
        console.log(error => console.log(err));
    }
    
};

// COMPARAR LA CONTRASEÑA DE LOGIN CON LA QUE ESTA EN LA BASE DE DATOS
UserSchema.methods.matchPassword = async function (password){
    try{
        return await bcrypt.compare(password, this.password);
    } catch {
        console.log(error => console.log(err));
    }
 
}

module.exports = mongoose.model('User', UserSchema);