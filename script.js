location = location.hash||'#news' // Defaults to #news if no hash is present
changeTab(location.hash.slice(1));

function changeTab(tab) {
    // 'Print' animation in a modern way
    document.querySelectorAll('.fade-in.visible').forEach(element => {
            element.classList.remove('visible');
    });

    document.querySelectorAll('.tab_switcher').forEach(element => { element.classList.remove('tab_active');});
    document.getElementById(tab + '_tab').classList.add('tab_active');

    let elements = document.getElementById(tab).querySelectorAll('*');
    let delay = 0;
    Array.from(elements).forEach(element => {
        element.classList.add('fade-in');
        setTimeout(function() {
            element.classList.add('visible');
        }, delay);
        delay += 30;
    });
}

// Picture-Collection
function changeColl(coll) {
    document.querySelectorAll('.pic_coll').forEach(element => { element.style.display = 'none';});
    document.getElementById(coll).style.display = 'block';
    document.querySelectorAll('.pic_coll_tabs').forEach(element => { element.classList.remove('tab_active');});
    this.event.target.classList.add('tab_active');
}

// Load effects if not disabled
var link = document.createElement('link');
link.rel = 'stylesheet';
link.type = 'text/css';
link.href = 'effects.css';

let effectsDisabled = localStorage.getItem('effectsDisabled') === 'true';
let nfbText = document.getElementById('changeEffects');
if (!effectsDisabled) { document.head.appendChild(link); nfbText.innerHTML = 'Don\'t like the effects? Click <a onclick="changeEffects()">HERE</a> to turn them off.';}

function changeEffects() {
    effectsDisabled = !effectsDisabled;
    localStorage.setItem('effectsDisabled', effectsDisabled);
    if (effectsDisabled) {
        document.head.removeChild(link);
        nfbText.innerHTML = 'Want some fancy effects? Click <a onclick="changeEffects()">HERE</a> to turn them on.';
    } else {
        document.head.appendChild(link);
        nfbText.innerHTML = 'Don\'t like the effects? Click <a onclick="changeEffects()">HERE</a> to turn them off.';
    }
}

// Turn off major effects on default for mobile devices
if (window.matchMedia("(max-width: 767px)").matches && !('effectsDisabled' in localStorage)) {
    changeEffects();
}