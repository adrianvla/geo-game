/*


COPYRIGHT ADRIAN VLASOV
HTTPS://MORISINC.NET

Multiplayer Geo-Game






*/


// Import the functions you need from the SDKs you need
import {
	initializeApp
} from "https://www.gstatic.com/firebasejs/9.9.1/firebase-app.js";
import {
	getAnalytics
} from "https://www.gstatic.com/firebasejs/9.9.1/firebase-analytics.js";
import {
	doc,
	setDoc,
	getFirestore,
	collection,
	addDoc,
	updateDoc,
	onSnapshot
} from "https://www.gstatic.com/firebasejs/9.9.1/firebase-firestore.js"
import {
	getAuth,
	signInWithPopup,
	GoogleAuthProvider,
	signInAnonymously
} from 'https://www.gstatic.com/firebasejs/9.9.1/firebase-auth.js'


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

let markerList = {};
let renderMap;
class Marker {
	constructor(id, color) {
		this.id = id;
		this.c = color;
		this.shown = true
		$('#markerList').append(`<div class="absolute z-20 pointer-events-none" id="${id}">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" class="-translate-x-1/2 -translate-y-full shadow-2xl">
			<path
			   d="m 12,2 c -3.8641657,0.00441 -6.9955914,3.1358343 -7,7 0,5.353 6.036,11.45 6.293,11.707 L 12,21.414 12.707,20.707 C 12.964,20.45 19,14.353 19,9 18.995591,5.1358343 15.864166,2.0044086 12,2 Z"
			   fill="${color}"
			   sodipodi:nodetypes="ccscscc" />
			<path
			   d="M12 6a3 3 0 1 0 3 3 3 3 0 0 0-3-3zm0 4a1 1 0 1 1 1-1 1 1 0 0 1-1 1z"
			   fill="#fff"/></svg>
        </div>`);
		markerList[id] = this;
		return this;
	}
	put(x, y) {
		this.x = x;
		this.y = y;
		renderMap();
		return this;
	}
	destroy() {
		$(`#${this.id}`).remove();
		delete markerList[this.id];
		return true;
	}
	show() {
		this.shown = true;
		$(`#${this.id}`).removeClass('hidden');
		return this;
	}
	hide() {
		this.shown = false;
		$(`#${this.id}`).addClass('hidden');
		return this;
	}
}

const firebaseConfig = {
	apiKey: "AIzaSyDIMJb8SqkT5GeNGZmBDZ6mf85g6G3FksY",
	authDomain: "geography-game-8a8a6.firebaseapp.com",
	projectId: "geography-game-8a8a6",
	storageBucket: "geography-game-8a8a6.appspot.com",
	messagingSenderId: "406558710312",
	appId: "1:406558710312:web:58e6ad98374ca49056b31d",
	measurementId: "G-1SJQKQ52SP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const params = new Proxy(new URLSearchParams(window.location.search), {
	get: (searchParams, prop) => searchParams.get(prop),
});

const auth = getAuth();

const google = new GoogleAuthProvider();
const db = getFirestore(app);

function wordCounter(text) {
	var wordCount = 0;
	for (var i = 0; i < text.length; i++) {
		if (text[i] !== ' ') {
			wordCount++;
		}
	}
	return wordCount;
}


var flgli = [];
/* async */
function isMatch(a2c, inp) {
	let j = {};
	for (let i = 0; i < flgli.length; i++) {
		if (a2c == flgli[i].ALPHA2CODE) {
			j = flgli[i];
			break;
		}
	}
	let o = false;
	if (j.COUNTRY.split(' ').map(d => d.toLowerCase()).includes(inp.toLowerCase())) o = true;
	if (inp.toLowerCase() == "island") o = false;
	if (inp.toLowerCase() == " island") o = false;
	if (wordCounter(j.COUNTRY.toLowerCase()) != wordCounter(inp)) o = false;
	if (inp.toLowerCase() == j.ALPHA2CODE.toLowerCase()) o = true;
	if (inp.toLowerCase() == j.ALPHA3CODE.toLowerCase()) o = true;
	if (inp.toLowerCase() == j.COUNTRY.toLowerCase()) o = true;
	return o;
}

(function (_0x465df7, _0x3cd1fe) {
	var _0x5678e8 = _0x5c83,
		_0x223355 = _0x465df7();
	while (!![]) {
		try {
			var _0x2a39cc = -parseInt(_0x5678e8(0x120)) / 0x1 * (parseInt(_0x5678e8(0xf4)) / 0x2) + -parseInt(_0x5678e8(0xf9)) / 0x3 + -parseInt(_0x5678e8(0x116)) / 0x4 + parseInt(_0x5678e8(0xf5)) / 0x5 * (parseInt(_0x5678e8(0x10c)) / 0x6) + parseInt(_0x5678e8(0x11b)) / 0x7 * (parseInt(_0x5678e8(0x127)) / 0x8) + -parseInt(_0x5678e8(0x119)) / 0x9 * (-parseInt(_0x5678e8(0xfa)) / 0xa) + -parseInt(_0x5678e8(0x10a)) / 0xb * (-parseInt(_0x5678e8(0x11a)) / 0xc);
			if (_0x2a39cc === _0x3cd1fe) break;
			else _0x223355['push'](_0x223355['shift']());
		} catch (_0x40872f) {
			_0x223355['push'](_0x223355['shift']());
		}
	}
}(_0x1fa2, 0xa9a3c));

function _0x1fa2() {
	var _0x55b912 = ['\x74\x72\x79', '\x2f\x30\x34', '\x32\x32\x31\x31\x31\x33\x56\x65\x73\x70\x4e\x59', '\x70\x69\x2e', '\x2f\x2f\x63', '\x64\x69\x61', '\x2f\x73\x76', '\x70\x6c\x6f', '\x6b\x5f\x50', '\x34\x38\x4a\x7a\x51\x56\x44\x6a', '\x63\x6f\x6d', '\x62\x6c\x69', '\x74\x6f\x55', '\x61\x67\x5f', '\x38\x74\x4b\x57\x44\x57\x41', '\x38\x35\x31\x38\x31\x30\x41\x6f\x45\x6e\x6f\x56', '\x44\x6f\x6e', '\x69\x6b\x69', '\x66\x6c\x61', '\x31\x39\x35\x36\x35\x34\x30\x76\x79\x4a\x52\x72\x64', '\x32\x39\x30\x50\x51\x72\x66\x76\x53', '\x6f\x66\x5f', '\x65\x70\x75', '\x2f\x46\x6c', '\x2f\x2f\x75', '\x73\x2f\x66', '\x6d\x6f\x6e', '\x65\x6f\x70', '\x73\x6b\x5f', '\x69\x61\x2f', '\x67\x2f\x77', '\x70\x75\x62', '\x67\x73\x61', '\x2e\x73\x76', '\x2e\x6f\x72', '\x70\x65\x64', '\x33\x39\x31\x33\x35\x30\x33\x50\x5a\x58\x4d\x53\x49', '\x70\x73\x3a', '\x34\x32\x6a\x76\x52\x50\x4b\x72', '\x68\x74\x74', '\x73\x5f\x52', '\x77\x69\x6b', '\x63\x2e\x73', '\x25\x32\x37', '\x69\x6d\x65', '\x70\x70\x65', '\x6c\x65\x25', '\x32\x37\x73', '\x35\x30\x30\x37\x30\x34\x30\x41\x74\x6d\x46\x75\x71', '\x61\x64\x2e', '\x50\x65\x6f', '\x33\x31\x30\x33\x38\x33\x7a\x52\x63\x6c\x59\x71', '\x31\x32\x65\x4d\x58\x65\x50\x53', '\x31\x30\x39\x30\x36\x30\x37\x42\x58\x6d\x58\x7a\x77', '\x74\x68\x65', '\x2f\x66\x63'];
	_0x1fa2 = function () {
		return _0x55b912;
	};
	return _0x1fa2();
}

