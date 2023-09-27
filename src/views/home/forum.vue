<template>
  <div style="display: flex;">
    <div v-if="windowWidth >= 1081" style="background-color:rgb(255, 255, 255);margin-left: 1%;border-radius: 8px;width: 50%;height: 800px;border: 1px solid rgb(233, 233, 233);">
        <div style="margin-top: 10px;" >
          <div style="margin-left: 3%;">
            <el-tabs v-model="activeName" @tab-click="handleClick" lazy="true">
              <el-tab-pane label="关注" name="first"></el-tab-pane>
              <el-tab-pane label="推荐" name="second">
                <el-divider></el-divider>
                <div class="container">
                  <el-card v-for="item in items" :key="item.id" class="item" shadow="never" >
                      <span style="display: block;font-weight: bold;font-size: 18px;margin-bottom: 10px;">{{item.title}}</span>
                    <div class="content" v-if="item.isExpanded || item.content.length <= maxContentLength" style="font-size: 15px;line-height: 3;">
                      <span style="margin-right: 2%;">{{item.user}}:</span>
                      <span style="display: block;" v-html="item.content"></span>
                    </div>
                    <div v-else style="font-size: 15px;">
                      <span style="margin-right: 2%;line-height: 2;">{{item.user}}: </span>
                      <span @click="expandItem(item)" v-html="item.content.substring(0, maxContentLength)"></span>
                      <span v-if="item.content.length > maxContentLength">...</span>
                      <span v-if="item.content.length > maxContentLength">
                        <el-button type="text" @click="expandItem(item)" style="font-size: 12px;margin-left: 2%;"> 阅读全文</el-button>
                      </span>
                    </div>
                    <div v-if="item.isExpanded">
                      <el-button type="text" @click="collapseItem(item)" style="font-size: 12px;">收起</el-button>
                    </div>
                    <div style="margin-top: 2%;">
                      <el-button class="el-icon-caret-top" type="primary" plain style=" font-size: 15px;"> 赞同 {{ item.likes }}</el-button>
                      <el-button class="el-icon-caret-bottom" type="primary" plain style=" font-size: 15px;"></el-button>
                      <el-button class="el-icon-s-comment" type="primary" plain style="background-color: rgba(1, 1, 1, 0);color: rgb(133, 144, 166); font-size: 15px;" @click="talk(item.tid)"> {{ item.cont }} 条评论</el-button>
                      <el-button class="el-icon-s-promotion" type="primary" plain style="background-color: rgba(1, 1, 1, 0);color: rgb(133, 144, 166); font-size: 15px;"> 分享</el-button>
                      <el-button class="el-icon-star-on" type="primary" plain style="background-color: rgba(1, 1, 1, 0);color: rgb(133, 144, 166); font-size: 15px;"> 收藏</el-button>
                      <el-button class="el-icon-more " type="primary" plain style="background-color: rgba(1, 1, 1, 0);color: rgb(133, 144, 166); font-size: 15px;"></el-button>
                    </div>
                  </el-card>
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
              </el-tab-pane>
              <el-tab-pane label="热榜" name="third"></el-tab-pane>
              <el-tab-pane label="视频" name="fourth"></el-tab-pane>
            </el-tabs>
          </div>
        </div>        
    </div>

    <!-- 论坛边栏 -->
    <div style="width: 30%;margin-left: 2%;" v-if="forumslook">

      <div style="background-color:rgb(255, 255, 255);border-radius: 8px;width: 100%;height: 300px;border: 1px solid rgb(233, 233, 233);">
        <div style="font-weight: bold;margin-top: 15px;margin-left: 20px;margin-bottom: 15px;">
            创作中心
        </div>
        <el-divider></el-divider>
          <div>
            <el-button type="primary" plain style=" font-size: 15px;width: 90%;margin-left: 5%;" @click="$router.push('write')">发帖子</el-button>
            <el-button type="success" plain style=" font-size: 15px;width: 90%;margin-left: 5%;margin-top: 15px;">发视频</el-button>
            <el-button type="warning" plain style=" font-size: 15px;width: 90%;margin-left: 5%;margin-top: 15px;">提问题</el-button>
            <el-button type="primary" plain style=" font-size: 15px;width: 90%;margin-left: 5%;margin-top: 15px;height: 60px;">进入创作中心 ></el-button>
          </div>
      </div>
      <div style="background-color:rgb(255, 255, 255);border-radius: 8px;width: 100%;height: 290px;border: 1px solid rgb(233, 233, 233);margin-top: 10px;">

        <div class="sc" style="width: 100%;height: 50px;display: flex; justify-content: center; align-items: center;">
            <div style=""><span style="color: rgb(133, 144, 166);"> 我的收藏</span></div>
        </div>
        <div class="sc" style="width: 100%;height: 50px;display: flex; justify-content: center; align-items: center;margin-top: 10px;">
            <div style=""><span style="color: rgb(133, 144, 166);"> 我的余额</span></div>
        </div>
        <div class="sc" style="width: 100%;height: 50px;display: flex; justify-content: center; align-items: center;margin-top: 10px;">
            <div style=""><span style="color: rgb(133, 144, 166);"> 我的订单</span></div>
        </div>
        <div class="sc" style="width: 100%;height: 50px;display: flex; justify-content: center; align-items: center;margin-top: 10px;">
            <div style=""><span style="color: rgb(133, 144, 166);"> 帮助中心</span></div>
        </div>
        <div class="sc" style="width: 100%;height: 50px;display: flex; justify-content: center; align-items: center;margin-top: 10px;">
            <div style=""><span style="color: rgb(133, 144, 166);"> 关于合作</span></div>
        </div>
      </div>
      <div style="background-color:rgb(255, 255, 255);border-radius: 8px;width: 100%;height: 300px;border: 1px solid rgb(233, 233, 233);margin-top: 10px;">
        <div>
            广告位招租
        </div>
      </div>
    </div>

    <!-- 评论区 -->
    <div style="width: 40%;margin-left: 2%;" v-if="!forumslook">
      <div style="background-color:rgb(255, 255, 255);border-radius: 8px;width: 100%;border: 1px solid rgb(233, 233, 233);">
        <div class="closetalk" style="font-size: 10px;margin:10px;cursor: pointer;" @click="forumslook = !forumslook"><span>关闭</span></div>
        <el-divider></el-divider>
        <div style="display: flex;">
          <el-input
            type="textarea"
            :rows="2"
            placeholder="请输入内容"
            v-model="textarea"
            style="width: 80%;margin-bottom: 25px;margin-left: 5%;">
          </el-input>
          <button class="talktext"><span style="white-space: nowrap" @click="submitTalk(textarea)">发表评论</span></button>
        </div>

        <el-divider></el-divider>
        <el-card v-for="talkes in talks" :key="talkes.id" class="talkes" shadow="never" >
              <span style="display: block;font-weight: bold;font-size: 18px;">{{talkes.username}}</span>
            <div class="content" style="font-size: 15px;"><br><span style="display: block;text-indent: 2em;">{{ talkes.comments }}</span></div>
            <div style="display: flex;">
              <div style="font-size: 14px;margin-top: 30px;color: rgb(133, 144, 166);white-space: nowrap;">{{ talkes.createTime }}</div>
              <div style="font-size: 16px;margin-top: 28px;color: rgb(133, 144, 166);margin-left: 65%;margin-right: 20px;cursor: pointer;white-space: nowrap" @click="deltalk(talkes.id)"> 删除</div>
              <div class="el-icon-chat-round" style="font-size: 16px;margin-top: 30px;color: rgb(133, 144, 166);margin-right: 20px;cursor: pointer;white-space: nowrap"> 回复</div>
              <div class="el-icon-caret-top" style="font-size: 16px;margin-top: 30px;color: rgb(133, 144, 166);margin-right: 10%;"></div>
            </div>

          </el-card>
      </div>
    </div>

    
    
