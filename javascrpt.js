const text = document.getElementById('text');
const search = document.getElementById('search');
const result = document.getElementById('result');
// api url
const api= 'https://api.lyrics.ovh';

// song lyrics

function getLyrics (artist, title) {
	let url = `${api}/v1/${artist}/${title}`
    fetch(url)
    .then(res => res.json())
    .then(singerLyrics => {
        const lyrics = singerLyrics.lyrics;
        const getLyric = document.getElementById('getLyric');
        getLyric.innerHTML = `<h2 class="text-success mb-4">${artist} - ${title}</h2>
        <pre class="lyric text-white">${lyrics}</pre>`;
    });
    result.innerHTML= '';
}

// search by song or artist

function searchSongs(term){
    fetch(`${api}/suggest/${term}`)
    .then(res => res.json())
    .then (showData);
};

// search result

function showData (data) {
    result.innerHTML = '';
    result.innerHTML = `<div class="single-result row align-items-center my-3 p-3">
    <div class="col-md-9"> ${data.data.map(song => `<h3 class="lyrics-name">${song.title}</h3>
        <p class="author lead">${song.type} by <span>${song.artist.name}</span></p>
    </div>
    <div class="col-md-3 text-md-right text-center">
        <button onclick="getLyrics('${song.artist.name}','${song.title}')" class="btn btn-success">Get Lyrics</button>
    </div>
</div>`)};
    `;
   
};

//event listeners

search.addEventListener('click', function searchResult (){
    const inputText =  text.value.trim();
    
    if (!inputText){
        alert('this is not a song or artist')
    }else {
        searchSongs(inputText);
    }
    
});
