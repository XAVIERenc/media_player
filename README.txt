--- Disclaimer ---
LCD Media Player Version 1.2 written and created by Jeffrey B. Madden 03-03-2021.
All rights reserved. Any use of LCD Media Player Version 1.2 can only be granted with permission of the owner Jeffrey B. Madden.

--- Music Disclaimer ---
All music is used, except for "Jeff Madden", is solely for the purpose of demonstrating playlists on a media player using HTML and Javascript. I have no affiliation with any bands and the music contained here. These songs are just music I listen to. Please feel free to look further at the artist links I provided below the "Stereo Panel". I am sure these bands would love to receive some traffic on their pages.

--- About LCD Media Player Version 1.2 ---
LCD Media Player is a graphical replica of a real 8292MM, inspired from an single image. LCD Media Player is created to participate in the Codepen Challenge of the week: Skipping. This media player allows for six playlists, each with infinite tracks.

--- Standalone ---
LCD Media Player is built as a standalone feature. One external javascript document, one script tag at the end of the body, one wrapper div for the stereo panel, and one stylesheet. All functions are constructed and loaded in one, self executing, anonymous function.

--- Font ---
"jeff_madden_font.otf" was created by Jeff Madden. jeff_madden_font is monospaced and perfect for this type of application. If you use my font, please credit me for it's creation. Thank you.

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
