var count = 0;
var audio = document.getElementById('audio');
var audioPlayPause = document.getElementById('audioPlayPause');
var audioStop = document.getElementById('audioStop');

audioPlayPause.addEventListener('click', function(){
  if(count == 0){
    count = 1;
    audio.play();
    audioPlayPause.innerHTML = "<i class='fas fa-pause'></i>";

    var audioList = document.querySelectorAll('.aTrigger');
    audioList.forEach(function(audioSingle,index){
      var dataActive = audioSingle.getAttribute('data-active');
      if(dataActive == "pause"){
        audioSingle.setAttribute('data-active', 'active');
      }
    });
  }else {
    count = 0;
    audio.pause();
    audioPlayPause.innerHTML = "<i class='fas fa-play'></i>";

    var audioList = document.querySelectorAll('.aTrigger');
    audioList.forEach(function(audioSingle,index){
      var dataActive = audioSingle.getAttribute('data-active');
      if(dataActive == "active"){
        audioSingle.setAttribute('data-active', 'pause');
      }
    });
  }
})

audioStop.addEventListener('click', function(){
  count = 0;
  audio.pause();
  audio.currentTime = 0;
  audioPlayPause.innerHTML = "<i class='fas fa-pause'></i>";
  audioPlayPause.className = "";
  audioStop.className = "";
  document.getElementById('audioTitle').innerHTML = "&nbsp;";
  duration.innerHTML = "0:00";
  var audioList = document.querySelectorAll('.aTrigger');
    audioList.forEach(function(audioSingle,index){
      var dataActive = audioSingle.getAttribute('data-active');
      if(dataActive == "active" || dataActive == "pause"){
        audioSingle.setAttribute('data-active', '');
      }
    });
})

var audioList = document.querySelectorAll('.aTrigger');
audioList.forEach(function(audioSingle,index){

  var dataAudioName = audioSingle.getAttribute("data-audio");
  var audioName = dataAudioName.substring(dataAudioName.lastIndexOf("/") + 1, dataAudioName.length);
  audioList[index].nextElementSibling.innerHTML = audioName;
  audioSingle.addEventListener('click', function(index){
    thisisAudioSingle = this;
    audioPlayPause.className = "active";
    audioStop.className = "active";
    var dataAudio = this.getAttribute('data-audio');
    var dataActive = this.getAttribute('data-active');
    var audioSource = document.getElementById("audioSource");
    audioSource.src = dataAudio;
    document.getElementById("audioTitle").innerHTML = `<a href="audio-gallary-detail.html">${audioName}</a>`;
    // audio.load();
    // audio.play();
    for (var i=0; i < audioList.length; i++){
      audioList[i].innerHTML = "<i class='fas fa-play'></i>";
      audioList[i].setAttribute("data-active", "");

    }
    if(dataActive == ""){
      count = 1;
      audio.load();
      audio.play();
      this.setAttribute("data-active", "active");
      audioPlayPause.innerHTML = "<i class='fas fa-pause'></i>";
    }else if (dataActive == "pause") {
      count = 1;
      audio.play();
      this.setAttribute("data-active", "active");
      audioPlayPause.innerHTML = "<i class='fas fa-pause'></i>";
    }else {
      count = 0;
      audio.pause();
      this.setAttribute("data-active", "pause");
      audioPlayPause.innerHTML = "<i class='fas fa-play'></i>";
    }

    var duration = document.getElementById("duration");
    setTimeout(function(){
      var s = parseInt(audio.duration % 60);
      var m = parseInt((audio.duration / 60) % 60);
      duration.innerHTML = m + ":" + s;
      audio.addEventListener('timeupdate', function(){
      var durationUpdate = document.getElementById("durationUpdate");
      var s = parseInt(audio.currentTime % 60);
      var m = parseInt((audio.currentTime / 60) % 60);
      durationUpdate.innerHTML = m + ":" + s;
      if(duration.textContent == durationUpdate.textContent){
        audioPlayPause.innerHTML = "<i class='fas fa-play'></i>";
        thisisAudioSingle.setAttribute("data-active", "pause");
        count = 0;

      }
      },false)
    },200)
  });

})