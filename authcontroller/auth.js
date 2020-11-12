let passport = require("../config/passport/passport.js");
let path = require("path");
let db = require("../models");
const user = require("../models/user")(db.sequelize, db.Sequelize);
let category = require("../models/category")(db.sequelize, db.Sequelize);
let wholeItem = require("../models/whole_item")(db.sequelize, db.Sequelize);
let cart = require("../models/cart")(db.sequelize, db.Sequelize);
let item = require("../models/items")(db.sequelize, db.Sequelize);
let invoice = require("../models/invoice")(db.sequelize, db.Sequelize);
let root_category = require("../models/root_category")(
  db.sequelize,
  db.Sequelize
);
let prepaid = require("../models/prepaid")(db.sequelize, db.Sequelize);
let search = "";
let userId;
let categoryName = "";
let jwt = require("jsonwebtoken");
var nodemailer = require('nodemailer');
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

  // app.get("/", async (req, res) => {
  //   let lambda = 3.5
  //   let seed = 2
  //   let result = 2
  //   let items = await wholeItem.findAll()
  //   for (let i = 0; i < items.length; ++i) {
  //     for (let a = 0; a < 10000; ++a) {
  //       if (lambda >= 3.9) {
  //         lambda = 3.4
  //       }
  //       lambda += 0.000001
  //       result = Number.parseFloat(Number.parseFloat(result) * Number.parseFloat(lambda) * Number.parseFloat((1 - result)))
  //       if (result < -2147483647 || result > 2147483647) {
  //         result = ++seed
  //       }
  //       console.log(Number.parseInt(result))
  //       while(await item.findOne({
  //         where: {
  //           itemId: Math.abs(Number.parseInt(result)),
  //           url: items[i].url
  //         }
  //       })){
  //         ++result
  //       }
  //       await item.create({
  //           itemId: Math.abs(result),
  //           url: items[i].url
  //         })
  //     }
  //   }
  //   res.send("hi")
  // })

  app.post("/category", async function (req, res) {
    res.send(await category.findAll({
      where: {
        collegeName: req.body.name
      }
    }));
  });
  app.get("/root_category", async function (req, res) {
    res.send(await root_category.findAll());
  });
  app.get("/item", async function (req, res) {
    if (categoryName != "") {
      res.send(
        await wholeItem.findAll({
          where: {
            category: {
              [db.Sequelize.Op.like]: "%" + categoryName + "%",
            },
          },
        })
      );
      categoryName = "";
    } else if (search != "") {
      res.send(
        await wholeItem.findAll({
          where: {
            [db.Sequelize.Op.or]: [
              {
                name: {
                  [db.Sequelize.Op.like]: "%" + search + "%",
                },
              },
              {
                author: {
                  [db.Sequelize.Op.like]: "%" + search + "%",
                },
              },
              {
                category: {
                  [db.Sequelize.Op.like]: "%" + search + "%",
                },
              },
              {
                code: {
                  [db.Sequelize.Op.like]: "%" + search + "%",
                },
              },
              {
                numberCode: {
                  [db.Sequelize.Op.like]: search + "%",
                },
              },
              {
                courseName: {
                  [db.Sequelize.Op.like]: "%" + search + "%",
                },
              },
            ],
          },
        })
      );
      search = "";
    } else {
      res.send(await wholeItem.findAll());
    }
  });
  app.post("/user", async function (req, res) {
    if (!req.body.token) {
      res.send({ userId: "" });
    } else {
      res.send(jwt.verify(req.body.token, req.body.key));
    }
  });
  app.get("/numberOfItems", async function (req, res) {
    res.send((await getCart(req.body)).toString());
  });
  app.post("/numberOfItems", async function (req, res) {
    res.send((await getCart(req.body)).toString());
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
        where: {
          userId: userId,
        },
      })
    );
    userId = undefined;
  });
  app.post("/cart", async function (req, res) {
    if (!req.body.userId) {
      res.send({ userId: "" });
      return;
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
        where: {
          userId: req.body.userId,
        },
      })
    );
  });


