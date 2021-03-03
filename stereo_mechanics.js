/* All Javascript written by Jeffrey B. Madden 2021. */

/*
--- Disclaimer ---
LCD Media Player Version 1.2 written and created by Jeffrey B. Madden 03-03-2021.
All rights reserved. Any use of LCD Media Player Version 1.1 can only be granted with permission of the owner Jeffrey B. Madden.

--- About LCD Media Player Version 1.2 ---
LCD Media Player is a graphical replica of a real 8292MM, inspired from an single image. LCD Media Player is created to participate in the Codepen Challenge of the week: Skipping. This media player allows for six playlists, each with infinite tracks.

--- Standalone ---
LCD Media Player is built as a standalone feature. One external javascript document, one script tag at the end of the body, one wrapper div for the stereo panel, and one stylesheet. All functions are constructed and loaded in one, self executing, anonymous function.

--- Features ---

--- Playlists ---
There are two ways to skip through playlists:
   1. Click the "M.S.-CD" button to manually skip forward through all playlists. When the last playlist is skipped, skips to the first playlist.
   2. Clicking one of the six "Playlist" buttons (1-6).

An LCD display indicates the current playlist.
When the end of the playlist is reached, the playlist loops.

--- Volume ---
Click and drag the "Volume Knob" up to increase audio volume.
Click and drag the "Volume Knob" down to decrease audio volume.
The last volume setting is stored and reused each time.

--- Play/Pause ---
Click the "Play/Pause" button to toggle playback of audio.
Whenever audio is played, the equalizer is turned on.
Whenever audio is paused, the equalizer is turned off.

--- Hide Stereo ---
Click the "Faceplate" button to hide the "Stereo Panel" vertically outside of the browser window.
Click the "Faceplate" button again to show the "Stereo Panel".
CSS animations are used on margin-top to animate the "Stereo Panel" and content below.

--- Track Info Scroller ---
An LCD display shows the song title and artist name.
The info is animated from left to right to simulate digital 90's car stereos. A custom font is used with monospacing to fulfill this effect.
Click the display to toggle animation on and off for the scroller.
I originally built this feature for another project and decided to modify it and add it to this one. It's one of my favorite features and certainly adds to the skipping theme for this weeks codepen challenge!

--- Equalizer ---
An LCD display indicates the frequency data from the audio.
Many parameters are built-in to the object constructor to give easy control over this feature.
I originally built this feature for another project and decided to modify it and add it to this one. It's my favorite feature!

--- Misc Buttons ---
There are some misc buttons I have not yet created functions for. Maybe I will in the future, maybe not. Maybe you might want to create some and add them in a separate version here in this repository.
For now, the buttons just animate when clicked, with CSS.

--- Thank You ---
Thank you for reading this far. And thank you to any contributors.
*/

