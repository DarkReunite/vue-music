<template lang="pug">
  div#playbar
    div.player-body
      div.player-pic(:style="{backgroundImage: `url(${img})`}")
      v-card.player-info
        div.player-bar(
          ref="bar"
          @mousedown="handleMouseDown"
        )
          div.player-progress
            div.player-loaded(:style="{width: loadedWidth}")
            div.player-played(:style="{width: sliderWidth}")
              div.player-slider
                div.player-point
        v-layout(align-space-around justify-space-around row fill-height text-xs-center)
          v-flex(xs4)
            audio(:src="currentSong.saveAt | formatSong" autoplay preload="auto"
              v-if="currentSong"
              ref="audio" 
              @play="onPlay"
              @pause="onPause" 
              @loadedmetadata="onLoadedmetadata"
              @timeupdate="onTimeupdate"
              @progress="onProgress"
            )
          v-flex(xs4)
            div.play-icon
              v-icon.icon(size="3em" color="red darken-2" @click="playPreSong") skip_previous
              v-icon.icon(size="4em" color="red darken-2" @click="startPlayOrPause") {{audio.playing | transPlayPause}}
              v-icon.icon(size="3em" color="red darken-2" @click="playNextSong") skip_next
          v-flex(xs4)
            div.control-icon
              v-icon(size="2em" color="red darken-2") volume_down


</template>

<script>

import { mapState, mapActions, mapMutations } from "vuex";

export default {


  data(){
    return {
      img: '/logo.png',
      song: '/1.mp3',
      audio: {
        // 该字段是音频是否处于播放状态的属性
        playing: false,
        // 音频当前播放时长
        currentTime: 0,
        // 音频最大播放时长
        maxTime: 0,
        // 音频的加载时长
        loadedTime: 0,
        // 进度条是否被抓取
        dragging: false,
        


      }
    }
  },

  created() {
    window.addEventListener('mousemove',this.handleMouseMove);
    window.addEventListener('mouseup', this.handleMouseUp);
    this.commitMp3List();
  },

  destroyed() {
    window.removeEventListener('mousemove', this.handleMouseMove);
    window.removeEventListener('mouseup', this.handleMouseUp);

  },

  methods: {
    ...mapActions(['commitMp3List']),
    ...mapMutations(['record_nextSong']),

    // 控制音频的播放与暂停
    startPlayOrPause () {
      return this.audio.playing ? this.pause() : this.play()
    },
    //播放下一首
    playNextSong() {
      this.song = '/2.mp3';
    },
    //播放上一首歌
    playPreSong() {
      this.song = '/1.mp3';
    },
    // 播放音频
    play () {
      if (this.$refs.audio) {
        this.$refs.audio.play()
      }
    },
    // 暂停音频
    pause () {
      this.$refs.audio.pause()
    },
    // 当音频播放
    onPlay () {
      this.audio.playing = true
    },
    // 当音频暂停
    onPause () {
      this.audio.playing = false
    },

    // 当加载语音流元数据完成后，会触发该事件的回调函数
    // 语音元数据主要是语音的长度之类的数据
    onLoadedmetadata(res) {
      this.audio.maxTime = parseInt(res.target.duration)
    },

    // 当timeupdate事件大概每秒一次，用来更新音频流的当前播放时间
    onTimeupdate(res) {
      this.audio.currentTime = res.target.currentTime
    },

    onProgress(res) {
      //延迟获取加载时长
      setTimeout(() => {
        if (res.target.buffered.length != 0) {
          this.audio.loadedTime = res.target.buffered.end(0);
        }
      }, 500);
      
    },


    handleMouseDown(mouseEvent) {
      this.dragging = true;
      
      this.changeProgress(mouseEvent);
    },

    handleMouseMove(Event){
      if (this.dragging) {
        this.changeProgress(Event);
      }
    },

    handleMouseUp(){
      this.dragging = false;
      this.play();
    },

    changeProgress(mouseEvent) {
      this.pause();
      let barWidth = this.$refs.bar.clientWidth;
      let mouseX = mouseEvent.pageX;
      let boxX = this.$refs.bar.getBoundingClientRect().left;
      let offsetX = mouseX - boxX;
      let x = Math.min(Math.max(0, offsetX), barWidth);
      
      let sliderTime = Math.floor((x / barWidth) * 1000) / 1000;
      
      this.audio.currentTime = this.$refs.audio.currentTime = sliderTime * this.audio.maxTime;
    },

    changeSong(song) {
      this.song = song;
    }


  },

  computed: {
    ...mapState(['currentSong']),
    sliderWidth() {
      return (this.audio.currentTime / this.audio.maxTime * 100) + '%';
    },

    loadedWidth() {
      return (this.audio.loadedTime / this.audio.maxTime * 100) + '%';
    },

  },


  filters: {
    // 使用组件过滤器来动态改变按钮的显示
    transPlayPause(value) {
      return value ? 'pause' : 'play_arrow';
    },

    //修改currentSong里的saveAt的url
    formatSong(saveAt) {
      return 'http://192.168.31.64:4000' + saveAt;
    }
  }

}
</script>

<style lang="scss" scoped>



#playbar{
  position: relative;
  width: 100%;
  position: fixed;
  bottom: 0px;
  z-index: 99;
  user-select: none;

  div.player-pic {
    position: relative;
    float: left;
    height: 100px;
    width: 100px;
    background-size: cover;
    background-repeat: no-repeat;
    z-index: 1;
  }

  div.player-info {
    width: 100%;
    height: 100px;
    padding-left: 100px;
    background-color: #fff;

    .player-bar {
      cursor: pointer;
      position: relative;
      width: 100%;
      height: 10px;

      &:hover .player-point{
        transform: scale(1) !important;
      }

      .player-progress{
        position: absolute;
        top: 0;
        left: 0;
        height: 3px;
        width: 100%;
        background-color: #cdcdcd;

        .player-loaded {
          position: absolute;
          left: 0;
          top: 0;
          height: 3px;
          background-color: #aaa;

        }

        .player-played {
          position: absolute;
          left: 0;
          top: 0;
          height: 3px;
          background-color: #ffca75;

          .player-slider {
            position: absolute;
            top: 50%;
            left: 100%;

            &::before {
              content: '';
              position: absolute;
              border-radius: 50%;
              height: 32px;
              width: 32px;
              left: -16px;
              top: -16px;
              transform: scale(0.2);
            }

            .player-point {
              position: absolute;
              top: -8px;
              left: -8px;
              height: 16px;
              width: 16px;
              border-radius: 50%;
              background-color: #ffca75;
              transform: scale(0);
              transition-duration: 300ms;
            }
          }
        }
      }
    }
  }
}

.play-icon {
  height: 100%;
  display: flex;
  justify-content:center;
  align-items:center;

  .icon {
    margin: 0 0.5em 0;
  }
}

.control-icon {
  height: 100%;
  display: flex;
  padding: 0 2em 0;
  justify-content:flex-end;
  align-items:center;
}

</style>
