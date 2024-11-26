src="https://unpkg.com/typed.js@2.1.0/dist/typed.umd.js"
document.addEventListener('DOMContentLoaded', function() {
    var typed = new Typed('#typed-text', {
        strings: ["Let's Check The Wind"],
        typeSpeed: 50,
        backSpeed: 50,
        backDelay: 2000,
        startDelay: 500,
        loop: true,
        showCursor: true,
        cursorChar: '|'
    });
});