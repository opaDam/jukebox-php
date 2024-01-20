console.log('BEGIN script.js');
const audioPlayer = document.getElementById('audioPlayer');
const playList = document.getElementById('playList');
const prt_song = document.getElementById('prt_song');
const myInput = document.getElementById('myInput');
const localList = document.getElementById('localList');
const hoes = playList.getElementsByClassName('hoes');
const del = localList.getElementsByClassName('del');
const add = playList.getElementsByClassName('add');
let center_point = localList.getElementsByClassName('center_point');
let center_point2 = playList.getElementsByClassName('center_point2');
const coin = document.getElementsByClassName('coin');
const body = document.querySelector('body');

// body.addEventListener('click', (e) =>{
//   e.preventDefault();
//   e.stopPropagation();
//   let test = Number(e.target.classList[0]);
//   console.log('test',test);
//   if(test == NaN){console.log(test,'return');return;}
//   console.log(e);
// })

let e, nr;
index = null;
let index_temp = null;
let index_length = songs_array.length;
let loc = "on";
let local_array = [];
let local_array2 = [];
let hoes2;
let data = "shuffle";
let dirN = "dirName";
let index_id;
let coin_in = 'off';

localStorage.setItem(data, JSON.stringify(shuffle));
localStorage.setItem(dirN, JSON.stringify(dirName));
shuffle = localStorage.getItem(data) ? JSON.parse(localStorage.getItem(data)) : localStorage.setItem(data, JSON.stringify(shuffle));
local_array = localStorage.getItem(dirN) ? JSON.parse(localStorage.getItem(dirN)) : localStorage.setItem(dirN, JSON.stringify([]));
shuffle = JSON.parse(localStorage.getItem(data));
dirName = JSON.parse(localStorage.getItem(dirN));
data = dirName;

audioPlayer.addEventListener('playing', (e) => {
  e.preventDefault();
  e.stopPropagation();
  remove_class();
  console.log(e, 'playing');
  if (hoes[index] && loc == "off") hoes[index].classList.remove('pause');
    if (hoes2[index] && loc == "on") hoes2[index].classList.remove('pause');
  add_class();
})
audioPlayer.addEventListener('pause', (e) => {
  e.preventDefault();
  e.stopPropagation();
  console.log(e, 'pause');
  if (index === index_temp) { remove_class();
    if (hoes[index] && loc == "off") hoes[index].classList.add('pause');
    if (hoes2[index] && loc == "on") hoes2[index].classList.add('pause');
  }
  index_temp = index;
})
audioPlayer.addEventListener('ended', (e) => {
  e.preventDefault();
  e.stopPropagation();
  console.log(e, 'ended');
  remove_class();
  if (index < index_length) {
    index++;
    if (index) { play_song(); playing = "on"; }
  }
})
playList.addEventListener('click', (e) => {
  e.preventDefault();
  e.stopPropagation();
  remove_class();
  dirName = JSON.parse(localStorage.getItem(dirN));
  songs = songs_index;
  if (search == "on") songs = search_array;
  index = Number(e.target.classList[0]);
  loc = "off";
  if (index === index_temp) {
    if (hoes[index] && loc == "off") hoes[index].classList.add('pause');
    audioPlayer.pause(); index_temp = null; return };
  play_song();
  goToPlaying();
})

localList.addEventListener('click', (e) => {
  e.preventDefault();
  e.stopPropagation();
  remove_class();
  dirName = JSON.parse(localStorage.getItem(dirN));
  songs = local_array;
  index = Number(e.target.classList[0]);
  loc = "on";
  if (index === index_temp) { 
    if (hoes2[index] && loc == "on") hoes2[index].classList.add('pause');
    audioPlayer.pause();  index_temp = null; return };
  play_song();
  goToPlayList();
})

function play_song() {
  remove_class();
  dirName = JSON.parse(localStorage.getItem(dirN));
  let song = `${songs[index]}`;
  if (song === 'undefined') return;
  audioPlayer.src = `${filePath}${songs[index]}.mp3`;
  prt_song.textContent = `${song}`;
  audioPlayer.play();
  playing = "on"
  index_temp = index;
  add_class();

}
function prev_song() {
  remove_class();
  if (!index == 0) {
    index_temp = index;
    index--;
    play_song();
  }
}
function next_song() {
  remove_class();
  if (index < songs.length - 1) {
    index_temp = index;
    index++;
    play_song();
  }
}


