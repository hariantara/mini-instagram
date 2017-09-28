var fileModel = require("../model/file")

var createFile = function(req, res){
  file = new fileModel();

  file.fileName = req.body.fileName
  file.url = req.body.url
  file.uploadDate = new Date()


  file.save(function(err){
    if(!err){
      res.send(file)
    }
    else {
      res.send(err)
    }
  })
}


var readFile = function(req, res){
  fileModel.find(function(err, data){
    if(!err){
      res.send(data)
    }
    else {
      res.send(err)
    }
  })
}


var updateFile = function(req, res){
  fileModel.findByIdAndUpdate({
    _id: req.params.id
  },{
    fileName : req.body.fileName,
    url : req.body.url,
    uploadDate : new Date()

  })
  .then((data)=>{
    res.send(data)
  })
  .catch((err)=>{
    res.send(err)
  })
}

var deleteFile = function(req, res){
  fileModel.findByIdAndRemove({
    _id:req.params.id
  })
  .then((data)=>{
    res.send(data)
  })
  .catch((err)=>{
    res.send(err)
  })
}

var saveCloudDataToDB = (req, res, next) => {
  let data = req.body;
  console.log(req.file);
  if (req.file && req.file.cloudStoragePublicUrl) {
    data.fileName = req.file.originalname
    data.url = req.file.cloudStoragePublicUrl;
  }

  console.log(data.fileName)

  db = new fileModel()
  db.fileName = data.fileName
  db.url = data.url
  db.save(function(err){
    if(!err){
      // res.send(r)
      // res.send('saved')
      res.send({
        namefile: data.fileName,
        url: data.url
      })
    }
    else {
      res.send(err)
    }
  })
}


module.exports = {
  createFile,
  readFile,
  updateFile,
  deleteFile,
  saveCloudDataToDB
}
