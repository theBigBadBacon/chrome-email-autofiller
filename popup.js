'use strict';

document.addEventListener('DOMContentLoaded', function() {
    var storage         = chrome.storage.local;
    let toggler         = document.getElementById('toggler');
    let extrasToggler   = document.getElementById('extras-toggler');
    let inActive        = false;
    let name            = document.getElementById('name');
    let password        = document.getElementById('password');
    let phone           = document.getElementById('phone');
    let emailAddress    = document.getElementById('email-name');
    let emailDomain     = document.getElementById('email-domain');
    let saveOptions     = document.getElementById('saveEmailSettings');

    saveOptions.onclick = function() {
        saveEmailSettings();
    };

    toggler.onclick = function() {
        inActive = !inActive;
        if (inActive) {
            toggler.classList.add('is-inactive');
        } else {
            toggler.classList.remove('is-inactive');
        }
        toggler.innerText = (inActive ? 'OFF' : 'ON');
        saveEmailSettings();
    };

    extrasToggler.onclick = function() {
        if (extrasToggler.innerText == '+') {
            extrasToggler.innerText = '-';
            extrasToggler.classList.add('is-open');
        } else {
            extrasToggler.innerText = '+';
            extrasToggler.classList.remove('is-open');
        }
    };

    storage.get('emailSettings', function(data) {
        if (typeof data.emailSettings !== 'undefined') {
            emailAddress.value  = data.emailSettings.address;
            emailDomain.value   = data.emailSettings.domain;
            name.value          = data.emailSettings.name ? data.emailSettings.name : '';
            password.value      = data.emailSettings.password ? data.emailSettings.password : '';
            phone.value         = data.emailSettings.phone ? data.emailSettings.phone : '';

            if (data.emailSettings.inactive) {
                toggler.innerText = 'OFF';
                toggler.classList.add('is-inactive');
                inActive = true;
            }
        }
    });

    function saveEmailSettings() {
        storage.set({emailSettings: {
            address:    emailAddress.value,
            domain:     emailDomain.value,
            name:       name.value,
            password:   password.value,
            phone:      phone.value,
            inactive:   inActive
        }}, function() {
            console.log('Settings updated');
        });
    }
});

