<template>
  <div>
    <!-- 侧边栏 -->
    <el-container>
      <el-aside width="200px" v-if="windowWidth >= 1081" style="width: 200px; position: fixed; left: 0; top: 0;">
        <div style="width: 200px;min-height: calc(100vh - 63px);height: 100vh; overflow: hidden; margin-right: 2px; background-color: rgb(255, 255, 255);border-right: 2px solid rgb(241, 243, 244);">
          <div >
            <div class="logo">
              <div class="logo-img"></div>
            </div>
            <el-menu
              :default-active="$route.path"
              router
              class="el-menu-vertical-demo"
              active-text-color="#e60914">
                <el-menu-item class="left-text" index="/forum"><span class="text-01">首页</span></el-menu-item>
                <el-menu-item class="left-text" index="/detail"><span class="text-01">动漫</span></el-menu-item>
                <el-menu-item class="left-text" index="电影"><span class="text-01">电影</span></el-menu-item>
                <el-menu-item class="left-text" index="/tutorial"><span class="text-01">教程视频</span></el-menu-item>
                <el-menu-item class="left-text" index="今日更新"><span class="text-01">游戏中心</span></el-menu-item>
                <el-menu-item class="left-text" index="留言"><span class="text-01">留言</span></el-menu-item>
                <el-menu-item class="left-text" index="/home"><span class="text-01">备用页</span></el-menu-item>
            </el-menu>
          </div>
        </div>
      </el-aside>
      <el-container :style="{ marginLeft: windowWidth >= 1081 ? '200px' : '0' }">
        <el-header style="border-bottom: 2px solid rgb(235, 236, 236);background-color: white;">

          

          <div style="height: 75%;margin-left: 1%;">
            <div style="border: none;height: 32px;width: 25%;margin-top: 15px;background-color: #e3e6ea;border-radius: 6px;">
              <el-input style="" suffix-icon="el-icon-search" background-color="#e3e6ea" placeholder="搜索电影、电视剧、动漫"></el-input>
            </div>
            
            <div style="float: right; margin-top: -30px; margin-right: 1.5%; display: flex; align-items: center;">
              <span v-if="admin.username" class="el-icon-time" style="width: 120px;margin-bottom: 5%;">观看历史</span>
              <button v-if="!admin.username" class="el-icon-user" style="border: none; background: linear-gradient(to right, #ffaa48, #ff5100); width: 80px; height: 30px; color: white; border-radius: 20px; margin-left: 20px; box-shadow: 2px 2px 5px #ffaa48;" @click="drawer = true"> 登 录</button>
              <div v-if="admin.username" style="margin-top: -10px;margin-left: 10%;  cursor:pointer;" @click="mys = true">
                <el-avatar src="" >{{ admin.name }}</el-avatar>
              </div>
            </div>
          </div>                             
        </el-header>
        <el-main>
          <!-- 主体视图 -->
          <div>
              <router-view v-if="!$route.meta.keepAlive" />
          </div>
        </el-main>
          <div style="bottom: 0;position: fixed; background-color: white;width: 100%;display: flex; justify-content: center; align-items: center;" v-if="windowWidth < 1081">
            <div v-if="windowWidth < 1081">
            <el-menu
              :default-active="$route.path"
              router
              class="el-menu-vertical-demo"
              active-text-color="#e60914"
              mode="horizontal">
                <el-menu-item class="left-text" index="/home"><span class="text-01">首页</span></el-menu-item>
                <el-menu-item class="left-text" index="/detail"><span class="text-01">动漫</span></el-menu-item>
                <el-menu-item class="left-text" index="电影"><span class="text-01">电影</span></el-menu-item>
                <el-menu-item class="left-text" index="电视剧"><span class="text-01">教程视频</span></el-menu-item>
                <el-menu-item class="left-text" index="今日更新"><span class="text-01">游戏中心</span></el-menu-item>
                <el-menu-item class="left-text" index="/forum"><span class="text-01">论坛</span></el-menu-item>
                <el-menu-item class="left-text" index="留言"><span class="text-01">我的</span></el-menu-item>
            </el-menu>
          </div>
          </div>
      </el-container>
    </el-container>


    
        <!-- 登录窗口 -->
    <el-drawer
      :visible.sync="drawer"
      :with-header="false">
        <div style="width: 500px;height: 400px;background-color: rgb(255, 255, 255);border-radius: 10px;margin: 150px auto;padding:50px 60px;">
        <div style="margin-bottom:30px;text-align: center;font-size: 30px;font-weight: bold;color: cornflowerblue">Ariga账号登录</div>
        <el-form :model="admin" ref="ruleForm" :rules="rules">
          <el-form-item prop="username">
            <el-input style="width: 100%"  placeholder="请输入账号" prefix-icon="el-icon-user" size="medium" v-model="admin.username"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input style="width: 100%;margin-top: 20px" show-password placeholder="请输入密码" prefix-icon="el-icon-lock" size="medium" v-model="admin.password"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button style="width: 100%;margin-top:10px" size="medium" type="primary" @click="login">登录</el-button>
          </el-form-item>
          <el-form-item>
            <el-button style="width: 100%" size="medium" type="text"><div @click="registerss">注册</div></el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-drawer>

    <!-- 注册窗口 -->
    <el-drawer
      :visible.sync="registers"
      :with-header="false">
      <div style="width: 500px;height: 700px;background-color: white;border-radius: 10px;margin: 100px auto;padding:50px 60px">
        <div style="margin-bottom:30px;text-align: center;font-size: 30px;font-weight: bold;color: cornflowerblue">注册Ariga账号</div>
        <el-form :model="admin" ref="ruleForm" :rules="ruless">
          <el-form-item prop="username">
            <el-input style="width: 380px" placeholder="请输入账号" prefix-icon="el-icon-user" size="medium"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input style="width: 380px;margin-top: 20px" show-password placeholder="请输入密码" prefix-icon="el-icon-lock" size="medium"></el-input>
          </el-form-item>
          <el-form-item prop="name">
            <el-input style="width: 380px;margin-top: 20px" placeholder="用户昵称" size="medium" ></el-input>
          </el-form-item>
          <el-form-item prop="email">
            <el-input style="width: 380px;margin-top: 20px" placeholder="邮箱" size="medium"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button style="width: 100%;margin-top:10px" size="medium" type="primary" @click="register">注册</el-button>
          </el-form-item>
          <el-form-item>
            <el-button style="width: 100%" size="medium" type="text"> <div @click="logins">返回登陆</div></el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-drawer>

    <!-- 个人信息 -->
    <el-drawer
      :visible.sync="mys"
      :with-header="false"
      :size="size">
          <div class="mystext" index="个人中心"><span class="text-01">个人中心</span></div>
          <div class="mystext" index="创作中心"><span class="text-01">创作中心</span></div>
          <div class="mystext" index="收藏"><span class="text-01">收藏</span></div>
          <div class="mystext" index="钱包"><span class="text-01">钱包</span></div>
          <div class="mystext" index="我的游戏"><span class="text-01">我的游戏</span></div>
          <div class="mystext" index="我的评论"><span class="text-01">我的评论</span></div>
          <div class="mystext" @click="loginout"><span class="text-01">退出登录</span></div>
    </el-drawer>


  </div>
