function createTriangleFavicon() {
    let canvas = document.createElement("canvas");
    canvas.width = 32;
    canvas.height = 32;
    let ctx = canvas.getContext("2d");
    
    
    ctx.fillStyle = "#cdb4db"; // Cambia con il colore che vuoi
    
    // Disegna il triangolo equilatero invertito
    ctx.beginPath();
    ctx.moveTo(16, 32); // Punto centrale in basso
    ctx.lineTo(0, 0);   // Punto in alto a sinistra
    ctx.lineTo(32, 0);  // Punto in alto a destra
    ctx.closePath();
    ctx.fill();
    
    // Converte in immagine e la imposta come favicon
    let url = canvas.toDataURL("image/png");
    let link = document.querySelector("link[rel='icon']") || document.createElement("link");
    link.rel = "icon";
    link.href = url;
    document.head.appendChild(link);
}

createTriangleFavicon();



function preloading() {
    let loading = document.querySelector("#loading");
    let pageContent = document.querySelector("#pageContent");
    let loadingText = document.querySelector(".loadingText");
    
    gsap.fromTo(
        ".loadingText div, .loadingText", // Selettori degli elementi da animare
        {
            opacity: 0,
            y: -60,
            stagger: 0.9 // Proprietà iniziali
        },
        {
            opacity: 1,
            y: 0,
            duration: 1, // Proprietà finali
            ease: "power2.out"
        }
    );
    
    
    gsap.fromTo(".loadingText span",{
        y:80,
        opacity:0,
        stagger: .4,
        delay: 1.2,
    },{
        y:80,
        opacity:1,
        stagger: .4,
        delay: 1.2,
    })
    
    gsap.to(".colLoading",{
        delay: 1.8,
        duration: 3, //2 seconds
        y:"-110%",
        ease: "power4.inOut"
    })
    
    gsap.from(".square", {
        delay: 3.5,
        duration: 1.5,
        ease: "power4.inOut",
        scaleX: 0,  
        zIndex:100,
        transformOrigin: "center", 
        height: "100vh", 
    })
    
    gsap.from(".projectTitle, .bottomText",{
        delay: 3.2,
        duration:1.5,
        ease: "power4.inOut",
        y: 40,
        opacity:0,
        stagger:0.2,
    })
    
    gsap.from("nav .title, nav .menu",{
        delay: 3.7,
        duration:1.5,
        ease: "power4.inOut",
        opacity:0,  
    })
    
    setTimeout(() => {
        pageContent.classList.remove("d-none");
        loading.classList.add("d-none");
        
    }, 4000); // 4 secondi
}


window.addEventListener("load", preloading);


function squareImage() {
    document.addEventListener("DOMContentLoaded", function () {
        let square = document.querySelector(".square");
        
        // Array con i percorsi delle immagini (cartella "Editorial")
        let images = [
            "./Editorial/editorial1.webp",
            "./Editorial/editorial3.webp",
            "./makeup/makeup1.webp",
            "./Editorial/editorial4.webp",
            "./Editorial/editorial6.webp",
            "./Editorial/editorial2.webp",
            "./makeup/makeup2.webp",
            "./Editorial/editorial7.webp",
            "./Backstage/backstage26.webp",
            "./Editorial/editorial8.webp",
            "./Editorial/editorial9.webp",
            "./makeup/makeup3.webp",
            "./makeup/makeup6.webp",
            "./Backstage/backstage1.webp",
            "./Backstage/backstage19.webp",
            "./Backstage/backstage18.webp",
            "./Media/fotoBackground1.webp",
            "./Media/ok84.webp",
            "./Backstage/backstage14.webp",
            "./Backstage/backstage4.webp",
        ];
        
        let index = 0;
        let autoChangeInterval; // Variabile per memorizzare l'intervallo automatico
        let mouseMoveTimeout; // Variabile per gestire il timeout del movimento del mouse
        
        // Funzione che cambia l'immagine
        function changeBackground() {
            square.style.backgroundImage = `url(${images[index]})`;
            index = (index + 1) % images.length; // Loop infinito tra le immagini
        }
        
        // Funzione che cambia l'immagine velocemente quando il cursore si muove
        function changeBackgroundOnMove(e) {
            // Calcola la posizione orizzontale del cursore come percentuale della larghezza della finestra
            let cursorX = e.clientX;
            let windowWidth = window.innerWidth;
            let percentage = cursorX / windowWidth;
            
            // Usa la percentuale per determinare quale immagine mostrare
            index = Math.floor(percentage * images.length);
            square.style.backgroundImage = `url(${images[index]})`;
            
            // Resetta il timeout che riavvia l'auto-cambio delle immagini
            clearTimeout(mouseMoveTimeout);
            mouseMoveTimeout = setTimeout(startAutoChange, 1000); // Dopo 1 secondo senza movimento, riavvia l'auto cambio
        }
        
        // Avvia il cambio automatico delle immagini ogni 2 secondi
        function startAutoChange() {
            clearInterval(autoChangeInterval); // Ferma l'intervallo precedente
            autoChangeInterval = setInterval(changeBackground, 2000); // Cambia ogni 2 secondi
        }
        
        // Inizia con l'auto-cambio delle immagini
        startAutoChange();
        
        // Aggiungi l'evento mousemove per cambiare rapidamente l'immagine durante il movimento del cursore
        window.addEventListener("mousemove", changeBackgroundOnMove);
    });
}

