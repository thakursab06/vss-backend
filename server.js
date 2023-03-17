require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");


mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true,
  useUnifiedTopology:true  
 /*useFindAndModify:false,
useCreateIndex:true*/}); 
const db = mongoose.connection;
db.on("error", error => console.log(error));
db.once("open", () => console.log("connection to db established"));

//app.use(express.static(__dirname + '/uploads'));
app.use(express.static(__dirname + '/images'));
app.use(cors());
app.use(express.json());
const salesRouter = require("./routes/sales");
const salesreadymadeRouter = require("./routes/salesreadymade");
const user_managementRouter = require("./routes/user_management");
const adminRouter = require("./routes/admin");
const salesclientRouter = require("./routes/salesclient");
const usersLoginRouter = require("./routes/usersLogin");
const productionheadRouter = require("./routes/productionhead");
app.use("/admin", adminRouter);
app.use("/sales", salesRouter);
app.use("/salesreadymade", salesreadymadeRouter);
app.use("/user_management", user_managementRouter);
app.use("/salesclient", salesclientRouter);
app.use("/usersLogin", usersLoginRouter);
app.use("/productionhead", productionheadRouter);

// ------amit-------
// Require routes
const StockManagementRouter = require("./routes/Stock_Management.js");
const OrderNoticeRouter = require("./routes/OrderNotice");
const BillingRouter = require("./routes/BillingManagement");
var catalogRouter = require("./routes/log");//Import routes for "catalog" area of site
var catalogRouterr = require("./routes/log2");//Import routes for "catalog" area of site

// //**********Api Call***************//

app.use("/Stock_M", StockManagementRouter);
app.use("/OrderNotice", OrderNoticeRouter);
app.use("/BillingManagement", BillingRouter);
app.use('/log', catalogRouter); // Add catalog routes to middleware chain.
app.use('/log2',catalogRouterr);

//-----------nikita------------------

const purchaseManagement = require("./routes/purchaseManagement");
app.use("/purchaseStock",purchaseManagement);
//const addStockRouter = require("./routes/addStock");
//app.use("/addStock", addStockRouter);
const total = require("./routes/total");
app.use("/total",total);
const graph = require("./routes/graph");
app.use("/graph",graph);
const recentOrder = require('./routes/recentOrder');
app.use("/recentOrder",recentOrder);
const peiChart = require('./routes/peiChart');
app.use("/peiChart",peiChart);
const salesManger = require('./routes/salesManger');
app.use("/salesManger",salesManger);
const current = require("./routes/Currentorder");
app.use("/current",current);
const productImg = require("./routes/productImg");
app.use("/images", productImg);
const record = require("./routes/record");
app.use("/record", record);

// Verify Token
function verifyToken(req, res, next) {
    // Get auth header value
    const bearerHeader = req.headers['authorization'];
    // Check if bearer is undefined
    if(typeof bearerHeader !== 'undefined') {
      // Split at the space
      const bearer = bearerHeader.split(' ');
      // Get token from array
      const bearerToken = bearer[1];
      // Set the token
      req.token = bearerToken;
      // Next middleware
      next();
    } else {
      // Forbidden 
      res.sendStatus(403);
    }
  }
app.listen(process.env.PORT,{ useUnifiedTopology: true },() => console.log(`server has started at port ${process.env.PORT}`));