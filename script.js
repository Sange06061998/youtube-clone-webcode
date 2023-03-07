let api_key ="AIzaSyAR1FvpyY_R5OP_UzFSWjlM-vDrXEFAO34";
let video_http="https://www.googleapis.com/youtube/v3/videos?";
let channel_http="https://www.googleapis.com/youtube/v3/channels?";

const videoCardContainer=document.querySelector('.video-container')

    fetch (video_http + new URLSearchParams  ({
    key: api_key,
    part:'snippet',
    chart:'mostpopular',
    maxResult: 100,
    regionCode:'IN'
}))
    .then(res => res.json())
    .then(data =>{
    data.items.forEach(item=> {
        getChannelIcon(item)
    })
        
})
    .catch(err => console.log(err));

 const getChannelIcon =(video_data) =>{
        
     fetch (channel_http + new URLSearchParams  ({
        key: api_key,
         part:'snippet',
         id:video_data.snippet.channelId
     }))
     .then(res => res.json())
     .then(data =>{
    video_data.channelThumbnail =data.items[0].snippet.thumbnails.default.url;
    makeVideoCard(video_data);

    
 })

}

 const makeVideoCard =(data)=>{
     videoCardContainer.innerHTML += `
     <div class="video" onclick="location.href='https://youtube.com/watch?v=${data.id}'">
     <img src="${data.snippet.thumbnails.high.url}" class="thumbnailicon">
     <div class="content">
       <img src="${data.channelThumbnail}" class="channel-icon">
       <div class="info">
           <h4 class="tittle">${data.snippet.title}</h4>
           <p class="channel-name">${data.snippet.channelTitle}</p>
     </div>
   </div>

     ` ;
 }

 const searchInput=document.querySelector('.search-bar');
 const searchBtn=document.querySelector('.search-btn');
 let searchLink ="https://www.youtube.com/results?search_query=";

 searchBtn.addEventListener('click',() => {
    if(searchInput.value.length){
         location.href=searchLink +searchInput.value;
    }

})
