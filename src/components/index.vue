<template>
<el-container style=" border: 1px solid #eee">
  <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
    <el-menu>
      <el-menu-item index="1">
        <i class="el-icon-s-home"></i>
        <span slot="title"><router-link to="/homepage">首页</router-link></span>
<!--        <template slot="title"><i class="el-icon-message"></i>首页</template>-->
<!--        <el-menu-item-group>-->
<!--          <el-menu-item index="1-1"><router-link to="/store/list">商家列表</router-link></el-menu-item>-->
<!--          <el-menu-item index="1-2"><router-link to="/store/add">添加商家</router-link></el-menu-item>-->
<!--        </el-menu-item-group>-->
      </el-menu-item>
      <el-submenu index="2">
        <template slot="title"><i class="el-icon-s-shop"></i>商家管理</template>
        <el-menu-item-group>
          <el-menu-item index="2-1"><router-link to="/store/list">商家列表</router-link></el-menu-item>
          <el-menu-item index="2-2"><router-link to="/store/add">添加商家</router-link></el-menu-item>
          <el-menu-item index="2-3"><router-link to="/store/examine">审核商家</router-link></el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="3">
        <template slot="title"><i class="el-icon-user"></i>用户管理</template>
        <el-menu-item-group>
          <el-menu-item index="3-1"><router-link to="/user/userlist">用户列表</router-link></el-menu-item>
          <el-menu-item index="3-2"><router-link to="/user/adduserlist">批量添加用户</router-link></el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="4">
        <template slot="title"><i class="el-icon-food"></i>菜系管理</template>
        <el-menu-item-group>
          <el-menu-item index="4-1"><router-link to="">菜系编辑</router-link></el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="5">
        <template slot="title"><i class="el-icon-folder"></i>订单管理</template>
        <el-menu-item-group>
          <el-menu-item index="5-1"><router-link to="/order/orderlist">订单列表</router-link></el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="6">
        <template slot="title"><i class="el-icon-s-flag"></i>活动管理</template>
        <el-menu-item-group>
          <el-menu-item index="6-1"><router-link to="/seckill/release">发布秒杀</router-link></el-menu-item>
          <el-menu-item index="6-2"><router-link to="/seckill/examine">秒杀商品审核</router-link></el-menu-item>
          <el-menu-item index="6-3"><router-link to="/seckill/summary">活动统计</router-link></el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="7">
        <template slot="title"><i class="el-icon-s-data"></i>相关统计</template>
        <el-menu-item-group>
          <el-menu-item index="7-1"><router-link to="/order/chart">订单分析</router-link></el-menu-item>
          <el-menu-item index="7-2"><router-link to="/order/ordersummary">运营概述</router-link></el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="8">
        <template slot="title"><i class="el-icon-s-marketing"></i>预测</template>
        <el-menu-item-group>
          <el-menu-item index="8-1"><router-link to="/predicted">订单预测</router-link></el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </el-aside>

  <el-container>
    <el-header style="text-align: right; font-size: 12px">
      <el-dropdown>
        <i class="el-icon-setting" style="margin-right: 15px"></i>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item v-on:click.native="changepassword()">修改密码</el-dropdown-item>
          <el-dropdown-item v-on:click.native="logout()">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <span>你好,{{this.admin}}</span>
    </el-header>
    <el-dialog title="修改密码" :visible.sync="editFormVisible" :before-close="handleClose">

      <el-form :model="editForm" status-icon :rules="rules" label-width="80px"  ref="editForm">
        <input type="hidden"  v-model="editForm.id" >
        <el-form-item label="原密码" prop="password">
          <el-input v-model="editForm.password" show-password placeholder="请输入原密码"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="againpassword">
          <el-input v-model="editForm.againpassword" show-password placeholder="请再次输入原密码"></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="newpassword">
          <el-input v-model="editForm.newpassword" show-password></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="handleCancel('editForm')">取消</el-button>
        <el-button type="primary" @click.native="handleUpdate('editForm')">确认</el-button>
      </div>

    </el-dialog>
<!--    把各个组件渲染到这里-->
    <el-main><keep-alive><router-view></router-view></keep-alive>
    </el-main>
  </el-container>
</el-container>

</template>
<style>
  .el-header {
    /*上部的颜色*/
    background-color: #eff2f7;
    color: #333;
    line-height: 60px;
  }

  .el-aside {
    color: #333;
  }
</style>


<script>

  import store_list from './Store/store_list'
  import addstore from  './Store/addstore'
  import orderchart from './order/orderchart'
  import predicted from './predicted/predicted'
  import userlist from './user/userlist'
  import ordersummary from './order/ordersummary'
  import adduserlist from './user/adduserlist'
  import store_examine from './Store/store_examine'
  import seckillrelease from './seckill/seckillrelease'
  import seckillexamine from './seckill/seckillexamine'
  import seckillsummary from './seckill/seckillsummary'
  import orderlist from  './order/orderlist'

  export default {
    data() {
      var checkAge = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('新密码不能为空'));
        }
        callback()
      };
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.editForm.password !== '') {
            this.$refs.editForm.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.editForm.password) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        editForm:{
          id:"",
          password:"",
          againpassword:"",
          newpassword:""
        },
        editFormVisible:false,
        admin:"请先登录",
        rules: {
          password: [
            { validator: validatePass, trigger: 'blur' }
          ],
         againpassword: [
            { validator: validatePass2, trigger: 'blur' }
          ],
          newpassword: [
            { validator: checkAge, trigger: 'blur' }
          ]
        }
      }
    },
    components:{
      store_list,
      addstore,
      orderchart,
      predicted,
      userlist,
      ordersummary,
      adduserlist,
      store_examine,
      seckillexamine,
      seckillrelease,
      seckillsummary,
      orderlist,
    },
    created () {
      this.$ajax('http://localhost:6925/adminname').then(res => {
        console.log(res)
        this.admin=res.data.admin
        this.editForm.id=res.data.id

      }).catch(function (error) {
        console.log(error);
      });
    },
    methods:{
      handleClose(){
        this.editFormVisible = false;
      },
      //确认更新
      handleUpdate(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {

            this.$ajax.post('http://localhost:6925/login',{
              id:this.editForm.id,
              password:this.editForm.password
            }).then((response)=>{
              console.log(response)
              if(response.data>0)
              {
                //判断完原密码没错 再进行修改
                this.$ajax.post('http://localhost:6925/admin/changepassword',{
                  id:this.editForm.id,
                  password:this.editForm.newpassword
                }).then((response)=>{
                  console.log(response)
                  window.location.href = '/login'
                })
                  .catch((error)=>{
                    console.log(error);
                  });
              }
              else
              {
                this.$alert('原密码错误');
              }

            })
              .catch((error)=>{
                console.log(error);
              });

          } else {
            console.log('error submit!!');
            return false;
          }
        });


      },

      //确认更新密码 弹窗可见
      changepassword(){
        this.editFormVisible=true;
      }
      ,
      logout()
      {

        this.$ajax('http://localhost:6925/logout').then(res => {
          console.log(res)
          window.location.href = '/login'
        }).catch(function (error) {
          console.log(error);
        });

      },
      handleCancel(formName) {
        this.editFormVisible = false;
      },
    }
  };
</script>
