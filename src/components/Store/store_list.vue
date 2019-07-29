<template>
  <div>
    <el-input placeholder="请输入商家店名" v-model="searchname" style="padding-bottom:10px;">
      <el-button slot="append" icon="search" v-on:click="searchbyname">搜索</el-button>
    </el-input>

    <el-table
    :data="tableData"
    stripe
    style="width: 100%">
    <el-table-column
      prop="storename"
      label="店名"
      width="180">
    </el-table-column>
    <el-table-column
      prop="phone"
      label="联系方式"
      width="180">
    </el-table-column>
    <el-table-column
      prop="name"
      label="菜系"
      width="180">
    </el-table-column>
    <el-table-column
      prop="address"
      label="地址"
      width="180">
    </el-table-column>
    <el-table-column
      prop="description"
      label="描述"
      width="180">
    </el-table-column>
    <el-table-column
      prop="id"
      label="操作"
      width="180">
      <template slot-scope="scope">　
        　　　　　　<el-button type="info" @click="handleEdit(scope.$index,scope.row)">编辑</el-button>

        　　　　　　<el-button v-if="scope.row.status === 1" type="info" @click="freezeStore(scope.row.id)">冻结</el-button>

                   <el-button v-if="scope.row.status != 1" type="info" @click="unfreezeStore(scope.row.id)">解冻</el-button>

     </template>
    </el-table-column>
  </el-table>

<!--    分页部分-->
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
  <el-dialog title="编辑商家信息" :visible.sync="editFormVisible" :before-close="handleClose">

      <el-form :model="editForm" label-width="80px"  ref="editForm">
        <input type="hidden"  v-model="editForm.id" >
        <el-form-item label="店名">
          <el-input v-model="editForm.storename"></el-input>
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

        <el-form-item label="菜系">
          <el-select v-model="editForm.category_id" placeholder="请选择菜系">
            <el-option v-for= "ca in category"  :value="ca.id"  :label="ca.name" :key="ca.id">{{ca.name}}</el-option>
          </el-select>

        </el-form-item>
        <el-form-item label="联系方式">
          <el-input v-model="editForm.phone"></el-input>
        </el-form-item>
        <el-form-item label="地址">
          <el-input v-model="editForm.address"></el-input>
        </el-form-item>
        <el-form-item label="描述">
          <el-input type="textarea" v-model="editForm.description"></el-input>
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
    name: 'store_list',
    inject: ['reload'],
    data () {
      return {
        searchname:"",//搜索商家的姓名
        editFormVisible: false,
        editForm:{
          id:1,
          storename:1,
          phone:1,
          photo_url:"",
          description:"",
          address:1,
          category_id:0
        },
        tableData: [
        ],
        category: [],
        // pagesize:1,//每页多少数据 以下是实现分页
        pagesize:5,

        currentPage:1,
        start:1,
        totalCount:20,

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
    created(){
      this.$ajax.post('http://localhost:6925/store/show',{currentPage:this.currentPage,searchname:this.searchname}).then((response)=>{
        console.log(response)
        this.tableData=response.data.storedata;
        this.totalCount=response.data.number;
      })
        .catch((error)=>{
          console.log(error);
         window.location.href = '/login'
        });
      this.$ajax('http://localhost:6925/category/show').then(res => {
        this.category = res.data



      }).catch(function (error) {
        console.log(error);
        window.location.href = '/login'
      });


    },
    methods: {
      //按名字搜索
      searchbyname()//按名字搜索结果
      {
        console.log(this.searchname)

        this.$ajax.post('http://localhost:6925/store/show',{currentPage:this.currentPage,searchname:this.searchname}).then((response)=>{
          this.tableData=response.data.storedata;
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
        this.$ajax.post('http://localhost:6925/store/show',{currentPage:this.currentPage,searchname:this.searchname}).then((response)=>{

          this.tableData=response.data.storedata;
          this.totalCount=response.data.number;
        })
          .catch((error)=>{
            console.log(error);
          });
      },
      freezeStore: function(val)
  {
    this.$ajax({
      method:'put',
      url:'http://localhost:6925/store/changestatus/'+val,
    data:{
        id:val
    }
    }).then((response)=>{
      console.log(response);
    })
      .catch((error)=>{
        console.log(error);
      });
    setTimeout(() =>{this.reload();},1500);

    // location.reload();
  },
      unfreezeStore: function(val)
      {
        console.log(val)
        this.$ajax({
          method:'put',
          url:'http://localhost:6925/store/changestatus/'+val,
          data:{
            "id":val
          }
        }).then((response)=>{
          console.log(response);
        })
          .catch((error)=>{
            console.log(error);
          });
        // location.reload();
        setTimeout(() =>{
          this.reload();
        },1500);
      },
      //点击编辑
      handleEdit(index, row) {
        this.editFormVisible = true;
        this.editForm = Object.assign({}, row); //这句是关键！！！
      },

//点击关闭dialog
      handleClose(done) {
        /*done();
        location.reload();*/
        this.editFormVisible = false;
      },

//点击取消
      handleCancel(formName) {
        this.editFormVisible = false;
      },

//点击更新
      handleUpdate(forName) {
        //更新的时候就把弹出来的表单中的数据写到要修改的表格中
        console.log(this.editForm)
        this.$ajax.post('http://localhost:6925/store/edited',{
            id:this.editForm.id,
            storename:this.editForm.storename,
            phone:this.editForm.phone,
            photo_url:this.editForm.photo_url,
          description:this.editForm.description,
            address:this.editForm.address,
            category_id:this.editForm.category_id
        }).then((response)=>{
          console.log("here")
          console.log(response);
        })
          .catch((error)=>{
            console.log(error);
          });


        //这里再向后台发个post请求重新渲染表格数据

      // location.reload();
        setTimeout(() =>{
          this.reload();
        },1500);
        this.editFormVisible = false;
      }


    }

  }
</script>

<style scoped>
</style>
