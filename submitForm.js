var contactForm = document.getElementById("contactForm");
var activePage = window.location.pathname;
var navLinks = document.querySelectorAll('nav li a').forEach(link => {
    if(link.href.includes(`${activePage}`)) {
        link.classList.add('active')
    }
})

contactForm.addEventListener('submit', (e) => {
    e.preventDefault(); 

    var form = e.target;
    var formData = new FormData(form); 
    var data = Object.fromEntries(formData.entries());

    console.log(data); 

    var link = document.createElement('a');
    link.href = `mailto:iqbalmhasby54@gmail.com?subject=${encodeURIComponent(data.subject)}&body=${encodeURIComponent(`
        Selamat siang,
        Nama saya ${data.name}.
        Email: ${data.email}
        Nomor Telepon: ${data.telp}

        Pesan:
        ${data.message}
    `)}`;

    link.click(); 
});
