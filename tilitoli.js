/*
const kepSzelesseg = "17%";
const oszlopok = 5;
const sorok = 5;
const kepMappa = "puzzle5x5\\";
const kepekNeve = "jarasok_nagy_";
const uresKezdoX = 5;
const uresKezdoY = 1;
*/

const kepSzelesseg = "12%";
const oszlopok = 7;
const sorok = 4;
const kepMappa = "puzzle7x4\\";
const kepekNeve = "IMG_20170819_175752_";
const uresKezdoX = 1;
const uresKezdoY = 1;

const uresNeve = "empty.jpg";
const effektSebesseg = 20;

var uresX = uresKezdoX;
var uresY = uresKezdoY;
var lepesSzam;
var timer;
var mitS, mitO, mireS, mireO;
var kirakott = [];
var aktualis = [];
var timerFunc;
var futoJatek = false;

function alaphelyzet() {

	let ter = document.getElementById("jatekTer");

	let oszi;
	let elem;

	for (let sori = 1; sori <= sorok; sori++) {
		for (oszi = 1; oszi <= oszlopok; oszi++) {
			kirakott.push(sori * 10 + oszi);
			elem = document.createElement("img");
			if (uresKezdoX == oszi && uresKezdoY == sori) {
				elem.setAttribute("src", kepMappa + uresNeve);
				elem.setAttribute("class", "ures");
			} else {
				elem.setAttribute("src", kepMappa + kepekNeve + sori + "_" + oszi + ".jpg");
				elem.setAttribute("class", "kepek");
			}
			elem.setAttribute("id", oszi + 10 * sori);
			elem.setAttribute("onClick", "csere(" + (oszi + sori * 10) + ")");
			elem.style.width = kepSzelesseg;
			ter.appendChild(elem);
		}
		ter.appendChild(document.createElement("br"));
	}
	futoJatek = false;
	gombBeallitas();
}

function csere(mit) {
	if (!futoJatek || mit == uresX + uresY * 10)
		return;

	let mitX = mit % 10;
	let mitY = Math.floor(mit / 10);
	let seg1 = Math.abs(mitX - uresX);
	let seg2 = Math.abs(mitY - uresY);
	if (seg1 <= 1 && seg2 <= 1 && seg1 + seg2 != 2) {
		lepesSzam++;
		let elem = document.getElementById("lepesekSzoveg");
		elem.innerHTML = lepesSzam;

		elem = document.getElementById(mit);
		let ures = document.getElementById(uresX + uresY * 10);
		ures.setAttribute("src", elem.getAttribute("src"));
		ures.setAttribute("class", "kepek");
		elem.setAttribute("src", kepMappa + uresNeve);
		elem.setAttribute("class", "ures");
		uresX = mitX;
		uresY = mitY;
	}
}

function leFed() {
	let elem = document.getElementById(mitS * 10 + mitO);
	if (mitS != uresKezdoY || mitO != uresKezdoX)
		elem.style.filter = "blur(8px)";

	mitO++;
	if (mitO > oszlopok) {
		mitO = 1;
		mitS++;
	}
	if (mitS <= sorok) {
		setTimeout("leFed()", effektSebesseg);
	}

}

function felFed() {
	let elem = document.getElementById(mireS * 10 + mireO);
	let cellaIndex;
	elem.style.filter = "";
	cellaIndex = (mireS - 1) * oszlopok + mireO - 1;
	if (mireS != uresKezdoY || mireO != uresKezdoX)
		elem.setAttribute("src", kepMappa + kepekNeve + Math.floor(aktualis[cellaIndex] / 10) + "_" + aktualis[cellaIndex] % 10 + ".jpg");
	else
		elem.setAttribute("src", kepMappa + uresNeve);

	mireO--;
	if (mireO < 1) {
		mireO = oszlopok;
		mireS--;
	}
	if (mireS > 0) {
		setTimeout("felFed()", effektSebesseg);
	} else {
		gombBeallitas();
	}

}

function kirakottGomb() {
	let ter = document.getElementById("jatekTer");

	let oszi;
	let elem;

	for (let sori = 1; sori <= sorok; sori++) {
		for (oszi = 1; oszi <= oszlopok; oszi++) {
			elem = document.getElementById(oszi + 10 * sori);
			if (uresKezdoX == oszi && uresKezdoY == sori) {
				elem.setAttribute("src", kepMappa + uresNeve);
				elem.setAttribute("class", "ures");
			} else {
				elem.setAttribute("src", kepMappa + kepekNeve + sori + "_" + oszi + ".jpg");
				elem.setAttribute("class", "kepek");
			}
		}
	}
}

function keveresGomb() {
	mitS = 1;
	mitO = 1;
	setTimeout("leFed()", 0);

	let temp = [];
	for (cik = 0; cik < kirakott.length; cik++)
		if (kirakott[cik] != uresKezdoX + uresKezdoY * 10)
			temp.push(kirakott[cik]);

	aktualis = [];
	let vel;
	let seg = 0;
	while (temp.length > 0) {
		seg++;
		vel = Math.floor(Math.random() * temp.length);
		if (seg == uresKezdoX + (uresKezdoY - 1) * oszlopok)
			aktualis.push(uresKezdoX + uresKezdoY * 10);
		aktualis.push(temp[vel]);
		temp.splice(vel, 1);
	}

	mireS = sorok;
	mireO = oszlopok;
	setTimeout("felFed()", effektSebesseg * (sorok * oszlopok + 3));
}

function jatekvegeGomb() {
	futoJatek = false;
	clearTimeout(timerFunc);
	gombBeallitas();
	kirakottGomb();
}

function gombBeallitas() {
	var gomb;

	var gombok = document.getElementsByClassName("elokeszito");

	for (cik = 0; cik < gombok.length; cik++) {
		gomb = gombok[cik];

		if (futoJatek) {
			gomb.style.filter = "blur(2px)";
			gomb.setAttribute("onClick", "");
		} else {
			gomb.style.filter = "";
			gomb.setAttribute("onClick", gomb.id + "()");
		}
	}

	var gombok = document.getElementsByClassName("futo");

	for (cik = 0; cik < gombok.length; cik++) {
		gomb = gombok[cik];

		if (futoJatek) {
			gomb.style.filter = "";
			gomb.setAttribute("onClick", gomb.id + "()");
		} else {
			gomb.style.filter = "blur(2px)";
			gomb.setAttribute("onClick", "");
		}
	}

}

function ujjatekGomb() {

	if (timerFunc != null)
		clearTimeout(timerFunc);
	uresX = uresKezdoX;
	uresY = uresKezdoY;
	lepesSzam = 0;
	elem = document.getElementById("lepesekSzoveg");
	elem.innerHTML = lepesSzam;
	timer = 0;
	futoJatek = true;
	gombBeallitas();
	timerFunc = setTimeout("ora()", 1000);
}

function ora() {
	elem = document.getElementById("idomeroSzoveg");
	timer++;
	var tmp = timer % 10;
	var mp = Math.floor(timer / 10) % 60;
	var p = Math.floor(timer / 600);
	elem.innerHTML = p + ":" + (mp < 10 ? "0" + mp : mp) + ":" + tmp;
	timerFunc = setTimeout("ora()", 100);
}