<!-- windowWidth <= 1081 -->

    <div v-if="windowWidth < 1081" style="background-color:rgb(255, 255, 255);margin-left: 1%;border-radius: 8px;width: 100%;border: 1px solid rgb(233, 233, 233);">
        <div style="margin-top: 10px;" >
          <div style="margin-left: 3%;">
            <el-tabs v-model="activeName" @tab-click="handleClick" lazy="true">
              <el-tab-pane label="关注" name="first"></el-tab-pane>
              <el-tab-pane label="推荐" name="second">
                <el-divider></el-divider>
                <div class="container" style="font-size: 15px;">
                  <el-card v-for="item in items" :key="item.id" class="item" shadow="never">
                      <span style="display: block;font-size: 18px;font-weight: bold;margin-bottom: 20px;">{{item.title}}</span>
                    <div class="content" v-if="item.isExpanded || item.content.length <= maxContentLength">              
                      <span style="margin-right: 2%;">{{item.user}}: </span><br><span style="line-height: 3.5;display: block;text-indent: 2em;" v-html="item.content"></span>
                    </div>
                    <div v-else style="line-height: 1.5;">
                      <span style="margin-right: 2%;">{{item.user}}: </span>
                      <span @click="expandItem(item)">{{ item.content.substring(0, maxContentLength) }}</span>
                      <span v-if="item.content.length > maxContentLength">...</span>
                      <span v-if="item.content.length > maxContentLength">
                        <el-button type="text" @click="expandItem(item)" style="font-size: 15px;margin-left: 2%;"> 阅读全文</el-button>
                      </span>
                    </div>
                    <div v-if="item.isExpanded">
                      <el-button type="text" @click="collapseItem(item)" style="font-size: 15px;">收起</el-button>
                    </div>
                    <div style="margin-top: 2%;">
                      <el-button class="el-icon-caret-top" type="primary" plain style=" font-size: 15px"> 赞同 {{ item.like }}</el-button>
                      <el-button class="el-icon-caret-bottom" type="primary" plain style=" font-size: 15px;"></el-button>
                      <el-button class="el-icon-s-comment" type="primary" plain style="background-color: rgba(1, 1, 1, 0);color: rgb(133, 144, 166); font-size: 15px;" @click="forumslook = !forumslook"> {{ item.cont }} 条评论</el-button>
                      <el-button class="el-icon-s-promotion" type="primary" plain style="background-color: rgba(1, 1, 1, 0);color: rgb(133, 144, 166); font-size: 15px;"> 分享</el-button>
                      <el-button class="el-icon-star-on" type="primary" plain style="background-color: rgba(1, 1, 1, 0);color: rgb(133, 144, 166); font-size: 15px;"> 收藏</el-button>
                      <el-button class="el-icon-more " type="primary" plain style="background-color: rgba(1, 1, 1, 0);color: rgb(133, 144, 166); font-size: 15px;"></el-button>
                    </div>
                  </el-card>
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
              </el-tab-pane>
              <el-tab-pane label="热榜" name="third"></el-tab-pane>
              <el-tab-pane label="视频" name="fourth"></el-tab-pane>
            </el-tabs>
          </div>
        </div>        
    </div>

  </div>
