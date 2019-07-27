<template>
<div>
  <el-tabs  type="card" v-model="listatus"  @tab-click="findstatus">
    <el-tab-pane
      v-for="(item, index) in editableTabs"
      :name="item.status"
      :label="item.title"
    >
    </el-tab-pane>
  </el-tabs>
  <el-table
    :data="tableData"
    style="width: 100%">
    <el-table-column type="expand">
      <template slot-scope="props">
        <el-form >
          <el-form-item label="商家编号" >
            <el-input :value="props.row.store_id" :readonly="true"></el-input>
          </el-form-item>
          <el-form-item label="商店名"  width="180">
            <el-input :value=" props.row.storename" :readonly="true"></el-input>
          </el-form-item>
          <el-form-item label="餐饮业从业资格证"  width="180" >
            <br>
            <el-image
              style="width: 100px; height: 100px"
              :src="props.row.license"
             lazy
            ></el-image>
          </el-form-item>
          <el-form-item label="商家姓名"  width="180">
            <el-input :value="props.row.realname" :readonly="true"></el-input>
          </el-form-item>
          <el-form-item label="商家身份证号"  width="180">
            <el-input :value="props.row.id_number" :readonly="true"></el-input>
          </el-form-item>
          <el-form-item label="商家身份证拍照"  width="180">
          <br>
            <el-image
              style="width: 100px; height: 100px"
              :src="props.row.id_card"
              lazy
              ></el-image>
          </el-form-item>
          <el-form-item label="商家联系方式"  width="180">
            <el-input :value="props.row.phone" :readonly="true"></el-input>
          </el-form-item>
          <el-form-item label="申请时间"  width="180">
            <el-input :value="props.row.update_time" :readonly="true"></el-input>
          </el-form-item>
          <el-form-item label="描述"  width="180">
            <el-input type="textarea">{{ props.row.description }}</el-input>
          </el-form-item>
          <el-form-item label="操作" v-if="listatus == 1">
<!--            只有未审核通过的才能进行操作-->

            　　<el-button  type="info"  @click="pass(props.row.store_id)">审核通过</el-button>
                <el-button  type="info" @click="unpass(props.row.store_id)">审核不通过</el-button>
          </el-form-item>
        </el-form>
      </template>
    </el-table-column>
    <el-table-column
      label="商家名称"
      prop="storename">
    </el-table-column>
    <el-table-column
      label="商家姓名"
      prop="realname">
    </el-table-column>
    <el-table-column
      label="申请时间"
      prop="update_time">
    </el-table-column>
  </el-table>

</div>
</template>

<script>
  export default {
    name: 'store_examine',
    inject:['reload'],
    data(){
      return{
        // 当前分页的状态 1或者2
        listatus:"1",
        editableTabs: [{
          title: '待审核',
          status: "1",
          content: 'Tab 1 content'
        }, {
          title: '已审核',
          status: "2",
          content: 'Tab 2 content'
        }],
        tableData:[],
      }
  },
    created(){
      this.$ajax.post('http://localhost:6925/store/license',{status:this.listatus}).then((response)=>{
        this.tableData=response.data
        console.log(response)
      })
        .catch((error)=>{
          console.log(error);
        });
    },
    methods:{
     findstatus(tab,event)
     {
       this.listatus=tab.name
       console.log(tab.name)
       this.$ajax.post('http://localhost:6925/store/license',{status:this.listatus}).then((response)=>{
         this.tableData=response.data
       })
         .catch((error)=>{
           console.log(error);
         });
     },
      pass(id)
      {
        this.$ajax.post('http://localhost:6925/store/passlicense',{id:id}).then((response)=>{
         console.log(response)
        })
          .catch((error)=>{
            console.log(error);
          });

        setTimeout(() =>{
          this.reload();
        },1500);

      },
      unpass(id)
      {
        this.$ajax.post('http://localhost:6925/store/unpasslicense',{id:id}).then((response)=>{
         console.log(response)
        })
          .catch((error)=>{
            console.log(error);
          });
        setTimeout(() =>{
          this.reload();
        },1500);
      }
    }

  }
</script>

<style scoped>

</style>
