<template>
  <div class="back" style="height: 100vh; overflow: hidden;">
    <!-- <div style="width: 600px;height: 600px;background-color: rgba(255,255, 255, 0.8);border-radius: 10px;margin:10%;"></div> -->
    
    <el-button @click="drawer = true" type="primary" style="margin-left: 16px;">
      点我打开
    </el-button>

    <el-drawer
      title="我是标题"
      :visible.sync="drawer"
      :with-header="false">
        <div style="width: 500px;height: 400px;background-color: rgb(255, 255, 255);border-radius: 10px;margin: 150px auto;padding:50px 60px;">
        <div style="margin-bottom:30px;text-align: center;font-size: 30px;font-weight: bold;color: cornflowerblue">Ariga账号登录</div>
        <el-form :model="admin" ref="ruleForm" :rules="rules">
          <el-form-item prop="u_username">
            <el-input style="width: 100%" placeholder="请输入账号" prefix-icon="el-icon-user" size="medium" v-model="admin.u_username"></el-input>
          </el-form-item>
          <el-form-item prop="u_password">
            <el-input style="width: 100%;margin-top: 20px" show-password placeholder="请输入密码" prefix-icon="el-icon-lock" size="medium" v-model="admin.u_password"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button style="width: 100%;margin-top:10px" size="medium" type="primary" @click="login">登录</el-button>
          </el-form-item>
          <el-form-item>
            <el-button style="width: 100%" size="medium" type="text"><div @click="register">注册</div></el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-drawer>
    
  </div>
</template>

<script>
import request from "@/utils/LoginRequest";

export default {
  name: "Login",
  data(){
    return{
      drawer: false,
      admin: {},
      rules: {
        u_username: [
          {required: true, message: '请输入账号', trigger: 'blur'}
        ],
        u_password: [
          {required: true, message: '请输入密码', trigger: 'blur'},
          {min: 6,max: 18, message: '请输入至少6位，至多18位密码', trigger: 'blur'}
        ]
      }
    }
  },
  methods:{
    login(){
      this.$refs['ruleForm'].validate((valid) => {
        if (valid){
      request.post('/user/login',this.admin).then(res => {
        if (res.code === '200'){
          this.$notify.success("登陆成功")
          this.$router.push('home')
        }else {
          this.$notify.error(res.msg)
        }
      })
        }

      })
    },
    register(){
      this.$router.push('register')
    }
  }
}
</script>

<style>
.back{
  background-image: url('@/assets/backgroundLogin.png');
  background-size: cover;
  background-position: center;
}
</style>