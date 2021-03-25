const express = require('express');
//const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const passport = require('passport');
const flash = require('connect-flash');
const session = require('express-session');
const path = require('path');

const Detail = require('./models/Detail');
const emp = Detail.find({});

const Expense = require('./models/Expense');
const exp = Expense.find({});

const Bill = require('./models/Bill');
const exb = Bill.find({});



// const Expense = require('../trying/models/Expense');
// const exp = Expense.find({});


const app = express();



// Passport Config
require('./config/passport')(passport);


// DB Config
const db = require('./config/keys').mongoURI;

// Connect to MongoDB
mongoose
  .connect(
    db,
    { useNewUrlParser: true ,useUnifiedTopology: true}
  )
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));


// EJS
app.use(express.static(__dirname + '/views'));
//app.use(expressLayouts);
app.set('view engine', 'ejs');
app.use( express.static( "public" ) );

// Express body parser
app.use(express.urlencoded({ extended: true }));

// Express session
app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect flash
app.use(flash());

// Global variables
app.use(function(req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});

// Routes
app.use('/', require('./routes/index.js'));
app.use('/users', require('./routes/users.js'));
app.use('/details', require('./routes/details.js'));

//vendor details to GET with css
app.get('/vendor-details', (req, res) => res.render('vendor-details'));
app.get('/vendor-list-invoices', (req, res) => res.render('vendor-list-invoices'));
app.get('/vendor-dash', (req, res) => res.render('vendor-dash'));
app.get('/vendor-create-invoices', (req, res) => res.render('vendor-create-invoices'));
app.get("/css5", (req, res) => res.sendFile(path.join(__dirname, "/style.css")));

app.get('/consumer-add-personal-expense', (req, res) => res.render('consumer-add-personal-expense'));
app.get('/vendor-create-bill', (req, res) => res.render('vendor-create-bill'));

//vendor details to POST

app.post('/insertDb',(req,res)=>{
  var newDoc = new Detail({
    cname: req.body.cname,
    cemail: req.body.cemail,
    cphone: req.body.cphone,
    cgstnumber: req.body.cgstnumber,
    cbilling:req.body.cbilling
  })
 
  newDoc.save((err,data)=>{
    if(err) console.log(err);
    else console.log("Data inserted")
     
  })
  console.log(newDoc)
  // res.render('try');

  emp.exec(function(err,data){
    if(err) throw err;
    res.render('try',{ title: 'data' , records:data});
  })
})

app.get('/record',(req,res)=>{
  emp.exec(function(err,data){
    if(err) throw err;
    res.render('try',{ title: 'data' , records:data});
  })
})


app.get('/delete/:id',function(req,res,next) {
  var id=req.params.id;
  var del = Detail.findByIdAndDelete(id)
  
    del.exec(function(err){
      if(err) throw err;
      res.redirect("/record");
    })
  })
  


  ///edit page
  
  app.get('/edit/:id',function(req,res,next) {
    var id=req.params.id;
    var edit = Detail.findByIdAndUpdate(id)
    
      edit.exec(function(err,data){
        if(err) throw err;
        res.render('edit',{ title: 'edit data' , records:data});
      })
    })    
      app.get('/done',(req,res)=>{
        emp.exec(function(err,data){
          if(err) throw err;
          res.render('try',{ title: 'data' , records:data});
        })
      })
      

      app.post('/update',function(req,res,next) {
       
        var update = Detail.findByIdAndUpdate(req.body.id,{
          cname: req.body.cname,
    cemail: req.body.cemail,
    cphone: req.body.cphone,
    cgstnumber: req.body.cgstnumber,
        });
        
        update.exec(function(err){
            if(err) throw err;
            res.redirect("/done")
          })
        })


        //for non authorize users

 app.get('/customer',(req,res)=>{
   res.render('consumer-add-personal-expense')
 })


//  app.get('/done',(req,res)=>{
//   exp.exec(function(err,data){
//     if(err) throw err;
//     res.render('consumer-list-non-auth-expense',{ title: 'data' , records:data});
//   })
// })

//for personal edit

