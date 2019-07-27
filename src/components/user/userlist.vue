<template>
  <div>
    <el-input placeholder="请输入用户姓名" v-model="searchname" style="padding-bottom:10px;">
      <el-button slot="append" icon="search" v-on:click="searchbyname">搜索</el-button>
    </el-input>
    <el-table
      :data="tableData"
      stripe
      style="width: 100%">
      <el-table-column
        prop="name"
        label="姓名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="phone"
        label="联系方式"
        width="180">
      </el-table-column>
      <el-table-column
        prop="birth"
        label="生日"
        width="180">
      </el-table-column>
      <el-table-column
        prop="address"
        label="地址"
        width="180">
      </el-table-column>
      <el-table-column
        prop="id"
        label="操作"
        width="180">
        <template slot-scope="scope">　
          　　　　　　<el-button type="info" @click="handleEdit(scope.$index,scope.row)">编辑</el-button>

          　　　　　　<el-button v-if="scope.row.status === 1" type="info" @click="freezeuser(scope.row.id)">冻结</el-button>

          <el-button v-if="scope.row.status != 1" type="info" @click="unfreezeuser(scope.row.id)">解冻</el-button>

        </template>
      </el-table-column>
    </el-table>

    <div align="center">
    <el-pagination
      background
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :total="totalCount"
      :page-size="pagesize"
      layout="total, prev, pager, next, jumper"
    >
    </el-pagination>
    </div>
    <!--编辑界面-->
    <el-dialog title="编辑用户信息" :visible.sync="editFormVisible" :before-close="handleClose">

      <el-form :model="editForm" label-width="80px"  ref="editForm">
        <input type="hidden"  v-model="editForm.id" >
        <el-form-item label="姓名">
          <el-input v-model="editForm.name"></el-input>
        </el-form-item>
        <el-form-item label="头像" :inline="true">
          <el-image visible.sync="false"
                    style="width: 100px; height: 100px"
                    :src="editForm.photo_url"
                    fit="cover"
          ></el-image>
          <el-upload
            class="upload"
            action="meiya-2019.oss-cn-shenzhen.aliyuncs.com"
            :drag="true"
            :multiple="true"
            :file-list="images"
            :http-request="uploadHttp"
            :before-upload="beforeAvatarUpload"
            :on-remove="handleRemove"
            list-type="picture">
            <i class="el-icon-plus avatar-uploader-icon"></i>
            <div class="el-upload__tip" slot="tip">只能上传jpg/jpeg/png文件，且不超过500kb</div>
          </el-upload>

        </el-form-item>
        <!--            <tr>-->
        <!--              <td><span>头像:</span>  <input type="text"   v-model="editForm.photo_url" placeholder="请输入菜系"></td>-->
        <!--            </tr>-->

        <el-form-item label="生日">
          <el-date-picker
            v-model="editForm.birth"
            type="date"
            placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="联系方式">
          <el-input v-model="editForm.phone"></el-input>
        </el-form-item>
        <el-form-item label="地址">
          <el-input v-model="editForm.address"></el-input>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="handleCancel('editForm')">取消</el-button>
        <el-button type="primary" @click.native="handleUpdate('editForm')">更新</el-button>
      </div>

    </el-dialog>


  </div>
</template>