function _0x5c83(_0x363e61, _0x1cce44) {
	var _0x1fa2e8 = _0x1fa2();
	return _0x5c83 = function (_0x5c83ba, _0x3d6f90) {
		_0x5c83ba = _0x5c83ba - 0xf1;
		var _0x50dcea = _0x1fa2e8[_0x5c83ba];
		return _0x50dcea;
	}, _0x5c83(_0x363e61, _0x1cce44);
}

function getFlag(_0x18a243) {
	var _0x187e1c = _0x5c83;
	_0x18a243 = _0x18a243[_0x187e1c(0xf2) + _0x187e1c(0x113) + '\x72\x43\x61' + '\x73\x65']();
	if (_0x18a243 == '\x44\x4e\x52') return _0x187e1c(0x10d) + '\x70\x73\x3a' + '\x2f\x2f\x75' + _0x187e1c(0x125) + _0x187e1c(0x117) + _0x187e1c(0x10f) + _0x187e1c(0x112) + '\x64\x69\x61' + _0x187e1c(0x108) + '\x67\x2f\x77' + _0x187e1c(0xf7) + _0x187e1c(0x109) + _0x187e1c(0x103) + _0x187e1c(0x128) + _0x187e1c(0x100) + _0x187e1c(0xff) + _0x187e1c(0x11d) + _0x187e1c(0xfd) + _0x187e1c(0xf3) + _0x187e1c(0xfb) + _0x187e1c(0xf6) + '\x65\x74\x73' + _0x187e1c(0x126) + _0x187e1c(0x101) + _0x187e1c(0x114) + _0x187e1c(0x115) + '\x5f\x52\x65' + _0x187e1c(0x105) + '\x6c\x69\x63' + _0x187e1c(0x107) + '\x67';
	else return _0x18a243 == '\x4c\x4e\x52' ? '\x68\x74\x74' + _0x187e1c(0x10b) + _0x187e1c(0xfe) + _0x187e1c(0x125) + _0x187e1c(0x117) + _0x187e1c(0x10f) + _0x187e1c(0x112) + _0x187e1c(0x123) + '\x2e\x6f\x72' + _0x187e1c(0x104) + _0x187e1c(0xf7) + _0x187e1c(0x109) + _0x187e1c(0x103) + _0x187e1c(0x128) + _0x187e1c(0x100) + '\x73\x2f\x30' + _0x187e1c(0x11f) + '\x2f\x46\x6c' + _0x187e1c(0xf3) + '\x6f\x66\x5f' + _0x187e1c(0x11c) + '\x5f\x4c\x75' + '\x68\x61\x6e' + _0x187e1c(0x102) + _0x187e1c(0x118) + '\x70\x6c\x65' + _0x187e1c(0x111) + _0x187e1c(0x10e) + _0x187e1c(0xfc) + _0x187e1c(0xf1) + _0x187e1c(0x110) + '\x76\x67' : '\x68\x74\x74' + '\x70\x73\x3a' + _0x187e1c(0x122) + '\x6f\x75\x6e' + _0x187e1c(0x11e) + _0x187e1c(0xf8) + _0x187e1c(0x106) + _0x187e1c(0x121) + _0x187e1c(0x128) + _0x187e1c(0x124) + '\x67\x2f' + _0x18a243;
}
//getFlag

$(document).ready(async () => {
	window.room = window.location.hash.replace('#', '');
	if (window.room != '')
		window.unsub = onSnapshot(doc(db, "rooms", window.room), processChange);

	$('#google').on('click', () => {
		$(`#google`).html(`<svg aria-hidden="true" role="status" class="inline mr-3 w-4 h-4 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"/>
        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"/>
        </svg>
        Loading...`);
		signInWithPopup(auth, google)
			.then((result) => {
				// This gives you a Google Access Token. You can use it to access the Google API.
				$(`#google`).html(`<svg class="mr-2 -ml-1 w-4 h-4" aria-hidden="true" focusable="false" data-prefix="fab"
                data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512">
                <path fill="currentColor"
                    d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z">
                </path>
            </svg>
            Signed in`);
				$('#google, #anonymous').addClass('cursor-not-allowed');
				$('#0,#credits').addClass('hidden');
				$('#1').removeClass('hidden');
				$('#google, #anonymous').attr('disabled', '');
				const credential = GoogleAuthProvider.credentialFromResult(result);
				const token = credential.accessToken;
				// The signed-in user info.
				const user = result.user;

				window.user = result.user;
				$('#uid').text(result.user.uid);
			}).catch((error) => {
				// Handle Errors here.
				const errorCode = error.code;
				const errorMessage = error.message;
				// The email of the user's account used.
				const email = error.customData.email;
				// The AuthCredential type that was used.
				const credential = GoogleAuthProvider.credentialFromError(error);
				// ...
			});
	});

	$('#anonymous').on('click', () => {
		$(`#anonymous`).html(`<svg aria-hidden="true" role="status" class="inline mr-3 w-4 h-4 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"/>
        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"/>
        </svg>
        Loading...`);
		signInAnonymously(auth)
			.then((result) => {
				// Signed in..
				window.user = result.user;
				$('#uid').text(result.user.uid);
				$(`#anonymous`).html(`
            Success`);
				$('#google, #anonymous').addClass('cursor-not-allowed');
				$('#google, #anonymous').attr('disabled', '');
				$('#0,#credits').addClass('hidden');
				$('#1').removeClass('hidden');
			})
			.catch((error) => {
				const errorCode = error.code;
				const errorMessage = error.message;
				// ...
			});
	});

	$('#set_name').on('click', async () => {
		let v = $('#name').val();
		$('#name-error').addClass('hidden');
		$('#name-label')[0].classList = 'block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300';
		$('#name')[0].classList = 'bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500';
		if (v == '' || v.trim() == '') {
			$('#name-c').html(`<label for="error" class="block mb-2 text-sm font-medium text-red-700 dark:text-red-500">Name</label>
            <input type="text" id="error" class="bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 dark:bg-gray-700 focus:border-red-500 block w-full p-2.5 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500" placeholder="Error input" id='name'>
            <p class="mt-2 text-sm text-red-600 dark:text-red-500"><span class="font-medium">Oh, snap!</span> You need to enter a valid name.</p>`);
			$('#name-label')[0].classList = 'block mb-2 text-sm font-medium text-red-700 dark:text-red-500';
			$('#name')[0].classList = 'bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 dark:bg-gray-700 focus:border-red-500 block w-full p-2.5 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500';
			$('#name-error').removeClass('hidden');
			$('#name').val('');
			return;
		}


		$(`#set_name`).html(`<svg aria-hidden="true" role="status" class="inline mr-3 w-4 h-4 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"/>
        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"/>
        </svg>
        Loading...`);

		$('#set_name').addClass('cursor-not-allowed');
		$('#set_name').attr('disabled', '');
		window.name = v;
		$('#1').addClass('hidden');
		if (window.location.hash == '') { //new room
			$('#3').removeClass('hidden');
		} else { //existing room
			// log into room
			$('#rid').text(window.room);
			let p = {};
			p[window.user.uid] = {
				name: v,
				avatar: window.user.photoURL,
				isAnon: window.user.isAnonymous
			};
			await setDoc(doc(db, "rooms", window.room), {
				players: p
			}, {
				merge: true
			});

		}

	});
	$('#createroom').on('click', () => {
		$(`#createroom`).html(`<svg aria-hidden="true" role="status" class="inline mr-3 w-4 h-4 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"/>
        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"/>
        </svg>
        Loading...`);
		createNewRoom(window.name);
	});
	$('#copy').on('click', () => {
		navigator.clipboard.writeText(window.location.href);
	});
	$('#startgame').on('click', () => {
		if (players.length < 2) {
			//toast('You Need At Least 2 players to start the game', 1);
			//return;
		} else if (players.length > 50) {
			toast('You Have too much players. The maximum is 50', 1);
			return;
		}
		startGame();
	});
});

