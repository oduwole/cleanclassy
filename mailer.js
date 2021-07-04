var Q = require('q'), 
nodemailer = require('nodemailer'),
emailTemplates = require('email-templates'),
sendMailTransport = require('nodemailer-smtp-transport');

module.exports = {
    _template: null, 
    _transport: null,

    init: function (config) {
        var d = Q.defer();
     
        new emailTemplates(config.emailTplsDir, function (err, template) {
          if (err) {
            return d.reject(err);
          }
     //console.log(process.env.PASS);
          this._template = template;
          this._transport = nodemailer.createTransport(
            {
                //service: 'gmail',
                //host: "smtp.live.com",
                host:'smtp.zoho.com',
                //port: 587,
                port: 465,
                secure: true,
                //secure: false,
                auth: {
                  /*user: 'segxy2708@hotmail.com',
                  pass: 'se0103?2015gun'*/
                  user: 'info@cleanclassy.com',
                  pass: 'Classy22$'
                }}
              /*{ 
              host: process.env.HOST,
              port: process.env.PORT,
              secure: process.env.SECURE,
              //service: process.env.SERVICE,
              auth: { user: process.env.USERNAME, pass: process.env.PASS } }*/
              );
          return d.resolve();
        }.bind(this));
     
        return d.promise;
      },
     
      send: function (from, to, subject, text, html) {
        var d = Q.defer();
        var params = {
          from: from, 
          to: to,
          subject: subject,
          text: text
        };
     
        if (html) {
          params.html = html;
        }
     
        this._transport.sendMail(params, function (err, res) {
          if (err) {
            console.error(err);
            return d.reject(err);
          } else {
            return d.resolve(res);
          }
        });
     
        return d.promise;
      },
     
      sendMail: function (from, to, subject, tplName, locals) {
        var d = Q.defer();
        var self = this;
        this.init({ emailTplsDir: "email-templates" }).then(function () {
          this._template(tplName, locals, function (err, html, text) {
            if (err) {
              console.error(err);
              return d.reject(err);
            }
     
            self.send(from, to, subject, text, html)
              .then(function (res) {
                return d.resolve(res);
              });
          });
        }.bind(this));
     
        return d.promise;
      }
  }; 