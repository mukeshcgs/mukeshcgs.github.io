import axios from "axios"

// export function getEvents(searchQuery, callback) {
//     const request = `http://localhost:8080/GetEvents`;
//     fetch(request, callback);
// }

function fetch(request, callback) {
    // axios.get(request).then(
    //     response => {
    //         callback(response.data);
    //     });
    
    axios.get(request).then(function (response) {
        //console.log(response.data.response.docs);
        callback(response.data.response.docs);
    })
    .catch(function (error) {
         //console.log(error);
    });
    
    //console.log(response.data.response.docs.length);
}

export function getAlbums(searchQuery, callback) {
    //const request = `https://api.spotify.com/v1/search?q=${artist}&type=album`;
    //https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=5964d3f0d29c4469a8fac5cf9767b2b4&&q=john&&fq=label&&begin_date=20160101&&end_date=20161231&&sort=newest
    //https://api.nytimes.com/svc/archive/v1/2016/1.json
    //https://api.nytimes.com/svc/archive/v1/2016/1.json?api-key=5964d3f0d29c4469a8fac5cf9767b2b4&&q=


    const request = `https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=5964d3f0d29c4469a8fac5cf9767b2b4&&q=${searchQuery}&&fq=label&&begin_date=20160101&&end_date=20161231&&sort=newest`;
    fetch(request, callback);

}

export function getTracks(albumId, callback) {
    //const request = `https://api.spotify.com/v1/albums/${albumId}`;
    const request = `https://api.spotify.com/v1/albums/${albumId}`;
    fetch(request, callback);
}