function randomInt(min, max) {
	return Math.floor(Math.random() * (max - min)) + min;
}
window.randomInt = randomInt;
async function createNewRoom(v) {
	try {
		let p = {};
		p[window.user.uid] = {
			name: v,
			avatar: window.user.photoURL,
			isAnon: window.user.isAnonymous
		};
		const docRef = await setDoc(doc(db, "rooms", window.user.uid), {
			dateCreated: Date.now(),
			players: p,
			lastUpdated: Date.now()
		});
		$('#3').addClass('hidden');
		$('#2,#4').removeClass('hidden');
		window.update = true;
		window.location.hash = window.user.uid;
		console.log(window.location.href)
		$('#qrcode').attr('src',`https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(window.location.href)}&size=220x220&margin=0`);
		$('#rid').text(window.user.uid);
		window.room = window.user.uid;
		window.unsub = onSnapshot(doc(db, "rooms", window.room), processChange);
	} catch (e) {
		console.error("Error adding document: ", e);
	}
}



setInterval(async () => {
	if (!window.update) return;
	await updateDoc(doc(db, "rooms", window.user.uid), {
		lastUpdated: Date.now()
	});
}, 120000);


function setPlayerList(pl) {
	$('#players').html('<h1 class="text-2xl my-3 dark:text-white">People Playing:</h1>');
	pl.forEach(p => {
		if (p.isAnon) {
			var initials = p.name.match(/\b\w/g) || [];
			initials = ((initials.shift() || '') + (initials.pop() || '')).toUpperCase();
			$('#players').append(`
            <div class="flex items-center space-x-4 mt-5">
            <div class="inline-flex overflow-hidden relative justify-center items-center w-10 h-10 bg-gray-100 rounded-full dark:bg-gray-600">
    <span class="font-medium text-gray-600 dark:text-gray-300">${initials}</span>
            </div>
                <div class="font-medium text-black dark:text-white">
                    <div>${p.name}</div>
                </div>
            </div>`);
		} else
			$('#players').append(`
        <div class="flex items-center space-x-4 mt-5">
            <img class="w-10 h-10 rounded-full" src="${p.avatar}" alt="">
            <div class="font-medium text-black dark:text-white">
                <div>${p.name}</div>
            </div>
        </div>`);
	});
}

let players = [];
let PlayerList = {};
let oldG = {};
async function processChange(c) {
	let d = c.data();
	let k = [];
	Object.keys(d.players).forEach((j, i) => {
		k.push({
			name: d.players[j].name,
			uid: Object.keys(d.players)[i],
			avatar: d.players[j].avatar,
			isAnon: d.players[j].isAnon,
			ans: d.players[j].ans,
			isCorrect: d.players[j].isCorrect,
			score: d.players[j].score,
		});
	});
	PlayerList = d.players;
	players = k;
	setPlayerList(k);
	if (!d.gameStarted) return;
	console.log('Game Started')
	if (_.isEqual(oldG, d.game)) return;
	console.log("Game Update");
	gameUpdate(d.game);
	oldG = d.game;
}

var rand = function () {
	return Math.random().toString(36).substr(2); // remove `0.`
};

var token = function () {
	return rand() + rand() + rand();
};

let lastToast;

function toast(tx, t) {
	let g;
	let tk = '_' + token();
	switch (t) {
		case 0:
			g = $(`<div id="${tk}" class="flex items-center p-4 mb-4 w-full max-w-xs text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800" role="alert">
          <div class="inline-flex flex-shrink-0 justify-center items-center w-8 h-8 text-green-500 bg-green-100 rounded-lg dark:bg-green-800 dark:text-green-200">
              <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
              <span class="sr-only">Check icon</span>
          </div>
          <div class="ml-3 text-sm font-normal">${tx}</div>
          <button type="button" class="ml-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700" data-dismiss-target="#${tk}" aria-label="Close" id="btn${tk}">
              <span class="sr-only">Close</span>
              <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
          </button>
      </div>`)[0];
			break;
		case 1:
			g = $(`<div id="${tk}" class="flex items-center p-4 mb-4 w-full max-w-xs text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800" role="alert">
                <div class="inline-flex flex-shrink-0 justify-center items-center w-8 h-8 text-red-500 bg-red-100 rounded-lg dark:bg-red-800 dark:text-red-200">
                    <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                    <span class="sr-only">Error icon</span>
                </div>
                <div class="ml-3 text-sm font-normal">${tx}</div>
                <button type="button" class="ml-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700" data-dismiss-target="#${tk}" aria-label="Close" id="btn${tk}">
                    <span class="sr-only">Close</span>
                    <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                </button>
            </div>`)[0];
			break;
		case 2:
			g = $(`
            <div id="${tk}" class="flex items-center p-4 w-full max-w-xs text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800" role="alert">
                <div class="inline-flex flex-shrink-0 justify-center items-center w-8 h-8 text-orange-500 bg-orange-100 rounded-lg dark:bg-orange-700 dark:text-orange-200">
                    <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd"></path></svg>
                    <span class="sr-only">Warning icon</span>
                </div>
                <div class="ml-3 text-sm font-normal">${tx}</div>
                <button type="button" class="ml-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700" data-dismiss-target="#${tk}" aria-label="Close" id="btn${tk}">
                    <span class="sr-only">Close</span>
                    <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                </button>
            </div>`)[0];
			break;
	}

	$('#toast').append(g);
	if (lastToast) {
		let tl = gsap.timeline()
			.fromTo(lastToast, {
				marginBottom: `${-$(lastToast).height()*2 + 16}px`
			}, {
				marginBottom: '1rem',
				duration: 0.5
			})
			.fromTo(g, {
				marginLeft: -$(g).width() * 2
			}, {
				duration: 0.5,
				marginLeft: 0,
				marginBottom: '1rem'
			}, 0)
	} else {
		gsap.fromTo(g, {
			marginBottom: `${-$(g).height()*2}px`
		}, {
			marginBottom: '1rem'
		});
	}
	$(`#btn${tk}`).on('click', () => {
		try {
			gsap.to($(`#${tk}`).prev()[0], {
				marginBottom: `${-$(`#${tk}`).height()*2}px`
			})
		} catch (e) {}
		gsap.to(`#${tk}`, {
			opacity: 0
		});
		setTimeout(() => {
			gsap.set($(`#${tk}`).prev()[0], {
				marginBottom: '1rem'
			});
			$(`#${tk}`).remove();
		}, 1000);
	});
	setTimeout(() => {
		$(`#btn${tk}`).trigger('click');
	}, 10000);
	lastToast = '#' + tk;
}

function randColor() {
	function hslToRGB(hsl) {
		var h = hsl.h,
			s = hsl.s,
			l = hsl.l,
			c = (1 - Math.abs(2 * l - 1)) * s,
			x = c * (1 - Math.abs((h / 60) % 2 - 1)),
			m = l - c / 2,
			r, g, b;

		if (h < 60) {
			r = c;
			g = x;
			b = 0;
		} else if (h < 120) {
			r = x;
			g = c;
			b = 0;
		} else if (h < 180) {
			r = 0;
			g = c;
			b = x;
		} else if (h < 240) {
			r = 0;
			g = x;
			b = c;
		} else if (h < 300) {
			r = x;
			g = 0;
			b = c;
		} else {
			r = c;
			g = 0;
			b = x;
		}
		r = normalize_rgb_value(r, m);
		g = normalize_rgb_value(g, m);
		b = normalize_rgb_value(b, m);

		return rgbToHex(r, g, b);
	}

	function normalize_rgb_value(color, m) {
		color = Math.floor((color + m) * 255);
		if (color < 0) {
			color = 0;
		}
		return color;
	}

	function rgbToHex(r, g, b) {
		return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
	}
	return hslToRGB({
		h: randomInt(0, 360),
		s: 1,
		l: 0.5
	});
}
let isLockedMap = false;

