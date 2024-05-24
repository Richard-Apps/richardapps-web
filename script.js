const default_hash = '#home';
let effectsDisabled = localStorage.getItem('effectsDisabled') === 'true';

location = location.hash||default_hash
changeTab(location.hash.slice(1));

window.addEventListener('hashchange', function() {
    changeTab(location.hash.slice(1));
})

function changeTab(tab) {
    try {
        document.querySelectorAll('.fade-in.visible').forEach(element => {
                element.classList.remove('visible');
                element.classList.remove('fade-in-anim');
        });

        document.querySelectorAll('.tab_switcher').forEach(element => { element.classList.remove('tab_active');});
        document.getElementById(tab + '_tab').classList.add('tab_active');

        if (!effectsDisabled) {
            let elements = document.getElementById(tab).querySelectorAll('*');
            let delay = 0;
            Array.from(elements).forEach(element => {
                element.classList.add('fade-in');
                setTimeout(function() {
                    element.classList.add('visible');
                    element.classList.add('fade-in-anim');
                }, delay);
                delay += 27;
            });
        }
    } catch {
        location.hash = default_hash;
    }
}

// Picture-Collection
function changeColl(coll) {
    document.querySelectorAll('.pic_coll').forEach(element => { element.style.display = 'none';});
    document.getElementById(coll).style.display = 'block';
    document.querySelectorAll('.pic_coll_tabs').forEach(element => { element.classList.remove('tab_active');});
    this.event.target.classList.add('tab_active');
}

// Load effects if not disabled
let link = document.createElement('link');
link.rel = 'stylesheet';
link.type = 'text/css';
link.href = 'effects.css';

let nfbText = document.getElementById('changeEffects');

// Turn off major effects on default for mobile devices
if (window.matchMedia("(max-width: 767px)").matches && !('effectsDisabled' in localStorage)) { effectsDisabled = true;}
if (!effectsDisabled) { document.head.appendChild(link); nfbText.innerHTML = 'Don\'t like the effects? Click <a onclick="changeEffects()">HERE</a> to turn them off.';}

function changeEffects() {
    localStorage.setItem('effectsDisabled', !effectsDisabled);
    location.reload();
}