(function() {
var Stereo = function( element ) {
   this.element = document.getElementById(element) ;
   this.init() ;
   } ;

Stereo.prototype.init = function() {
   var self = this ;

   /* Properties */

   this.playlists = [
      [ /* Playlist 1 */
      { title : "Hope is for the Living" , artist : "Jeff Madden" , file_name : "hope_is_for_the_living-jeff_madden.mp3" } ,
      { title : "No Words" , artist : "Jeff Madden" , file_name : "no_words-jeff_madden.mp3" }
      ] ,

      [ /* Playlist 2 */
      { title : "The Heretics Age" , artist : "Primordial" , file_name : "the_heretics_age-primordial.mp3" } ,
      { title : "Astray in Eternal Night" , artist : "Evoken" , file_name : "astray_in_eternal_night-evoken.mp3" }
      ] ,

      [ /* Playlist 3 */
      { title : "Existence Indifferent" , artist : "Atakhama" , file_name : "existence_indifferent-atakhama.mp3" } ,
      { title : "Hypnophobic Paralysis" , artist : "Deathcrown" , file_name : "hypnophobic_paralysis-deathcrown.mp3" }
      ] ,

      [ /* Playlist 4 */
      { title : "Suffer in Darkness" , artist : "Depressed Mode" , file_name : "suffer_in_darkness-depressed_mode.mp3" } ,
      { title : "Sacred Nothing" , artist : "Summon" , file_name : "sacred_nothing-summon.mp3" }
      ] ,

      [ /* Playlist 5 */
      { title : "Below the Sun" , artist : "Ahab" , file_name : "below_the_sun-ahab.mp3" } ,
      { title : "Saturnine Vastness" , artist : "Colosseum" , file_name : "saturnine_vastness-colosseum.mp3" }
      ] ,

      [ /* Playlist 6 */
      { title : "Harvest of Hate" , artist : "Beneath The Massacre" , file_name : "harvest_of_hate-beneath_the_massacre.mp3" } ,
      { title : "Through Frail Visions I Lay" , artist : "Remembrance" , file_name : "through_frail_visions_i_lay-remembrance.mp3" }
      ]
      ] ;

   this.current = {
      playlist_index : 0 ,
      track_index : 0 ,
      full_title : undefined ,
      title : undefined ,
      artist : undefined ,
      file_name : undefined
      } ;

   this.scroll = {
      interval : 600 ,
      state : true ,
      counter : 0 ,
      chunk_size : 4 ,
      set : undefined ,
      startListener : function() { self.startScroll(self) ; } ,
      stopListener : function() { self.stopScroll(self) ; }
      } ;

   this.volume = {
      change : false ,
      save_deg : 0 ,
      start_y : undefined ,
      max : 240 ,
      height : 200 ,
      } ;

   this.buttons = {
      play : undefined ,
      pre : undefined ,
      next : undefined ,
      manual : undefined ,
      discs : undefined ,
      faceplate : undefined ,
      volume : undefined ,
      volume_notch : undefined
      } ;

   this.eqSettings = {
      trails : true ,
      backcolor : "transparent" , /* #000000 , transparent */
      image : undefined , /* "images/uv_meter_led_19.png" , undefined */
      pad : 6 ,
      cols : 10 ,
      rows : 13 ,
      col_width : 8 ,
      row_height : 1 ,
      col_space : 3 ,
      row_space : 3 ,
      counter : 0 ,
      level : 0 ,
      speed : 150 ,
      limit : 80
      } ;

   this.eqCompSettings = {
      color : "#c2f200" , /* #000000 , transparent */
      backcolor : "#000000" , /* #000000 , transparent */
      image : undefined , /* "images/uv_meter_led_19.png" , undefined */
      pad : 0 ,
      cols : 6 ,
      rows : 10 ,
      col_width : 6 ,
      row_height : 1 ,
      col_space : 2 ,
      row_space : 2
      } ;

   this.eq = {
      state : undefined ,
      event : undefined ,
      analyser : undefined ,
      frequencyData : undefined ,
      activate : function() { self.activateEqualizer(self) ; } ,
      deactivate : function() { self.deactivateEqualizer(self) ; }
      } ;

   this.buttons.play = this.element.getElementsByClassName("play")[0] ;
   this.buttons.pre = this.element.getElementsByClassName("previous")[0] ;
   this.buttons.next = this.element.getElementsByClassName("next")[0] ;
   this.buttons.manual = this.element.getElementsByClassName("manual")[0] ;
   this.buttons.discs = this.element.getElementsByClassName("discs")[0].children ;
   this.buttons.faceplate = this.element.getElementsByClassName("faceplate")[0] ;
   this.buttons.volume = this.element.getElementsByClassName("volume")[0] ;
   this.buttons.volume_notch = this.buttons.volume.children[0] ;

   this.audio_dir = "comp" ;
   this.audio = this.element.getElementsByClassName("audio")[0] ;
   this.audio_src = this.element.getElementsByClassName("audio_src")[0] ;
   this.discselect = this.element.getElementsByClassName("discselect")[0] ;
   this.header = this.element.getElementsByClassName("header")[0] ;
   this.header_span = this.header.firstElementChild ;
   this.equalizer = document.getElementById("equalizer") ;

   this.play_state = undefined ;
   this.initializing = true ;
   this.loadNextTrack(self) ;
   this.setupButtons() ;
   this.startScroll(self) ;
   this.saveVolume(self , this.volume.max) ;
   this.audiosetup = false ;
   this.initializing = false ;
   } ;

/* Setup Functions */

Stereo.prototype.setupButtons = function() {
   var self = this ;

   /* Play Button */
   self.pauseListener = function() { self.pauseTrack(self) ; } ;
   self.playListener = function() { self.playTrack(self) ; } ;
   self.buttons.play.addEventListener("mousedown" , self.playListener , false) ;

   /* Skip Buttons */
   self.buttons.pre.addEventListener("mousedown" , function() { self.skipTrack(self , -1) ; } , true) ;
   self.buttons.next.addEventListener("mousedown" , function() { self.skipTrack(self , 1) ; } , true) ;

   /* Manual Skip Playlist Button */
   self.buttons.manual.addEventListener("mousedown" , function() { self.skipPlaylist(self , self.current.playlist_index + 1 , true) ; } , true) ;

   /* Playlist Buttons */
   var x ;
   var discs_len = self.buttons.discs.length ;
   for ( x = 0 ; x < discs_len ; x++ )
      {
      var skipPlaylist = (function() { var xx = x ; return function() { self.skipPlaylist(self , xx) ; } ; })() ;
      self.buttons.discs[x].addEventListener("mousedown" , skipPlaylist , true) ;
      self.buttons.discs[x].title = "Playlist " + (x + 1) ;
      }

   /* Faceplate Button */
   self.showListener = function() { self.showStereo(self) ; } ;
   self.hideListener = function() { self.hideStereo(self) ; } ;
   self.buttons.faceplate.addEventListener("click" , self.hideListener , false) ;

   /* Volume Button */
   self.buttons.volume.addEventListener("mousedown" , function(event) { self.startVolume(event , self) ; } , false) ;
   self.buttons.volume.addEventListener("mousemove" , function(event) { self.adjustVolume(event , self) ; } , false) ;
   self.buttons.volume.addEventListener("mouseup" , function() { self.stopVolume(self) ; } , false) ;
   } ;

Stereo.prototype.loadNextTrack = function( self ) {
   var p = self.current.playlist_index ;
   var t = self.current.track_index ;
   var div = " - " ;
   self.current.title = self.playlists[p][t].title ;
   self.current.artist = self.playlists[p][t].artist ;
   self.current.file_name = self.playlists[p][t].file_name ;
   self.current.full_title = (t + 1) + div + self.current.title + div + self.current.artist + div ;
   self.audio_src.src = self.audio_dir + "/" + self.current.file_name ;
   self.audio.load() ;
   self.sendChunk(self) ;
   } ;

Stereo.prototype.startScroll = function( self ) {
   if ( !self.initializing ) { self.header.removeEventListener("click" , self.scroll.startListener) ; }
   self.header.addEventListener("click" , self.scroll.stopListener , false) ;
   self.scroll.state = true ;
   self.scroll.set = setInterval( function() { self.sendChunk(self) ; } , self.scroll.interval ) ;
   self.header.title = "Deactivate Scroll" ;
   } ;

Stereo.prototype.stopScroll = function( self ) {
   self.header.removeEventListener("click" , self.scroll.stopListener) ;
   self.header.addEventListener("click" , self.scroll.startListener , false) ;
   self.scroll.state = false ;
   clearInterval(self.scroll.set) ;
   self.header.title = "Activate Scroll" ;
   } ;

Stereo.prototype.sendChunk = function( self ) {
   var title_chunk ;

   if ( self.scroll.counter < ((self.current.full_title.length - self.scroll.chunk_size) + 1) )
      {
      title_chunk = self.current.full_title.slice(self.scroll.counter , self.scroll.counter + self.scroll.chunk_size) ;
      }
   else
      {
      if ( self.scroll.counter < self.current.full_title.length )
         {
         title_chunk = self.current.full_title.slice(self.scroll.counter , self.scroll.counter + self.scroll.chunk_size) ;
         title_chunk += self.current.full_title.slice(0 , self.scroll.counter - self.current.full_title.length) ;
         title_chunk = title_chunk.slice(0 , self.scroll.chunk_size) ;
         }
      else
         {
         self.resetScrollCounter(self) ;
         var title_chunk = self.current.full_title.slice(self.scroll.counter , self.scroll.counter + self.scroll.chunk_size) ;
         }
      }

   self.header_span.innerHTML = title_chunk.replace(/ /g , "&nbsp;") ;
   self.scroll.counter += 1 ;
   } ;

Stereo.prototype.resetScrollCounter = function( self ) {
   self.scroll.counter = 0 ;
   } ;

Stereo.prototype.playTrack = function( self ) {
console.log("playTrack") ;
   self.buttons.play.removeEventListener("mousedown" , self.playListener) ;
   self.buttons.play.addEventListener("mousedown" , self.pauseListener , false) ;
   self.audio.onended = function() { self.skipTrack(self , 1) ; } ;
   var promise = self.audio.play() ;

   if ( promise !== undefined )
      {
      promise.then(function() {
         if ( !self.audiosetup ) { self.audiosetup = true ; self.setupAudio(self) ; }
         if ( self.play_state ) { self.activateEqualizer(self) ; }
         return true ;
         } )
      .catch(function() {
         console.log("error") ;
         if ( self.scroll.state ) { self.stopScroll(self) ; }
         self.current.full_title = "Error" ;
         self.sendChunk(self) ;
         return false ;
         } ) ;
      }

   self.play_state = true ;
   } ;

Stereo.prototype.pauseTrack = function( self ) {
   self.buttons.play.removeEventListener("mousedown" , self.pauseListener) ;
   self.buttons.play.addEventListener("mousedown" , self.playListener , false) ;
   self.audio.pause() ;
   self.deactivateEqualizer(self) ;
   self.play_state = false ;
   } ;

Stereo.prototype.skipTrack = function( self , inc ) {
   if ( self.scroll.state ) { self.stopScroll(self) ; self.startScroll(self) ; }
   self.pauseTrack(self) ;
   self.resetScrollCounter(self) ;
   var end = self.playlists[self.current.playlist_index].length - 1 ;
   self.current.track_index += inc ;
   if ( self.current.track_index > end ) { self.current.track_index =  0 ; }
   if ( self.current.track_index < 0 ) { self.current.track_index = end ; }
   self.loadNextTrack(self) ;
   self.playTrack(self) ;
   } ;

Stereo.prototype.skipPlaylist = function( self , inc , manual ) {
   if ( manual ) { if ( self.current.playlist_index >= (self.playlists.length - 1) ) { inc = 0 ; } }
   self.current.playlist_index = inc ;
   self.current.track_index = 0 ;
   self.skipTrack(self , 0) ;
   self.discselect.style.backgroundPosition = "0px -" + (inc * 54) + "px" ;
   } ;

Stereo.prototype.hideStereo = function( self ) {
   if ( !self.initializing ) { self.buttons.faceplate.removeEventListener("click" , self.hideListener) ; }
   self.buttons.faceplate.addEventListener("click" , self.showListener , false) ;
   self.element.className = "hide" ;
   self.buttons.faceplate.title = "Show Stereo" ;
   } ;

Stereo.prototype.showStereo = function( self ) {
   self.buttons.faceplate.removeEventListener("click" , self.showListener) ;
   self.buttons.faceplate.addEventListener("click" , self.hideListener , false) ;
   self.element.className = "show" ;
   self.buttons.faceplate.title = "Hide Stereo" ;
   } ;

Stereo.prototype.startVolume = function( event , self ) {
   event.preventDefault() ;
   self.buttons.volume.className = "volume rotate flex" ;
   self.volume.change = true ;
   } ;

Stereo.prototype.adjustVolume = function( event , self ) {
   event.preventDefault() ;

   if ( self.volume.change )
      {
      var y = event.screenY ;
      if ( self.volume.start_y === undefined ) { self.volume.start_y = y ; }
      var res = self.volume.start_y - y ;
      if ( res !== 0 ) { self.saveVolume(self , res) ; }
      }
   } ;

Stereo.prototype.stopVolume = function( self ) {
   self.volume.start_y = undefined ;
   self.buttons.volume.className = "volume def flex" ;
   self.volume.change = false ;
   } ;

Stereo.prototype.saveVolume = function( self , res ) {
   self.volume.save_deg += res ;
   if ( self.volume.save_deg < 0 ) { self.volume.save_deg = 0 ; }
   if ( self.volume.save_deg > self.volume.max ) { self.volume.save_deg = self.volume.max ; }
   self.buttons.volume_notch.style.transform = "rotate(" + self.volume.save_deg + "deg)" ;
   self.audio.volume = self._convertToVol(self , self.volume.save_deg , self.volume.max) ;
   } ;

Stereo.prototype._convertToVol = function( self , x , max ) {
   var inc = max / 10 ;
   var vol = x / inc ;
   vol = Math.floor(vol * 10) / 100 ;
   return Math.floor(vol * 10) / 10 ;
   } ;

/* Equalizer */

/* Setup Audio Context */

Stereo.prototype.setupAudio = function( self ) {
   var audio_context = new AudioContext() ;
   var audio_src = audio_context.createMediaElementSource(self.audio) ;
   audio_src.connect(audio_context.destination) ;
   self.eq.analyser = audio_context.createAnalyser() ;
   audio_src.connect(self.eq.analyser) ;
   } ;

Stereo.prototype.activateEqualizer = function( self ) {
   self.createEqualizer() ;
   self.equalizer.setAttribute("title" , "Deactivate Equalizer") ;

   if ( self.eq.state !== undefined ) { self.equalizer.removeEventListener("click" , self.eq.activate) ; }
   self.equalizer.addEventListener("click" , self.eq.deactivate) ;

   self.eq.frequencyData = new Uint8Array(self.eqCompSettings.cols) ;
   self.showGraph() ;
   self.eq.state = true ;
   } ;

Stereo.prototype.deactivateEqualizer = function( self ) {
   self.equalizer.setAttribute("title" , "Activate Equalizer") ;

   self.equalizer.removeEventListener("click" , self.eq.deactivate) ;
   self.equalizer.addEventListener("click" , self.eq.activate) ;

   clearTimeout(self.eq.event) ;
   self.equalizer.innerHTML = "" ;
   self.eq.state = false ;
   } ;

Stereo.prototype.createEqualizer = function() {
   var self = this ;
   var settings = self.eqCompSettings ;

   var x ;
   for ( x = 0 ; x < settings.cols ; x++ )
      {
      if ( x === settings.cols - 1 ) { var space = 0 ; }
      else { var space = settings.col_space ; }
      var freq_col = self._ele("div") ;
      self._atta(freq_col , "class" , "freq_col") ;
      freq_col.style.width = settings.col_width + "px" ;
      freq_col.style.marginRight = space + "px" ;
      self.equalizer.appendChild(freq_col) ;

      var y ;
      for ( y = 0 ; y < settings.rows ; y++ )
         {
         if ( y === settings.rows - 1 ) { var space = 0 ; }
         else { var space = settings.row_space ; }
         var freq = self._ele("div") ;
         freq.style.backgroundColor = settings.color ;
         freq.style.width = settings.col_width + "px" ;
         freq.style.height = settings.row_height + "px" ;
         freq.style.marginBottom = space + "px" ;
         freq.style.opacity = "0.0" ;
         if ( settings.image ) { freq.style.backgroundImage = "url('" + settings.image + "')" ; }
         freq_col.appendChild(freq) ;
         }
      }
   } ;

Stereo.prototype.showGraph = function() {
   var self = this ;

   self.eq.event = setTimeout( function() {
      self.eqSettings.counter += 1 ;
      requestAnimationFrame(function() { self.showGraph() ; }) ;
      self.eq.analyser.getByteFrequencyData(self.eq.frequencyData) ;
      self.respData() ;
      } , self.eqSettings.speed ) ;
   } ;

Stereo.prototype.respData = function() {
   var self = this ;

   var ch = self.equalizer.children ;
   var x ;
   var len = ch.length ;
   for ( x = 0 ; x < len ; x++ )
      {
      var freq_ch = ch[x].children ;
      var d = self.translateData(self.eq.frequencyData[x]) ;
      self.eqLevel(freq_ch , d) ;
      }
   } ;

Stereo.prototype.eqLevel = function( a , d ) {
   var self = this ;

   self.clearLevel(a) ;
   var x = a.length - 1 ;
   self.eqSettings.level = d ;
   var y = 0 ;
   for ( x ; x >= 0 ; x-- )
      {
      if ( y >= self.eqSettings.level ) { if ( self.eqSettings.trails ) { self.trails(a , x) ; } return ; }
      a[x].style.opacity = "1.0" ;
      y++ ;
      }
   } ;

Stereo.prototype.clearLevel = function( a ) {
   var x ;
   var len = a.length ;
   for ( x = 0 ; x < len ; x++ )
      {
      a[x].style.opacity = "0.0" ;
      }
   } ;

Stereo.prototype.trails = function( a , x ) {
   var self = this ;
   var y = 10 ;
   var len = a.length ;
   if ( x + 1 === len ) { return ; }
   for ( x ; x >= 0 ; x-- )
      {
      y -= 3 ;
      if ( y <= 0 ) { y = 0 ; }
      a[x].style.opacity = "0." + y ;
      }
   } ;

Stereo.prototype.translateData = function( d , s ) {
   var self = this ;
   var freq_inc = 255 / 100 ;
   var eq_inc = self.eqCompSettings.rows / 100 ;
   var freq_perc = Math.floor(d / freq_inc) ;
   var eq_perc = Math.floor(freq_perc * eq_inc) ;
   return eq_perc ;
   } ;

Stereo.prototype.addEqStyles = function() {
   var self = this ;
   var settings = self.eqCompSettings ;
   self.equalizer.style.width = ((settings.cols * (settings.col_width + settings.col_space)) - settings.col_space) + "px" ;
   self.equalizer.style.height = ((settings.rows * (settings.row_height + settings.row_space)) - settings.row_space) + "px" ;
   self.equalizer.style.padding = settings.pad + "px" ;
   self.equalizer.style.backgroundColor = settings.backcolor ;
   } ;

/* Private Functions */

Stereo.prototype._ele = function( e ) {
   var ta = document.createElement(e) ;
   return ta ;
   } ;

Stereo.prototype._txt = function( t , v ) {
   var a = document.createTextNode(v) ;
   t.appendChild(a) ;
   } ;

Stereo.prototype._atta = function( t , att , v ) {
   var a = document.createAttribute(att) ; 
   a.value = v ; 
   t.setAttributeNode(a) ; 
   } ;

(function() {
   var stereo = new Stereo("stereo") ;
   })() ;
})() ;
