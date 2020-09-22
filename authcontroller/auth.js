let passport = require("../config/passport/passport.js");
let path = require("path");
let db = require("../models");
const user = require("../models/user")(db.sequelize, db.Sequelize);
let category = require("../models/category")(db.sequelize, db.Sequelize);
let wholeItem = require("../models/whole_item")(db.sequelize, db.Sequelize);
let cart = require("../models/cart")(db.sequelize, db.Sequelize);
let root_category = require("../models/root_category")(db.sequelize, db.Sequelize);
let prepaid = require("../models/prepaid")(db.sequelize, db.Sequelize);
let search = "";
let userId;
let categoryName = "";
let jwt = require("jsonwebtoken");
module.exports = function (app, passport) {
  //

  // app.get("/",function (req, res) {
  //   if (search != ""){
  //     getMainSearch(req,res)
  //   }
  //   else if (categoryName != ""){
  //     getMainCategory(req,res)
  //   }
  //   else{
  //     getAngularMain(req,res)
  //   }
  // });

  app.get("/category", async function (req, res) {
    res.send(await category.findAll());
  });
  app.get("/root_category" , async function(req, res) {
    res.send(await root_category.findAll())
  })
  app.get("/item", async function (req, res) {
    if (categoryName != ""){
      res.send(await wholeItem.findAll({
        where:{
          category:{
            [db.Sequelize.Op.like]: "%"+categoryName+"%"
          }
        }
      })); 
      categoryName =""
    }
    else if(search != ""){
      res.send(await wholeItem.findAll({
        where:{
          name:{
            [db.Sequelize.Op.like]: "%"+search+"%"
          }
        }
      })); 
      search = ""
    }else {
       res.send(await wholeItem.findAll());
    }
   
  });
  app.post("/user" , async function(req , res){
    if (!req.body.token){
      res.send({userId:""})
    }else{
    res.send(jwt.verify(req.body.token , req.body.key))
    }
  })
app.get("/numberOfItems" , async function(req , res){
      res.send((await getCart(req.body)).toString())
    });
    app.post("/numberOfItems" , async function(req , res){
      res.send((await getCart(req.body)).toString())
    });
    app.get("/cart", async function (req, res) {
      user.belongsToMany(wholeItem, {
        through: cart,
        foreignKey: "userId",
        otherKey: "url",
      });
      wholeItem.belongsToMany(user, {
        through: cart,
        foreignKey: "url",
        otherKey: "userId",
      });
      cart.belongsTo(wholeItem, { foreignKey: "url" });
      cart.belongsTo(user, { foreignKey: "userId" });
      res.send(
        await cart.findAll({
          include: wholeItem,
          where:{
            userId:userId
          }
        })
      );
      userId = undefined;
    });
  app.post("/cart", async function (req, res) {
    if (!req.body.userId){
      res.send({userId:""})
      return
    }
    user.belongsToMany(wholeItem, {
      through: cart,
      foreignKey: "userId",
      otherKey: "url",
    });
    wholeItem.belongsToMany(user, {
      through: cart,
      foreignKey: "url",
      otherKey: "userId",
    });
    cart.belongsTo(wholeItem, { foreignKey: "url" });
    cart.belongsTo(user, { foreignKey: "userId" });
    res.send(
      await cart.findAll({
        include: wholeItem,
        where:{
          userId:req.body.userId
        }
      })
    );
  });

  async function getCart(user) {
    if (user) {
      return await (
        await cart.findAndCountAll({
          where: {
            userId: user.userId,
          },
        })
      ).count;
    }
    return 0;
  }
  app.get("/logout", function (req, res) {
    console.log("Log Out Route Hit");
    req.session.destroy(function (err) {
      if (err) console.log(err);
    });
    res.send(["hi"])
  });

  app.post(
    "/",
    // wrap passport.authenticate call in a middleware function
    // call passport authentication passing the "local" strategy name and a callback function
    passport.authenticate("local-signin"),
    async function (req, res) {
      res.send({
        token: jwt.sign(req.user.dataValues, req.user.password),
        user: req.user.password,
        cart: await getCart(req.user),
      });
    }
  );
  app.post("/add_to_cart",async function(req,res){
    await cart.create({
      url:req.body.url,
      userId:req.body.userId
    })
    userId = req.body.userId
    res.redirect("/cart")
  })
  app.post("/add_to_items",async function(req,res){

    await wholeItem.create({
      url:req.body.url,
      author:req.body.author,
      name:req.body.name,
      edition:req.body.edition,
      price:req.body.price,
      type:req.body.type,
      category:(await category.findOne({
        where:{
          code:req.body.category
        }
      })).collegeName,
      code:req.body.category,
      numberCode:req.body.numberCode,
      courseName:req.body.courseName
    })
    res.redirect("/item")
  })
  app.post("/search", function(req , res){
    search = req.body.search
    res.redirect("/item")
  })
  app.post("/get_from_category", function(req , res){
    categoryName = req.body.category
    res.redirect("/item");
  })
  app.post("/delete_from_cart" , async function(req,res){

     await cart.destroy({
      where:{
        url:req.body.delete,
        userId: req.body.userId
      }
    })
    userId = req.body.userId
    res.redirect("/cart")
  })
  app.post("/topup" , async function(req, res){
    amount = (await prepaid.findOne({
      where:{
        pinNumber:req.body.topup
      }
    })).amount
    if ((await prepaid.findOne({
      where:{
        pinNumber:req.body.topup
      }
    })).userId == null){
      await user.update({balance:(await user.findOne({
      where:{
        userId:req.body.userId
      }
    })).balance+ await amount} , {
      where:{
        userId:req.body.userId
      }
    })
    res.send(["success" , amount])
    // await prepaid.update({userId:req.body.userId} , {
    //   where:{
    //     pinNumber:req.body.topup
    //   }
    // })
    }
  })

  // // function to call once successfully authenticated

  // function isLoggedIn(req, res, next) {
  //   if (req.isAuthenticated()) return next();
  //   res.redirect("/signin");
  // }
};