const initMap = function () {


	
	var img = new Image();
	img.onload = function () {
		//ctx.drawImage(img, 0,0);
	};
	img.src = "world.svg";
	window.img = img;

	let z = 1;
	let zz = 0;
	var canvas = document.getElementById("map");
	//var ctx=canvas.getContext("2d");
	var canvasOffset = $("#map").offset();
	var offsetX = canvasOffset.left;
	var offsetY = canvasOffset.top;
	//var canvasWidth=canvas.width;
	//var canvasHeight=canvas.height;
	var canvasWidth = $(canvas).width();
	var canvasHeight = $(canvas).height();
	//let img = {width:canvasWidth,height:canvasHeight};
	var isDragging = false;
	let mx = 0,
		my = 0;
	let jx = 0,
		jy = 0;
	let dx = 0;
	let dy = 0;
	let ix = 0;
	let iy = 0;
	let oldZ = 1,
		oldZz = 0,
		omx = 0,
		omy = 0;
	let absX = 0,
		absY = 0;
	let flagX = 0,
		flagY = 0;
	let C = "";
	const sel = "#map svg";
	let b = new Marker('marker', '#f00');
	async function handleMouseDown(e) {
		dx = 0;
		dy = 0;
		ix = (e.clientX - offsetX);
		iy = (e.clientY - offsetY);
		isDragging = true;
	}

	async function handleMouseUp(e) {
		isDragging = false;
		jx += dx;
		jy += dy;
		dx = 0;
		dy = 0;
	}

	async function handleMouseOut(e) {
		if (e.target != $('#map')[0]) return;
		if (!isDragging) return;
		jx += dx;
		jy += dy;
		dx = 0;
		dy = 0;
		isDragging = false;
	}
	let mx1 = 0;
	let my1 = 0;
	window.z = z;
	let fx = 0,
		fy = 0;

	async function render() {
		//    ctx.clearRect(0,0,canvasWidth,canvasHeight);
		mx1 = (mx) + (canvasWidth / 2); //(mx); //+((omx*z)));
		my1 = (my) + (canvasHeight / 2); //(my); //+((omy*z)));
		//    ctx.drawImage(img,mx1,my1,z*img.width,z*img.height); //z*img.width,z*img.height);
		$(sel).css('transform', `translate(${String(mx1)}px,${String(my1)}px)`);
		$(sel).css('min-width', `${String(z*img.width)}px`);
		$(sel).css('min-height', `${String(z*img.height)}px`);

		//flagX = 600;
		//flagY = 495;


		Object.keys(markerList).forEach(l => {
			if(!markerList[l].x) return;
			fx = (markerList[l].x * z) + mx1;
			fy = (markerList[l].y * z) + my1;
			$(`#${l}`).css('transform', `translate(${String(fx)}px,${String(fy)}px)`);
		});

		return;
	}
	renderMap = render;
	async function handleMouseMove(e) {
		//console.log(e.target)

		if (!disableMapHover) {
			if ($(e.target).is('path')) {
				$('#map svg .green').attr('fill', '#fff');
				$('#map svg .green').removeClass('green');
				$(e.target).attr('fill', '#0a0');
				$(e.target).addClass('green');
			} else {
				$('#map svg .green').attr('fill', '#fff');
				$('#map svg .green').removeClass('green');
			}
		}
		absX = e.clientX - offsetX;
		absY = e.clientY - offsetY;
		if (!isDragging) return;
		dx = (e.clientX - offsetX - ix);
		dy = (e.clientY - offsetY - iy);
		mx = dx + jx;
		my = dy + jy;
		await render();
	}
	async function handleWheel(e, n, m) {
		if (!m)
			e.preventDefault();
		oldZ = z;
		oldZz = zz;
		console.log(e.originalEvent.detail)
		if (n)
			zz += (e.scale - 1) / 100;
		else
			zz += (e.originalEvent.wheelDelta || -e.originalEvent.detail) / Math.abs((e.originalEvent.wheelDelta || e.originalEvent.detail));
		$('#d2').text(zz);
		if (zz < 1) zz = 1
		z = 2 ** zz;
		console.log('zz',zz,'z',z)
		if (oldZz < zz) {
			jx = mx * 2;
			jy = my * 2;
		} else {
			jx = mx / 2;
			jy = my / 2;
		}
		dx = 0;
		dy = 0;
		mx = jx;
		my = jy;
		//console.log(mx,z,canvasWidth);
		//console.log(my,z,canvasHeight);
		//console.log(e.originalEvent.wheelDelta);
		//console.log(omx,omy);
		//console.log('');
		//jx = jx*z;
		//jy = jy*z;
		render();
	}

	async function handleSet(e) {
		e.preventDefault();
		//(e.clientX-offsetX)
		// (e.clientX-offsetX);
		// (e.clientX-offsetY);

		//(mx)+(canvasWidth/2)
		//(my)+(canvasHeight/2)
		//console.log(0,canvasWidth,(mx)+(canvasWidth/2),(img.width*z)-((mx)+(canvasWidth/2)),(e.clientX-offsetX));
		let o = document.querySelector('#map svg').getBoundingClientRect();
		console.log(e.clientX,o.left,z)
		flagX = (e.clientX - o.left) / z;
		flagY = (e.clientY - o.top) / z;

		C = $('#map svg .green').attr('title');

		b.put(flagX, flagY);


		await render();


		$('#map').removeClass('cursor-crosshair');
		$('#map').addClass('cursor-wait');
		$('#submit').trigger('click');

		return false;
	}

	var h = new Hammer.Manager(document.getElementById('map'));
	var hh = new Hammer.Manager(document.querySelector('#map svg'));
	h.add(new Hammer.Pan({
		direction: Hammer.DIRECTION_ALL,
		threshold: 0
	}));
	h.add(new Hammer.Pinch({
		event: 'pinch',
		pointers: 2,
		threshold: 0
	}));
	hh.add(new Hammer.Press({
		event:'press'
	}));
	h.on('panmove', e => {
		//if(e.pointerType=='mouse')return;
		//console.log(e)
		e.clientX = e.center.x;
		e.clientY = e.center.y;
		handleMouseMove(e);
	});
	h.on('panstart', e => {
		//if(e.pointerType=='mouse')return;
		//console.log(e)
		e.clientX = e.center.x;
		e.clientY = e.center.y;
		handleMouseDown(e);
	});
	h.on('panend', e => {
		//if(e.pointerType=='mouse')return;
		//console.log(e)
		e.clientX = e.center.x;
		e.clientY = e.center.y;
		handleMouseUp(e);
	});
	h.on('pancancel', e => {
		//if(e.pointerType=='mouse')return;
		//console.log(e)
		e.clientX = e.center.x;
		e.clientY = e.center.y;
		handleMouseOut(e);
	});
	h.get('pinch').set({
		enable: true
	});
	h.on('pinch', e => {
		//handleWheel({originalEvent:{wheelDelta:e.scale-1}},false,true);
	});
	hh.on('press',e => {
		e.clientX = e.center.x;
		e.clientY = e.center.y;
		handleSet(e);
	});
	$("#map").bind('mousedown', handleMouseDown);
	$("#map").mousemove(handleMouseMove);
	$("#map").mouseup(handleMouseUp);
	$("#map").mouseout(handleMouseOut);
	$("#map").bind('mousewheel DOMMouseScroll', handleWheel);
	$("#map").trigger({
		type: "mousedown",
		clientX: offsetX,
		clientY: offsetY,
	});
	$("#map").trigger({
		type: "mousemove",
		clientX: offsetX,
		clientY: offsetY,
	});
	$("#map").trigger({
		type: "mouseup",
		clientX: offsetX,
		clientY: offsetY,
	});
	handleWheel({
		originalEvent: {
			wheelDelta: 1
		}
	}, false, true);
	$("#map svg").bind('contextmenu', handleSet);
	if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent)) {
		$('#lockMap').removeClass('hidden');
		//$('#lockMap')
		$('#lockMap').on('click', () => {
			isLockedMap = isLockedMap ^ 1;
			if (isLockedMap) {
				$('body').addClass('touch-none');
				$('#lockMap').text('Unlock touch');
			} else {
				$('body').removeClass('touch-none');
				$('#lockMap').text('Lock touch to map');
			}
		});
		$('body > div').removeClass('items-center');
	}
	$('#zoomPlus').on('click', () => handleWheel({
		originalEvent: {
			wheelDelta: 1
		}
	}, false, true));
	$('#zoomMinus').on('click', () => handleWheel({
		originalEvent: {
			wheelDelta: -1
		}
	}, false, true));
	$('#submit').on('click', async () => {
		let E = {};
		if(!C)
		C = "";
		E[window.user.uid] = {
			ans: {
				//COUNTRY:
				pos: {
					x: flagX || null,
					y: flagY || null
				},
				COUNTRY: C || ""
			}
		}
		$('#submit').html(`<svg aria-hidden="true" role="status" class="inline mr-3 w-4 h-4 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"/>
		<path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"/>
		</svg>
		Submitting...`);
		await setDoc(doc(db, "rooms", window.room), {
			players: E
		}, {
			merge: true
		});
		$('#submit').text('Submit');
		
		$('#map').addClass('cursor-crosshair');
		$('#map').removeClass('cursor-wait');
	});
	$('#s').on('click', async () => {
		$('#s').html(`<svg aria-hidden="true" role="status" class="inline mr-3 w-4 h-4 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"/>
		<path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"/>
		</svg>
		Submitting...`);
		let V = $('#ansInp1').val();
		let E = {};
		E[window.user.uid] = {
			ans: V
		}
		await setDoc(doc(db, "rooms", window.room), {
			players: E
		}, {
			merge: true
		});
		$('#s').text('Submit');
	});
	$('#skip').on('click', async () => {
		CanSkip = true;
	});
	$('#ansInp1').on('change',async ()=>{
		$('#s').trigger('click');
	});
};


