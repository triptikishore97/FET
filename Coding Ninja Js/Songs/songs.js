const songs = [
    { id: 1, name: "Song 1", artist: "Artist 1", genre: "Pop", image: "song1.jpg", src: "song1.mp3" },
    { id: 2, name: "Song 2", artist: "Artist 2", genre: "Rock", image: "song2.jpg", src: "song2.mp3" },
    { id: 3, name: "Song 3", artist: "Artist 3", genre: "Jazz", image: "song3.jpg", src: "song3.mp3" },
    
  ];
  
  const playlists = [];
  
  let currentSongIndex = 0;
  let isPlaying = false;
  let currentPlaylist = null;
  
  const songListEl = document.getElementById('song-list');
  const songImageEl = document.getElementById('song-image');
  const songNameEl = document.getElementById('song-name');
  const artistNameEl = document.getElementById('artist-name');
  const playPauseBtn = document.getElementById('play-pause');
  const newPlaylistNameEl = document.getElementById('new-playlist-name');
  const playlistListEl = document.getElementById('playlist-list');
  const searchInput = document.getElementById('search');
  
  function renderSongList() {
    songListEl.innerHTML = '';
    const filter = searchInput.value.toLowerCase();
    songs.forEach((song, index) => {
      if (!filter || song.genre.toLowerCase().includes(filter)) {
        const li = document.createElement('li');
        li.textContent = `${song.name} - ${song.artist}`;
        li.addEventListener('click', () => playSong(index));
        songListEl.appendChild(li);
      }
    });
  }
  
  function playSong(index) {
    currentSongIndex = index;
    const song = songs[currentSongIndex];
    songImageEl.src = song.image;
    songNameEl.textContent = song.name;
    artistNameEl.textContent = song.artist;
    const audio = new Audio(song.src);
    audio.play();
    isPlaying = true;
    playPauseBtn.textContent = 'Pause';
    playPauseBtn.onclick = () => {
      if (isPlaying) {
        audio.pause();
        playPauseBtn.textContent = 'Play';
      } else {
        audio.play();
        playPauseBtn.textContent = 'Pause';
      }
      isPlaying = !isPlaying;
    };
    audio.onended = () => {
      nextSong();
    };
  }
  
  function nextSong() {
    if (currentSongIndex < songs.length - 1) {
      playSong(currentSongIndex + 1);
    } else {
      playSong(0);
    }
  }
  
  function prevSong() {
    if (currentSongIndex > 0) {
      playSong(currentSongIndex - 1);
    } else {
      playSong(songs.length - 1);
    }
  }
  
  function addToPlaylist() {
    const playlistName = prompt("Enter playlist name:");
    if (!playlistName) return;
    let playlist = playlists.find(pl => pl.name === playlistName);
    if (!playlist) {
      playlist = { name: playlistName, songs: [] };
      playlists.push(playlist);
      renderPlaylists();
    }
    playlist.songs.push(songs[currentSongIndex]);
  }
  
  function renderPlaylists() {
    playlistListEl.innerHTML = '';
    playlists.forEach(playlist => {
      const li = document.createElement('li');
      li.textContent = playlist.name;
      li.addEventListener('click', () => displayPlaylist(playlist));
      playlistListEl.appendChild(li);
    });
  }
  
  function displayPlaylist(playlist) {
    currentPlaylist = playlist;
    songListEl.innerHTML = '';
    playlist.songs.forEach((song, index) => {
      const li = document.createElement('li');
      li.textContent = `${song.name} - ${song.artist}`;
      li.addEventListener('click', () => playSong(songs.indexOf(song)));
      songListEl.appendChild(li);
    });
  }
  
  function createPlaylist() {
    const playlistName = newPlaylistNameEl.value.trim();
    if (!playlistName) return;
    if (!playlists.find(pl => pl.name === playlistName)) {
      playlists.push({ name: playlistName, songs: [] });
      renderPlaylists();
    }
  }
  
  document.getElementById('prev').addEventListener('click', prevSong);
  document.getElementById('next').addEventListener('click', nextSong);
  document.getElementById('add-to-playlist').addEventListener('click', addToPlaylist);
  document.getElementById('create-playlist').addEventListener('click', createPlaylist);
  searchInput.addEventListener('input', renderSongList);
  
  document.getElementById('toggle-theme').addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
  });
  
  renderSongList();
  renderPlaylists();
  