</template>

<script>
import LoginRequest from "@/utils/LoginRequest";
import Cookies from 'js-cookie'

 export default {

  created(){
      
  },

  name: "Layout",
    data() {
      return {
        admin: Cookies.get('user') ? JSON.parse(Cookies.get('user')) : {},
        // 登录规则
        rules: {
          username: [
            {required: true, message: '请输入账号', trigger: 'blur'}
          ],
          password: [
            {required: true, message: '请输入密码', trigger: 'blur'},
            {min: 6,max: 18, message: '请输入至少6位，至多18位密码', trigger: 'blur'}
          ]
        },

        // 注册规则
        ruless: {
        username: [
          {required: true, message: '请输入账号', trigger: 'blur'}
        ],
        password: [
          {required: true, message: '请输入密码', trigger: 'blur'},
          {min: 6,max: 18, message: '请输入至少6位，至多18位密码', trigger: 'blur'}
        ],
        name: [
          {required: true, message: '请输入昵称', trigger: 'blur'}
        ],
        email: [
          {required: true, message: '请输入邮箱', trigger: 'blur'}
        ],
      },

        registers: false,
        drawer: false,
        activeName: 'first',
        isCollapse: true,
        windowWidth: 0,
        mys: false,
        size: '10%',

      }
    },
    methods: {
      loginout(){
        Cookies.remove('user');
        location.replace(location.href);
      },

      register(){
      this.$refs['ruleForm'].validate((valid) => {
        if (valid){
      request.post('/admin/save',this.admin).then(res => {
        if (res.code === '200'){
          this.drregistersawer = false;
          this.$notify.success("注册成功")
        }else {
          this.$notify.error(res.msg)
        }
      })
        }else{
          this.$notify.error("数据不合法")
        }

      })
    },
      registerss(){
      this.registers = true;
      this.drawer = false;
    },
    logins(){
      this.drawer = true
      this.registers = false;
    },
      login(){
      this.$refs['ruleForm'].validate((valid) => {
        if (valid){
          LoginRequest.post('/user/login',this.admin).then(res => {
        if (res.code === '200'){
          this.drawer = false;
          this.$notify.success("登陆成功");
          if(res.data){
            Cookies.set('user',JSON.stringify(res.data),{expires:1})
          }
        }else {
          this.$notify.error(res.msg)
        }
      })
        }

      })
    },

      handleClick(tab) {
        if (tab.name === 'first' && this.$route.path !== '/home') {
        this.$router.push('/home');
      } else if (tab.name === 'second' && this.$route.path !== '/list') {
        this.$router.push('/list');
      }
    },
    
    handleResize() {
      this.windowWidth = window.innerWidth;
    }
  },
  mounted() {
    this.windowWidth = window.innerWidth;
    window.addEventListener('resize', this.handleResize);
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.handleResize);
  },
  }