<script>

  import ossClient from '@/tools/aliyun.oss.client'

  export default {
    name: 'userlist',
    data(){
      return{
        editFormVisible: false,
        editForm:{
          id:"",
          name:"",
          phone:"",
          birth:"",
          photo_url:"",
          address:"",

        },
        tableData:[],
        pagesize:5,

        currentPage:1,
        start:1,
        totalCount:20,

        searchname:"",


        //以下实现图片上传
        images: [],
        uploadConf: {
          endpoint: 'oss-cn-shenzhen.aliyuncs.com',
          accessKeyId: 'LTAIjhOt9iXyfHWh',
          accessKeySecret: 'SF8x7ojHy2ckll12FWLi7l7PXAWDTS',
          bucket: 'meiya-2019',
          // stsToken: null
        }
      }

    },
    created () {
      this.$ajax.post('http://localhost:6925/user/show',{currentPage:this.currentPage,searchname:this.searchname}).then((res)=>{

        for(var i=0;i<res.data.userdata.length;i++)
        {
          res.data.userdata[i].birth=res.data.userdata[i].birth.substring(0,10)//只截取到日

        }

        this.tableData=res.data.userdata;
        this.totalCount=res.data.number;
      })
        .catch((error)=>{
          console.log(error);
        });
    },
    methods:{
      searchbyname()//按名字搜索结果
      {
        console.log(this.searchname)

        this.$ajax.post('http://localhost:6925/user/show',{currentPage:this.currentPage,searchname:this.searchname}).then((response)=>{
          for(var i=0;i<response.data.userdata.length;i++)
          {
            response.data.userdata[i].birth=response.data.userdata[i].birth.substring(0,10)//只截取到日

          }
          this.tableData=response.data.userdata;
          this.totalCount=response.data.number;
          console.log(response)
        })
          .catch((error)=>{
            console.log(error);
          });


      },
      //成功上传
      /**
       * 阿里云OSS上传
       */
      uploadHttp({ file }) {
        const { imgName } = 'ALIOSS_IMG_';
        const fileName = `${imgName}/${Date.parse(new Date())}`;  //定义唯一的文件名
        ossClient(this.uploadConf).put(fileName, file, {
          'ContentType': 'image/jpeg'
        }).then(({res, url, name}) => {
          if (res && res.status == 200) {
            console.log(`阿里云OSS上传图片成功回调`, res, url, name);
            this.editForm.photo_url=url;
          }
        }).catch((err) => {
          console.log(`阿里云OSS上传图片失败回调`, err);
        });
      },

      /**
       * 图片限制
       */
      beforeAvatarUpload (file) {
        const isJPEG = file.name.split('.')[1] === 'jpeg';
        const isJPG = file.name.split('.')[1] === 'jpg';
        const isPNG = file.name.split('.')[1] === 'png';
        const isLt500K = file.size / 1024 / 500 < 2;
        if (!isJPG && !isJPEG && !isPNG) {
          this.$message.error('上传图片只能是 JPEG/JPG/PNG 格式!');
        }
        if (!isLt500K) {
          this.$message.error('单张图片大小不能超过 500KB!');
        }
        return (isJPEG || isJPG || isPNG) && isLt500K;
      },

      /**
       * 移除图片
       */
      handleRemove (file, fileList) {
        console.log(`移除图片回调`, fileList);
      },

      handleCurrentChange:function(val){
        this.currentPage=val;
        this.$ajax.post('http://localhost:6925/user/show',{currentPage:this.currentPage,searchname:this.searchname}).then((res)=>{
          for(var i=0;i<res.data.userdata.length;i++)
          {
            res.data.userdata[i].birth=res.data.userdata[i].birth.substring(0,10)//只截取到日
          }

          this.tableData=res.data.userdata;
          this.totalCount=res.data.number;
        })
          .catch((error)=>{
            console.log(error);
          });
      },
      //跳出弹窗
      handleEdit(index, row) {
        this.editFormVisible = true;
        this.editForm = Object.assign({}, row); //这句是关键！！！
      },

//点击关闭dialog
      handleClose(done) {
        this.editFormVisible = false;
      },

//点击取消
      handleCancel(formName) {
        this.editFormVisible = false;
      },
      handleUpdate()
      {
        console.log(this.editForm)
        this.$ajax.post('http://localhost:6925/user/update',{
          id:this.editForm.id,
          name:this.editForm.name,
          phone:this.editForm.phone,
          photo_url:this.editForm.photo_url,
          birth:this.editForm.birth,
          address:this.editForm.address

        }).then((response)=>{
          console.log(response);
        })
          .catch((error)=>{
            console.log(error);
          });


        //这里再向后台发个post请求重新渲染表格数据

        location.reload();

        this.editFormVisible = false;
      },

      freezeuser(val){
        console.log(val)
        this.$ajax({
          method:'put',
          url:'http://localhost:6925/user/changestatus/'+val,
          data:{
            "id":val
          }
        }).then((response)=>{
          console.log(response);
        })
          .catch((error)=>{
            console.log(error);
          });
        location.reload();
      },
      unfreezeuser(val){
        console.log(val)
        this.$ajax({
          method:'put',
          url:'http://localhost:6925/user/changestatus/'+val,
          data:{
            "id":val
          }
        }).then((response)=>{
          console.log(response);
        })
          .catch((error)=>{
            console.log(error);
          });
        location.reload();
      }
    }
  }
</script>

<style scoped>

</style>
