<template>
<div>
  <el-table
    :data="tableData"
    stripe
    style="width: 100%">
    <el-table-column
      prop="name"
      label="活动名字"
      width="180">
    </el-table-column>
    <el-table-column
      prop="start_time"
      label="开始时间"
      width="180">
    </el-table-column>
    <el-table-column
      prop="end_time"
      label="结束时间"
      width="180">
    </el-table-column>
    <el-table-column
      prop="storecount"
      label="参加商家数"
      width="180">
    </el-table-column>
    <el-table-column
      prop="foodcount"
      label="参加商品数"
      width="180">
    </el-table-column>
  </el-table>
</div>
</template>

<script>
  export default {
    name: 'seckillsummary',
    data(){
      return{
        tableData:[]
      }

    },
    created () {
      this.$ajax.post('http://localhost:6925/event/summary').then((response)=>{
        this.tableData=response.data
      })
        .catch((error)=>{
          console.log(error);
        });
    }
  }
</script>

<style scoped>

</style>
