/* eslint-disable */
import axios from 'axios';
import { resolve } from 'path';

//发送歌曲文件和歌曲图片
export const sendMp3FileAndPic  = (mp3file, mp3info) => {
  let promiseArr = [];
  mp3file.forEach((value, index) => {
    promiseArr[promiseArr.length] = new Promise((resolve) => {
      let config = {
        onUploadProgress: (progressEvent) => {
          mp3info[index].progress = Math.ceil((progressEvent.loaded / progressEvent.total) * 100)
        }
      }
  
      let form = new FormData();
      form.append('id', mp3info[index].id);
      form.append('mp3file', value);
      //如果图片不为空
      if (mp3info[index].blob) {
        form.append('mp3pic', mp3info[index].blob);
      }
      
      resolve(axios.post('/admin/uploadFile', form, config));
    }) 
  });

  return promiseArr;
}

export const sendMp3Info = (mp3info) => {
  let promiseArr = [];
  mp3info.forEach((value) => {
    promiseArr[promiseArr.length] = new Promise((resolve) => {
      resolve(axios.post('/admin/uploadInfo', {
        name: value.name,
        title: value.title,
        artist: value.artist,
        album: value.ablum
      }))
    })
  })

  return promiseArr;
}