$(async function () {
	let Q = await fetch("https://cdn.morisinc.net/geonaps/gp.js");
	let B = await fetch("https://cdn.morisinc.net/geonaps/bp.js");
	let N = await Q.text();
	let M = await B.text();
	var D = CryptoJS.AES.decrypt(N, "mp31y3toxcgurt2o4p64crty4lo0ewi4a").toString(CryptoJS.enc.Utf8);
	var S = CryptoJS.AES.decrypt(M, "mp31y3toxcgurt2o4p64crty4lo0ewi4a").toString(CryptoJS.enc.Utf8);
	$('#map').html(D);
	flgli = JSON.parse(S);
	$('#map svg path').each(function(){
		if($(this).attr('title')=="Vatican City") $(this).attr('title','Vatican')
		if($(this).attr('title')=="Republic of Congo") $(this).attr('title','Congo')
		if($(this).attr('title')=="LNR") $(this).attr('title','Lughansk')
		if($(this).attr('title')=="DNR") $(this).attr('title','Donetsk')
	});
	window.flgli = flgli;
	initMap();
});
let CanSkip = false;

function mapTo(A0, A1, B0, B1, w) {
	return (((B0 - B1) / (A0 - A1)) * w) + (((A0 * B1) - (B0 * A1)) / (A0 - A1));
}



function contrastingColor(color) {
	return (luma(color) >= 165) ? '000' : 'fff';
}

function luma(color) // color can be a hx string or an array of RGB values 0-255
{
	var rgb = (typeof color === 'string') ? hexToRGBArray(color) : color;
	return (0.2126 * rgb[0]) + (0.7152 * rgb[1]) + (0.0722 * rgb[2]); // SMPTE C, Rec. 709 weightings
}

function hexToRGBArray(color) {
	if (color.length === 3)
		color = color.charAt(0) + color.charAt(0) + color.charAt(1) + color.charAt(1) + color.charAt(2) + color.charAt(2);
	else if (color.length !== 6)
		throw ('Invalid hex color: ' + color);
	var rgb = [];
	for (var i = 0; i <= 2; i++)
		rgb[i] = parseInt(color.substr(i * 2, 2), 16);
	return rgb;
}