function add_class() {
  playing = "on";
  if (hoes[index] && loc == "off") hoes[index].classList.add('rotate');
  if (hoes2[index] && loc == "on") hoes2[index].classList.add('rotate');
  if (center_point[index] && loc == "on") center_point[index].classList.add('show');
  if (center_point2[index] && loc == "off") center_point2[index].classList.add('show');

  if (del[index] && loc == "on") del[index].classList.add('hidden');
  if (add[index] && loc == "off") add[index].classList.add('hidden');
}

function remove_class() {
  playing = "off";
  if (hoes[index_temp] && loc == "off") hoes[index_temp].classList.remove('pause');
  if (hoes2[index_temp] && loc == "on") hoes2[index_temp].classList.remove('pause');

  if (hoes[index_temp] && loc == "off") { hoes[index_temp].classList.remove('rotate') };
  if (hoes2[index_temp] && loc == "on") { hoes2[index_temp].classList.remove('rotate') };
  if (center_point[index_temp] && loc == "on") { center_point[index_temp].classList.remove('show') };
  if (center_point2[index_temp] && loc == "off") { center_point2[index_temp].classList.remove('show') };

  if (del[index_temp]) { del[index_temp].classList.remove('hidden') };
  if (add[index_temp]) { add[index_temp].classList.remove('hidden') };
}

// ------------------- LOCALSTORAGE   Song toevoegen --------------------
function local_add(nr) {
  if (search == 'on') songs = search_array;
  local_array = localStorage.getItem(data) ? JSON.parse(localStorage.getItem(data)) : localStorage.setItem(data, JSON.stringify([]));
  dirName = JSON.parse(localStorage.getItem(dirN));
  data = dirName;
  local_array = JSON.parse(localStorage.getItem(data));
  if (local_array.includes(songs[nr])) { return prt_song.textContent = `ALREADY EXSIST: ${songs[nr]} `; }
  if (local_array.length >= 100) { return prt_song.textContent = `OUT OF LENGTH LOCALARRAY `; }
  if (local_array[nr] === "undefined") return;
  local_array.push(songs[nr]);
  let add_song = songs[nr];
  prt_song.textContent = `Add to Playlist: ${add_song}`;    // !!! Print info //
  localStorage.setItem(data, JSON.stringify(local_array));  // SET ARRAY
  if (local_array) print_local(); // function print_local
}

// ?------------------- LOCALSTORAGE   Song verwijderen--------------------
function local_del(nr) {
  local_array = JSON.parse(localStorage.getItem(dirName));
  let del_song = local_array[nr];
  prt_song.textContent = "Local_delete = " + del_song; // !!! Print info //
  local_array = local_array.filter((local_array) => local_array != del_song);
  localStorage.setItem(data, JSON.stringify(local_array));
  if (local_array) print_local(); // function print_local
}
// ----------------EINDE LOCALSTORAGE-------------------------------------

print_local();
function print_local() {
  dirName = JSON.parse(localStorage.getItem(dirN));
  localList.innerHTML = '';
  data = dirName;
  local_array = JSON.parse(localStorage.getItem(data));
  if (local_array == "undefined") { return };
  prt_song.textContent = `PLAYLIST ${dirName}`;

  if (local_array) local_array.forEach((value, key) => {

      let txt = value.split("-");
      txt[0] = txt[0].toUpperCase();
      txt[1] = txt[1].toUpperCase();
    
      if (txt[2] === undefined) txt[2] = "";
      txt[2] = txt[2].toUpperCase();

      let value2 = `${txt[1]} - ${txt[2]}`;

    localList.innerHTML +=
      `<li class='${key} local_list' id='L${key}'>
    <p class='center_pont'></p>
    <img class='${key} hoes2' src='${filePath}/${value}.jpg' loading='lazy' >
    <p class='${key} txt1'>${value2}</p>
    <span><b class='local_del del' onclick='nr=null;local_del(${key})'> DEL </b></span>
    </li>`;
  });
  loc = "on";
  hoes2 = localList.getElementsByClassName('hoes2');
  center_pont = localList.getElementsByClassName('center_pont');
  console.log(center_point);
  if (playing == "on") { add_class(); } else { remove_class(); }
}



