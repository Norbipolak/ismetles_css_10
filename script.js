class Lottery {
    numbersDiv;
    userNumbers;
    randNumbers;

    constructor() {
        this.numbersDiv = document.querySelector("#numbers");
        this.showNumbers();
        this.userNumbers = [];
        this.randNumbers = [];
    }

    showNumbers() {
        for(let i = 1; i <= 90; i++) {
            const number = document.createElement("div");
            number.classList.add("number");
            number.innerText = i;
            this.numbersDiv.appendChild(number);

            number.addEventListener("click", ()=> {
                //this.userNumbers.push(i); ha rákattintunk akkor belerakja ezt a számot a tömbbe, tehát az i-t, ami a number.innerText = i
                const index = this.userNumbers.indexOf(i);

                if(this.userNumbers.length === 5 && index === -1)
                    return;

                number.classList.toggle("selected");

                if(index !== -1) {
                    this.userNumbers.splice(index, 1);
                } else {
                    this.userNumbers.push(i);
                    console.log(this.userNumbers);
                }
            });
        }
    }

    generateRandomNumbers() {
        while(this.randNumbers.length < 5) {
        const rand = Math.floor(Math.random()*90) + 1;

        if(!this.randNumbers.includes(rand)){
            this.randNumbers.push(rand);
        }
        }
    }
}

new Lottery();

