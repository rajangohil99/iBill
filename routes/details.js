const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
const path = require('path')
// Load User model
const Detail = require('../models/Detail');
const { forwardAuthenticated } = require('../config/auth');



//const app = express();

//app.use(express.static(__dirname + './views'));

// vander Page

router.get("/css5", (req, res) => res.sendFile(path.join(__dirname, "/style.css")));

router.get("/css6", (req, res) => res.sendFile(path.join(__dirname, "/style.css")));

router.get("/css7", (req, res) => res.sendFile(path.join(__dirname, "/login-register.css")));



// vendor

// router.post('/vendordetails', (req, res) => {
//   const { cname,cemail,cphone,cgst,cgstnumber,cbilling } = req.body;
//   let errors = [];



//   if (errors.length > 0) {
//     res.render('vendordetails', {
//       cname,cemail,cphone,cgst,cgstnumber,cbilling
//     });
//   } else {
//     Detail.findOne({ cemail: cemail }).then(detail => {
//       if (detail) {
//         errors.push({ msg: 'Email already exists' });
//         res.render('vendordetails', {
//           errors, cname,cemail,cphone,cgst,cgstnumber,cbilling
//         });
//       } else {
//         const newDetail = new Detail({
//           cname,
//           cemail,
//           cphone,
//           cgst,
//           cgstnumber,
//           cbilling
//         });
//             if (err) throw err;
           
//             newDetail
//             .save()
//             .then(detail => {
//                 req.flash(
//                   'success_msg',
//                   'Your records has been saved'
//                 );
//                 res.render('/details/vendorlist-invoices');
//               })
//               .catch(err => console.log(err));
     
        
//       }
//     });
//   }
// });





// for vander page


router.post('/vendorlistinvoices', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/vendorlistinvoices',
    failureRedirect: '/users/login',
    failureFlash: true
  })(req, res, next);
});





module.exports = router;
