//routes/contacts.js

var express = require("express");
var router = express.Router();
var Contact = require("../models/Contact");

// Index
router.get("/", function(req, res){
  Contact.find({}, function(err, contacts){
    if(err)
      return res.json(err);
    res.render("contacts/index", {contacts:contacts});
  });
});

// New
router.get("/new", function(req, res){
  res.render("contacts/new");
});

// Create
router.post("/", function(req, res){
  Contact.create(req.body, function(err, contact){
    if(err)
      return res.json(err);
    res.redirect("/contacts");
  });
});

// Show
router.get("/:id", function(req, res){
  var pId = req.params.id;
  Contact.findOne({_id:pId}, function(err, contact){
    if(err)
      return res.json(err);
    res.render("contacts/show", {contact:contact});
  });
});

// Edit
router.get("/:id/edit", function(req, res){
  var pId = req.params.id;
  Contact.findOne({_id:pId}, function(err, contact){
    if(err)
      return res.json(err);
    res.render("contacts/edit", {contact:contact});
  });
});

// Update
router.put("/:id", function(req, res){
  var pId = req.params.id;
  Contact.findOneAndUpdate({_id:pId}, req.body, function(err, contact){
    if(err)
      return res.json(err);
    res.redirect("/contacts/"+pId);
  });
  //이때 callback함수로 넘겨지는 값은 수정되기 전의 값입니다. 만약 업데이트 된 후의 값을 보고 싶다면 callback 함수 전에 parameter로 {new:true}를 넣어주면 됩니다.
});

// Destroy
router.delete("/:id", function(req, res){
  var pId = req.params.id;
  console.log(pId);
  Contact.remove({_id:pId}, function(err){
    if(err)
      return res.json(err);
    res.redirect("/contacts");
  });
});

module.exports = router;