/*
    number.addEventListener("click", ()=> {
        this.userNumbers.push(i);
    });

Ilyen formában három probléma van 
1. Nincsen jelölve, hogy melyik számokat raktunk bele ebben a userNumbers tömbbe, erre kell csinálni majd egy selected class-t 
és annak megadni amire ráttintunk 
2. jelen esetben annyi számot rakunk bele ebbe a tömbbe amennyit szeretnénk, mi meg azt szeretnénk, hogy csak 5 darab szám legyen benne 
3. nem tudunk belöle kiszedni számokat

Csinálunk egy selected class-t 
meg a 2.-kat azt ugy lehet megoldani, hogyha a userNumbers-nak a length-je az 5 akkor return, de így meg majd nem fogunk tudni kiszedni 
belőle, ezért kell majd az, hogy megnázzük, hogy benne van-e a szám stb.
-> 
if(this.userNumbers.length === 5)
    return;
1. azt meg megoldottuk azzal, hogy csináltunk egy selected class-t, amit majd megadunk a number-nak 
number.classList.add("selected");
így néz ki css-ben 
.selected {
    background-color: #d2f2c6;
    border: 1px solid #a6d196;  
}
eddig most így néz ki a showNumbers()

showNumbers() {
    for(let i = 1; i <= 90; i++) {
        const number = document.querySelector("div");
        number.classList.add("number");
        number.innerText = i;
        this.numbersDiv.appendChild(number);
    }

    number.addEventListener("click", ()=> {
        if(this.userNumbers.length === 5)
            return;

        number.classList.toggle("selected");

        this.userNumbers.push(i);
    });
}

Itt majd a classList-nél a selected-et nem add-oljuk hanem toggle, szóval ha nincs rajta, akkor rárakja, ha pedig rajta van akkor meg leveszi
tehát ha ki akarjuk szedni a számot akkor pedig leveszi és ott nem kell megcsinálni, hogy remove!!

Így most nem lehet már belerakni viszont kiszedni sem lehet, szóval valami olyas logikát kellenne ennek kitalálni, hogyha már beleraktuk, akkor 
kiszedje és akkor is kiszedje ha már 5 darab van benne
Honnan tudjuk, hogy az a szám benne van a tömbben, amire rányomtunk vagy nincsen benne 
1. van egy olyan, hogy includes -> és akkor ezzel meg lehet nézni, hogy benne van-e a tömbben 
Ez azért nem jó, mert nem csak azt kell tudnunk, hogy benne van-e, hanem azt is, hogy hányadik pozicióban, indexen!!!!
Erre jó az indexOf!!!! 
const index = this.userNumbers.indexOf(i);!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
console.log(index);
Megnézzük, hogy hányadik indexen található ha rákattintunk valamire -> ha elsőre rákattuntunk akkor -1 lesz, mert ez még nem volt bent a 
tömbben!!!
Rákattintunk az 1-re, majd utána az 50-re kétszer 
-1 
{1}
-1
{1, 50}
1
{1, 50, 50}
Azért lest itt egy mert az indexOf az első előfordulást nézi!!!! amely ugye az első indexen található az első 50-es 

Most azt kell csinálni, hogyha az indexOf, tehát a const index = this.userNumbers.indexOf() az nem -1-et ad vissza tehát az a szám 
már benne van a tömbben, akkor ki tudjuk venni 
Tehát ez nem úgy müködik, hogy nem rakja bele, hanem belerakja megy a kód lefele és akkor kiszedi, mert 
-> 
if(index !== -1) {
    this.userNumbers.splice(index, 1);
}
És akkor emiatt kell hogy tudjuk mi az indexe annak, amit ki szeretnénk venni, mert úgy szedjük ki, hogy a splice az indexedik elemét 
szedi ki, vagyis az indextől indulva egy elemet, ami maga az indexen álló elem!!!!!!!!!!!!!!!!!!!!!!!!!!

Kombinálni kell ezt a kettőt, hogy length meg az index-et 
if(this.userNumbers.length === 5 && index === -1)
    return;
Tehát akkor kell a return, hogyha a tömb már tartalmaz 5 elemet és olyan elemet akarunk belerakni ami még nincsen a tömbben, tehát 
az indexe az -1!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

number.addEventListener("click", ()=> {
    const index = this.userNumbers.indexOf(i);

    if(this.userNumbers === 5 && index === -1)
        return;

    number.classList.toggle("selected");

    if(index !== -1) {
        this.userNumbers.splice(index, 1);
    } else {
        this.userNumbers.push(i);
    }
})

1. const index = this.userNumbers.indexOf(i);
azért van, mert ha ki akarunk valamit szedni akkor tudjuk, hogy hányadik index-e található az a dolog 
meg azért, hogyha ennek a visszatérési értéke -1, akkor még nincsen benne, tehát bele lehet rakni, push-olni 

2. if(this.userNumbers.length === 5 && index === -1)
    return;
Itt azt vizsgáltuk, hogy mikor kell, hogy ne menjen tovább tehát return-öljön és kijövünk a függvényből 
ezeket a return-öket ha van általában a függvény elejére írjuk, hogy ne menjen tovább 
Szóval ha tartalmaz a tömb 5 elemet és bele akarunk rakni egy újjat, aminek az indexe -1, tehát még nincsen benne 
akkor return, ne menjünk tovább 

3. number.classList.toggle("selected");
rárakjuk vagy levesszük ezt a class-t 

4. 
if(index !== 1) {
    this.userNumbers.splice(index, 1);
} else {
    this.userNumbers.push(i);
}
Itt meg csak azt vizsgáljuk, hogy benne van-e a tömbben, ha igen, akkor kivesszük, ha nincsen akkor meg belerakjuk 

Fontos!!!
Függvényeknél az elején meg kell határozni, hogy mi az az eset, ami nem jó és akkor egyből kilépünk a return-vel a függvényből 
********************************************************
Ha már megvan az 5 számunk, akkor mi a következő lépés
-> 
legenerálunk 5 számot 
Le kell generálni 5 darab számot, hogy köztük ne legyen duplikáció 
generateRandomNumbers() {
    const randNumbers = [];
    while(randNumbers.length < 5) {
        const rand = Math.floor(Math.random()*90) + 1;
        
        if(!randNumbers.includes(rand))
            randNumbers.push(rand);
    }
}

Meg kell nézni, hogyha van kettő ugyanolyan akkor leállunk 
if(!randNumbers.includes(rand))
    randNumbers.push(rand);
A randNumbers az nem tartalmazza a rand-ot, csak abban az esetben push-oljuk bele és ez egészen addig meg megy, amig a while miatt a 
randNumbers nem fog tartalmazni 5 darab különböző számot 

Ezzel most generáltunk 5 darab véletlen számot, de mi a baj azzal, hogy itt egy lokális változót hoztunk létre
const randNumbers = [];
benne van ebbe a generateRandomNumbers függvényben 
Így most ehhez csak a függvényen belül tudunk hozzáférni, hogy lehet hogy hozzá tudjunk férni más függvényen belül is 
felül kell definiálni a constructor-ban 

class Lottery {
    numbersDiv;
    userNumbers;
    randNumbers;
    playBtn;
    hits;

    constructor() {
        this.numbersDiv = document.querySelector("#numbers");
        this.showNumbers();
        this.userNumbers = [];
        this.randNumbers = [];
        this.playBtn = document.querySelector("#play");
        this.hits = 0;
        this.play();
    }

    generateRandomNumbers() {
        while(this.randNumbers.length > 5){
            const rand = Math.floor(Math.random()*90) + 1;
        }

        if(!this.randNumbers.includes(rand)){
            this.randNumbers.push(rand);
        }
    }

Ezt nekünk hol kell meghívni 
User az kijelölte azokat a számokat, amiket szeretet volna -> következő lépés, hogy a user rákattint egy gombra, hogy kezdödjön el a játék 
Csinálunk egy button-t és adunk neki egy id-t, hogy play 
-> 
<button id="play">play</button>
Ha ezt megnyomja a user utána generáljuk le a véletlen számainkat
button {
    padding: 8px;
    display: block;
    margin: 10px auto;
}

Mit csináljunk ezzel a gombbal, hogy játszunk 
1. le kell menteni (kicsit felette oda mentem le)
2. létrehozunk egy play metódust és abban csinálunk a gombnak egy eventListener-t
3. ebben a metódusban meghívjuk a generateNumbers-t  
4. még ebben a függványben valami olyan mehanizmust kell kialakítani, ami megakadályozza, hogy a user megnyomhassa-e gombot, amikor 
mondjuk még nem választotta ki az 5 számot, illetve megnyomhatja, csak itt nekünk meg kell akadályoznunk, hogy bármi történjen 
-> if-vel ha a userNumbers.length !== 5 akkor returnölni kell 
5. Innentől kezdve már össze tudjuk számolni a találatokat 
    - csinálunk felül egy hits változót, aminek a kezdeti értéke az nulla és ha van valami találatunk, akkor ennek a számát kell növelni 
        (playBtn alá csináljuk majd)
Erre csinálunk majd egy metódust countHits 

play() {
    this.playBnt.addEventListener("click", ()=> {
        if(this.userNumbers.length !== 5)
            return;

        this.generateNumbers();
    });
}

countHits() {
    for(const number of this.userNumbers) {
        if(this.randNumbers.includes(number))
            this.hits++;
    }
}

Hogyan tudjuk összeszámolni a találatokat, van két tömbünk 
1. végigmegyünk az egyiken egy for-val
2. megnézzük, hogy valamelyik elem is szerepelt-e a másik tömbben egy includes-val 
    fontos, hogy ne felejtsük el a this-eket!!!!!!!!!!!!!!!!!!!!!!!!!!
3. meghívjuk ezt a countHits metódust a play metódusban 

Fontos
Itt még lesz egy probléma, hogyha a generateRandomNumbers meghívjuk többször egymás után, akkor nem fog új számokat generálni 
-> 
mert ebben van egy while ami megy addig, amig 5 darab számot nem generál, de viszont ha egyszer legenerálta, akkor nem fog többet, 
mert meg van az 5 véletlen szám a randNumbers-ben 
-> 
ezért az a while elött mindig ki kell üríteni, hogy kelljen neki 5 számot újra generálni!!!!

generateRandomNumbers() {
    this.randomNumbers = [];

    while(this.randNumbers.length < 5) {
        const rand = Math.floor(Math.random()*90) + 1;

        if(!this.randNumbers.includes(rand)) {
            this.randNumbers.push(rand);
        }
    }
}
megnézzük, hogy mik voltal a userNumbers-ök, randNumbers-ök és a hits-ek 
play() {
    if(this.userNumbers.length !== 5)
        return;

    this.generateRandomNumbers();
    this.countHits;
    this.hits = 0;

    console.log(this.userNumbers);
    console.log(this.randNumbers);
    console.log(this.hits);
}

Constructor-ban pedig meg kell hívni a play-t!!!
még fontos, hogy nem csak a generateRandomNumbers-ban kell kiüríteni a randNumbers-t, hanem a hits-eket is a play-ben lenullázni
mert különben ha lement egy kör és volt egy találatunk, akkor a második kör úgy fog kezdödni, hogy már van egy találatunk
!!!!!!!!!!!!!!!!!!!!!!!!!!!!

Meg akarjuk jeleníteni a hits-eket meg a nyertes számokat tehét a randNumbers-t 
Ehhez csinálunk a html-ben egy szerkezetet meg egy css-t 
->
    <div id="results">
        <div class="box">
            Nyertes számok: <span id="rand-numbers"></span>
        </div>
        <div class="box">
            Találatok száma: <span id="hits"></span>
        </div>
    </div>
-> 
#results {
    display: grid;
    grid-template-columns: 1fr 1fr;
    margin-bottom: 10px;
}

.box {
    background-color: #efefef;
    border: 1px solid #d2d2d2;
    margin-right: -1px;
    padding: 5px;
    text-align: center;
}
1. Lementjük a id-val rendelkező hits-et meg rand-numbers-t felülre 
2. csinálunk neki egy metódust ahol megadjuk az innerText-nek a hits-et meg a randNumbers-t 
3. meghiívjuk ezt a play-ben 

1. ide lementjük 
class Lottery {
    numbersDiv;
    userNumbers;
    randNumbers;
    playBtn;
    hits;
    hitsSpan;
    randNumbersSpan;

    constructor() {
        this.numbersDiv = document.querySelector("#numbers");
        this.showNumbers();
        this.userNumbers = [];
        this.randNumbers = [];
        this.playBnt = document.querySelector("#play");
        this.hits = 0;
        this.play();
        this.hitsSpan = document.querySelector("#hits");
        this.randNumbersSpan = document.querySelector("#rand-numbers");
    }

    2. megcsináljuk a metódust 
    showResults() {
        this.hitsSpan.innerText = this.hits;
        this.randNumbersSpan.innerText = this.randNumbers.join(", ");
    }

    3. meghívjuk a metódust 
    play() {
        if(this.userNumbers.length !== 5)
            return;

        this.generateRandomNumbers();
        this.countHits();
        this.showResults();
        this.hits = 0;
        
    }

*/ 