/**
 * 
 * @param {string} user 
 * @description numbers of items in the cart
 */
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
    res.send(["hi"]);
  });

  app.post(
    "/",
    // wrap passport.authenticate call in a middleware function
    // call passport authentication passing the "local" strategy name and a callback function
    passport.authenticate("local-signin"),
    async function (req, res) {
      console.log(req.user)
      res.send({
        token: jwt.sign(req.user.dataValues, req.user.password),
        user: req.user.password,
        cart: await getCart(req.user),
      });
    }
  );
  app.post("/add_to_cart", async function (req, res) {
    let error
    await cart.create({
      url: req.body.url,
      userId: req.body.userId,
    }).catch(function (err) {
      error = err
      res.send([err])
    });

    if (!error) {
      userId = req.body.userId;
      res.redirect("/cart");
    } else {
      error = undefined
    }

  });
  app.post("/add_to_items", async function (req, res) {
    await wholeItem.create({
      url: req.body.url,
      author: req.body.author,
      name: req.body.name,
      edition: req.body.edition,
      price: req.body.price,
      type: req.body.type,
      category: (
        await category.findOne({
          where: {
            code: req.body.category,
          },
        })
      ).name,
      code: req.body.category,
      numberCode: req.body.numberCode,
      courseName: req.body.courseName,
    });
    res.redirect("/item");
  });
  app.post("/search", function (req, res) {
    search = req.body.search;
    res.redirect("/item");
  });
  app.post("/get_from_category", function (req, res) {
    categoryName = req.body.category;
    res.redirect("/item");
  });
  app.post("/delete_from_cart", async function (req, res) {
    await cart.destroy({
      where: {
        url: req.body.delete,
        userId: req.body.userId,
      },
    });
    userId = req.body.userId;
    res.redirect("/cart");
  });
  app.post("/topup", async function (req, res) {
    let topup = await prepaid.findOne({
      where: {
        pinNumber: req.body.topup,
      },
    })
    if (topup && topup.userId == null
    ) {
      await user.update(
        {
          balance:
            (
              await user.findOne({
                where: {
                  userId: req.body.userId,
                },
              })
            ).balance + (await amount),
        },
        {
          where: {
            userId: req.body.userId,
          },
        }
      );
      await prepaid.update(
        { userId: req.body.userId },
        {
          where: {
            pinNumber: req.body.topup,
          },
        }
      );
      res.send(["success", amount]);
    } else {
      res.send(["failure"]);
    }
  });



  app.post("/edit_item", async (req, res) => {
    let wholeItemObject = {}
    let item = await wholeItem.findOne({
      where: {
        url: req.body.url
      }
    })
    if (req.body.price) {
      wholeItemObject["price"] = req.body.price
    } else if (!req.body.price) {
      wholeItemObject["price"] = item.price
    } if (req.body.courseName) {
      wholeItemObject["courseName"] = req.body.courseName
    } else if (!req.body.courseName) {
      wholeItemObject["courseName"] = item.courseName
    } if (req.body.edition) {
      wholeItemObject["edition"] = req.body.edition
    } else if (!req.body.edition) {
      wholeItemObject["edition"] = item.edition
    } if (req.body.type) {
      wholeItemObject["type"] = req.body.type
    } else if (!req.body.type) {
      wholeItemObject["type"] = item.type
    } if (req.body.category) {
      wholeItemObject["category"] = req.body.category
    } else if (!req.body.category) {
      wholeItemObject["category"] = item.category
    } if (req.body.numberCode) {
      wholeItemObject["numberCode"] = req.body.numberCode
    } else if (!req.body.numberCode) {
      wholeItemObject["numberCode"] = item.numberCode
    }
    await item.update(wholeItemObject)
    res.redirect("/item")
  })

  app.post("/delete_from_items", async (req, res) => {
    await wholeItem.destroy({
      where: {
        url: req.body.url
      }
    })
    res.redirect("/item")
  })

  app.post("/check_available" , async (req , res) => {
    let notAvailable = []
    for(let i = 0 ; i < req.body.items.length ; ++i){
      if (await !item.findOne({
        where:{
          url:req.body.items[i].url
        }
      })){
        notAvailable.push(req.body.items[i].url)
      }
    }
    console.log(notAvailable)
    res.send(notAvailable)
  })

  app.post("/procced" , async (req , res) => {
    let theUser = await user.findOne({
      where:{
        userId:req.body.userId
      }
    })
    if (theUser.balance < req.body.total){
      res.send(["sorry you dont have enough money"])
      return
    }
    let lastInvoice = await invoice.findAll()
    
    let invoiceInstance 
    let cartitems = await cart.findAll({
      where:{
        userId:req.body.userId
      }
    })
    let done = cartitems.length
    let messageText = ""
    let total = 0
    for(let i = 0 ; i< cartitems.length ; ++i){
      let itemInCart = await wholeItem.findOne({
        where:{
          url:cartitems[i].url
        }
      })
      let theItem = await item.findOne({
        where:{
          url:cartitems[i].url,
          userId:null
        }
      })
      await theItem.update({userId:req.body.userId})
      if (theItem.userId){
        total+= itemInCart.price
        if (!invoiceInstance){ 
        invoiceInstance = await invoice.create({
          invoiceId:lastInvoice.length,
          totalPrice:total,
          userId:req.body.userId,
          date:new Date()
        })
        await theItem.update({invoiceId:invoiceInstance.invoiceId})
      }else {
        await invoiceInstance.update({totalPrice:total})
        await theItem.update({invoiceId:invoiceInstance.invoiceId})
      }
      await theUser.update({balance: theUser.balance - total})
      await cart.destroy({
        where:{
          url:cartitems[i].url,
          userId:req.body.userId
        }
      })
      if (!messageText){
        messageText += "#" +  invoiceInstance.invoiceId + "\n" + invoiceInstance.date + "\n" + "owner:" + theUser.userId + "\n" + "item:" + itemInCart.name + " " + itemInCart.price + "SAR" + "\n"
      }else{
        messageText+= "item:" + itemInCart.name + " " + itemInCart.price + "SAR" + "\n"
      }
      --done
      }
    }
    // if (done == 0){
    //   let transporter = nodemailer.createTransport({
    //     service: 'gmail',
    //     auth: {
    //       user: 'alaneef.kiils@gmail.com',
    //       pass: '12a n f012345'
    //     }
    //   })
    //   let message = {
    //     from: 'alaneef.kiils@gmail.com',
    //     to: '437101985@student.ksu.edu.sa',
    //     subject: 'Sending Email using Node.js',
    //     text: messageText
    //   }
    //   transporter.sendMail(message , (err , info)=> {
    //     console.log(err)
    //     
    //   })
    // }
    userId = req.body.userId
    res.redirect(cart)
  })


  app.post("/get_invoices" , async (req , res)=>{
    res.send(await invoice.findAll({
      where:{
        userId:req.body.userId
      }
    }))
    
  })

  // // function to call once successfully authenticated

  // function isLoggedIn(req, res, next) {
  //   if (req.isAuthenticated()) return next();
  //   res.redirect("/signin");
  // }
};
