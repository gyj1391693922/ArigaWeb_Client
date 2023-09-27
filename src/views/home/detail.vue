<template>
  <div>
    <div v-if="form.movName">
        <div style="margin-left: 2%;margin-bottom: -20px;margin-top:-30px;">
            <h3 style="font-size: 30px;">{{ form.movName }}</h3>
        </div>
        <div style="margin-left: 2%;display: flex;margin-bottom: 30px;">
            <div style="border-radius: 8px;height: 30px;width: 70px;border: 1px solid rgb(233, 233, 233);text-align: center;display: flex; justify-content: center; align-items: center;font-size: 12px;background-color: white;">{{ form.stu }}</div>
            <div style="margin-left: 0.5%;border-radius: 8px;height: 30px;width: 70px;border: 1px solid rgb(233, 233, 233);text-align: center; display: flex;justify-content: center; align-items: center;font-size: 12px;background-color: white;">{{ form.region }}</div>
            <div style="margin-left: 0.5%;border-radius: 8px;height: 30px;width: 70px;border: 1px solid rgb(233, 233, 233);text-align: center; display: flex;justify-content: center; align-items: center;font-size: 12px;background-color: white;">{{ form.types }}</div>
        </div>
        <img style="float:right;width: 200px;height: 280px;border-radius: 8px;margin-right: 100px;margin-top: -80px;" :src="require('@/../../../source/images/' + form.img)" :preview-src-list="[require('@/../../../source/images/' + form.img)]" >
        <div style="border: 1px solid rgb(233, 233, 233);box-shadow: 0px 6px 12px -6px rgb(184, 184, 184);border-radius: 8px;width: 95%;margin-left: 2%;height: 250px;background-color: white;">
            <div style="margin-left:2%;width: 80%;height: 40px;border-bottom: 1px solid rgb(233, 233, 233); align-items: center;font-size: 14px;margin-top: 1%;">
                <span sty>改变子</span>
            </div>
                <div style="margin-top: 30px;font-size: 14px;"><a style="font-weight: bold;margin-left:2%;">番剧上架时间:</a><a style="margin-left: 1%;">{{ form.createTime }}</a></div>
                <div style="margin-top: 15px;font-size: 14px;"><a style="font-weight: bold;margin-left:2%;">更新时间:</a><a style="margin-left: 1%;">{{ form.upTime }}</a></div>
                <div style="margin-top: 15px;font-size: 14px;"><a style="font-weight: bold;margin-left:2%;">集数:</a><a style="margin-left: 1%;">共 {{ form.times }} 集</a></div>
                <button style="margin-top: 20px;border: none;  background: linear-gradient(to right, #ffaa48, #ff5100);width: 100px;height: 35px;color: white;border-radius: 20px;margin-left: 20px;box-shadow: 2px 2px 5px #ffaa48;" @click="pageclick(form.id,1)"> 立即播放</button>
        </div>
        <div style="margin-left: 2%;margin-bottom: -20px;margin-top:30px;">
            <h3>选集播放</h3>
        </div>
        <div style="margin-top:40px;border: 1px solid rgb(233, 233, 233);box-shadow: 0px 6px 12px -6px rgb(184, 184, 184);border-radius: 8px;width: 95%;margin-left: 2%;height: 250px;background-color: white;">
          <div>
            <button style="margin-top: 20px;border: 1px solid rgb(236, 236, 236); width: 18.8%;height: 35px;color: black;border-radius: 4px;margin-left: 1%;background-color: white;"   v-for="(video, index) in forms" :key="index" @click="pageclick(video.id,video.pnum)">第 {{ video.pnum }} 集</button>
          </div>
        </div>
        <div style="margin-left: 2%;margin-bottom: -20px;margin-top:30px;">
            <h3>相关推荐</h3>
        </div>
    </div>
    <div v-else>
        <!-- 动画 -->
        <div class="video-list">
            <div v-for="(video, index) in videos" :key="index" @click="page(video.id)">
                <div class="text-item">
                    <div class="thumbnail" >
                        <img :src="require('@/../../../source/images/' + video.img)" :preview-src-list="[require('@/../../../source/images/' + video.img)]" alt="Video Thumbnail" class="video-item">
                        <div class="overlay">
                        <i class="play-icon"></i>
                        </div>
                    </div>   
                    <div class="video-info" style="text-align: center;">
                        <span class="title">{{ video.movName }}</span>
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
</div>
  
</template>
<script>
  import request from "@/utils/movRequest";
  import porRequest from "@/utils/porRequest";
  
  export default {
    name: 'BasicsEdit',
    data() {
      return {
        form: {},
        videos: [],
        forms:[],
        total:0,
        totals:0,
        params:{
          pageNum: 1,
          pageSize: 10,
          id: '',
          movName: ''
        }
      }
    },
    created(){

        const id = this.$route.query.id
        if(id){
            request.get("/mov/movlistId/" + id).then(res =>{
                this.form = res.data
            })
            porRequest.get("/por/portfoliolistId/" + id).then(res =>{
              this.forms = res.data.list
              this.total = res.data.total
              console.log(JSON.stringify(this.forms));
            })
        }else{
            this.load()
        }
    },
    methods:{
        pageclick(id,pnum){
          this.$router.push('/playVideo?id=' + id + '&pnum=' + pnum);
        },
        page(id){
          this.$router.push('/detail?id=' + id);
          location.reload();
        },

        load(){
            request.get('/mov/page',{
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
  }
</script>
<style>
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