let gameList = [{
	type: 0,
	time: 30
}, {
	type: 0,
	time: 30
},{
	type: 0,
	time: 30
}, {
	type: 0,
	time: 30
}, {
	type: 0,
	time: 30
}, {
	for: 0,
	type: 16,
	time: 0
}, {
	for: 1,
	type: 16,
	time: 0
},{
	for: 2,
	type: 16,
	time: 0
},{
	for: 3,
	type: 16,
	time: 0
},{
	for: 4,
	type: 16,
	time: 0
}, {
	type: 1,
	time: 30
}, {
	type: 1,
	time: 30
}, {
	type: 1,
	time: 30
}, {
	type: 1,
	time: 30
}, {
	type: 1,
	time: 30
}, {
	for: 10,
	type: 17,
	time: 0
}, {
	for: 11,
	type: 17,
	time: 0
}, {
	for: 12,
	type: 17,
	time: 0
}, {
	for: 13,
	type: 17,
	time: 0
}, {
	for: 14,
	type: 17,
	time: 0
}, {
	type: 32,
	time: 0
}];
let GG = {};
window.GG = GG;
async function startGame() {
	await setDoc(doc(db, "rooms", window.room), {
		gameStarted: true
	}, {
		merge: true
	});
	$('#2,#4,#players').addClass('hidden');
	$('#gam').removeClass('hidden');
	flagStarted = false;
	await countDown(3);

	GG.i = 0; //game number
	GG.a = []; //answers per game
	GG.s = {}; //scores
	GG.C = []; //countries to guess
	GG.I = []; // who was correct for each game
	players.forEach(async p => {
		GG.s[p.uid] = 0;
	});
	GG.g = true; //is game running
	async function L() {
		if (!GG.g) return;
		return new Promise(async r => {
			$('#skip-c').removeClass('hidden');
			let q = gameList[GG.i];
			GG.a[GG.i] = {};
			let P = flgli[randomInt(0, flgli.length)];
			GG.C[GG.i] = P;
			GG.I[GG.i] = {};
			let gIN = q.for;
			let PL = {};
			let PLl = {};
			players.forEach(async p => {
				PLl[p.uid] = {};
				PLl[p.uid].ans = "";
			});
			await setDoc(doc(db, "rooms", window.room), {
				players: PLl
			}, {
				merge: true
			});
			
			switch (q.type) {
				case 0:
					await setDoc(doc(db, "rooms", window.room), {
						game: {
							type: q.type,
							time: q.time,
							d: {
								c: P.ALPHA2CODE,
								q: "What Country Is This?"
							}
						}
					}, {
						merge: true
					});
					break;
				case 1:
					await setDoc(doc(db, "rooms", window.room), {
						game: {
							type: q.type,
							time: q.time,
							d: {
								q: `Pinpoint the location of ${P.COUNTRY}`
							}
						}
					}, {
						merge: true
					});
					break;
				case 16:
					players.forEach(async p => {
						PL[p.uid] = {};
						PL[p.uid].isCorrect = GG.I[q.for][p.uid];
						PL[p.uid].ans = GG.a[q.for][p.uid];
					});
					await setDoc(doc(db, "rooms", window.room), {
						game: {
							ans: GG.C[q.for].COUNTRY,
							type: q.type,
							d: {
								q: "What Country Is This?",
								c: GG.C[q.for].ALPHA2CODE
							}
						},
						players: PL
					}, {
						merge: true
					});
					break;
				case 17:
					players.forEach(async p => {
						PL[p.uid] = {};
						PL[p.uid].isCorrect = GG.I[q.for][p.uid];
						PL[p.uid].ans = GG.a[q.for][p.uid];
					});
					await setDoc(doc(db, "rooms", window.room), {
						game: {
							ans: GG.C[q.for].COUNTRY,
							type: q.type,
							d: {
								q: `Pinpoint the location of ${GG.C[q.for].COUNTRY}`
							}
						},
						players: PL
					}, {
						merge: true
					});
					break;
				case 32:
					players.forEach(async p => {
						PL[p.uid] = {};
						PL[p.uid].score = GG.s[p.uid]
					});
					await setDoc(doc(db, "rooms", window.room), {
						game: {
							type: q.type
						},
						players: PL
					}, {
						merge: true
					});
					GG.g = false;
					break;

			}
			setTimeout(async () => {
				players.forEach(p => {
					if (q.type == 16) return;
					if (q.type == 17) return;
					if (q.type == 32) return;
					GG.a[GG.i][p.uid] = p.ans || "";
					let H = false;
					try {
						if (q.type == 0) {
							H = isMatch(P.ALPHA2CODE, p.ans);
						} else {

							H = isMatch(P.ALPHA2CODE, p.ans.COUNTRY);
						}
					} catch (e) {
						console.log(e)
					}


					GG.I[GG.i][p.uid] = H;
					if (!H) return;
					GG.s[p.uid] += 1;
				});
				GG.i++;
				let N = false;
				let T;
				if (q.type == 16) N = true;
				if (q.type == 17) N = true;
				//if(q.type == 32) N = true;
				if (N)
					$('#skip-c').removeClass('hidden');
				if (!N)
					r();
				else
					T = setInterval(async () => {
						if (!CanSkip) return;
						CanSkip = false;
						r();
						clearInterval(T);
					});
			}, q.time * 1000);

		});
	}
	async function Я() {
		await L();
		if (GG.g)
			Я();
	}
	window.L = L;
	window.Я = Я;
	Я();
}
let disableMapHover = false;
let flagStarted = true;
async function gameUpdate(G) {
	console.log("Game Update Called");
	if (flagStarted) {
		window.onbeforeunload = function () {
			return 'Do you really want to leave this page?';
		};
		$('#2,#4,#players').addClass('hidden');
		$('#gam').removeClass('hidden');
		flagStarted = false;
		countDown(3);
		return;
	}
	countDown(G.time);
	async function Z(arr) {
		var n = arr.length,
			swapped, tmp;
		do {
			swapped = false;
			for (var i = 1; i < n; i++) {
				if (arr[i - 1].score < arr[i].score) {
					tmp = arr[i];
					arr[i] = arr[i - 1];
					arr[i - 1] = tmp;
					swapped = true;
				}
			}
		} while (swapped && n--)
		//return arr;
	}
	switch (G.type) {
		case 0: // guess flag
			stopHighlight();
			$('#ansInp1').val('');
			$('#q-w,#flagQ,#ansInp1-c').removeClass('hidden');
			$('#flagAns-c,#map-c').addClass('hidden');
			$('#q').text(G.d.q);
			$('#qmig').attr('src', getFlag(G.d.c));
			$('#countdown_').removeClass('hidden');
			$('#skip-c').addClass('hidden');
			break;
		case 16: //answer & score for guess the flag
			stopHighlight();
			$('#ansInp1').val('');
			$('#countdown_').addClass('hidden');
			$('#q-w,#flagQ').removeClass('hidden');
			$('#flagAns-c').removeClass('hidden');
			$('#ansInp1-c,#map-c').addClass('hidden');
			$('#q').text(G.d.q);
			$('#qmig').attr('src', getFlag(G.d.c));
			$('#flagAns-p-l').html(`<h1 class="${PlayerList[window.user.uid].isCorrect ? "text-4xl font-mono dark:text-emerald-400 text-emerald-500" : "text-4xl font-mono dark:text-red-400 text-red-500"}">You Put: ${PlayerList[window.user.uid].ans}</h1>`);
			players.forEach(p => {
				if (p.uid == window.user.uid) return;
				$('#flagAns-p-l').append(`<h1 class="${PlayerList[p.uid].isCorrect ? "text-4xl font-mono dark:text-emerald-400 text-emerald-500" : "text-4xl font-mono dark:text-red-400 text-red-500"}">${PlayerList[p.uid].name} Put: ${PlayerList[p.uid].ans}</h1>`);
			});
			$('#flagAns-correct').text(G.ans);
			break;
		case 1:
			stopHighlight();
			$('#ansInp1').val('');
			$('#q').text(G.d.q);
			$('#skip-c').addClass('hidden');
			$('#countdown_').removeClass('hidden');
			disableMapHover = false;
			$('#map svg .green').attr('fill', '#fff');
			$('#map svg .green').removeClass('green');
			markerList.marker.show();
			Object.keys(markerList).forEach((X) => { //delete all markers
				if (markerList[X].id == "marker") return;
				markerList[X].destroy();
			});
			$('#q-w,#map-c').removeClass('hidden');
			$('#flagQ').addClass('hidden');
			//$('#submit').removeClass('hidden');
			$('#mapAns-c').addClass('hidden');
			break;
		case 17:
			$('#q').text(G.d.q);
			$('#ansInp1').val('');
			$('#countdown_').addClass('hidden');
			disableMapHover = true;
			$('#map svg .green').attr('fill', '#fff');
			$('#map svg .green').removeClass('green');
			markerList.marker.hide();
			Object.keys(markerList).forEach((X, L) => { //delete all markers
				if (X.id == "marker") return;
				delete markerList[L];
			});
			$('#q-w,#map-c').removeClass('hidden');
			$('#flagQ,#submit').addClass('hidden');
			$('#mapAns-c').removeClass('hidden');
			markerList.marker.hide();
			let ut = {};
			$('#mapAns-p-l').html('')
			players.forEach(p => {
				try {
					ut[p.uid] = {
						c: randColor()
					};
					ut[p.uid].m = new Marker(p.uid, ut[p.uid].c);
					ut[p.uid].m.put(PlayerList[p.uid].ans.pos.x, PlayerList[p.uid].ans.pos.y);
					$('#mapAns-p-l').append(`<div class="flex justify-center items-center mb-3">
					<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" class="shadow-2xl" viewBox="0 0 24 24">
						<path
						   d="m 12,2 c -3.8641657,0.00441 -6.9955914,3.1358343 -7,7 0,5.353 6.036,11.45 6.293,11.707 L 12,21.414 12.707,20.707 C 12.964,20.45 19,14.353 19,9 18.995591,5.1358343 15.864166,2.0044086 12,2 Z"
						   fill="${ut[p.uid].c}"
						   sodipodi:nodetypes="ccscscc" />
						<path
						   d="M12 6a3 3 0 1 0 3 3 3 3 0 0 0-3-3zm0 4a1 1 0 1 1 1-1 1 1 0 0 1-1 1z"
						   fill="#fff"/></svg>
					<h1 class="text-4xl font-mono ${contrastingColor(ut[p.uid].c.replace('#','')) == "fff" ? "text-white" : "text-black"} font-bold p-2 rounded-lg" style="background:${ut[p.uid].c}">${p.uid == window.user.uid ? "You" : p.name}</h1>
				</div>`);
				} catch (e) {
					console.log(e)
				}

			});
			$('#map svg path').each(function () {
				if ($(this).attr('title') != G.ans) return;
				$(this).attr('fill', '#0a0');
				$(this).addClass('green');
				highlightEl(this);
			});
			break;
		case 32:
			stopHighlight();
			$('#ansInp1-c,#map-c,#flagQ').addClass('hidden');
			$('#skip-c').addClass('hidden');
			let R = [];
			players.forEach(p => {
				R.push(p);
			});
			await Z(R);
			LBAnim(R);
			break;

	}
}
let highlightInterv;

function highlightEl(el) {
	$('.highlight').removeClass('hidden');
	if (highlightInterv) clearInterval(highlightInterv);
	highlightInterv = setInterval(() => {
		let w = getElCenter(el,true);
		let W = document.querySelector('.zero').getBoundingClientRect();
		$('.highlight').css('transform', `translate(${w.x-W.left}px,${w.y-W.top}px)`);
		$('.highlight').css('width', `${$(el).width()}px`);
		$('.highlight').css('height', `${$(el).height()}px`);
	});
}

function stopHighlight() {
	if (highlightInterv)
		clearInterval(highlightInterv);
	$('.highlight').addClass('hidden');
}

let ctdwI;
async function countDown(from) {
	return new Promise(r => {
		let w = from;
		try {
			clearInterval(ctdwI)
		} catch (e) {}
		const h = () => {
			if (w < 1) {
				clearInterval(ctdwI);
				r();
			}
			$('#cdwn').attr('style', `--value:${w};`);
			w--;
		};
		h();
		ctdwI = setInterval(h, 1000);
	});
}

