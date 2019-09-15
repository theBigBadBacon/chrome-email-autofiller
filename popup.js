'use strict';

document.addEventListener('DOMContentLoaded', function() {
    var storage         = chrome.storage.local;
    let toggler         = document.getElementById('toggler');
    let inActive        = false;
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

    storage.get('emailSettings', function(data) {
        if (typeof data.emailSettings !== 'undefined') {
            emailAddress.value  = data.emailSettings.address;
            emailDomain.value   = data.emailSettings.domain;

            if (data.emailSettings.inactive) {
                toggler.innerText = 'OFF';
                toggler.classList.add('is-inactive');
                inActive = true;
            }
        }
    });

    function saveEmailSettings() {
        storage.set({emailSettings: {
            address: emailAddress.value,
            domain: emailDomain.value,
            inactive: inActive
        }}, function() {
            console.log('Settings updated');
        });
    }
});

