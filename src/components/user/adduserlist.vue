<template>
  <div>
    <input type="file" @change="importf(this)" accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"/>
    <el-button plain @click="adduserlist">批量添加</el-button>
    <el-table
      :data="excelData"
      style="width: 100%"
    >
      <el-table-column
        prop="id"
        label="编号"

        width="180">
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名"

        width="180">
      </el-table-column>
      <el-table-column
        prop="password"
        label="密码"
      >
      </el-table-column>
      <el-table-column
        prop="phone"
        label="联系方式"
      >
      </el-table-column>
    </el-table>
</div>
</template>

<script>
  export default {
    name: 'adduserlist',
    data(){
      return{
        excelData:[],
        juet:"3",
      }
    },
    methods:{

      adduserlist(){

        this.$ajax.post('http://localhost:6925/batchinsert',{
          users:this.excelData
        }).then((response)=>{

          this.$alert('插入'+response.data+'位用户信息', '批量插入成功', {
            confirmButtonText: '确定',
            callback: action => {
              // this.$message({
              //   type: 'info',
              //   message: `action: ${ action }`
              // });
            }
          });
          this.excelData="";
        }
        )
          .catch((error)=>{
            console.log(error);
          });
      },
      importf(obj) {

        let _this = this;
        console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxx1");
        let inputDOM = this.$refs.inputer;
        // 通过DOM取文件数据

        this.file = event.currentTarget.files[0];

        var rABS = false; //是否将文件读取为二进制字符串
        var f = this.file;

        var reader = new FileReader();
        //if (!FileReader.prototype.readAsBinaryString) {
        FileReader.prototype.readAsBinaryString = function(f) {
          var binary = "";
          var rABS = false; //是否将文件读取为二进制字符串
          var pt = this;
          var wb; //读取完成的数据
          var outdata;
          var reader = new FileReader();
          reader.onload = function(e) {
            var bytes = new Uint8Array(reader.result);
            var length = bytes.byteLength;
            for (var i = 0; i < length; i++) {
              binary += String.fromCharCode(bytes[i]);
            }
            var XLSX = require("xlsx");
            if (rABS) {
              wb = XLSX.read(btoa(fixdata(binary)), {
                //手动转化
                type: "base64"
              });
            } else {
              wb = XLSX.read(binary, {
                type: "binary"
              });
            }
            outdata = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]); //outdata就是你想要的东西


            let arr=[]
            outdata.map(
              v=>{
                let obj={}
                obj.id=v.账号
                obj.name=v.姓名
                obj.password=v.密码
                obj.phone=v.联系方式

                arr.push(obj)
              }
            )

            _this.excelData=[...arr]



          };
          reader.readAsArrayBuffer(f);
        };
        if (rABS) {
          reader.readAsArrayBuffer(f);
        } else {
          reader.readAsBinaryString(f);
        }
      }
    }
  }
</script>

<style scoped>

</style>
