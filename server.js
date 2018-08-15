const express = require('express'),
  path = require('path'),
  bodyParser = require('body-parser'),
  cors = require('cors'),
  mongoose = require('mongoose');
  //config = require('/CONFIG/DB');

var morgan = require('morgan');
var passport = require('passport');
const multer = require('multer');
const fs = require('fs');
const http = require('http');
mongoose.Promise = require('bluebird');
const socketIO = require('socket.io');
var config ={
  secret:'istanbul',
  DB: "mongodb://localhost:27017/istanbul"
}
mongoose.connect(config, {
  promiseLibrary: require('bluebird'),
  useNewUrlParser: true
}).then(
  () => {
    console.log('Database is connected')
  },
  err => {
    console.log('Can not connect to the database' + err)
  }
);



var api = require('./routes/api');
const LocationsRoutes = require('./routes/locations.routes');
const LocationsCategoriesRoutes = require('./routes/locationsCategories.routes');
const AreasRoutes = require('./routes/areas.routes');
const RatingLocationsRoutes = require("./routes/RatingLocation.routes");

//const ImagesRoutes = require('./routes/images.routes');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  'extended': 'false'
}));
app.use(cors());
const port = process.env.PORT || 4000;
app.use(passport.initialize());

app.use('/api', api);
app.use('/locations', LocationsRoutes);
app.use('/locationsCategories', LocationsCategoriesRoutes);
app.use('/RatingLocation', RatingLocationsRoutes);
app.use('/areas', AreasRoutes);
// app.use('/images',ImagesRoutes);
//images start
const DIR = './uploads';

let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, DIR);
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});
let upload = multer({
  storage: storage
});

 app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
  


  res.setHeader('Access-Control-Allow-Methods', 'POST');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
}); 
app.use('/uploads', express.static(process.cwd() + '/uploads'));
app.use(express.static(path.join(__dirname, 'dist')));

app.get('*',(req,res) => res.sendFile(path.join(__dirname+'/dist/index.html')));
app.get('/api', function (req, res) {
  res.end('file catcher example');
});


app.post('/api/upload', upload.single('photo'), function (req, res) {
  if (!req.file) {
    console.log("No file received");
    return res.send({
      success: false
    });

  } else {
    console.log(req.file.filename);
    return res.send({
      filename: req.file.filename,
      path: req.file.port
    })
  }
});
// images done
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  // process.exit();
  next(err);

});

app.use(function (req, res, next) {
  var err = new Error(res);
  err.status = 404;
  //res.status(404).end('error');

  next(err);

});
const server = http.createServer(app);
const io = socketIO(server);
io.origins('*:*')
app.set('io', io);



server.listen(port);
