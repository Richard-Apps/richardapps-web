location = location.hash||"#news"
changeTab(location.hash.slice(1))

function changeTab(tab) {
    // 'Print' animation
    document.querySelectorAll('.fade-in.visible').forEach(element => {
        element.classList.remove('visible');
    });

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