// Using JavaScript to open the page in FULLSCREEN mode.body ********
window.addEventListener("keydown", (e) => {
  console.log('fullsreen', index);
  if (e.key === "Enter") {
    toggleFullScreen();
  }
},
  true,
);
function toggleFullScreen() {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen();
  } else if (document.exitFullscreen) {
    document.exitFullscreen();
  }
}

// ?Is PLAYING  GOTO PLAYING SONG ////////////////////////////////////////{}
function goToPlaying() {
  index_id = Number(index);
  location.href = `#${index_id - 7}`;
}
// ?Is PLAYING ////////////////////////////////////////
function goToPlayList() {
  index_id = Number(index);
  // if (!index_id){location.href = `#L${index_id - 7}`; } else {
  // local_array2 ? location.href= `#L${index_id - 7}` : 
  location.href = `#${'div1'}`;
} ////////// goto ID ////////
// }

// ? 24 uurs Klok ************Timer***************
function timer() {
  let dt = new Date();
  let h = dt.getHours();
  if (h < 10) { h = '0' + h }
  let m = dt.getMinutes();
  if (m < 10) { m = '0' + m }
  let s = dt.getSeconds();
  if (s < 10) { s = '0' + s }
  document.getElementById('time').innerHTML = h + ":" + m + ":" + s;
  setTimeout("timer()", 1000);
}
timer();

const shuffle2 = (array) => {
  const mutatedArray = [...array];
  for (let i = mutatedArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [mutatedArray[i], mutatedArray[j]] = [mutatedArray[j], mutatedArray[i]];
  }
  return mutatedArray;
};

if (shuffle == 'on') shuffle_local_array();
function shuffle_local_array() {
  local_array2 = (shuffle2(local_array));
  local_array = local_array2;
  print_local2();

}

function print_local2() {
  localList.innerHTML = '';
  if (local_array2) local_array2.forEach((value, key) => {

    txt = value.split("-");
    txt[0] = txt[0].toUpperCase();
    txt[1] = txt[1].toUpperCase();
  
    if (txt[2] === undefined) txt[2] = "";
    txt[2] = txt[2].toUpperCase();

    let value2 = `${txt[1]} - ${txt[2]}`;

    localList.innerHTML +=
      `<li class='${key} local_list' id='L${index_id}'>
      <p class='center_pont'></p>
    <img class='${key} hoes2' src='${filePath}/${value}.jpg' loading='lazy' >
    <p class='${key} txt1'>${value2}</p>
    <span><b class='local_del del' onclick='nr=null;local_del(${key})'> DEL </b></span>
    </li>`;
  });
  hoes2 = localList.getElementsByClassName('hoes2');
  center_pont = localList.getElementsByClassName('center_pont');
  console.log(center_pont);
  if (playing == "on") { add_class(); } else { remove_class(); }
}

// INSERT COIN OFF of ON ////////////////////////////////////////
coin[0].addEventListener('click', () => {
  remove_class();
  coin_in = 'on';
  audioPlayer.src = "./sound/coin.mp3";
  audioPlayer.play();
  audioPlayer.classList.add('display_none');
  neon_off();

  setTimeout(() => {
    coin[0].classList.add('display_none');
    currentTime = 0;
    volume = 1;
    audioPlayer.src = '';
    audioPlayer.classList.remove('display_none');
  }, 2500);

});
const neon = document.getElementsByClassName('neon');
function neon_off() {
  neon[0].classList.add('display_none');
  coin[0].classList.add('display_none');
}

// function exit(){
//   console.log('exit');
//   // window.location.reload();
// }

let openedWindow;
function openWindow() {
  openedWindow = window.open("http://localhost/code23122023/index.php");
}

function closeOpenedWindow() {
  openedWindow.close("http://localhost/code23122023/index.php");
}

console.log('EINDE script.js');