</script>

<style>
  body{
    margin:0;
    background-color: #f7f8f9;
  }
  .left-text{
    text-align: center;
    font-weight: bold;
  }

  .text-01{
    font-size: 16px;
    transition: color 0.3s ease;
  }

  .logo{
    height: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .left-text:hover .text-01{
    color: #e60914;
    transition: color 0.3s ease;
  }
  .el-menu-item.is-active {
    background-color: rgb(247, 247, 247) !important;
  }

  .el-menu-item:hover {
    background-color: rgba(255, 255, 255,0) !important;
  }
  .logo-img{
    width: 60%;
    height: 60%;
    background-image: url("@/assets/ariga.png");
    background-size: cover;
    background-position: center;
  }
  .el-carousel__item h3 {
    color: #475669;
    font-size: 18px;
    opacity: 0.75;
    line-height: 300px;
    margin: 0;
  }
  
  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }
  
  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
  .el-input__inner{
    border: none !important;
    background-color: #e3e6ea  !important;
}
  .suffix-icon{
    color: black;
  }
  
  .el-menu{
 border:0!important;
}

  .el-input__suffix .el-input__icon {
  color: black; /* 设置图标颜色为红色 */
  font-weight: bold;
}

.el-aside{
  border-right: 2px solid rgb(235, 236, 236);
}

.el-submenu__title{
  text-align: center;
  font-weight: bold;
}

.mystext{
  text-align: center;
  font-weight: bold;
  margin-top: 20px;
  height: 25px;
  cursor:pointer;
}
.mystext:hover .text-01{
    color: #e60914;
    transition: color 0.3s ease;
  }


  

</style>