squareImage();



function menuOverlay(){
    
    document.addEventListener("DOMContentLoaded", function () {
        const overlay = document.querySelector(".overlay");
        const menuButton = document.querySelector(".menuButton");
        const closeButton = document.querySelector(".closeButton");
        const menuItems = document.querySelectorAll(".menu-item");
        const social = document.querySelectorAll(".social");
        const meet = document.querySelectorAll(".meet");
        const names = document.querySelectorAll(".name");
        let menuIsOpen = false; // stato del menu
        
        function openMenu() {
            if (menuIsOpen) return; // se già aperto, esci
            menuIsOpen = true;
            // Ripristina lo stato iniziale degli elementi
            gsap.set([menuItems, social, meet, names], { opacity: 0, y: 20 });
            
            // Porta su il menu dal basso
            gsap.to(overlay, { bottom: "0%", duration: 0.8, ease: "power4.out", pointerEvents: "all" });
            
            // Fa apparire le voci dopo il movimento
            gsap.to(menuItems, {
                opacity: 1,
                y: 0,
                stagger: 0.15,
                duration: 0.5,
                delay: 0.3,
                ease: "power2.out"
            });
            gsap.to(menuButton, {
                y:-150,
                ease: "power2.out",
                duration: 1,
                autoAlpha:0
            });
            gsap.to(".overlayMenu", {
                opacity: 1,
                y: 0,
                stagger: 0.15,
                duration: 0.5,
                delay: 0.3,
                ease: "power2.out"
            });
            gsap.to(social, {
                opacity: 1,
                y: 0,
                stagger: 0.15,
                duration: 0.6,
                delay: 1,
                ease: "power2.out"
            });
            
            gsap.to(meet, {
                opacity: 1,
                y: 40,
                stagger: 0.15,
                duration: 0.6,
                delay: 1,
                ease: "power2.out"
            });
            
            gsap.to(names, {
                opacity: 1,
                y: 0,
                duration: 0.6,
                delay: 1,
                ease: "power2.out"
            });
        }
        
        function closeMenu() {
            if (!menuIsOpen) return; // se già chiuso, esci
            menuIsOpen = false;
            gsap.to(overlay, { bottom: "-100%", duration: 1, ease: "power4.in", pointerEvents: "none" });
            
            // Nasconde di nuovo le voci
            gsap.to(".overlayMenu", { opacity: 0, y: 50, duration: 0.3 });
            
            gsap.to(menuItems, { opacity: 0, y: 50, duration: 0.3 });
            
            gsap.to(social, {
                opacity: 0,
                duration: 0.5,
                delay: 0.2,
                ease: "power2.out"
            });
            gsap.to(menuButton, {
                y:0,
                ease: "power2.out",
                duration: 1,
                autoAlpha:1
            });
            gsap.to(meet, {
                opacity: 0,
                duration: 0.5,
                delay: 0.2,
                ease: "power2.out"
            });
            
            gsap.to(names, {
                opacity: 0,
                duration: 0.5,
                delay: 0.2,
                ease: "power2.out"
            });
        }
        // Event listener per aprire il menu con scroll solo se è chiuso
        setTimeout(() => {
            if (window.innerWidth > 500) {
                window.addEventListener('wheel', function(event) {
                    if (event.deltaY > 0 && !menuIsOpen) {
                        openMenu();
                    }
                });
            }
        }, 4100);
        
        menuButton.addEventListener("click", openMenu);
        closeButton.addEventListener("click", closeMenu);
        
        menuItems.forEach(item => {
            item.addEventListener("click", closeMenu);
        });
    });
}
menuOverlay();

document.addEventListener('contextmenu', function(event) {
    event.preventDefault();
});




function textRolling (){
    let elements = document.querySelectorAll('.rolling-text');
    
    elements.forEach((element)=>{
        let innerText = element.innerText;
        element.innerHTML ="";
        
        let textContainer = document.createElement("div");
        textContainer.classList.add("block");
        
        for(let letter of innerText){
            let span = document.createElement("span");
            span.innerText = letter.trim() === "" ? "\xa0" : letter;
            span.classList.add("letter");
            textContainer.appendChild(span);
        }
        
        element.appendChild(textContainer);
        element.appendChild(textContainer.cloneNode(true));
    });
    elements.forEach((element) =>{
        element.addEventListener("mouseover", ()=>{
        });
    })
}

