class Lottery {
    numbersDiv;
    userNumbers;
    randNumbers;
    hits;
    playBtn;
    hitsSpan;
    randNumbersSpan;

    constructor() {
        this.numbersDiv = document.querySelector("#numbers");
        this.playBtn = document.querySelector("#play");
        this.hitsSpan = document.querySelector("#hits");
        this.randNumbersSpan = document.querySelector("#rand-numbers");
        this.userNumbers = [];
        this.randNumbers = [];
        this.showNumbers();
        this.hits = 0;
        this.play();
    }

    showNumbers() {
        for(let i = 1; i <= 90; i++){
            const number = document.createElement("div");
            number.classList.add("number");
            number.innerText = i;

            this.numbersDiv.appendChild(number);

            number.addEventListener("click", ()=> {
                const index = this.userNumbers.indexOf(i);

                if(this.userNumbers.length === 5 && index === -1)
                    return;

                    number.classList.toggle("selected");

                if(index !== -1) {
                    this.userNumbers.splice(index, 1);
                } else {
                    this.userNumbers.push(i);
                }
            });
        }
    }
    
    generateRandomNumbers() {
        this.randNumbers = [];

        while(this.randNumbers.length < 5){
            const rand = Math.floor(Math.random()*90) + 1;

            if(!this.randNumbers.includes(rand)) {
                this.randNumbers.push(rand);
            }
        }
    }

    play() {
        this.playBtn.addEventListener("click", ()=> {
            if(this.userNumbers.length !== 5)
            return;

        this.hits = 0;
        this.generateRandomNumbers();
        this.countHits();
        this.showResults();

        console.log(this.userNumbers);
        console.log(this.randNumbers);
        console.log(this.hits);
        });

    }

    countHits() {
        for(const number of this.userNumbers) {
            if(this.randNumbers.includes(number)){
                this.hits++;
            }
        }
    }

    showResults() {
        this.randNumbersSpan.innerText = this.randNumbers;
        this.hitsSpan.innerText = this.hits;
    }

}

new Lottery();

/*
showNumbers -> megjelenítettük a számokat, html szerkezet, adtunk egy eventListener-t a number-nak!!
1. Ebben meghatároztuk, hogy mikor nem szabad, hogy továbbmenjen a függvény 
    ha már van 5 darab benne és egy olyat szeretnénk betenni, ami már nincsen benne 
    ha olyat, ami benne van akkor az jó, mert az majd a metódus további részében kivesszük 
if(this.userNumbers.length === 5 && index === -1)
index pedig onnan jött, hogy a userNumbers-ben kell tudnunk, hogy benne van-e már az szám, amire rákattintottunk vagy nincsen 
és ha benne van, akkor tudnunk kell, hogy hányadik helyen, hogy majd a splice-val ki tudjuk szedni
const index = this.userNumbers.indexOf(i);

2. hozzáadjuk vagy leveszzük a selected class-t, amit azért csináltunk, hogy lássuk, hogy melyik számok vannak benne illetve nincsenek már
number.classList.toggle("selected");

3. Meghatárottuk, hogy mikor tesszük bele a számot(ha nincs benne), vagy hogyan szedjük ki 
itt is fontos az index, mert ha benne van, akkor megadja, hogy hányadik helyen, ha pedig nincsen benne, akkor -1-et ad vissza!!!!!!!!!!!!!!!!
if(index !== -1) {
    this.userNumbers.splice(index, 1);
} else {
    this.userNumbers.push(i); -> belerakjuk, amit kiválasztottunk számot 
}

Tehát ez az egész minden esetben ha rákattintunk egy number-ra, akkor le fog futni, ezért jó a toggle, mert ugye ha ki akarjuk szedni 
akkor leveszi a selected class-t, mert rajta volt, ha viszont bele akarjuk rakni, akkor meg rárakja 

generateRandomNumbers()
Mi a fontos itt 
- kell csinálni egy tömbot, amibe gyüjtjük ezeket a random számokat (ki kell majd üríteni minden körben ezt a tömböt)
- pontosan 5 darabot kell csinálni while!! 
    while(this.randNumbers.length < 5)
- hogyan kell random számot generálni 
    csinálunk egy változót, amivel generálunk egy random számot és ez majd 5-ször végbe fog menni 
const rand = Math.floor(Math.random()*90) + 1;
- nem szeretnénk, hogy olyan számot generáljon tehat rand-ot, ami már benne van a randNumbers tömbben
    ha nincsen benne csak abban az esetben akarjuk belerakni 
if(!this.randNumbers.includes(rand)) {
    this.randNumbers.push(rand);
}
ezt a metódust csak akkor hívjuk meg ha felhasználó megnyomta a gombot, elötte nem generáljuk le őket 

play() 
- csináltunk egy gombot, de csak akkor játszunk ha a felhasználónak meg van mind az 5 száma 
if(this.userNumbers.length !== 5)
    return;
-tehár így már meg van az 5 száma a felhasználónak 
this.playBtn.addEventListener("click", ()=> {
    if(this.userNumbers.length !== 5)
    return;
    itt meghívunk pár metódust, ami kell majd a játékhoz és lenullőázzuk a hits-eket 
});
countHits ()
- csináltunk egy this.hits változót, ami nulláról indul this.hits = 0;
- ebben a metódusban meg kell néznünk, hogy a két tömb, amiben gyüjtöttük a számokat, azokban van-e ugyanolyan, mert akkor növeljük a this.hits-et
- ezt úgy csináljuk meg, hogy végigmegyünk az egyik tömbön egy for-val és megnézzük, hogy az adott eleme, benne van-e a másikban
->
for(const number of this.userNumbers){
    if(this.randNumbers.includes(number))
        this.hits++;
}

showResults-ban meg csak lementtettük az elemeket, ahol mutatjuk a hits-eket meg nyertes számokat -> randNumbers
- innerText-vel megadtuk nekik, amit szeretnénk, hogy mutassanak, utána pedig meghívtuk őket a play-ben
showResults() {
    this.hitsSpan.innerText = this.hits;
    this.randNumbersSpan.innerText = this.randNumbers.join(", ");

    Fontos a join, mivel ez egy tömb és egy vesszővel elválaszott karakterláncot készítünk belöle (stringet)
}
*/