$(document).ready(function(){
	initPlayer();
	getSongs();
});

var audio = document.getElementById("player");
var music;

function initPlayer(){
	$("#shuffle").click(function(){
		$("#playlist").empty();
		shuffle(music.songs);
		getList(music);
		playSong(0);	
	});
}
function getSongs(){
	$.getJSON("js/app.json", function( mdatas ){
		music = mdatas;
		getList(music);
	});
}

function playSong(id){
	long  = music.songs;
	if( id >= long.length ){
		console.log("termino");
		audio.pause();
	} else {
		if( music.songs[id].img !== "" && typeof music.songs[id].img !== "undefined" ){
			$('#img-album').attr("src", music.songs[id].img );
		}
		$('	#player').attr("src", music.songs[id].song );
		audio.play();
		scheduleSong(id);
		console.log("hay mas canciones");
	}
}

function getList(music){
	$.each(music.songs, function(i, song){
		$('#playlist').append('<li class="list-group-item" id="'+i+'">' + song.nombre + '</li>');
	});
	$('#playlist li').click( function(){
		var selectSong = $(this).attr('id');
		playSong(selectSong);
	});
}

function scheduleSong(id){
	audio.onended = function () {
		playSong( parseInt(id) + 1 );
	}
} 

function shuffle( array ){
	for( var random, temp, position = array.length; position; random  = Math.floor(Math.random() * position), temp = array[--position], array[position] = array[random], array[random] = temp );
		return array;		
}