</template>

<script>
  import talkRequest from "@/utils/TalkRequest";
  import forumRequest from "@/utils/forumRequest";
  import Cookies from 'js-cookie'

export default {
  data() {
    return {
      forumslook: true,
      items: [],
      talks: {},
      total:0,
        totals:0,
        params:{
          pageNum: 1,
          pageSize: 10,
          id: '',
          movName: ''
        },
      activeName: 'second',
      windowWidth: 0,
      maxContentLength: 80,
      textarea: '',
      userId: null,
      subtalk: '',
    };
  },
  created(){
    this.load()
  },
  methods: {

    getUserIdFromCookie() {
      var cookieValue = this.getCookieValue('user');
      if (cookieValue) {
        var user = JSON.parse(decodeURIComponent(cookieValue));
        this.userId = user.id;
      } else {
        this.userId = null;
      }
    },
    getCookieValue(cookieName) {
      var cookie = document.cookie.split(';')
        .map(cookie => cookie.trim())
        .find(cookie => cookie.startsWith(cookieName + '='));

      if (cookie) {
        return cookie.substring(cookieName.length + 1);
      } else {
        return null;
      }
    },

    deltalk(id){
        const postId = this.subtalk
        const userId = this.userId
        if(userId == this.userId){
            talkRequest.get().then(res => {

            })
        }
    },

    submitTalk(comments){
      const postId = this.subtalk
      const userId = this.userId;
      const payload = {
        postId: postId,
        userId: userId,
        comments: comments
      };
      talkRequest.post("/comments/save", payload).then(res => {
          if (res.code === "200"){
            talkRequest.get("/comments/page/" + postId).then(res =>{
                this.talks = res.data.list
                this.textarea=''
                this.load()
            })
          }else {
            this.$notify.error(res.msg)
          }
        })
    },

    talk(id){
      this.subtalk = id
      if(!this.forumslook == false){
        this.forumslook = !this.forumslook;
        talkRequest.get("/comments/page/" + id).then(res =>{
                this.talks = res.data.list
                
            })
      }else{
        talkRequest.get("/comments/page/" + id).then(res =>{
                this.talks = res.data.list 
      })
    }},

    load() {
        forumRequest.get('/forums/page', {
          params: this.params
        }).then(res => {
          if (res.code === '200') {
            this.items = res.data.list.map(item => {
              return { ...item, isExpanded: false };
            });
            this.total = res.data.total;
          } else {
            alert("传输失败");
          }
        });
      },

    expandItem(item) {
      item.isExpanded = true;
    },
    collapseItem(item) {
      item.isExpanded = false;
    },
    handleResize() {
      this.windowWidth = window.innerWidth;
    },
  },
  
    mounted() {
      this.getUserIdFromCookie();
    this.windowWidth = window.innerWidth;
    window.addEventListener('resize', this.handleResize);
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.handleResize);
  },
};
</script>

