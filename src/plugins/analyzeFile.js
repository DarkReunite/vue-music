import jsmediatags from 'jsmediatags';
/* eslint-disable*/ 
export default (mp3file) => {
  let promiseArr = [];
  for (let i = 0; i < mp3file.length; i++) {
    promiseArr[promiseArr.length] = new Promise((resolve) => {
      new jsmediatags.Reader(mp3file[i]).read({
        onSuccess: (mp3) => {
          let title = mp3.tags.title;
          let artist = mp3.tags.artist;
          let ablum = mp3.tags.album;
          let progress = 0; //初始化进度条
          let blob = null;
          let blobURL = null;

          if (mp3.tags.picture) {
            let data = mp3.tags.picture.data;
            let type = mp3.tags.picture.format;
            let u8arr = new Uint8Array(data);
            blob = new Blob([u8arr], {type});
            blobURL = URL.createObjectURL(blob);
          }

          resolve({
            title,
            artist,
            ablum,
            progress,
            blob,
            blobURL
          })
        }//end onSuccess
      })//end jsmediatags
    })//end Promise
  }// end for

  return promiseArr;
}