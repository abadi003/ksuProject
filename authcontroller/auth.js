let passport = require("../config/passport/passport.js");
let path = require("path");
let db = require("../models");
const user = require("../models/user")(db.sequelize, db.Sequelize);;
let category = require("../models/category")(db.sequelize, db.Sequelize);
let wholeItem = require("../models/whole_item")(db.sequelize, db.Sequelize);
let cart = require("../models/cart")(db.sequelize, db.Sequelize);
let search =""
let categoryName = ""
module.exports = function (app, passport) {
  //

  app.get("/",function (req, res) {
    if (search != ""){
      getMainSearch(req,res)
    }
    else if (categoryName != ""){
      getMainCategory(req,res)
    }
    else{
      getMain(req,res)
    }
  });

  app.get("/cart", async function(req,res){
    if (!req.user){
      res.redirect("/")
      return
    }
    user.belongsToMany(wholeItem , {
      through: cart,
      foreignKey: 'userId',
      otherKey: 'url',
    })
    wholeItem.belongsToMany(user , {
      through: cart,
      foreignKey: 'url',
      otherKey: 'userId',
    })
    cart.belongsTo(wholeItem, { foreignKey: 'url' });
    cart.belongsTo(user, { foreignKey: 'userId' });
    console.log(await cart.findAll({
      include:wholeItem
    }))
      res.render("cart.ejs" , {
             user: req.user,
             category: await category.findAll(),
             wholeItem: await cart.findAll({
              include:wholeItem
            }),
             cart:await getCart(req.user),
     }) 
   
  })

  
  async function getMain(req,res){
     res.render("index.ejs" , {
            user: req.user,
            category: await category.findAll(),
            wholeItem: await wholeItem.findAll(),
            cart:await getCart(req.user),
    }) 
  }
  async function getMainSearch(req , res){
          res.render("index.ejs", {
            user: req.user,
            category: await category.findAll(),
            wholeItem: await wholeItem.findAll({
              where:{
                name:{
                  [db.Sequelize.Op.like]: "%"+search+"%"
                }
              }
            }),
            cart: await getCart(req.user),
          });
         }
  async function getMainCategory(req,res){
          res.render("index.ejs", {
            user: req.user,
            category: await category.findAll(),
            wholeItem: await wholeItem.findAll({
              where:{
                category:{
                  [db.Sequelize.Op.like]: "%"+categoryName+"%"
                }
              }
            }),
            cart:await getCart(req.user)
          });
        }
        async function getCart(user){
          if (user){
           return await (await cart.findAndCountAll({
              where:{
                userId:user.userId
              }
            })).count
          }
          return 0
        }
  app.get("/logout", function (req, res) {
    console.log("Log Out Route Hit");
    req.session.destroy(function (err) {
      if (err) console.log(err);
      res.redirect("/");
    });
  });

  app.post(
    "/",
    // wrap passport.authenticate call in a middleware function
    // call passport authentication passing the "local" strategy name and a callback function
    passport.authenticate("local-signin", {
      successRedirect: "/",
      failureRedirect: "/login",
    })
  );
  app.post("/add_to_cart", function(req,res){
    if(!req.user){
      return;
    }
    cart.create({
      url:req.body.url,
      userId:req.user.userId
    }).then(function(){
      res.redirect("/");
    })
    
  })
  app.post("/search", function(req , res){
    search = req.body.searched
    res.redirect("/")
  })
  app.post("/get_from_category", function(req , res){
    categoryName = req.body.category
    res.redirect("/")
  })
  app.post("/cart" , function(req,res){
    cart.destroy({
      where:{
        url:req.body.delete
      }
    })
    res.redirect("/cart")
  })

  // function to call once successfully authenticated

  function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) return next();
    res.redirect("/signin");
  }
};
