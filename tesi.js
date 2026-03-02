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
    
    document.documentElement.classList.add("noScroll");
    document.body.classList.add("noScroll");
    
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
        delay: 4,
        duration: .5,
        ease: "power4.inOut",
        scaleX: 0,  
        opacity:0,
        zIndex:100,
        transformOrigin: "center", 
        height: "100vh", 
    })
    
    gsap.from(".projectTitle:not(.projectTitle--white), .bottomText:not(.bottomText--white)",{
        delay: 3.2,
        duration:1.5,
        ease: "power4.inOut",
        // y: 40,
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
        document.documentElement.classList.remove("noScroll");
        document.body.classList.remove("noScroll");
        
    }, 4000); // 4 secondi
}


window.addEventListener("load", preloading);




function squareImage() {
    document.addEventListener("DOMContentLoaded", function () {
        let square = document.querySelector(".square");
        let section1 = document.querySelector(".section1");
        let projectTitle = document.querySelector(".projectTitle:not(.projectTitle--white)");
        let bottomText = document.querySelector(".bottomText:not(.bottomText--white)");
        
        
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
            "./Backstage/backstage6.webp",
            "./Media/fotoBackground1.webp",
            "./Media/ok84.webp",
            "./Backstage/backstage14.webp",
            "./Backstage/backstage4.webp",
        ];
        
        let index = 0;
        let autoChangeInterval; 
        let mouseMoveTimeout; 
        
        function setSquareSizeForImage(src) {
            if (!square) return;
            let img = new Image();
            img.onload = function () {
                let maxWidth = window.innerWidth * 1;
                let maxHeight = window.innerHeight;
                
                if (window.innerWidth <= 500) {
                    maxWidth = window.innerWidth * 0.9;
                    maxHeight = window.innerHeight * 0.6;
                }
                
                let scale = Math.min(maxWidth / img.naturalWidth, maxHeight / img.naturalHeight);
                let width = Math.round(img.naturalWidth * scale);
                let height = Math.round(img.naturalHeight * scale);
                
                square.style.width = `${width}px`;
                square.style.height = `${height}px`;
                updateMaskMetrics();
            };
            img.src = src;
        }
        
        function updateMaskMetrics() {
            if (!projectTitle || !section1 || !square) return;
            let titleRect = projectTitle.getBoundingClientRect();
            let squareRect = square.getBoundingClientRect();
            let sectionRect = section1.getBoundingClientRect();
            
            section1.style.setProperty("--title-top", `${titleRect.top - sectionRect.top}px`);
            section1.style.setProperty("--title-left", `${titleRect.left - sectionRect.left}px`);
            
            if (bottomText) {
                let bottomRect = bottomText.getBoundingClientRect();
                section1.style.setProperty("--bottomtext-top", `${bottomRect.top - sectionRect.top}px`);
                section1.style.setProperty("--bottomtext-left", `${bottomRect.left - sectionRect.left}px`);
            }
            
            section1.style.setProperty("--hero-mask-top", `${squareRect.top - sectionRect.top}px`);
            section1.style.setProperty("--hero-mask-left", `${squareRect.left - sectionRect.left}px`);
            section1.style.setProperty("--hero-mask-width", `${squareRect.width}px`);
            section1.style.setProperty("--hero-mask-height", `${squareRect.height}px`);
        }
        
        
        function changeBackground() {
            let current = images[index];
            square.style.backgroundImage = `url(${current})`;
            section1.style.setProperty("--hero-image", `url(${current})`);
            setSquareSizeForImage(current);
            index = (index + 1) % images.length; 
        }
        
        
        function changeBackgroundOnMove(e) {
            
            let cursorX = e.clientX;
            let windowWidth = window.innerWidth;
            let percentage = cursorX / windowWidth;
            
            
            index = Math.floor(percentage * images.length);
            let current = images[index];
            square.style.backgroundImage = `url(${current})`;
            section1.style.setProperty("--hero-image", `url(${current})`);
            setSquareSizeForImage(current);
            
            
            clearTimeout(mouseMoveTimeout);
            mouseMoveTimeout = setTimeout(startAutoChange, 1000); 
        }
        
        
        function startAutoChange() {
            clearInterval(autoChangeInterval); 
            changeBackground();
            autoChangeInterval = setInterval(changeBackground, 2000); 
        }
        
        
        startAutoChange();
        updateMaskMetrics();
        
        let syncTimer = setInterval(updateMaskMetrics, 100);
        setTimeout(() => clearInterval(syncTimer), 5000);
        
        
        window.addEventListener("mousemove", changeBackgroundOnMove);
        window.addEventListener("resize", updateMaskMetrics);
        window.addEventListener("scroll", updateMaskMetrics);
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
        const names = document.querySelectorAll(".name");
        let menuIsOpen = false; // stato del menu
        
        function openMenu() {
            if (menuIsOpen) return; // se già aperto, esci
            menuIsOpen = true;
            lockScroll();
            // Ripristina lo stato iniziale degli elementi
            gsap.set([menuItems, social, names], { opacity: 0, y:0 });
            
            // Porta su il menu dal basso
            gsap.to(overlay, { bottom: "0%", duration: 0.8, ease: "power4.out", pointerEvents: "all" });
            
            // Fa apparire le voci dopo il movimento
            gsap.to(menuItems, {
                opacity: 1,
                y: 0,
                stagger: 0.03,
                duration: .6,
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
                duration: 0.5,
                ease: "power2.out"
            });
            gsap.to(social, {
                opacity: 1,
                y: 0,
                duration: 0.6,
                ease: "power2.out"
            });
            
            
            gsap.to(names, {
                opacity: 1,
                y: 0,
                duration: 0.6,
                ease: "power2.out"
            });
        }
        
        function closeMenu() {
            if (!menuIsOpen) return; // se già chiuso, esci
            menuIsOpen = false;
            if (!document.querySelector(".containerDollsParagraph.show")) {
                unlockScroll();
            }
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
            
            
            gsap.to(names, {
                opacity: 0,
                duration: 0.5,
                delay: 0.2,
                ease: "power2.out"
            });
        }
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




function textRolling() {
    const elements = document.querySelectorAll('.rolling-text');
    
    elements.forEach((element) => {
        const innerText = element.innerText;
        element.innerHTML = "";
        
        const front = document.createElement("span");
        front.classList.add("rolling-face", "rolling-face-in");
        front.innerText = innerText;
        
        const back = document.createElement("span");
        back.classList.add("rolling-face", "rolling-face-out");
        back.innerText = innerText;
        
        const ghost = document.createElement("span");
        ghost.classList.add("rolling-ghost");
        ghost.innerText = innerText;
        
        element.appendChild(front);
        element.appendChild(back);
        element.appendChild(ghost);
    });
}

textRolling();


// backstage
function engineMatterJS (){
    
    //backstage inizio
    const Engine = Matter.Engine;
    const World = Matter.World;
    const Bodies = Matter.Bodies;
    const Body = Matter.Body;
    const Runner = Matter.Runner;
    
    let engine;
    let runner;
    let backstagePhotos = [];
    let lastMouseX = -1;
    let lastMouseY = -1;
    let boundaries = [];
    let rafId = null;
    let isRunning = false;
    
    function setup() {
        // Crea il motore fisico
        engine = Engine.create();
        engine.world.gravity.y = 0;
        
        // Aggiungi i confini del mondo
        addBoundaries();
        
        // Crea gli oggetti fisici (meno elementi su mobile)
        const totalPhotos = window.innerWidth <= 500 ? 24 : 32;
        for (let i = 0; i < totalPhotos; i++) {
            let x = Math.random() * (window.innerWidth - 200) + 100;
            let y = Math.random() * (window.innerHeight - 200) + 100;
            backstagePhotos.push(new Backstage(x, y, `./Backstage/backstage${i + 1}.webp`));
        }
    }
    
    function addBoundaries() {
        const thickness = 75;
        boundaries = [
            Bodies.rectangle(window.innerWidth / 2, -thickness / 2, window.innerWidth, thickness, { isStatic: true }),
            Bodies.rectangle(window.innerWidth / 2, window.innerHeight + thickness / 2, window.innerWidth, thickness, { isStatic: true }),
            Bodies.rectangle(-thickness / 2, window.innerHeight / 2, thickness, window.innerHeight, { isStatic: true }),
            Bodies.rectangle(window.innerWidth + thickness / 2, window.innerHeight / 2, thickness, window.innerHeight, { isStatic: true })
        ];
        World.add(engine.world, boundaries);
    }
    
    function resetBoundaries() {
        if (!engine) return;
        boundaries.forEach((b) => World.remove(engine.world, b));
        addBoundaries();
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
    
    // Aggiorna gli elementi nel loop di animazione
    function updateElements() {
        rafId = requestAnimationFrame(updateElements);
        backstagePhotos.forEach((item) => item.update());
    }
    
    function startSimulation() {
        if (isRunning) return;
        if (!runner) runner = Runner.create();
        Runner.run(runner, engine);
        document.addEventListener('mousemove', mouseMoved);
        isRunning = true;
        updateElements();
    }
    
    function stopSimulation() {
        if (!isRunning) return;
        Runner.stop(runner);
        document.removeEventListener('mousemove', mouseMoved);
        isRunning = false;
        if (rafId) cancelAnimationFrame(rafId);
        rafId = null;
    }
    
    const backstageSection = document.querySelector("#Backstage");
    if (backstageSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) startSimulation();
                else stopSimulation();
            });
        }, { threshold: 0.2 });
        observer.observe(backstageSection);
    } else {
        startSimulation();
    }
    
    window.addEventListener("resize", () => {
        resetBoundaries();
    });
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

            const isScrollLocked = document.body.style.position === "fixed";
            const currentScrollY = isScrollLocked ? (lastScrollY || 0) : window.scrollY;

            if (currentScrollY < 50) {  // Se l'utente è vicino all'inizio della pagina
                firstLink?.classList.add('active');
            } else {
                firstLink?.classList.remove('active');
            }
        }
        
        // Controllo all'avvio e su scroll
        checkHomeSection();
        window.addEventListener("scroll", checkHomeSection);
        
        // Se un paragrafo dolls è aperto, chiudilo quando si usa la navbar
        menuLinks.forEach(link => {
            link.addEventListener("click", (event) => {
                const href = link.getAttribute("href") || "";
                const target = href.startsWith("#") ? document.querySelector(href) : null;
                
                if (target) {
                    // Evita di aggiornare l'URL con l'hash
                    event.preventDefault();
                }
                
                document.querySelectorAll('.containerDollsParagraph.show')
                .forEach(el => closeContainerWithGsap(el));
                unlockScroll();
                
                if (target) {
                    requestAnimationFrame(() => {
                        target.scrollIntoView({ behavior: "smooth", block: "start" });
                    });
                }
            });
        });
    });
}
textMenuActive();

