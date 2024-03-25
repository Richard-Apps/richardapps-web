fetch('src/ascii.txt')
    .then(res => res.text())
    .then(res => document.getElementById('title').innerHTML = res)
    document.getElementById('noise_vid').playbackRate = 0.65;

function changeTab(tab) {
    document.querySelectorAll('.tabs').forEach(element => {
        element.classList.add('invisible')
    })
    document.getElementById(tab).classList.remove('invisible')
}