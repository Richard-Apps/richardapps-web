location = location.hash||"#news"
changeTab(location.hash.slice(1))

function changeTab(tab) {
// 'Print' animation
    let cln = document.getElementById(tab).querySelectorAll('*')
    let delay = 0
    Array.from(cln).forEach(element => {
        element.classList.add('invisible')
        setTimeout(function() {
            element.classList.remove('invisible')
        }, delay)
        delay += 20
    })
}