// Click sul titolo: torna in cima (come Home)
document.addEventListener("DOMContentLoaded", () => {
    const titleEl = document.querySelector("nav .title");
    if (!titleEl) return;
    titleEl.addEventListener("click", () => {
        const isLocked = document.body.style.position === "fixed";
        if (isLocked) unlockScroll();
        requestAnimationFrame(() => {
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    });
});



const moodImages = document.querySelectorAll('.imgMoodboard');
const moodboardContainer = document.querySelector('.imgMoodboardContainer');
const moodboardCredits = document.querySelector('.moodboardCredits');
const moodboardCreditRef = document.querySelector('.moodboardCreditRef');
const moodboardCreditSource = document.querySelector('.moodboardCreditSource');
const moodOrder = [...moodImages].map((_, i) => i).sort(() => Math.random() - 0.5);
const moodAngleOffset = Math.random() * Math.PI * 2;

function positionMoodboardImages() {
    if (!moodboardContainer || moodImages.length === 0) return;
    const rect = moodboardContainer.getBoundingClientRect();
    let maxW = 0;
    let maxH = 0;
    moodImages.forEach((img) => {
        const r = img.getBoundingClientRect();
        if (r.width > maxW) maxW = r.width;
        if (r.height > maxH) maxH = r.height;
    });
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const radiusX = Math.max(0, rect.width / 2 - maxW / 2 - 16);
    const radiusY = Math.max(0, rect.height / 2 - maxH / 2 - 16);
    const count = moodImages.length;
    
    moodImages.forEach((img, i) => {
        const index = moodOrder[i];
        const angle = (index / count) * Math.PI * 2 - Math.PI / 2 + moodAngleOffset;
        const x = centerX + radiusX * Math.cos(angle);
        const y = centerY + radiusY * Math.sin(angle);
        img.style.left = `${x}px`;
        img.style.top = `${y}px`;
    });
}

window.addEventListener("load", positionMoodboardImages);
window.addEventListener("resize", positionMoodboardImages);

moodImages.forEach(img => {
    img.addEventListener('mouseenter', () => {
        const refValue = img.dataset.ref || "";
        moodImages.forEach(other => {
            const sameRef = refValue && other.dataset.ref === refValue;
            if (sameRef) {
                other.classList.add('active');
                other.classList.remove('blur');
                return;
            }
            if (other !== img) {
                other.classList.add('blur');
                other.classList.remove('active');
            } else {
                other.classList.add('active');
                other.classList.remove('blur');
            }
        });
        
        if (moodboardCredits) {
            const ref = img.dataset.ref || "Reference";
            const source = img.dataset.source || "Fonte";
            if (moodboardCreditRef) moodboardCreditRef.textContent = ref;
            if (moodboardCreditSource) moodboardCreditSource.textContent = source;
        }
    });
    
    img.addEventListener('mouseleave', () => {
        moodImages.forEach(other => {
            other.classList.remove('blur');
            other.classList.remove('active');
        });
        if (moodboardCredits) {
            if (moodboardCreditRef) moodboardCreditRef.textContent = "Reference";
            if (moodboardCreditSource) moodboardCreditSource.textContent = "Fonte";
        }
    });
});

// Brandlist: centra e cambia brand ogni 1s
const brandlistContent = document.querySelector('.brandlistContent');
const brandlistContainer = document.querySelector('.brandlistContainer');
if (brandlistContent) {
    const brands = brandlistContent.textContent
    .split('—')
    .map(s => s.trim())
    .filter(Boolean);
    
    if (brands.length > 0) {
        let idx = 0;
        let timerId = null;
        let isInView = true;
        const showBrand = () => {
            brandlistContent.textContent = brands[idx];
            idx = (idx + 1) % brands.length;
        };
        const start = () => {
            if (!isInView) return;
            if (timerId) return;
            showBrand();
            timerId = setInterval(showBrand, 1000);
        };
        const stop = () => {
            if (!timerId) return;
            clearInterval(timerId);
            timerId = null;
        };
        
        if (brandlistContainer) {
            isInView = false;
            const observer = new IntersectionObserver((entries) => {
                entries.forEach((entry) => {
                    isInView = entry.isIntersecting;
                    if (isInView) start();
                    else stop();
                });
            }, { threshold: 0.2 });
            observer.observe(brandlistContainer);
            
            brandlistContainer.addEventListener('mouseenter', stop);
            brandlistContainer.addEventListener('mouseleave', start);
        } else {
            start();
        }
    }
}




//! inizio delle imgContainer in shoots

const indicator = document.querySelector('.toSeeSquareIndicator');
const container = document.querySelector('.imgShootsContainer');
const images = document.querySelectorAll('.imgShoots');

function positionIndicatorOnImage(img) {
    if (!img || !indicator || !container) return;
    const imgRect = img.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();
    const left = imgRect.left - containerRect.left + imgRect.width / 2;
    const top = imgRect.top - containerRect.top + imgRect.height / 2;
    indicator.style.left = `${left}px`;
    indicator.style.top = `${top}px`;
    indicator.style.transform = "translate(-50%, -50%)";
}

images.forEach((img) => {
    img.addEventListener('mouseenter', () => {
        positionIndicatorOnImage(img);
    });
});

window.addEventListener("load", () => {
    positionIndicatorOnImage(images[0]);
});


function shootsImageInContainer() {
    document.addEventListener("DOMContentLoaded", function () {
        const imgShoots = document.querySelectorAll(".imgShoots");
        const toSeeContainer = document.querySelector(".toSeeContainer");
        const hoverText = toSeeContainer ? toSeeContainer.querySelector("p") : null; // Seleziona il <p>
        const firstImg = imgShoots[0];
        
        if (firstImg && toSeeContainer) {
            toSeeContainer.style.backgroundImage = `url(${firstImg.src})`;
            toSeeContainer.style.backgroundSize = "contain";
            toSeeContainer.style.backgroundPosition = "center";
            if (hoverText) hoverText.style.display = "none";
        }
        
        imgShoots.forEach(img => {
            img.addEventListener("mouseover", function () {
                // Cambia l'immagine nello "schermo grande"
                toSeeContainer.style.backgroundImage = `url(${img.src})`;
                toSeeContainer.style.backgroundSize = "contain";
                toSeeContainer.style.backgroundPosition = "center";
                
                // Nasconde il testo
                if (hoverText) {
                    hoverText.style.display = "none";
                }
            });
            
            img.addEventListener("mouseleave", function () {
                // Lascia l'immagine attiva quando il mouse esce
            });
        });
    });
}



shootsImageInContainer(); // Chiama la funzione


function initDollsCarousel() {
    const container = document.querySelector(".dollsContainer");
    const track = container?.querySelector(".dollsTrack");
    if (!container || !track) return;
    
    const originalItems = Array.from(track.children);
    if (originalItems.length === 0) return;
    
    // Duplica per loop infinito (5 set totali)
    originalItems.forEach((item) => {
        track.appendChild(item.cloneNode(true));
    });
    originalItems.forEach((item) => {
        track.appendChild(item.cloneNode(true));
    });
    originalItems.forEach((item) => {
        track.appendChild(item.cloneNode(true));
    });
    originalItems.forEach((item) => {
        track.appendChild(item.cloneNode(true));
    });
    
    let step = 0;
    let loopWidth = 0;
    let translateX = 0;
    let baseOffset = 0;
    let isDragging = false;
    let isInertia = false;
    let virtualIndex = 0;
    const setsCount = 5;
    const centerSet = 2;
    let startX = 0;
    let startTranslate = 0;
    let lastX = 0;
    let lastTime = 0;
    let velocity = 0;
    let inertiaId = null;
    let maskSyncId = null;
    let lastCentered = null;
    let downTarget = null;
    let downX = 0;
    let downY = 0;
    let savedTranslateX = null;
    let savedVirtualIndex = null;
    
    function openDollParagraphForCard(card) {
        if (!card) return;
        let dollClass = "";
        if (card.classList.contains("hera")) {
            dollClass = "hera";
        } else if (card.classList.contains("kiana")) {
            dollClass = "kiana";
        } else if (card.classList.contains("amani")) {
            dollClass = "amani";
        }
        if (!dollClass) return;
        const containerEl = document.querySelector(`.containerDollsParagraph.${dollClass}Paragraph`);
        if (containerEl) {
            containerEl.classList.add("show");
            lockScroll();
            openContainerWithGsap(containerEl);
        }
    }
    
    function applyTransform() {
        track.style.transform = `translateX(${translateX}px)`;
    }
    
    function syncVirtualIndex() {
        if (step <= 0) return;
        const centerOrigin = baseOffset - centerSet * loopWidth;
        virtualIndex = Math.round((centerOrigin - translateX) / step);
    }
    
    function updateActive() {
        if (step <= 0) return;
        const allItems = Array.from(track.children);
        allItems.forEach((el) => el.classList.remove("isCentered"));
        
        const containerCenter = container.clientWidth / 2;
        const centerInTrack = -translateX + containerCenter;
        
        let closest = null;
        let minDist = Infinity;
        allItems.forEach((el) => {
            const elCenter = el.offsetLeft + el.offsetWidth / 2;
            const dist = Math.abs(elCenter - centerInTrack);
            if (dist < minDist) {
                minDist = dist;
                closest = el;
            }
        });
        if (closest) closest.classList.add("isCentered");
        if (closest && closest !== lastCentered) {
            lastCentered = closest;
            startMaskSync(450);
        }
        
        const nameOverlay = container.querySelector(".dollCenterName");
        if (closest && nameOverlay) {
            const name = closest.dataset.name || "";
            nameOverlay.textContent = name;
            nameOverlay.setAttribute("data-text", name);
            
            const containerRect = container.getBoundingClientRect();
            const itemRect = closest.getBoundingClientRect();
            const bgImage = getComputedStyle(closest).backgroundImage;
            
            container.style.setProperty("--doll-mask-image", bgImage);
            container.style.setProperty("--doll-mask-left", `${itemRect.left - containerRect.left}px`);
            container.style.setProperty("--doll-mask-top", `${itemRect.top - containerRect.top}px`);
            container.style.setProperty("--doll-mask-width", `${itemRect.width}px`);
            container.style.setProperty("--doll-mask-height", `${itemRect.height}px`);
            
            if (!isDragging && !isInertia && !nameOverlay.classList.contains("isVisible")) {
                nameOverlay.classList.remove("isHidden");
                requestAnimationFrame(() => {
                    nameOverlay.classList.add("isVisible");
                });
            }
        }
    }
    
    function startMaskSync(duration = 500) {
        if (maskSyncId) cancelAnimationFrame(maskSyncId);
        const start = performance.now();
        const tick = () => {
            updateActive();
            if (performance.now() - start < duration) {
                maskSyncId = requestAnimationFrame(tick);
            }
        };
        maskSyncId = requestAnimationFrame(tick);
    }
    
    function wrap() {
        if (loopWidth === 0) return;
        const centerOrigin = baseOffset - centerSet * loopWidth;
        const min = centerOrigin - 1.5 * loopWidth;
        const max = centerOrigin + 1.5 * loopWidth;
        while (translateX <= min) translateX += loopWidth;
        while (translateX > max) translateX -= loopWidth;
        syncVirtualIndex();
    }
    
    function measure() {
        const first = track.children[0];
        if (!first) return;
        const gap = parseFloat(getComputedStyle(track).gap) || 0;
        const itemWidth = first.offsetWidth;
        const containerWidth = container.clientWidth;
        step = itemWidth + gap;
        loopWidth = step * originalItems.length;
        baseOffset = containerWidth / 2 - itemWidth / 2;
        
        if (loopWidth > 0) {
            const centerOrigin = baseOffset - centerSet * loopWidth;
            if (translateX === 0) {
                translateX = centerOrigin - step;
                virtualIndex = 1;
            } else {
                translateX = ((translateX - centerOrigin) % loopWidth + loopWidth) % loopWidth;
                translateX = translateX - loopWidth + centerOrigin;
                syncVirtualIndex();
            }
            applyTransform();
            updateActive();
        }
    }
    
    function onPointerDown(e) {
        isDragging = true;
        isInertia = false;
        if (inertiaId) cancelAnimationFrame(inertiaId);
        container.setPointerCapture(e.pointerId);
        startX = e.clientX;
        startTranslate = translateX;
        lastX = e.clientX;
        lastTime = performance.now();
        velocity = 0;
        downX = e.clientX;
        downY = e.clientY;
        downTarget = e.target.closest(".imgDoll");
        track.style.transition = "none";
        const nameOverlay = container.querySelector(".dollCenterName");
        if (nameOverlay) {
            nameOverlay.classList.remove("isVisible");
        }
    }
    
    function onPointerMove(e) {
        if (!isDragging) return;
        const dx = e.clientX - startX;
        translateX = startTranslate + dx;
        wrap();
        applyTransform();
        updateActive();
        
        const now = performance.now();
        const dt = Math.max(1, now - lastTime);
        velocity = (e.clientX - lastX) / dt;
        lastX = e.clientX;
        lastTime = now;
    }
    
    function onPointerUp(e) {
        if (!isDragging) return;
        isDragging = false;
        container.releasePointerCapture(e.pointerId);
        
        const moved = Math.hypot(e.clientX - downX, e.clientY - downY);
        if (moved < 6 && downTarget) {
            updateActive();
            openDollParagraphForCard(downTarget);
            return;
        }
        startInertia();
    }
    
    track.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (isDragging || isInertia) return;
        const card = e.target.closest(".imgDoll");
        if (!card) return;
        updateActive();
        openDollParagraphForCard(card);
    });
    
    function snapToNearest() {
        if (step <= 0) return;
        const centerOrigin = baseOffset - centerSet * loopWidth;
        const rawIndex = (centerOrigin - translateX) / step;
        const snapped = Math.round(rawIndex);
        virtualIndex = snapped;
        translateX = centerOrigin - snapped * step;
        wrap();
        track.style.transition = "transform 0.45s ease";
        applyTransform();
        updateActive();
        setTimeout(() => {
            track.style.transition = "none";
            updateActive();
        }, 460);
    }
    
    function moveBySteps(delta) {
        if (step <= 0) return;
        const centerOrigin = baseOffset - centerSet * loopWidth;
        virtualIndex += delta;
        translateX = centerOrigin - virtualIndex * step;
        track.style.transition = "transform 0.35s ease";
        applyTransform();
        updateActive();
        setTimeout(() => {
            track.style.transition = "none";
            wrap();
            applyTransform();
            updateActive();
        }, 360);
    }
    
    function startInertia() {
        isInertia = true;
        const friction = 0.92;
        const minVelocity = 0.02;
        
        const tick = () => {
            if (!isInertia) return;
            velocity *= friction;
            translateX += velocity * 16;
            wrap();
            applyTransform();
            updateActive();
            
            if (Math.abs(velocity) < minVelocity) {
                isInertia = false;
                snapToNearest();
                return;
            }
            inertiaId = requestAnimationFrame(tick);
        };
        inertiaId = requestAnimationFrame(tick);
    }
    
    let isCarouselVisible = false;
    const visibilityObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            isCarouselVisible = entry.isIntersecting;
        });
    }, { threshold: 0.2 });
    visibilityObserver.observe(container);
    
    container.addEventListener("pointerdown", onPointerDown);
    container.addEventListener("pointermove", onPointerMove);
    container.addEventListener("pointerup", onPointerUp);
    container.addEventListener("pointercancel", onPointerUp);
    container.addEventListener("mouseenter", () => startMaskSync(600));
    container.addEventListener("mouseleave", () => startMaskSync(600));
    container.querySelectorAll(".imgDoll").forEach((el) => {
        el.addEventListener("mouseenter", () => startMaskSync(600));
        el.addEventListener("mouseleave", () => startMaskSync(600));
        el.addEventListener("transitionend", (e) => {
            if (e.propertyName === "transform") updateActive();
        });
    });
    window.addEventListener("resize", measure);
    window.addEventListener("keydown", (e) => {
        if (!isCarouselVisible) return;
        const tag = document.activeElement?.tagName?.toLowerCase();
        if (tag === "input" || tag === "textarea") return;
        if (e.key === "ArrowRight") {
            e.preventDefault();
            moveBySteps(1);
        } else if (e.key === "ArrowLeft") {
            e.preventDefault();
            moveBySteps(-1);
        }
    });
    
    measure();
    updateActive();
}

