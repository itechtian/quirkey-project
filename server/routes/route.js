const express = require('express');
const router = express.Router();
const passport = require('passport');
const getFetch = require('node-fetch');
const { response } = require('express');

// const steaminventory = require('get-steam-inventory');
const apiKey = 'sl46z_uS2oHVc-5EDAkghaVe9Kg'


router.get('/', (req, res) => {
        res.render('jackPortV', ({user:req.user}));
 
}) 

router.get('/coinflip', (req, res) => {
    res.render('coinflip', ({user:req.user}))
})

router.get('/inventory', (req, res) => {

    const inventory_api = `https://api.steamapis.com/steam/inventory/ ${req.user.id}/730/2?api_key=${apiKey}`

    getFetch(inventory_api).then(response => response.json()).then(data => {
        inventory = data
        console.log(inventory)
    }).catch(eer => {
        console.log(eer)
    })
    res.render (({user:req.user}))
})

// router.get('/getinventory', (req, res) => {
   
//     res.render('coinflip', ({user:req.user}))
// })

router.get('/myinfo', (req, res) => {
    const api = "./api.json"
    getFetch(api).then(response => response.json()).then(data => {
        console.log(data)
    })
})


 
router.get('/logout', function(req, res){
    req.logout();
    res.redirect('/');
  });

// GET /auth/steam
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  The first step in Steam authentication will involve redirecting
//   the user to steamcommunity.com.  After authenticating, Steam will redirect the
//   user back to this application at /auth/steam/return
router.get('/auth/steam',
    passport.authenticate('steam', { failureRedirect: '/' }),
    function (req, res) {
        res.redirect('/');
    });

// GET /auth/steam/return
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  If authentication fails, the user will be redirected back to the
//   login page.  Otherwise, the primary route function function will be called,
//   which, in this example, will redirect the user to the home page.
router.get('/auth/steam/return',
    // Issue #37 - Workaround for Express router module stripping the full url, causing assertion to fail 
    function (req, res, next) {
        req.url = req.originalUrl;
        next();
    },
    passport.authenticate('steam', { failureRedirect: '/' }),
    function (req, res) {
        res.redirect('/');
    });







 


//jackport[0]



//jackport[1]



//coinflip[2]



module.exports = router;