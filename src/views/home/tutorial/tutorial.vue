<template>
    <div class="home">
            <h3>精选教程</h3>
      <div class="video-list">
        <div v-for="(video, index) in videos" :key="index" @click="page(video.id,1)">
            <div class="text-item">
                <div class="thumbnail" >
                    <img :src="require('@/../../../source/tutorial/' + video.img)" :preview-src-list="[require('@/../../../source/tutorial/' + video.img)]" alt="Video Thumbnail" class="video-item">
                    <div class="overlay">
                    <i class="play-icon"></i>
                    </div>
                </div>   
                <div class="video-info" style="text-align: center;">
                    <span class="title">{{ video.title }}</span>
                </div>  
            </div>  
        </div>        
      </div>
      <!-- 分页 -->
      <div style="margin-top:20px;display: flex;align-items: center;justify-content: center;">
        <el-pagination
            :current-page="params.pageNum"
            :page-size="params.pageSize"
            small
            layout="prev, pager, next"
            :total="total">
        </el-pagination>
      </div>
    </div>
  </template>
  
  <script>
  import request from "@/utils/tutorialRequest";
  
  export default {
    data() {
      return {
        items: [
          require('@/assets/h-1.png'),
          require('@/assets/h-2.png'),
        ],
        videos: [],
        total:0,
        params:{
          pageNum: 1,
          pageSize: 10,
          id: '',
          movName: ''
        }
      };
    },
    created() {
      this.load()
    },
    methods:{
      page(pId,id){
        this.$router.push('/tutorialDetail?pId=' + pId + '&id=' + id);
      },
      load(){
        request.get('/tutorial/page',{
          params: this.params
        }).then(res => {
          if (res.code === '200'){
            this.videos = res.data.list
            this.total = res.data.total
          }else {
            alert("传输失败")
          }
        })
      },
    }
  };
  </script>
  
  <style>
  .home {
    margin: 20px;
  }
  
  .video-list {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 20px));
    grid-gap: 20px;
  }
  
  .video-item {
    background-color: #fff;
    border-radius: 8px;
    overflow: hidden;
    transition: background-color 0.3s ease;
    width: 200px;
    height: 280px;
  }

  .overlay:hover::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.6);
    opacity: 0;
    transition: opacity 0.3s ease;
    pointer-events: none;
}

.overlay:hover .play-icon {
    opacity: 1;
}

  .text-item {
    border-radius: 8px;
    overflow: hidden;
    width: 200px;
    height: 350px;
    margin-bottom: -40px;
  }
  
  .thumbnail {
    position: relative;
    margin-bottom: -5px;
  }
  
  .thumbnail-image {
    width: 100%;
    height: auto;
  }
  
  .overlay {
    position: absolute;
    border-radius: 8px;
    top: 49%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: rgba(0, 0, 0, 0.6);
    width: 200px;
    height: 280px;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transition: opacity 0.3s ease;
    cursor: pointer;
  }

  .thumbnail:hover .overlay {
    opacity: 1;
    }

  
  .play-icon {
    color: #fff;
    font-size: 40px;
  }
  
  .video-info {
    padding: 10px;
  }
  
  .title {
    font-size: 14px;
  }
  
  .description {
    font-size: 14px;
    color: #666;
  }
  
  .stats {
    display: flex;
    justify-content: space-between;
    font-size: 12px;
    color: #999;
    margin-top: -35px;
  }
  
  .stats span {
    margin-right: 10px;
  }
  
  .views, .likes, .comments {
    display: flex;
    align-items: center;
  }
  
  .views i, .likes i, .comments i {
    margin-right: 5px;
  }

  
  </style>