document.addEventListener("DOMContentLoaded", initDollsCarousel);

function getDollsElements(container) {
    return [
        container.querySelector(".dollsParagraphWrap"),
        container.querySelector(".dollcloseup"),
        container.querySelector(".dollcloseupcontainer"),
        container.querySelector(".xClose")
    ].filter(Boolean);
}

function animateDollElements(container) {
    const g = window.gsap;
    if (!container || !g || typeof g.to !== "function") return;
    const elements = getDollsElements(container);
    if (!elements.length) return;
    const closeup = container.querySelector(".dollcloseup");
    const closeupContainer = container.querySelector(".dollcloseupcontainer");
    const closeupTargets = [closeup, closeupContainer].filter(Boolean);
    const others = elements.filter((el) => !closeupTargets.includes(el));
    
    g.killTweensOf(elements);
    const all = [...closeupTargets, ...others];
    if (all.length) {
        g.fromTo(all, { opacity: 0 }, {
            opacity: 1,
            duration: 0.9,
            ease: "power3.out",
            overwrite: "auto",
            immediateRender: false
        });
    }
}

function openContainerWithGsap(container) {
    const g = window.gsap;
    if (!container) return;
    if (!g || typeof g.to !== "function") {
        container.style.width = "100%";
        return;
    }
    const elements = getDollsElements(container);
    if (elements.length) {
        const closeup = container.querySelector(".dollcloseup");
        const closeupContainer = container.querySelector(".dollcloseupcontainer");
        const closeupTargets = [closeup, closeupContainer].filter(Boolean);
        const others = elements.filter((el) => !closeupTargets.includes(el));
        if (closeupTargets.length) g.set(closeupTargets, { opacity: 0 });
        if (others.length) g.set(others, { opacity: 0 });
    }
    g.killTweensOf(container);
    g.set(container, { display: "block", visibility: "visible", zIndex: 900 });
    g.fromTo(container, { width: "0%" }, {
        width: "100%",
        duration: 1,
        ease: "power3.out",
        immediateRender: true,
        overwrite: "auto",
        onComplete: () => {
            animateDollElements(container);
        }
    });
}

