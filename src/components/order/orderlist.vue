<template>
  <div>
  <el-input placeholder="请输入商家编号或者用户编号" v-model="searchid" style="padding-bottom:10px;">
    <el-button slot="append" icon="search" v-on:click="handleSearchList1">搜索</el-button>
  </el-input>
    <div>
  <el-table
    :data="list"
    style="width: 100%">
    <el-table-column type="expand">
      <template slot-scope="props">
        <el-form >
          <el-form-item label="订单编号" >
            <span>{{props.row.id}}</span>
          </el-form-item>
          <el-form-item label="商店编号"  width="180">
            <span>{{props.row.store_id}}</span>
          </el-form-item>
          <el-form-item label="用户编号"  width="180">
            <span>{{props.row.user_id}}</span>
          </el-form-item>
          <el-form-item label="下单时间"  width="180">
            <span>{{props.row.payment_time}}</span>
          </el-form-item>
          <el-form-item label="账单金额"  width="180">
            <span>{{props.row.payment}}</span>
          </el-form-item>
          <el-form-item label="状态"  width="180">
            <span>{{props.row.status}}</span>
          </el-form-item>
        </el-form>
      </template>
    </el-table-column>
    <el-table-column
      label="订单编号"
      prop="id">
    </el-table-column>
    <el-table-column
      label="商家编号"
      prop="store_id">
    </el-table-column>
    <el-table-column
      label="用户编号"
      prop="user_id">
    </el-table-column>
  </el-table>
    </div>
    <div class="pagination-container">

      <el-pagination
        background
        @size-change="handleSizeChange1"
        @current-change="handleCurrentChange1"
        layout="total, sizes,prev, pager, next,jumper"
        :current-page.sync="listQuery.pageNum"
        :page-size="listQuery.pageSize"
        :page-sizes="[5,10,15]"
        :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'orderlist',
    data() {
      return {
        list:[],
        searchid: '',//搜索数据
        listQuery:{//分页框
          pageNum: 1,
          pageSize: 5,
        },
        total: null,//总的数据条数
      }
    },
   created(){
     this.$ajax.post('http://localhost:6925/order/orderlist',{currentPage:this.listQuery.pageNum,pagesize:this.listQuery.pageSize,store_id:this.searchid,user_id:this.searchid}).then((response)=>{
       for(var i=0;i<response.data.orderdata.length;i++)
       {
         switch (response.data.orderdata[i].status) {
           case 0:response.data.orderdata[i].status="未付款"; break;
           case 1:response.data.orderdata[i].status="已付款"; break;
           case 2:response.data.orderdata[i].status="已发货"; break;
           default: response.data.orderdata[i].status="交易成功"
         }
       }
       this.list=response.data.orderdata
       this.total=response.data.number
     })
       .catch((error)=>{
         console.log(error);
       });

      },
   methods:{
     handleSizeChange1(val) {
       this.listQuery.pageNum = 1;
       this.listQuery.pageSize = val;
       this.getList();
     },
     handleCurrentChange1(val) {
       this.listQuery.pageNum = val;
       this.getList();
     },
     getList() {
       this.listLoading = true;
       this.$ajax.post('http://localhost:6925/order/orderlist',{currentPage:this.listQuery.pageNum,pagesize:this.listQuery.pageSize,store_id:this.searchid,user_id:this.searchid}).then((response)=>{

         for(var i=0;i<response.data.orderdata.length;i++)
         {
           switch (response.data.orderdata.status) {
             case 0:response.data.orderdata[i].status="未付款"; break;
             case 1:response.data.orderdata[i].status="已付款"; break;
             case 2:response.data.orderdata[i].status="已发货"; break;
             default: response.data.orderdata[i].status="交易成功"
           }
         }

         this.list=response.data.orderdata
         this.total=response.data.number
       })
         .catch((error)=>{
           console.log(error);
         });

     },
     handleSearchList1() {
       this.listQuery.pageNum = 1;
       this.getList();
     },
    }

  }
</script>

<style scoped>

</style>
