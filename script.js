const default_hash = '#home';
const fade_in_delay = 27 // lower values makes the elements show faster on site loading and while changing tabs

let effectsDisabled = localStorage.getItem('effectsDisabled') === 'true';

// remove 'rgb' and brackets from --bg-value so the color can be used in combination with individual opacity-values (rgba)
document.documentElement.style.setProperty('--bg-color', getComputedStyle(document.documentElement).getPropertyValue('--bg-color').trim().replace(/rgb\(|\)/g, ''));

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
                delay += fade_in_delay;
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

// Turn off major effects on default for mobile devices (performance issues on some mobile browsers)
if (window.matchMedia("(max-width: 767px)").matches && !('effectsDisabled' in localStorage)) { effectsDisabled = true;}
if (!effectsDisabled) { document.head.appendChild(link); nfbText.innerHTML = 'Don\'t like the effects? Click <a onclick="changeEffects()">HERE</a> to turn them off.';}

function changeEffects() {
    localStorage.setItem('effectsDisabled', !effectsDisabled);
    location.reload();
}

// Themes
if ('theme' in localStorage) {
    changeTheme(localStorage.getItem('theme'));
}

function changeTheme(theme) {
    localStorage.setItem('theme', theme);
    let noise_vid = document.getElementById('noise_vid');
    let rain_vid = document.getElementById('rain_vid');
    // show > and < on selected theme
    let theme_list_items = document.getElementById('theme_list').children;
    Array.from(theme_list_items).forEach(item => {
        let a = item.firstChild
        if (a.innerHTML.includes(theme)) {
            a.innerHTML = '> ' + theme + ' <'
        } else {
            a.innerHTML = a.innerHTML.replace(/(&gt|&lt|;|\s)/g, '');
        }
    })
    // default values
    document.documentElement.style.setProperty('--bg-opacity', '0.31');
    rain_vid.style.display = 'none';
    noise_vid.style.opacity = 0.5;
    if (!document.head.contains(link) && !effectsDisabled) {document.head.appendChild(link);}
    switch (theme) { 
        case 'ocean':
            document.documentElement.style.setProperty('--bg-color', '15, 129, 236');
            document.documentElement.style.setProperty('--main-color', '#72b6ff');
            document.documentElement.style.setProperty('--selection', '#3b6d8b');
            noise_vid.style.opacity = 0.3;
            break;
        case 'terminal':
            document.documentElement.style.setProperty('--bg-color', '61, 150, 51');
            document.documentElement.style.setProperty('--main-color', '#6dfd60');
            document.documentElement.style.setProperty('--selection', '#3b8b42');
            break;
        case 'cherry':
            document.documentElement.style.setProperty('--bg-color', '192, 63, 63');
            document.documentElement.style.setProperty('--main-color', '#fd6060');
            document.documentElement.style.setProperty('--selection', '#8b3b3b');
            break;
        case 'amber':
            document.documentElement.style.setProperty('--bg-color', '179, 105, 21');
            document.documentElement.style.setProperty('--main-color', '#fda93c');
            document.documentElement.style.setProperty('--selection', '#946612');
            break;
        case 'deepsea':
            document.documentElement.style.setProperty('--bg-color', '9, 95, 92');
            document.documentElement.style.setProperty('--main-color', '#cbe9d1');
            document.documentElement.style.setProperty('--selection', '#56705a');
            break;
        case 'danger':
            document.documentElement.style.setProperty('--bg-color', '121, 6, 2');
            document.documentElement.style.setProperty('--main-color', '#e62b2b');
            document.documentElement.style.setProperty('--selection', '#941212');
            document.documentElement.style.setProperty('--bg-opacity', '0.494');
            break;
        case 'rainy':
            document.documentElement.style.setProperty('--bg-color', '15, 129, 236');
            document.documentElement.style.setProperty('--main-color', '#a4cdf8');
            document.documentElement.style.setProperty('--selection', '#3b6d8b');
            rain_vid.style.display = 'block';
            break;
        case 'win95':
            document.documentElement.style.setProperty('--bg-color', '0, 128, 129');
            document.documentElement.style.setProperty('--main-color', '#ffffff');
            document.documentElement.style.setProperty('--selection', '#3b6d8b');
            document.documentElement.style.setProperty('--bg-opacity', '1.0');
            noise_vid.style.opacity = 0;
            document.head.removeChild(link);
            break;
    }
    if (effectsDisabled) {rain_vid.style.display = 'none';}
}