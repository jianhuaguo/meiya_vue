<template>
<div>
  <div class="container">

      <span class="demonstration">日报</span>
      <el-date-picker
        v-model="orderday"
        type="date"
        format="yyyy-MM-dd"
        value-format="yyyy-MM-dd"
        v-on:change="order_day()"
        placeholder="选择日期">
      </el-date-picker>


      <span class="demonstration">月报</span>
      <el-date-picker
        v-model="ordermonth"
        type="month"
        format="yyyy-MM"
        value-format="yyyy-MM"
        v-on:change="order_month()"
        placeholder="选择月">
      </el-date-picker>

      <span class="demonstration">年报</span>
      <el-date-picker
        v-model="orderyear"
        type="year"
        format="yyyy"
        value-format="yyyy"
        v-on:change="order_year()"
        placeholder="选择年">
      </el-date-picker>


    <el-button type="primary" icon='document' @click='exportToExcel()'>导出excel</el-button>
  </div>
  <el-table
    :data="tableData"
    style="width: 100%"
    :default-sort = "{prop: 'sumpay', order: 'descending'}"
  >
    <el-table-column
      prop="store_id"
      label="商家编号"

      width="180">
    </el-table-column>
    <el-table-column
      prop="storename"
      label="商家店名"

      width="180">
    </el-table-column>
    <el-table-column
      prop="storephone"
      label="联系方式"

      width="180">
    </el-table-column>
    <el-table-column
      prop="ordersum"
      label="成交总额"
      sortable
    >
    </el-table-column>
    <el-table-column
      prop="ordercount"
      label="成交笔数"
      sortable
    >
    </el-table-column>
    <el-table-column
      prop="usercount"
      label="消费用户"
      sortable
    >
    </el-table-column>
  </el-table>
</div>
</template>

<script>
  export default {
    name: 'ordersummary',
    data()
  {
    return{
      tableData:[],
      orderday:"",
      ordermonth:"",
      orderyear:""
    };
  },
    methods:{
      exportToExcel() {
        //excel数据导出
        require.ensure([], () => {
          const {
            export_json_to_excel
          } = require('../../assets/js/Export2Excel');
          const tHeader = ['商家编号','商店店名', '联系方式', '成交总额', '成交笔数','消费用户'];
          const filterVal = ['store_id','storename', 'storephone', 'ordercount', 'ordersum','usercount'];
          const list = this.tableData;
          const data = this.formatJson(filterVal, list);
          var juti;
          if(this.orderday!="")
            juti=this.orderday
          if(this.ordermonth!="")
            juti=this.ordermonth
          if(this.orderyear!="")
            juti=this.orderyear
          var excelname=juti+'报表'


          export_json_to_excel(tHeader, data, excelname);
        })
      },
      formatJson(filterVal, jsonData) {
        return jsonData.map(v => filterVal.map(j => v[j]))
      },
      order_day(){
        this.ordermonth="";
        this.orderyear="";
        this.$ajax.post('http://localhost:6925/storesummary/day',{orderday:this.orderday}).then((response)=>{
          console.log(response)
          this.tableData=response.data;
        })
          .catch((error)=>{
            console.log(error);
          });
      },
      order_month(){
        this.orderday="";
        this.orderyear="";
        this.$ajax.post('http://localhost:6925/storesummary/month',{ordermonth:this.ordermonth}).then((response)=>{
          console.log(response)
          this.tableData=response.data;
        })
          .catch((error)=>{
            console.log(error);
          });
      },
      order_year(){
        this.ordermonth="";
        this.orderday="";
        this.$ajax.post('http://localhost:6925/storesummary/year',{orderyear:this.orderyear}).then((response)=>{
          console.log(response)
          this.tableData=response.data;
        })
          .catch((error)=>{
            console.log(error);
          });
      }
    }
  };
</script>

<style scoped>

</style>
