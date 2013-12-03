var graphicsContainer = null;
var horizontalAngle;
var activeAlbum = 0;

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
		var verticalRadius = elementSize / (2 * Math.sin(Math.PI / songCount));
		output += '<div class="album" style="-webkit-transform: rotateY(' + (i * horizontalAngle) + 'deg) translateZ(' + (config.radius - verticalRadius) + 'px)">'
		for(var j = 0; j < songCount; j++){
			output += '<div class="song-wrapper">' +
				'<div class="song ' + ((i != 0 && j != 0) ? 'song-hidden' : '') + ' ' + (i == 0 ? 'active' : '') + '" id="album-' + (i+1) + '-song' + (j+1) + '" style="-webkit-transform: rotateX(' + (j * verticalAngle) + 'deg) translateZ(' + verticalRadius + 'px); width: ' + elementSize + 'px; height: ' + elementSize + 'px;">' +
				'<img src="' + config.coverPrefix + config.albums[i].cover + '" style="width: ' + (elementSize-20) + 'px; height:' + (elementSize-20) + 'px">' + 
				'</div>' + 
				'<div class="song-back ' + ((i != 0 && j != 0) ? 'song-hidden' : '') + ' ' + (i == 0 ? 'active' : '') + '" style="background-color: rgb(' +  Math.floor(Math.random() * (256 + 1)) + ', ' + Math.floor(Math.random() * (256 + 1)) + ', ' + Math.floor(Math.random() * (256 + 1)) + '); -webkit-transform: rotateX(' + (j * verticalAngle) + 'deg) translateZ(' + (verticalRadius - 1.2) + 'px); width: ' + (elementSize - 18) + 'px; height: ' + (elementSize - 18) + 'px;"></div>' +
				'</div>';
		}
		output += '</div>'
	}
	output += '</div>'
	graphicsContainer.append(output);
}