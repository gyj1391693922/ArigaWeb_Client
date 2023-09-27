<template>
    <div>
      <div style="margin-right: 1.5%;background-color: rgb(255, 255, 255);width: 95%;height: 650px;border-radius: 8px;box-shadow: 0px 5px 13px rgb(218, 218, 218);display: flex;">
          <div style="width: 80%;height: 100%;">
              <!-- <iframe  style="background-color: black;width: 100%;height: 100%;border: none;" :src="require('@/../../../source/tutorial/video/' + vplayer.list[0].path)">
  
              </iframe > -->
              <video style="background-color: black;width: 100%;height: 100%;border: none;" controls>
                <source :src="require('@/../../../source/tutorial/video/' + vplayer.list[0].path)" type="video/mp4"/>
            </video>
          </div>
          <div style="width: 20%;height: 30%;background-color: rgb(237, 237, 240);">
              <div style="margin-top: 5%;border-left: 2px solid red;">
                  <h3 style="color: rgb(66, 66, 66);margin-left: 10%;" >{{ form.title }}</h3>
              </div>
              <div>
                  <!-- <div style="display: flex;margin-bottom: 10%;color: rgb(92, 92, 92);">
                      <div style="margin-left: 10%;border-radius: 10px;height: 30px;width: 80px;border: 1px solid rgb(233, 233, 233);text-align: center;display: flex; justify-content: center; align-items: center;font-size: 12px;background-color: white;">{{ form.stu }}</div>
                      <div style="margin-left: 3%;border-radius: 10px;height: 30px;width: 80px;border: 1px solid rgb(233, 233, 233);text-align: center; display: flex;justify-content: center; align-items: center;font-size: 12px;background-color: white;">{{ form.region }}</div>
                      <div style="margin-left: 3%;border-radius: 10px;height: 30px;width: 80px;border: 1px solid rgb(233, 233, 233);text-align: center; display: flex;justify-content: center; align-items: center;font-size: 12px;background-color: white;">{{ form.types }}</div>
                  </div> -->
              </div>
              <div style="background-color: rgb(255, 255, 255);width: 100%;height: 220%;">
                  <div style="margin-top:10%;width: 70%;margin-left: 15%;height: 35px;">
                      <div style="margin-top: 25%;">
                          <button style="margin-top: 5%;border: 1px solid rgb(236, 236, 236);width: 100%;height: 35px;color: black;border-radius: 8px;margin-left: 1%;background-color: white;"   v-for="(video, index) in forms" :key="index" @click="pageclick(video.id,video.titles)">{{ video.titles }}</button>
                      </div>
                  </div>
              </div>
          </div>
      </div>
  
    </div>
  </template>
  
  <script>
    import request from "@/utils/tutorialRequest";
    
      export default {
      name: 'PlayVideo',
      data() {
        return {
          form: {},
          vplayer:{},
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
              const pId = this.$route.query.pId
              request.get("/tutorial/tutoriallistId/" + id).then(res =>{
                  this.form = res.data
              })
              request.get("/tutorialTimes/portfolioV/" + pId + "/" + id).then(res =>{
                  this.vplayer = res.data
              })
              request.get("/tutorialTimes/portfoliolistId/" + id).then(res =>{
                this.forms = res.data.list
                this.total = res.data.total
              })
      },
      methods:{
  
          }
      }
  </script>
  
  <style>
  </style>