<template>
<div>
  <div align="center">
    <span>商家编号</span><input v-model="shopid">
    <el-button type="primary" @click.native="predict3()">查询</el-button>
  </div>
  <el-table
    :data="tableData"
    border
    style="width: 100%">
    <el-table-column
      prop="_day"
      label="未来几天"
      width="180">
    </el-table-column>
    <el-table-column
      prop="_count"
      label="订单(笔)"
      width="180">
    </el-table-column>
    <el-table-column
      prop="_sum"
      label="金额(元)"
      width="180">
    </el-table-column>
  </el-table>
</div>
</template>

<script>
  export default {
    name: 'predicted',
    data(){
      return{
        shopid:"",
        sum:[],
        count:[],
        tableData:[]
      }
    },
    methods:{
      //预测未来三天
      predict3()
      {
        console.log(this.shopid)
        this.$ajax('http://localhost:6925/predicted?shopid='+this.shopid).then(res => {
          console.log(res);
          var objArr=[];
          for (var i=1;i<=res.data.sum.length;i++)
          {
            var obj={};
            obj._day=i;
            obj._sum=res.data.sum[i-1];
            obj._count=res.data.count[i-1];
            objArr.push(obj);
          }
            this.tableData=objArr;
        })
          .catch((error)=>{
            window.location.href = '/login'
            console.log(error);
          });
      }

    }

  }
</script>

<style scoped>

</style>