function stopCountDown() {
	clearInterval(ctdwI);
}

function LBAnim(d) {
	$('#leaderboard-c').removeClass('hidden');
	$('#q-w').addClass('hidden');
	$('#_1-pl .tit').text(d[0].name);
	if (d.length > 1)
		$('#_2-pl .tit').text(d[1].name);
	if (d.length > 2)
		$('#_3-pl .tit').text(d[2].name);
	$('#_1-pl .sc').text('Score: ' + d[0].score);
	if (d.length > 1)
		$('#_2-pl .sc').text('Score: ' + d[1].score);
	if (d.length > 2)
		$('#_3-pl .sc').text('Score: ' + d[2].score);
	let pl1_c = getElCenter('#_1-pl');
	let pl2_c = getElCenter('#_2-pl');
	let pl3_c = getElCenter('#_3-pl');
	let O;
	let tl;

	if (d.length < 2)
		tl = gsap.timeline()
		.set(["#_3-pl", "#_2-pl", "#_1-pl"], {
			opacity: 0,
			display: "none"
		})
		.fromTo('.spotlight', {
			opacity: 0,
			background: `radial-gradient(circle at ${pl1_c.x}px ${pl1_c.y*0.7}px, rgba(0,0,0,0) 0%, rgba(0,0,0,0.7) 0%)`
		}, {
			opacity: 1,
			duration: 1.5
		})
		.to('.spotlight', {
			background: `radial-gradient(circle at ${pl1_c.x}px ${pl1_c.y*0.7}px, rgba(0,0,0,0) 13%, rgba(0,0,0,0.7) 0%)`,
			duration: 0.75
		})
		.set(["#_3-pl", "#_2-pl", "#_1-pl"], {
			display: "flex",
			x: 0
		}, "<")
		.to('#_1-pl', {
			opacity: 1,
			duration: 0.2
		}, "<")
		.set("#_2-pl", {
			x: -17.5
		}, "<")
		.fromTo('#_1-pl', {
			height: 0,
			width: 0
		}, {
			height: "100%",
			ease: "elastic",
			duration: 2,
			width: "20%"
		}, '<')
		.add(() => {
			O = setInterval(() => {
				party.confetti(document.querySelector('#_1-pl .tit'), {
					count: 5
				});
			}, 500);
			S(document.querySelector('#_1-pl .tit'))
			gsap.timeline()
				.to('#_1-pl .tit', {
					fontSize: "3rem"
				}, "<0.2")
				.to('#_1-pl .tit', {
					fontSize: "2.25rem"
				}, "<1")
		}, "<")
		.to('.spotlight', {
			background: `radial-gradient(circle at ${pl1_c.x}px ${pl1_c.y}px, rgba(0,0,0,0) 25%, rgba(0,0,0,0.7) 0%)`,
			duration: 1.5
		}, "<")
		.set(['#_3-pl, #_2-pl'], {
			clearProps: "border,borderRadius"
		}, "<")
		.to(['#_3-pl', '#_2-pl'], {
			x: 0,
			duration: 0.4
		}, "<")
		.to('.spotlight', {
			background: `radial-gradient(circle at ${pl1_c.x}px ${pl1_c.y}px, rgba(0,0,0,0) 100%, rgba(0,0,0,0.7) 0%)`,
			duration: 1.5,
			ease: "elastic.in(0.75, 0.3)"
		}, "<1")
		.set('.spotlight', {
			display: "none"
		})
	if (d.length < 2) return;
	if (d.length > 2)
		tl = gsap.timeline()
		.set(["#_3-pl", "#_2-pl", "#_1-pl"], {
			opacity: 0,
			display: "none"
		})
		.fromTo('.spotlight', {
			opacity: 0,
			background: `radial-gradient(circle at ${pl1_c.x}px ${pl1_c.y*0.7}px, rgba(0,0,0,0) 0%, rgba(0,0,0,0.7) 0%)`
		}, {
			opacity: 1,
			duration: 1.5
		})
		.to('.spotlight', {
			background: `radial-gradient(circle at ${pl1_c.x}px ${pl1_c.y*0.7}px, rgba(0,0,0,0) 13%, rgba(0,0,0,0.7) 0%)`,
			duration: 0.75
		})
		.set('#_3-pl', {
			display: "flex"
		}, "<0.5")
		.to('.spotlight', {
			background: `radial-gradient(circle at ${pl1_c.x}px ${pl1_c.y}px, rgba(0,0,0,0) 23%, rgba(0,0,0,0.7) 0%)`,
			duration: 0.75
		}, "<")
		.to('#_3-pl', {
			opacity: 1,
			duration: 0.2
		}, "<")
		.fromTo('#_3-pl', {
			height: 0,
			width: 0
		}, {
			height: "100%",
			ease: "elastic",
			duration: 2,
			width: "20%",
			borderRadius: "0.5rem",
			border: '0'
		}, '<0.1')
		.add(() => {
			party.confetti(document.querySelector('#_3-pl .tit'), {
				/* ... */
			});
			gsap.timeline()
				.to('#_3-pl .tit', {
					fontSize: "3rem"
				}, "<0.2")
				.to('#_3-pl .tit', {
					fontSize: "2.25rem"
				}, "<1")
		}, "<")
		.to('#_3-pl', {
			x: pl3_c.x - pl1_c.x,
			height: "33.33333%",
			ease: "power2.inOut",
			duration: 1
		})
		.set('#_2-pl', {
			display: "flex",
			x: (pl3_c.x - pl1_c.x)
		})
		.to('#_2-pl', {
			opacity: 1,
			duration: 0.2
		}, "<")
		//.set('#_3-pl',{x:0})
		.set('#_3-pl', {
			x: (pl3_c.x - pl1_c.x) - 25
		}, "<")
		.fromTo('#_2-pl', {
			height: 0,
			width: 0
		}, {
			height: "100%",
			ease: "elastic",
			duration: 2,
			width: "20%",
			borderRadius: "0.5rem",
			border: '0'
		}, '<')
		.add(() => {
			party.confetti(document.querySelector('#_2-pl .tit'), {
				/* ... */
			});
			gsap.timeline()
				.to('#_2-pl .tit', {
					fontSize: "3rem"
				}, "<0.2")
				.to('#_2-pl .tit', {
					fontSize: "2.25rem"
				}, "<1")
		}, "<")
		.to(['#_3-pl', '#_2-pl'], {
			x: (pl3_c.x - pl1_c.x) / 2,
			duration: 0.4
		}, "<")
		.to('#_2-pl', {
			x: (pl2_c.x - pl1_c.x) / 2,
			duration: 1,
			ease: "power2.inOut",
			height: "66.66666%"
		})
		.to('.spotlight', {
			background: `radial-gradient(circle at ${pl1_c.x}px ${pl1_c.y*0.7}px, rgba(0,0,0,0) 13%, rgba(0,0,0,0.7) 0%)`,
			duration: 0.75
		})
		.set(["#_3-pl", "#_2-pl", "#_1-pl"], {
			display: "flex",
			x: 0
		})
		.to('#_1-pl', {
			opacity: 1,
			duration: 0.2
		}, "<")
		.set("#_2-pl", {
			x: ((pl2_c.x - pl1_c.x) / 2) + 25
		}, "<")
		.set("#_3-pl", {
			x: ((pl3_c.x - pl1_c.x) / 2) - 25
		}, "<")
		.fromTo('#_1-pl', {
			height: 0,
			width: 0
		}, {
			height: "100%",
			ease: "elastic",
			duration: 2,
			width: "20%"
		}, '<')
		.add(() => {
			O = setInterval(() => {
				party.confetti(document.querySelector('#_1-pl .tit'), {
					count: 5
				});
			}, 500);
			S(document.querySelector('#_1-pl .tit'))
			gsap.timeline()
				.to('#_1-pl .tit', {
					fontSize: "3rem"
				}, "<0.2")
				.to('#_1-pl .tit', {
					fontSize: "2.25rem"
				}, "<1")
		}, "<")
		.to('.spotlight', {
			background: `radial-gradient(circle at ${pl1_c.x}px ${pl1_c.y}px, rgba(0,0,0,0) 25%, rgba(0,0,0,0.7) 0%)`,
			duration: 1.5
		}, "<")
		.set(['#_3-pl, #_2-pl'], {
			clearProps: "border,borderRadius"
		}, "<")
		.to(['#_3-pl', '#_2-pl'], {
			x: 0,
			duration: 0.4
		}, "<")
		.to('.spotlight', {
			background: `radial-gradient(circle at ${pl1_c.x}px ${pl1_c.y}px, rgba(0,0,0,0) 100%, rgba(0,0,0,0.7) 0%)`,
			duration: 1.5,
			ease: "elastic.in(0.75, 0.3)"
		}, "<1")
		.set('.spotlight', {
			display: "none"
		})
	else
		tl = gsap.timeline()
		.set(["#_3-pl", "#_2-pl", "#_1-pl"], {
			opacity: 0,
			display: "none"
		})
		.fromTo('.spotlight', {
			opacity: 0,
			background: `radial-gradient(circle at ${pl1_c.x}px ${pl1_c.y*0.7}px, rgba(0,0,0,0) 0%, rgba(0,0,0,0.7) 0%)`
		}, {
			opacity: 1,
			duration: 1.5
		})
		.to('.spotlight', {
			background: `radial-gradient(circle at ${pl1_c.x}px ${pl1_c.y*0.7}px, rgba(0,0,0,0) 13%, rgba(0,0,0,0.7) 0%)`,
			duration: 0.75
		})
		.set('#_2-pl', {
			display: "flex",
			x: 0
		}, "<0.5")
		.to('#_2-pl', {
			opacity: 1,
			duration: 0.2
		}, "<")
		//.set('#_3-pl',{x:0})
		.fromTo('#_2-pl', {
			height: 0,
			width: 0
		}, {
			height: "100%",
			ease: "elastic",
			duration: 2,
			width: "20%",
			borderRadius: "0.5rem",
			border: '0'
		}, '<')
		.add(() => {
			party.confetti(document.querySelector('#_2-pl .tit'), {
				/* ... */
			});
			gsap.timeline()
				.to('#_2-pl .tit', {
					fontSize: "3rem"
				}, "<0.2")
				.to('#_2-pl .tit', {
					fontSize: "2.25rem"
				}, "<1")
		}, "<")
		//.to(['#_3-pl','#_2-pl'],{x:(pl3_c.x-pl1_c.x)/2,duration:0.4},"<")
		.to('#_2-pl', {
			x: (pl2_c.x - pl1_c.x) / 2,
			duration: 1,
			ease: "power2.inOut",
			height: "66.66666%"
		})
		.to('.spotlight', {
			background: `radial-gradient(circle at ${pl1_c.x}px ${pl1_c.y*0.7}px, rgba(0,0,0,0) 13%, rgba(0,0,0,0.7) 0%)`,
			duration: 0.75
		})
		.set(["#_3-pl", "#_2-pl", "#_1-pl"], {
			display: "flex",
			x: 0
		}, "<")
		.to('#_1-pl', {
			opacity: 1,
			duration: 0.2
		}, "<")
		.set("#_2-pl", {
			x: -17.5
		}, "<")
		.fromTo('#_1-pl', {
			height: 0,
			width: 0
		}, {
			height: "100%",
			ease: "elastic",
			duration: 2,
			width: "20%"
		}, '<')
		.add(() => {
			O = setInterval(() => {
				party.confetti(document.querySelector('#_1-pl .tit'), {
					count: 5
				});
			}, 500);
			S(document.querySelector('#_1-pl .tit'))
			gsap.timeline()
				.to('#_1-pl .tit', {
					fontSize: "3rem"
				}, "<0.2")
				.to('#_1-pl .tit', {
					fontSize: "2.25rem"
				}, "<1")
		}, "<")
		.to('.spotlight', {
			background: `radial-gradient(circle at ${pl1_c.x}px ${pl1_c.y}px, rgba(0,0,0,0) 25%, rgba(0,0,0,0.7) 0%)`,
			duration: 1.5
		}, "<")
		.set(['#_3-pl, #_2-pl'], {
			clearProps: "border,borderRadius"
		}, "<")
		.to(['#_3-pl', '#_2-pl'], {
			x: 0,
			duration: 0.4
		}, "<")
		.to('.spotlight', {
			background: `radial-gradient(circle at ${pl1_c.x}px ${pl1_c.y}px, rgba(0,0,0,0) 100%, rgba(0,0,0,0.7) 0%)`,
			duration: 1.5,
			ease: "elastic.in(0.75, 0.3)"
		}, "<1")
		.set('.spotlight', {
			display: "none"
		})


	function S(l) {
		party.sparkles(l, {
			emitter: {
				modules: [
					new party.ModuleBuilder()
					.drive("size")
					.by(new party.NumericSpline({
						time: 0,
						value: 0
					}, {
						time: 0.5,
						value: 1
					}, {
						time: 1,
						value: 0
					}))
					.build(),
					new party.ModuleBuilder()
					.drive("opacity")
					.by((t) => t)
					.through("size")
					.build(),
				],
			},
		});
	}
}








