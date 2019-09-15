'use strict';

let emailTargets  = 'input[name=email], input[id=email], .email';
let emailFields   = document.querySelectorAll(emailTargets);

if (emailFields.length) {
  let storage   = chrome.storage.local;
  let email     = {
      address: 'test+',
      domain: 'mail.com'
  };

  storage.get('emailSettings', function(data) {
      if (typeof data.emailSettings !== 'undefined') {
          email.address   = data.emailSettings.address;
          email.domain    = data.emailSettings.domain;

          if (data.emailSettings.inactive) {
            return;
          }
      }

      let fillEmail = email.address + new Date().getTime() + '@' + email.domain;
      emailFields.forEach(function(field) {
          field.value = fillEmail;
      });
  });
}