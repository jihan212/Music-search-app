const searchSong = () => {
  const searchText = document.getElementById("search-field").value;
  const url = `https://api.lyrics.ovh/suggest/${searchText}`;
  toggleSpinner(true);
  fetch(url)
    .then((res) => res.json())
    .then((data) => displaySongs(data.data));
};

const displaySongs = (songs) => {
  const songContainer = document.getElementById("song-container");
  songContainer.innerHTML = '';
  songs.forEach((song) => {
    const songDiv = document.createElement("div");
    songDiv.className = "single-result row align-items-center my-3 p-3";
    songDiv.innerHTML = `
    <div class="col-md-9">
        <h3 class="lyrics-name">${song.title}</h3>
        <p class="author lead">Album by <span>${song.artist.name}</span></p>
        <audio controls>
            <source src="${song.preview}" type="audio/mpeg">
      </audio>
    </div>
    <div class="col-md-3 text-md-right text-center">
        <button class="btn btn-primary">Get Lyrics</button>
    </div>
    `;
    songContainer.appendChild(songDiv);
    toggleSpinner(false);
  });
};

// Enter click on search button
document.getElementById("search-field").addEventListener("keypress", function(event) {
    if (event.key === 'Enter') {
      document.getElementById("search-btn").click();
    }
  });

// Spinner
const toggleSpinner = (show) => {
    const spinner = document.getElementById("loading-spinner");
    if ( show ){
      spinner.classList.remove('d-none');
    } else {
      spinner.classList.add('d-none');
    }
  }