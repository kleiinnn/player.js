var context, songBuffer;
var source = null;

exports.init = function(){
    try{
        context = new webkitAudioContext();
    }
    catch(e){
        alert("WebAudioAPI is not availible in you browser!");
    }
}

exports.play = function(album, song){
    loadSong(config.soundFileLocation + '/' + config.albums[album].soundFileFolder + '/' + config.albums[album].songs[song].file, function(){
        source = context.createBufferSource();
        source.buffer = songBuffer;
        //to be implemented
        /*var processor = context.createScriptProcessor(8192);
        processor.onaudioprocess = function(e){
                console.log(e.timeStamp);
         var leftIn = e.inputBuffer.getChannelData(0);
         var rightIn = e.inputBuffer.getChannelData(1);
         var leftOut = e.outputBuffer.getChannelData(0);
         var rightOut = e.outputBuffer.getChannelData(1);
                for(var i = 0; i < leftIn.length; i++){
                        leftOut[i] = leftIn[i];
                        rightOut[i] = rightIn[i];
                }
        }
        source.connect(processor);
        processor.connect(context.destination);*/
        source.connect(context.destination);
        source.start(0);
    });
}

function loadSong(url, callback){
    var request = new XMLHttpRequest();
    request.open('GET', url, true);
    request.responseType = 'arraybuffer';
    request.onload = function(){
            context.decodeAudioData(request.response, function(buffer){
                    songBuffer = buffer;
                    if(callback != null){
                            callback();
                    }
            });
    }
    request.send();
}