function closeContainerWithGsap(container) {
    const g = window.gsap;
    if (!container) return;
    const elements = getDollsElements(container);
    if (!g || typeof g.to !== "function") {
        container.classList.remove("show");
        container.style.width = "0%";
        return;
    }
    g.killTweensOf([container, ...elements]);
    const tl = g.timeline({
        defaults: { overwrite: "auto" },
        onComplete: () => {
            container.classList.remove("show");
            g.set(container, { clearProps: "all" });
            if (elements.length) g.set(elements, { clearProps: "all" });
        }
    });
    if (elements.length) {
        tl.to(elements, {
            opacity: 0,
            duration: 0.4,
            ease: "power2.in",
            stagger: 0.05
        });
    }
    tl.to(container, {
        width: "0%",
        duration: 0.6,
        ease: "power3.inOut"
    });
}

function resetDollsParagraph(container) {
    if (!container || typeof gsap === "undefined") return;
    const elements = getDollsElements(container);
    if (elements.length) {
        gsap.killTweensOf(elements);
        gsap.set(elements, { clearProps: "all" });
    }
    gsap.killTweensOf(container);
    gsap.set(container, { clearProps: "all" });
}

let lastScrollY = 0;
function lockScroll() {
    const isLocked = document.body.style.position === "fixed";
    if (!isLocked) {
        lastScrollY = window.scrollY || 0;
    }
    document.body.style.position = "fixed";
    document.body.style.top = `-${lastScrollY}px`;
    document.body.style.width = "100%";
    document.documentElement.classList.add("noSnap");
}