textRolling();


// backstage
function engineMatterJS (){
    
    //backstage inizio
    const Engine = Matter.Engine;
    const World = Matter.World;
    const Bodies = Matter.Bodies;
    const Body = Matter.Body;
    const Render = Matter.Render;
    
    let engine;
    let render;
    let backstagePhotos = [];
    let lastMouseX = -1;
    let lastMouseY = -1;
    
    function setup() {
        // Crea il canvas e imposta le dimensioni
        const canvas = document.getElementById('matter-canvas');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        
        // Crea il motore fisico
        engine = Engine.create();
        engine.world.gravity.y = 0;
        
        // Crea il renderer
        render = Render.create({
            element: document.querySelector('.Backstage'),
            engine: engine,
            
            
            options: {
                width: window.innerWidth,
                height: window.innerHeight,
                wireframes: false,
                background: 'white'
                
            }
        });
        
        // Aggiungi i confini del mondo
        addBoundaries();
        
        // Crea gli oggetti fisici
        for (let i = 0; i < 15; i++) {
            let x = Math.random() * (window.innerWidth - 200) + 100;
            let y = Math.random() * (window.innerHeight - 200) + 100;
            backstagePhotos.push(new Backstage(x, y, `./Backstage/backstage${i + 1}.webp`));
        }
        
        // Esegui il renderer
        Render.run(render);
        
        
        // Sostituisci Engine.run(engine) con:
        const runner = Matter.Runner.create();
        Matter.Runner.run(runner, engine);
    }
    
    function addBoundaries() {
        const thickness = 75;
        World.add(engine.world, [
            Bodies.rectangle(window.innerWidth / 2, -thickness / 2, window.innerWidth, thickness, { isStatic: true }),
            Bodies.rectangle(window.innerWidth / 2, window.innerHeight + thickness / 2, window.innerWidth, thickness, { isStatic: true }),
            Bodies.rectangle(-thickness / 2, window.innerHeight / 2, thickness, window.innerHeight, { isStatic: true }),
            Bodies.rectangle(window.innerWidth + thickness / 2, window.innerHeight / 2, thickness, window.innerHeight, { isStatic: true })
        ]);
    }
    
    class Backstage {
        constructor(x, y, imagePath) {
            let options = {
                frictionAir: 0.075,
                restitution: 0.15,
                density: 0.001,
                angle: Math.random() * Math.PI * 2,
            };
            
            this.body = Bodies.rectangle(x, y, 100, 200, options);
            World.add(engine.world, this.body);
            
            this.div = document.createElement("div");
            this.div.className = "backstagePhotos";
            this.div.style.position = "absolute";
            this.div.style.left = `${this.body.position.x - 50}px`;
            this.div.style.top = `${this.body.position.y - 100}px`;
            const img = document.createElement("img");
            img.src = imagePath;
            this.div.appendChild(img);
            
            // Aggiungi il div al contenitore newBackstage
            document.querySelector('.newBackstage').appendChild(this.div);
        }
        
        update() {
            this.div.style.left = `${this.body.position.x - 50}px`;
            this.div.style.top = `${this.body.position.y - 100}px`;
            this.div.style.transform = `rotate(${this.body.angle}rad)`;
        }
    }
    
    function dist(x1, y1, x2, y2) {
        return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
    }
    
    function mouseMoved(event) {
        if (Math.abs(event.clientX - lastMouseX) > 10 || Math.abs(event.clientY - lastMouseY) > 10) {
            lastMouseX = event.clientX;
            lastMouseY = event.clientY;
            
            backstagePhotos.forEach((item) => {
                if (dist(event.clientX, event.clientY, item.body.position.x, item.body.position.y) < 150) {
                    let forceMagnitude = 1.50;
                    Body.applyForce(
                        item.body,
                        { x: item.body.position.x, y: item.body.position.y },
                        { x: (Math.random() - 0.5) * forceMagnitude, y: (Math.random() - 0.5) * forceMagnitude }
                        
                    );
                }
            });
        }
    }
    
    // Avvia la simulazione
    setup();
    
    // Aggiungi l'event listener per il movimento del mouse
    document.addEventListener('mousemove', mouseMoved);
    
    // Aggiorna gli elementi nel loop di animazione
    function updateElements() {
        requestAnimationFrame(updateElements);
        backstagePhotos.forEach((item) => item.update());
    }
    
    // Avvia il loop di aggiornamento
    updateElements();
    //backstage fine
}

engineMatterJS();
// fine backstage




