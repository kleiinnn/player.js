var graphicsContainer = null;
var horizontalAngle;
var verticalAngles = new Array();
var activeAlbum = 0;
var angleCounter = 0;
var transformOrigin = '';

exports.init = function(){
	graphicsContainer = $('#' + config.graphicsContainer);
}

exports.addPlayer = function(){
	//magic happens here!!
	console.log("radius: " + config.radius);
	var albumCount = config.albums.length;
	console.log("albumCount: " + albumCount);
	horizontalAngle = 360 / albumCount;
	console.log("horizontalAngle: " + horizontalAngle);
	var elementSize = config.radius * 2 * Math.sin(Math.PI / albumCount);
	console.log("elementSize: " + elementSize);
	var output = '<div id="graphics" style="width: ' + elementSize + 'px; height: ' + elementSize + 'px;">';	
	for(var i = 0; i < albumCount; i++){
		var songCount = config.albums[i].songs.length;
		var verticalAngle = 360 / songCount;
		verticalAngles[i] = verticalAngle;
		var verticalRadius = elementSize / (2 * Math.sin(Math.PI / songCount));
		output += '<div class="album" id="album-' + (i+1) + '" style="-webkit-transform: rotateY(' + (i * horizontalAngle) + 'deg) translateZ(' + (config.radius - verticalRadius) + 'px); width: ' + elementSize + 'px; height: ' + elementSize + 'px;">'
		for(var j = 0; j < songCount; j++){
			output += '<div class="song-wrapper">' +
				'<div class="song ' + ((i != 0 && j != 0) ? 'song-hidden' : '') + ' ' + (i == 0 ? 'active' : '') + ' ' + (j == 0 ? 'vertical-center' : '') + '" id="album-' + (i+1) + '-song-' + (j+1) + '" style="-webkit-transform: rotateX(' + (j * verticalAngle) + 'deg) translateZ(' + verticalRadius + 'px); width: ' + elementSize + 'px; height: ' + elementSize + 'px;">' +
				'<img src="' + config.coverPrefix + '/' + config.albums[i].cover + '" style="width: ' + (elementSize-20) + 'px; height:' + (elementSize-20) + 'px">' + 
				'</div>' + 
				'<div id="album-' + (i+1) + '-song-' + (j+1) + '-back" class="song-back ' + ((i != 0 && j != 0) ? 'song-hidden' : '') + ' ' + (i == 0 ? 'active' : '') + ' ' + (j == 0 ? 'vertical-center' : '') + '" style="background-color: rgb(' +  Math.floor(Math.random() * (256 + 1)) + ', ' + Math.floor(Math.random() * (256 + 1)) + ', ' + Math.floor(Math.random() * (256 + 1)) + '); -webkit-transform: rotateX(' + (j * verticalAngle) + 'deg) translateZ(' + (verticalRadius - 1.2) + 'px); width: ' + (elementSize-20) + 'px; height: ' + (elementSize-20) + 'px;"></div>' +
				'</div>';
		}
		output += '</div>'
	}
	output += '</div>'
	graphicsContainer.append(output);
}

exports.rotateLeft = function(){
	$('.active').not('.vertical-center').addClass('song-hidden');
	$('.active').removeClass('active');
	activeAlbum++;
	if(activeAlbum == config.albums.length){
		activeAlbum = 0;
	}
	$('#album-' + (activeAlbum+1)).children('*').children('.song, .song-back').addClass('active');
	$('.active').removeClass('song-hidden');
	rotateY('left')
}

exports.rotateRight = function(){
	$('.active').not('.vertical-center').addClass('song-hidden');
	$('.active').removeClass('active');
	activeAlbum--;
	if(activeAlbum == -1){
		activeAlbum = config.albums.length-1;
	}
	$('#album-' + (activeAlbum+1)).children('*').children('.song, .song-back').addClass('active');
	$('.active').removeClass('song-hidden');
	rotateY('right')
}

exports.rotateDown = function(){
	var activeSong = Number($('.active.vertical-center').attr('id').split('-')[3]) + 1;
	if(activeSong == config.albums[activeAlbum].songs.length+1){
		activeSong = 1;
	}
	$('.active.vertical-center').removeClass('vertical-center');
	$('#album-' + (activeAlbum+1) + '-song-' + activeSong + ', #album-' + (activeAlbum+1) + '-song-' + activeSong + '-back').addClass('vertical-center');
	rotateX('down');
}

exports.rotateUp = function(){
	var activeSong = Number($('.active.vertical-center').attr('id').split('-')[3]) - 1;
	if(activeSong == 0){
		activeSong = config.albums[activeAlbum].songs.length;
	}
	$('.active.vertical-center').removeClass('vertical-center');
	$('#album-' + (activeAlbum + 1) + '-song-' + activeSong + ', #album-' + (activeAlbum + 1) + '-song-' + activeSong + '-back').addClass('vertical-center');
	rotateX('up');
}


function rotateY(direction){
	setTimeout(function(){
            var transform = graphicsContainer.children().css('-webkit-transform');
			if(angleCounter == 0){
				transformOrigin = transform;
			}
            graphicsContainer.children().css('-webkit-transform', transform + ' rotateY(' + (direction != 'left' ? '1' : '-1') + 'deg)');
            angleCounter += 1;
            if(angleCounter < horizontalAngle){
            	rotateY(direction);
            }
            else{
				if(angleCounter != 0){
					graphicsContainer.children().css('-webkit-transform', transformOrigin + ' rotateY(' + (horizontalAngle * (direction != 'left' ? 1 : -1)) + 'deg)');
				}
                angleCounter = 0;
            }
    }, 10);
}

function rotateX(direction){
	setTimeout(function(){
            var transform = $('#album-' + (activeAlbum + 1)).css('-webkit-transform');
			if(angleCounter == 0){
				transformOrigin = transform;
			}
            $('#album-' + (activeAlbum + 1)).css('-webkit-transform', transform + ' rotateX(' + (direction != 'down' ? '1' : '-1') + 'deg)');
            angleCounter += 1;
            if(angleCounter < verticalAngles[activeAlbum]){
            	rotateX(direction);
            }
            else{
				if(angleCounter != 0){
					$('#album-' + (activeAlbum + 1)).css('-webkit-transform', transformOrigin + ' rotateX(' + (verticalAngles[activeAlbum] * (direction != 'down' ? 1 : -1)) + 'deg)');
				}
                angleCounter = 0;
            }
    }, 10);
}