app.post('/insertPersonal',(req,res)=>{
  var newPer = new Expense({
    pname: req.body.pname,
    pprice: req.body.pprice,
    pquantity: req.body.pquantity,
    ptotal: parseInt(req.body.pprice)* parseInt(req.body.pquantity)
  })
 
  newPer.save((err,data)=>{
    if(err) console.log(err);
    else console.log("Data inserted")
     
  })
  console.log(newPer)
  // res.render('try');

 exp.exec(function(err,data){
    if(err) throw err;
    res.render('consumer-list-non-auth-expense',{ title: 'data' , records:data});
  })
})

app.get('/personaldata',(req,res)=>{
  exp.exec(function(err,data){
    if(err) throw err;
    res.render('consumer-list-non-auth-expense',{ title: 'data' , records:data});
  })
})


app.get('/deleteinsert/:id',function(req,res,next) {
  var personalid=req.params.id;
  var dele = Expense.findByIdAndDelete(personalid)
  
    dele.exec(function(err){
      if(err) throw err;
      res.redirect("/personaldata");
    })
  })

  app.get('/editinsert/:id',function(req,res,next) {
    var personalid=req.params.id;
    var edite = Expense.findById(personalid)
    
      edite.exec(function(err,data){
        if(err) throw err;
        res.render('edit-personal',{ title: 'edit data' , records:data});
      })
    })

    app.get('/personaldata',(req,res)=>{
      exp.exec(function(err,data){
        if(err) throw err;
        res.render('consumer-list-non-auth-expense',{ title: 'data' , records:data});
      })
    })
    
    app.post('/updatePersonal',function(req,res,next) {
     
      var updatep = Expense.findByIdAndUpdate(req.body.id,{
        pname: req.body.pname,
        pprice: req.body.pprice,
        pquantity: req.body.pquantity,
        ptotal: parseInt(req.body.pprice)* parseInt(req.body.pquantity)
      });
      
      updatep.exec(function(err){
          if(err) throw err;
          res.redirect("/personaldata")
        })
      })

     

// for bills to enter

app.get('/bill',(req,res)=>{
  res.render('vendor-create-bill')
})

app.post('/insertBill',(req,res)=>{
  var newBill = new Bill ({
    bnumber: req.body.bnumber,
    bname: req.body.bname,
    bquantity: req.body.bquantity,
    bprice: req.body.bprice,
    btotal: parseInt(req.body.bprice)* parseInt(req.body.bquantity)
  })
 
  newBill.save((err,data)=>{
    if(err) console.log(err);
    else console.log("Data inserted")
     
  })
  console.log(newBill)
  // res.render('try');

  exb.exec(function(err,data){
    if(err) throw err;
    res.render('vendor-list-bills',{ title: 'data' , records:data});
  })
})

app.get('/recordbill',(req,res)=>{
  exb.exec(function(err,data){
    if(err) throw err;
    res.render('vendor-list-bills',{ title: 'data' , records:data});
  })
})


app.get('/deletebill/:id',function(req,res,next) {
  var id=req.params.id;
  var delb = Bill.findByIdAndDelete(id)
  
    delb.exec(function(err){
      if(err) throw err;
      res.redirect("/recordbill");
    })
  })
  


  ///edit page
  
  app.get('/editbill/:id',function(req,res,next) {
    var id=req.params.id;
    var editb = Bill.findByIdAndUpdate(id)
    
      editb.exec(function(err,data){
        if(err) throw err;
        res.render('edit-bill',{ title: 'edit data' , records:data});
      })
    })    
      app.get('/donebill',(req,res)=>{
        exb.exec(function(err,data){
          if(err) throw err;
          res.render('vendor-list-bills',{ title: 'data' , records:data});
        })
      })
      

      app.post('/updatebill',function(req,res,next) {
       
        var updateb = Bill.findByIdAndUpdate(req.body.id,{
          bnumber: req.body.bnumber,
          bname: req.body.bname,
          bquantity: req.body.bquantity,
          bprice: req.body.bprice,
          btotal: parseInt(req.body.bprice)* parseInt(req.body.bquantity)
        });
        
        updateb.exec(function(err){
            if(err) throw err;
            res.redirect("/donebill")
          })
        })


app.listen(4000)
