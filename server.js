var express = require('express'),
    path = require('path'),
    nodemailer = require('nodemailer'),
    fs = require('fs'),
    https = require("https"),
    bodyParser = require('body-parser'),
    mysql = require('mysql'); // ,
    // multer = require('multer'); //,
//request = require('request'),
//cors = require('cors');

/*const ssl_options = {
    key: fs.readFileSync("/etc/letsencrypt/live/cleanclassy.com/privkey.pem"),
    cert: fs.readFileSync("/etc/letsencrypt/live/cleanclassy.com/fullchain.pem")
  };*/

var app = express();
var staticRoot = __dirname + '/';

app.set('port', (process.env.PORT || 3010));

app.use(express.static(staticRoot));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
    //app.use(cors());

var json = {
    "name": "Test",
    "email": "test@xxxx.in",
    "phone": "989898xxxx"
};

var options = {
    url: 'https://api-mean.herokuapp.com/api/contacts',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    json: json
};

const imageFilter = function(req, file, cb) {
    // accept image only
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
        return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
};

app.get('/about', function (req, res) {
    // conole.log('requesting about page');
    fs.createReadStream(staticRoot + '__aboutus.html').pipe(res);
})

app.get('/contact', function (req, res) {
    // conole.log('requesting contact page');
    fs.createReadStream(staticRoot + '__contactus.html').pipe(res);
})

app.get('/portfolio', function (req, res) {
    // conole.log('requesting portfolio page');
    fs.createReadStream(staticRoot + '__portfolio.html').pipe(res);
})

app.get('/services', function (req, res) {
    // conole.log('requesting portfolio page');
    fs.createReadStream(staticRoot + '__services.html').pipe(res);
})

app.get('/team', function (req, res) {
    // conole.log(req.path);
    // conole.log('requesting team page');
    fs.createReadStream(staticRoot + '__team.html').pipe(res);
});


app.get('/syear', function (req, res) {
    var myear = new Date().getFullYear();
    res.json({year: myear});
    
});


app.post('/sendmail', function (req, res) {
    var cred = {
        //service: 'gmail',
        host: "smtp.live.com",
        port: 587,
        secure: false,
        auth: {
          user: 'segxy2708@hotmail.com',
          pass: 'se0103?2015gun'
        }
      };
    var transporter = nodemailer.createTransport(cred);
      console.log(cred.auth.pass);
      // var mailOptions = mailOptions;
      console.log(req.body);
      transporter.sendMail(req.body, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
          res.json(info);
        }
      });
    
});

app.get('/.well-known/acme-challenge/ze-PRqixpXjGN_miG4pWocluPzI1HO9ABUWwh_E8-gI', function (req, res) {
    // conole.log('requesting about page');
    var filePath = path.join(__dirname, 'freessl/ze-PRqixpXjGN_miG4pWocluPzI1HO9ABUWwh_E8-gI');
    var stat = fs.statSync(filePath);

    res.writeHead(200, {
        'Content-Type': 'text/plain',
        'Content-Length': stat.size
    });

    var readStream = fs.createReadStream(filePath);
    // We replaced all the event handlers with a simple call to readStream.pipe()
    readStream.pipe(res);
    //fs.createReadStream(staticRoot + '__aboutus.html').pipe(res);
});

app.get('/.well-known/acme-challenge/9pUWYU-ClJZ18PMcEU3wWVbsF5ckkhDawS7EjsNhy4g', function (req, res) {
    // conole.log('requesting about page');
     var filePath = path.join(__dirname, 'freessl/9pUWYU-ClJZ18PMcEU3wWVbsF5ckkhDawS7EjsNhy4g');
    var stat = fs.statSync(filePath);

    res.writeHead(200, {
        'Content-Type': 'text/plain',
        'Content-Length': stat.size
    });

    var readStream = fs.createReadStream(filePath);
    // We replaced all the event handlers with a simple call to readStream.pipe()
    readStream.pipe(res);
    //fs.createReadStream(staticRoot + '__aboutus.html').pipe(res);
});

app.get('/.well-known/acme-challenge/A3YskfN4rXc3svUv_dHTh1dCSIJB2lQ3zLSfRmbXfiw', function (req, res) {
    // conole.log('requesting about page');
    var filePath = path.join(__dirname, 'freessl/A3YskfN4rXc3svUv_dHTh1dCSIJB2lQ3zLSfRmbXfiw');
    var stat = fs.statSync(filePath);

    res.writeHead(200, {
        'Content-Type': 'text/plain',
        'Content-Length': stat.size
    });

    var readStream = fs.createReadStream(filePath);
    // We replaced all the event handlers with a simple call to readStream.pipe()
    readStream.pipe(res);
    //fs.createReadStream(staticRoot + '__aboutus.html').pipe(res);
});


/*var storage = multer.diskStorage({ //multers disk storage settings
    destination: function(req, file, cb) {
        cb(null, './prodimg/');
    },
    filename: function(req, file, cb) {
        var datetimestamp = Date.now();
        cb(null, file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length - 1]);
    },
    imageFilter
});

var csvstorage = multer.diskStorage({ //multers disk storage settings
    destination: function(req, file, cb) {
        cb(null, './csv/');
    },
    filename: function(req, file, cb) {
        var datetimestamp = Date.now();
        cb(null, file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length - 1]);
    },
    imageFilter
});

var upload = multer({ //multer settings
    storage: storage
}).single('file');

var uploadcsv = multer({ //multer settings
    storage: csvstorage
}).single('file');


app.get('/upload', function(req, res) {
    res.json('me');
})

app.get('/csv_upload', function(req, res) {
    res.json('me');
})*/

var router = express.Router();
/** API path that will upload the files */
/*app.post('/upload', function(req, res) {
    // conole.log('uploading file');
    upload(req, res, function(err) {
        // conole.log(req.file);
        if (err) {
            // conole.log('error uploading file');
            res.json({ error_code: 1, err_desc: err });
            return;
        }
        // conole.log('file successfully uploaded');
        res.json({ error_code: 0, err_desc: null, request: req.file });

    });
});

app.post('/csv_upload', function(req, res) {
    // conole.log('uploading csv file');
    upload(req, res, function(err) {
        // conole.log(req.file);
        if (err) {
            // conole.log('error uploading file');
            res.json({ error_code: 1, err_desc: err });
            return;
        }
        // conole.log('file successfully uploaded');
        res.json({ error_code: 0, err_desc: null, request: req.file });

    });
});*/

app.use(function(req, res, next) {
    /*res.setHeader("Access-Control-Allow-Methods", "POST, PUT, OPTIONS, DELETE, GET");
    res.header("Access-Control-Allow-Origin", app.get('port'));
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Credentials", true);*/
    // if the request is not html then move along
    var accept = req.accepts('html', 'json', 'xml');
    if (accept !== 'html') {
        return next();
    }

    // if the request has a '.' assume that it's for a file, move along
    var ext = path.extname(req.path);
    if (ext !== '') {
        return next();
    }
    // conole.log(req.originalUrl)
    if (req.originalUrl == '/a-solidarity-letter-to-all-mean-and-scornful-humans-of-nigeria'){
        res.redirect('http://blog.seekerslocus.com/' + req.path);
    }
    // conole.log('me');

    fs.createReadStream(staticRoot + 'index.html').pipe(res);

});


//app.all('/*', function(req, res, next) {
//    res.sendFile('index.html', { root: __dirname + '/' });
//});

app.listen(app.get('port'), function() {
    // conole.log('app running on port', app.get('port'));
});

//https.createServer(ssl_options, app).listen(app.get('port'));