function unlockScroll() {
    document.body.style.position = "";
    document.body.style.top = "";
    document.body.style.width = "";
    document.documentElement.classList.remove("noSnap");
    document.body.classList.remove("noScroll");
    document.documentElement.classList.remove("noScroll");
    window.scrollTo(0, lastScrollY || 0);
}

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
                    document.body.classList.add('noScroll');
                    document.documentElement.classList.add('noScroll');
                    container.style.width = "100%";
                    openContainerWithGsap(container);
                }
            });
        });
        
        // Click sulle card gestito dal carousel
        
        // Chiudi i contenitori quando clicchi sul tasto Close
        const closeButtons = document.querySelectorAll('.xClose');
        closeButtons.forEach(closeButton => {
            closeButton.addEventListener('click', () => {
                const container = closeButton.closest('.containerDollsParagraph');
                if (container?._dollsAnimTimeout) {
                    clearTimeout(container._dollsAnimTimeout);
                    container._dollsAnimTimeout = null;
                }
                if (container?._dollsAnimHandler) {
                    container.removeEventListener("transitionend", container._dollsAnimHandler);
                    container._dollsAnimHandler = null;
                }
                document.querySelectorAll('.containerDollsParagraph.show')
                .forEach(el => {
                    if (el?._dollsAnimTimeout) {
                        clearTimeout(el._dollsAnimTimeout);
                        el._dollsAnimTimeout = null;
                    }
                    closeContainerWithGsap(el);
                });
                unlockScroll();
            });
        });
        
        function preventScroll(e) {
            if (document.querySelector('.containerDollsParagraph.show')) {
                e.preventDefault();
            }
        }
        
        document.addEventListener('wheel', preventScroll, { passive: false });
        document.addEventListener('touchmove', preventScroll, { passive: false });
    });
}
dollsParagraphStory();

// Credits physics removed: static layout only.