function textMenuActive(){
    document.addEventListener("DOMContentLoaded", () => {
        const menuLinks = document.querySelectorAll('.menu-item a');  
        const sections = document.querySelectorAll('section');        
        
        const observerOptions = {
            rootMargin: "0px 0px -20% 0px",
            threshold: 0.4
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                const id = entry.target.getAttribute('id');
                const correspondingLink = document.querySelector(`a[href="#${id}"]`);
                
                if (entry.isIntersecting) {
                    correspondingLink?.classList.add('active');
                } else {
                    correspondingLink?.classList.remove('active');
                }
            });
        }, observerOptions);
        
        sections.forEach((section) => observer.observe(section));
        
        // ✅ Controllo manuale per la sezione "home"
        function checkHomeSection() {
            const firstSection = document.querySelector("#home");
            const firstLink = document.querySelector(`a[href="#home"]`);
            
            if (window.scrollY < 50) {  // Se l'utente è vicino all'inizio della pagina
                firstLink?.classList.add('active');
            } else {
                firstLink?.classList.remove('active');
            }
        }
        
        // Controllo all'avvio e su scroll
        checkHomeSection();
        window.addEventListener("scroll", checkHomeSection);
    });
}
textMenuActive();



const moodImages = document.querySelectorAll('.imgMoodboard');

moodImages.forEach(img => {
    img.addEventListener('mouseenter', () => {
        moodImages.forEach(other => {
            if (other !== img) {
                
                other.classList.add('blur');
                other.classList.remove('active');
            } else {
                other.classList.add('active');
                other.classList.remove('blur');
            }
        });
    });
    
    img.addEventListener('mouseleave', () => {
        moodImages.forEach(other => {
            other.classList.remove('blur');
            other.classList.remove('active');
        });
    });
});




//! inizio delle imgContainer in shoots

const indicator = document.querySelector('.toSeeSquareIndicator');
const container = document.querySelector('.imgShootsContainer');
const images = document.querySelectorAll('.imgShoots');

images.forEach((img) => {
    img.addEventListener('mouseenter', () => {
        const imgRect = img.getBoundingClientRect();
        const containerRect = container.getBoundingClientRect();
        
        const left = imgRect.left - containerRect.left;
        const top = imgRect.top - containerRect.top;
        
        indicator.style.transform = `translate(${left}px, ${top}px)`;
    });
});

// Opzionale: reset quando esci dal container
container.addEventListener('mouseleave', () => {
    indicator.style.transform = `translate(-9999%, -9999%)`; 
});


function shootsImageInContainer() {
    document.addEventListener("DOMContentLoaded", function () {
        const imgShoots = document.querySelectorAll(".imgShoots");
        const toSeeContainer = document.querySelector(".toSeeContainer");
        const hoverText = toSeeContainer.querySelector("p"); // Seleziona il <p>
        
        imgShoots.forEach(img => {
            img.addEventListener("mouseover", function () {
                // Cambia l'immagine nello "schermo grande"
                toSeeContainer.style.backgroundImage = `url(${img.src})`;
                toSeeContainer.style.backgroundSize = "contain";
                toSeeContainer.style.backgroundPosition = "left";
                
                // Nasconde il testo
                if (hoverText) {
                    hoverText.style.display = "none";
                }
            });
            
            img.addEventListener("mouseleave", function () {
                // Rimuove l'immagine quando il mouse esce
                toSeeContainer.style.backgroundImage = "";
                
                // Riporta il testo visibile
            });
        });
    });
}



shootsImageInContainer(); // Chiama la funzione


function dollsParagraphStory(){
    document.addEventListener("DOMContentLoaded", () => {
        // Seleziona tutti i bottoni
        const buttons = document.querySelectorAll('.clickMeDolls');
        
        // Aggiungi l'evento click a ciascun bottone
        buttons.forEach(button => {
            button.addEventListener('click', () => {
                // Verifica quale classe del bottone è presente
                let dollClass = "";
                if (button.classList.contains("heraButton")) {
                    dollClass = "hera";
                } else if (button.classList.contains("kianaButton")) {
                    dollClass = "kiana";
                } else if (button.classList.contains("amaniButton")) {
                    dollClass = "amani";
                }
                
                // Seleziona il container corrispondente
                const container = document.querySelector(`.containerDollsParagraph.${dollClass}Paragraph`);
                
                // Mostra il container con la transizione
                if (container) {
                    container.classList.add('show');
                }
            });
        });
        
        // Chiudi i contenitori quando clicchi sul tasto Close
        const closeButtons = document.querySelectorAll('.xClose');
        closeButtons.forEach(closeButton => {
            closeButton.addEventListener('click', () => {
                const container = closeButton.closest('.containerDollsParagraph');
                container.classList.remove('show');
            });
        });
    });
}
dollsParagraphStory();



















