var mongoose = require('mongoose');

var schema = mongoose.Schema({
  msg: String,
  done: Boolean
});


schema.statics.add = async function({msg,done}){
  return this.create({msg,done})
}


schema.statics.get = async function(){
  return this.find()
}

schema.statics.deleteById = async function(id){
  return this.findByIdAndRemove(id)
}

schema.statics.modify = async function(id,{msg,done}){
  return this.findByIdAndUpdate(id, {msg,done}) 
}


var todoList = mongoose.model("todoList",schema);   //创建/链接一个表

module.exports = todoList;