<style>
  .sc:hover{
    background-color: rgb(243, 241, 241);
    cursor:pointer;
  }

 .el-tabs__active-bar {
  background-color: transparent !important;
 }
 
 .el-tabs__nav-wrap::after {
  position: static !important;
 }
 .el-tabs__item.is-top{
  font-size: 16px !important;
 }
 .el-divider.el-divider--horizontal{
  background-color: rgb(241, 241, 241);
 }
 .container {
  display: flex;
  flex-direction: column;
  margin-top: -25px;
}

.item {
  margin-bottom: 5px;
}

.content {
  word-break: break-all;
}

.el-card {
  border: none;
  border-bottom: 1px solid rgb(233, 233, 233);
  border-radius: 0px;
}

.el-button {
  border: none;
}

.el-button.el-icon-caret-top.el-button--primary.el-button--small.is-plain:hover{
  background-color: rgb(170, 204, 240);
}

.el-button.el-icon-caret-bottom.el-button--primary.el-button--small.is-plain:hover{
  background-color: rgb(170, 204, 240);
}

.el-tabs__content{
  margin-left: -3%;
}
.el-divider.el-divider--horizontal{
  margin-top: 2px;
}
.closetalk{
  color: rgb(133, 144, 166);
}
.closetalk:hover{
  color: #000;
}
.talktext{
  margin-left: 10px;
  height: 30px;  
  border: none;
  border-radius: 4px;
}
.talktext:hover{
  background-color: rgb(207, 225, 241);
  
}
</style>