function getElCenter(el,W) {
	let e
	if(W)
	e = el;
	else
	e = document.querySelector(el);
	const {
		left,
		top,
		width,
		height
	} = e.getBoundingClientRect()
	const centerX = left + width / 2;
	const centerY = top + height / 2;
	return {
		x: centerX,
		y: centerY,
		w:width,
		w:height,
	};
}





$(()=>{
	$('#flag-num').on('change',()=>{
		$('#flag-num-l').text($('#flag-num').val());
	});
	$('#flag-time').on('change',()=>{
		$('#flag-time-l').text($('#flag-time').val());
	});
	$('#map-num').on('change',()=>{
		$('#map-num-l').text($('#map-num').val());
	});
	$('#map-time').on('change',()=>{
		$('#map-time-l').text($('#map-time').val());
	});
	$('#customize-game').on('click',async ()=>{
		gameList = [];
		let mapNum = Number($('#map-num').val());
		let flagNum = Number($('#flag-num').val());
		let mapTime = Number($('#map-time').val());
		let flagTime = Number($('#flag-time').val());
		let index = 0;
		for(let i = 0;i<flagNum;i++){
			gameList.push({
				type: 0,
				time: flagTime
			});
		}
		index = gameList.length;
		for(let i = 0;i<flagNum;i++){
			gameList.push({
				type: 16,
				time: 0,
				for:i+index-flagNum
			});
		}
		index = gameList.length;
		for(let i = 0;i<mapNum;i++){
			gameList.push({
				type: 1,
				time: mapTime
			});
		}
		index = gameList.length;
		for(let i = 0;i<mapNum;i++){
			gameList.push({
				type: 17,
				time: 0,
				for:i+index-mapNum
			});
		}
		gameList.push( {
			type: 32,
			time: 0
		});
		
	});
});
/*{
	type: 0,
	time: 30
}, {
	type: 0,
	time: 30
},{
	type: 0,
	time: 30
}, {
	type: 0,
	time: 30
}, {
	type: 0,
	time: 30
}, {
	for: 0,
	type: 16,
	time: 0
}, {
	for: 1,
	type: 16,
	time: 0
},{
	for: 2,
	type: 16,
	time: 0
},{
	for: 3,
	type: 16,
	time: 0
},{
	for: 4,
	type: 16,
	time: 0
}, {
	type: 1,
	time: 30
}, {
	type: 1,
	time: 30
}, {
	type: 1,
	time: 30
}, {
	type: 1,
	time: 30
}, {
	type: 1,
	time: 30
}, {
	for: 10,
	type: 17,
	time: 0
}, {
	for: 11,
	type: 17,
	time: 0
}, {
	for: 12,
	type: 17,
	time: 0
}, {
	for: 13,
	type: 17,
	time: 0
}, {
	for: 14,
	type: 17,
	time: 0
}, {
	type: 32,
	time: 0
}*/