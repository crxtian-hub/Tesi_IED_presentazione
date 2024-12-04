let loading = document.querySelector("#loading")
let pageContent = document.querySelector("#pageContent")

setTimeout(() => {
    pageContent.classList.remove("d-none")
    loading.classList.add("d-none")
    
    var swiper = new Swiper(".mySwiper", {
        effect: "coverflow",
        grabCursor: true,
        centeredSlides: true,
        slidesPerView: "auto",
        coverflowEffect: {
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: true,
        },
        pagination: {
            el: ".swiper-pagination",
        },
    });
    
    AOS.init(); //SEMPRE INIZIALIZZARE NELLA FUNZIONE DI TIMEOUT TUTTE LE ANIMAZIONI!!!!!!!!
}, 4000);

