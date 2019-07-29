<template>
  <div>
    <el-form ref="loginForm" :model="form" :rules="rules" label-width="80px" class="login-box">
      <h3 class="login-title">欢迎登录</h3>
      <el-form-item label="账号" prop="id">
        <el-input type="text" placeholder="请输入账号" v-model="form.id"/>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" placeholder="请输入密码" v-model="form.password"/>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" v-on:click="onSubmit('loginForm')">登录</el-button>
        <el-button type="primary" v-on:click="loginin">手机号登录</el-button>
      </el-form-item>
    </el-form>

    <el-dialog
      title="温馨提示"
      :visible.sync="dialogVisible"
      width="30%"
    >
      <span>请输入账号和密码</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="温馨提示"
      :visible.sync="dialogVisi"
      width="30%"
    >
      <span>账号或者密码错误</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisi = false">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="使用手机号登录"
      :visible.sync="phonevisible"
      width="40%">
      <el-form :model="phoneform"
               label-width="150px" size="small">
        <el-form-item label="手机号：">
          <el-input v-model="phoneform.phone" style="width: 250px"></el-input>
        </el-form-item>
        <el-form-item label="输入验证码" >
          <el-input v-model="phoneform.yanzheng" placeholder="请输入验证码" style="width: 140px"></el-input>
          <el-button icon="el-icon-mobile-phone" @click="send"  type="success" :disabled="disabled=!show" >
            <span v-show="show" style="width: 50px">获取验证码</span>
            <span v-show="!show"  style="width: 50px">{{count}} s</span>
          </el-button>
        </el-form-item>



      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="phonevisible = false" size="small">取 消</el-button>
        <el-button type="primary" @click="handlephone()" size="small">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  const TIME_COUNT = 60;

  export default {
    name: "Login",

    data() {
      return {

        show: true,  // 初始启用按钮
        count: '',   // 初始化次数
        timer: null,


        form: {
          id:'',
          password: ''
        },
        phoneform:{
          phone:'',
          yanzheng:''
        },

        // 表单验证，需要在 el-form-item 元素中增加 prop 属性
        rules: {
          id: [
            {required: true, message: '账号不可为空', trigger: 'blur'}
          ],
          password: [
            {required: true, message: '密码不可为空', trigger: 'blur'}
          ]
        },
        yanzhengsheng:"",//生成的随机码
        phonecount:0,
        // 对话框显示和隐藏
        dialogVisi: false,
        dialogVisible: false,
        phonevisible: false
      }
    },
    methods: {
      send(){
        this.$ajax.post('http://localhost:6925/admin/phone',{phone:this.phoneform.phone}).then(res => {
          console.log(res)
          this.phonecount=res.data
        }).catch(function (error) {
          console.log(error);
        });
        setTimeout(() =>{},1000);//等一秒再判断
        if(this.phonecount>0)
        {

          this.$ajax.post('http://localhost:6925/admin/yanzheng',{phone:this.phoneform.phone}).then(res => {
            console.log(res)
            this.yanzhengsheng=res.data
          }).catch(function (error) {
            console.log(error);
          });
          if (!this.timer) {
            this.count = TIME_COUNT;
            this.show = false;
            this.timer = setInterval(() => {
              if (this.count > 0 && this.count <= TIME_COUNT) {
                this.count--;
              } else {
                this.show = true;
                clearInterval(this.timer);  // 清除定时器
                this.timer = null;
              }
            }, 1000)
          }

        }
        else{
          this.$message.error('请输入正确的手机号');

        }

      },
      //使用手机号登录
      loginin() {

        this.phonevisible=true;
      },
      handlephone()
      {
        if(this.yanzhengsheng.toString()==this.phoneform.yanzheng)
        {
          //加个session
          this.$ajax.post('http://localhost:6925/login1',{phone:this.phoneform.phone}).then(res => {
            console.log(res)
          }).catch(function (error) {
            console.log(error);
          });
          this.$router.push("/index")
        }
        else{
          this.$message.error('验证码错误');
        }
      },
      onSubmit(formName) {
        // 为表单绑定验证功能
        console.log(this.form)
        this.$refs[formName].validate((valid) => {
          if(valid)
          {
            var new_id=parseInt(this.form.id)
            this.$ajax.post('http://localhost:6925/login',{
              id:new_id,
              password:this.form.password
            }).then((response)=>{
              console.log(response)
              if(response.data>0)
              {
                this.$router.push("/index")
              }
              else
              {
                this.dialogVisi=true
              }

            })
              .catch((error)=>{
                console.log(error);
              });
          }
          else{
            this.dialogVisible=true
          }
        })

      }
  }
  }
</script>

<style  scoped>
  .login-box {
    border: 1px solid #DCDFE6;
    width: 350px;
    margin: 180px auto;
    padding: 35px 35px 15px 35px;
    border-radius: 5px;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    box-shadow: 0 0 25px #909399;
  }

  .login-title {
    text-align: center;
    margin: 0 auto 40px auto;
    color: #303133;
  }
</style>
