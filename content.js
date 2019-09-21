'use strict';

let emailFields     = document.querySelectorAll('input[name*=email], input[id*=email], input[class*=email]');
let nameFields      = document.querySelectorAll('input[name*=name], input[id*=name], input[class*=name]');
let passwordFields  = document.querySelectorAll('input[name*=password], input[id*=password], input[class*=password], input[name*=pass], input[id*=pass], input[class*=pass]');
let phoneFields     = document.querySelectorAll('input[name*=phone], input[id*=phone], input[class*=phone]');

if (emailFields.length) {
  let storage   = chrome.storage.local;
  let email     = {
      address: 'test+',
      domain: 'mail.com'
  };

  storage.get('emailSettings', function(data) {
      if (typeof data.emailSettings !== 'undefined') {
          if (data.emailSettings.inactive) {
            return;
          }

          email.address   = data.emailSettings.address;
          email.domain    = data.emailSettings.domain;
          email.name      = data.emailSettings.name;
          email.password  = data.emailSettings.password;
          email.phone     = data.emailSettings.phone;
      }

      let fillEmail = email.address + new Date().getTime() + '@' + email.domain;
      emailFields.forEach(function(field) {
          if (!field.value.length) {
            field.value = fillEmail;
          }
      });

      if (email.name.length) {
        nameFields.forEach(function(field) {
          if (!field.value.length) {
            field.value = email.name;
          }
        });
      }

      if (email.password.length) {
        passwordFields.forEach(function(field) {
          if (!field.value.length) {
            field.value = email.password;
          }
        });
      }

      if (email.phone.length) {
        phoneFields.forEach(function(field) {
          if (!field.value.length) {
            field.value = email.phone;
          }
        });
      }
  });
}