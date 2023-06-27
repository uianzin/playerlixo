let tocando = document.querySelector('.tocando');
let imagem = document.querySelector('.imagem');
let musica_nome = document.querySelector('.musica_nome');
let artista = document.querySelector('.artista');

let playpause_btn = document.querySelector('.playpause-track');
let next_btn = document.querySelector('.next-track');
let botao_voltar = document.querySelector('.voltar');
let botao_aleatorio = document.querySelector('.Aleatorio')
let seek_slider = document.querySelector('.seek_slider');
let volume_slider = document.querySelector('.volume_slider');
let tempo_inicial = document.querySelector('.tempo_inicial');
let tempo_total = document.querySelector('.tempo_total');
let wave = document.getElementById('wave');

let curr_track = document.createElement('audio');

let track_index = 0;
let isPlaying = false;
let updateTimer;
let aleatorio = false

const music_list = [
    {
        img : 'images/noite.jpg',
        name : 'A noite',
        artist : 'Tiê',
        music : 'music/SnapSave.io - Tiê _A Noite_ - Clipe Oficial (128 kbps).mp3'
    },
    {
        img : 'images/drag.jpg',
        name : 'Drag me down ',
        artist : 'One direction',
        music : 'music/drag.mp3'
    },
    {
        img : 'images/faded.png',
        name : 'Faded',
        artist : 'Alan Walker',
        music : 'music/Faded.mp4'
    },
    {
        img : 'images/carros.jpg',
        name : 'Cars outside',
        artist : 'James Arthur',
        music : 'music/carros.mp4'
    },
    {
        img : 'images/yellow.jpg',
        name : 'Yellow',
        artist : 'Coldplay',
        music : 'music/yellow.mp4'
    },
    {
        img : 'images/superman.jpg',
        name : 'Superman',
        artist : 'Eminem',
        music : 'music/superman.mp4'
    },
    {
        img : 'images/get.jpg',
        name : 'Get it together',
        artist : '702',
        music : 'music/get.mp4'
    },
    {
        img : 'images/crina.jpg',
        name : 'Crina negra',
        artist : 'Banda patrulha',
        music : 'music/crina.mp4'
    },
    {
        img : 'images/hours.jpg',
        name : 'The hours',
        artist : 'The weeknd',
        music : 'music/hours.mp4'
    },
    {
        img : 'images/sozinho.jpg',
        name : 'Sozinho',
        artist : 'Raça negra',
        music : 'music/sozinho.mp4'
    },
    {
        img : 'images/sexo.jpg',
        name : 'Sex, Drugs etc',
        artist : 'Beatch Weather',
        music : 'music/sexo.mp3'
    },
    {
        img : 'images/cry.jpg',
        name : 'Stop crying your heart out',
        artist : 'Oasis',
        music : 'music/cry.mp4'
    },
    {
        img : 'images/riptide.jpg',
        name : 'Riptide',
        artist : 'Vance Joy',
        music : 'music/riptide.mp4'
    },{
        img : 'images/crazy.jpg',
        name : 'Crazy frog',
        artist : 'Axel F',
        music : 'music/crazy.mp4'
    },{
        img : 'images/shirt.jpg',
        name : 'In this shirt',
        artist : 'The Irrepressibles    ',
        music : 'music/shirt.mp4'
    },
];

loadTrack(track_index);

function passarAleatorio(){
 aleatorio ? pauseAleatorio() : playAleatorio()
}
function playAleatorio(){
    aleatorio = true
    document.querySelector('.Aleatorio').style.opacity = '1'
}
function pauseAleatorio(){
    aleatorio = false
    document.querySelector('.Aleatorio').style.opacity = '0.8'
}

function loadTrack(track_index){
    clearInterval(updateTimer);
    reset();

    curr_track.src = music_list[track_index].music;
    curr_track.load();

    imagem.style.backgroundImage = "url(" + music_list[track_index].img + ")";
    musica_nome.textContent = music_list[track_index].name;
    artista.textContent = music_list[track_index].artist;
    tocando.textContent = "Tocando " + (track_index + 1) + " de " + music_list.length;

    updateTimer = setInterval(setUpdate, 1000);

    curr_track.addEventListener('ended', nextTrack);
    
}


function reset(){
    tempo_inicial.textContent = "00:00";
    tempo_total.textContent = "00:00";
    seek_slider.value = 0;
}

function repeatTrack(){
    let current_index = track_index;
    loadTrack(current_index);
    playTrack();
}

function playTrack(){
    curr_track.play();
    document.querySelector('.botao-pause').style.display = 'block';
    document.querySelector('.playpause-track').style.display = 'none';
   
    isPlaying = true;
    imagem.classList.add('rotate');
    wave.classList.add('loader');
    playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
}
function pauseTrack(){
    curr_track.pause();
    document.querySelector('.botao-pause').style.display = 'none';
    document.querySelector('.playpause-track').style.display = 'block';
    isPlaying = false;
    imagem.classList.remove('rotate');
    wave.classList.remove('loader');
    playpause_btn.innerHTML = ' <i class="fa fa-pause-circle" aria-hidden="true" onclick="pauseTrack()"></i>';
}
function nextTrack(){
    if(track_index < music_list.length - 1 && !aleatorio){
        track_index += 1;

    }else if(track_index < music_list.length - 1 && aleatorio){
        indice_aleatorio = parseInt(Math.random()*(music_list.length))
        if(indice_aleatorio != track_index){
            track_index = indice_aleatorio
        }
    }
        else{
        track_index = 0;
    }
    loadTrack(track_index);
    playTrack();
}
function prevTrack(){
    if(track_index > 0 && !aleatorio){
        track_index -= 1;
    }else if(track_index > 0 && aleatorio){
        indice_aleatorio = parseInt(Math.random()*(music_list.length))
        if(indice_aleatorio != track_index){
            track_index = indice_aleatorio
        }
    }
    
    else{
        track_index = music_list.length -1;
    }
    loadTrack(track_index);
    playTrack();
}
function seekTo(){
    let seekto = curr_track.duration * (seek_slider.value / 100);
    curr_track.currentTime = seekto;
}
function setVolume(){
    curr_track.volume = volume_slider.value / 100;
}
function setUpdate(){
    let seekPosition = 0;
    if(!isNaN(curr_track.duration)){
        seekPosition = curr_track.currentTime * (100 / curr_track.duration);
        seek_slider.value = seekPosition;

        let currentMinutes = Math.floor(curr_track.currentTime / 60);
        let currentSeconds = Math.floor(curr_track.currentTime - currentMinutes * 60);
        let durationMinutes = Math.floor(curr_track.duration / 60);
        let durationSeconds = Math.floor(curr_track.duration - durationMinutes * 60);

        if(currentSeconds < 10) {currentSeconds = "0" + currentSeconds; }
        if(durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
        if(currentMinutes < 10) {currentMinutes = "0" + currentMinutes; }
        if(durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }

        tempo_inicial.textContent = currentMinutes + ":" + currentSeconds;
        tempo_total.textContent = durationMinutes + ":" + durationSeconds;
    }}
  
