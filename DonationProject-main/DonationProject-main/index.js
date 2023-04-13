const express = require('express');
const cookieParser = require('cookie-parser');
// const dotenv = require('dotenv');
// dotenv.config();
const app = express();
const port = 8000;
const homeController = require('./controllers/home_controller');
const aboutController = require('./controllers/about_controller');
const contactController = require('./controllers/contact_controller');
const volunteerController = require('./controllers/volunteer_controller');
const brandPartnersController = require('./controllers/brandPartners_controller');
const usersController = require('./controllers/user_controller');
const donateController = require('./controllers/donate_controller');

const donateProceedController = require('./controllers/donateProceed_controller');
const faqController = require('./controllers/faq_controller');
const termsController = require('./controllers/terms_controller');
const fundRaiserController = require('./controllers/fundRaiser_controller');
const freeFundRaiserController = require('./controllers/freeFundRaiser_controller');
const privacyPolicyController = require('./controllers/privacyPolicy_controller');
const raisecontroller = require('./controllers/raise_controller');
const ngoPartnersController = require('./controllers/ngoPartners_controller');
const expressLayouts = require('express-ejs-layouts');
// const db = require('./config/mongoose');
const Users = require('./models/user');
const Faqs = require('./models/faqs');

const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
// const passportJWT = require('./config/passport-jwt-strategy');
const passportGoogle = require('./config/passport-google-oauth2-strategy');
const { response } = require('express');
const MongoStore = require('connect-mongo')(session);
var router = require('./routes/index');

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static('./assets'));

app.use(expressLayouts);
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

app.set('view engine', 'ejs');
app.set('views', './views');

app.use(session({
    name: 'codial',
    // TODO change the secret before deployment 
    secret: 'secrets',
    saveUninitialized: false,
    resave: false,
    cookie: {
        // No. in miliseconds
        maxAge: (1000*60*100)
    },
    // store: new MongoStore(
    //     {
    //         mongooseConnection: db,
    //         autoRemove: 'disabled'
    //     }, function(err){
    //     console.log(err || 'connect-mongodb setup ok');
    // })
}));


app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

app.get('/',(request,response)=>{
    response.render('home');
})
app.get('/home',(request,response)=>{
    response.render('home');
})
app.get('/contact',(request,response)=>{
    response.render('contact');
})
app.get('/about',(request,response)=>{
    response.render('about');
})
app.get('/donate',(request,response)=>{
    response.render('donate');
})
app.get('/faq',(request,response)=>{
    response.render('faq');
})
app.get('/fundRaiser',(request,response)=>{
    response.render('fundRaiser');
})
app.get('/termsOfServices',(request,response)=>{
    response.render('terms_of_services');
})

app.get('/volunteer',(request,response)=>{
    response.render('volunteer');
})

app.get('/privacyPolicy',(request,response)=>{
    response.render('privacy');
})
app.get('/donateProceed',(request,response)=>{
    response.render('donateProceed');
})
app.get('/ngoPartners',(request,response)=>{
    response.render('ngoPartners');
})
app.get('/brandPartners',(request,response)=>{
    response.render('brandPartners');
})

app.get('/users/sign-in',(request,response)=>{
    response.render('user_sign_in');
})

app.get('/users/sign-up',(request,response)=>{
    response.render('user_sign_up');
})

app.get('/users/editProfile/:id',(request,response)=>{
    response.render('editProfile');
})

app.post('/users/create', usersController.create);

app.post('/users/createSession', passport.authenticate(
    'local',
    {failureRedirect: '/users/sign-in'},
 ) ,usersController.createSession);

app.get('/users/sign-out', usersController.destroySession);


app.get('/donate/proceed', (request,response)=>{
    response.render('editProfile');
});
app.post('/donate/donationDetails', donateController.donationDetails);

app.get('/users/auth/google', passport.authenticate('google', {scope: ['profile', 'email']}));
app.get('/users/auth/google/callback', passport.authenticate('google', {failureRedirect: '/users/sign-in'}), usersController.createSession);


// app.use('/', homeController.home);

app.listen(8000, function(err){
    if(err){
        console.log(`Error in running the server ${err}`);
    }
    console.log(`Listening on port 8000`);
});