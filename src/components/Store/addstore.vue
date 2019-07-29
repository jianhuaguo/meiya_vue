<template>
  <el-form ref="form" :model="store" label-width="80px">

    <el-form-item label="店名">
      <el-input v-model="store.name"></el-input>
    </el-form-item>


    <el-form-item label="头像" :inline="true">
      <el-image
        style="width: 100px; height: 100px"
        :src="store.photo_url"
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


    <el-form-item label="菜系">
      <el-select v-model="store.category_id" placeholder="请选择菜系">
        <el-option v-for= "ca in category"  :value="ca.id"  :label="ca.name" :key="ca.id">{{ca.name}}</el-option>
      </el-select>
    </el-form-item>

    <el-form-item label="地址">
      <el-input v-model="store.address"></el-input>
    </el-form-item>

    <el-form-item label="联系方式">
      <el-input v-model="store.phone" type="number"></el-input>
    </el-form-item>

    <el-form-item label="描述">
      <el-input type="textarea" v-model="store.description"></el-input>
    </el-form-item>

    <el-form-item>
      <el-button plain @click="addstore">添加</el-button>
      <el-button plain @click="onBack">返回</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
  import ossClient from '@/tools/aliyun.oss.client'

  export default {
    name: 'addstore',
    data () {
      return {
        store: {
          id: 1,
          name: "",
          phone: "",
          photo_url: "",
          description: "",
          address: "",
          category_id:""
        },
        category: [],
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
        this.$ajax('http://localhost:6925/category/show').then(res => {
          console.log(res.data)
          this.category = res.data

        }).catch(function (error) {
          console.log(error);
        });
    },
    methods: {
      uploadHttp({ file }) {
        const { imgName } = 'ALIOSS_IMG_';
        const fileName = `${imgName}/${Date.parse(new Date())}`;  //定义唯一的文件名
        ossClient(this.uploadConf).put(fileName, file, {
          'ContentType': 'image/jpeg'
        }).then(({res, url, name}) => {
          if (res && res.status == 200) {
            console.log(`阿里云OSS上传图片成功回调`, res, url, name);
            this.store.photo_url=url;
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
      onBack () {
        this.$router.back()
      },
      addstore(){
        this.$ajax.post('http://localhost:6925/store/added',{
          storename:this.store.name,
          photo_url:this.store.photo_url,
          phone:this.store.phone,
          address:this.store.address,
          category_id:this.store.category_id,
          description:this.store.description

        }).then((response)=>{
          console.log(response);
        })
          .catch((error)=>{
            console.log(error);
          });
        this.$router.back()
      }
    }
  }
</script>

<style scoped>

</style>
