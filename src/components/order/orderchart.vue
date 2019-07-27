<template>
  <div>
    <label :value="yearmonth"></label>
<!--    <div>当月总收入{{allsum}}   当月总单数{{allcount}}</div>-->
    <div class="total-layout">
      <el-row :gutter="20"><!--每一个栅栏之间的间隔-->
        <el-col :span="6"><!--宽度-->
          <div class="total-frame">
            <img :src="img_home_order" class="total-icon">
            <div class="total-title">当月总收入</div>
            <div class="total-value">{{allsum}} </div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="total-frame">
            <img :src="img_home_today_amount" class="total-icon">
            <div class="total-title">当月总单数</div>
            <div class="total-value">{{allcount}}</div>
          </div>
        </el-col>
      </el-row>
    </div>
  <div class="block" style="margin-top: 20px">
    <span class="demonstration">年月</span>
    <el-date-picker
      v-model="yearmonth"
      type="month"
      value-format="yyyy-MM"
      placeholder="选择月">
    </el-date-picker>
    <el-button type="primary" @click.native="selectmonth()">查询</el-button>
<!--    <el-button type="primary" @click.native="printchart()">打印表格</el-button>-->
  </div>

  <div ref="main" id="main" style="width: 800px;height: 400px;"></div>
  </div>
</template>

<script>
  import img_home_order from '@/assets/images/home_order.png';
  import img_home_today_amount from '@/assets/images/home_today_amount.png';
  import img_home_yesterday_amount from '@/assets/images/home_yesterday_amount.png';
  export default {
    name: 'orderchart',
    data () {
      return {
        yearmonth:"",
        allsum:0,
        allcount:0,
        sum:[],
        count:[],
        date:[],
        img_home_order,
        img_home_today_amount,
        img_home_yesterday_amount
      }
    },
    mounted () {

      this.$ajax('http://localhost:6925/order/chart').then(res => {

        this.date=res.data.data;
        this.sum = res.data.sum;
        this.count=res.data.count;
        this.allcount=res.data.allcount;
        this.allsum=res.data.allsum;
        this.drawLine();//这个要放在这里才会有数据 不然异步会晚于渲染
      }).catch(function (error) {
        console.log(error);

      });

    },
    created(){

    },

    methods:{
      selectmonth(){

        this.$ajax('http://localhost:6925/order/chart?year_month='+this.yearmonth).then(res => {
          this.date=res.data.data;
          this.sum = res.data.sum;
          this.count=res.data.count;
          this.allcount=res.data.allcount;
          this.allsum=res.data.allsum;
          this.drawLine();//这个要放在这里才会有数据 不然异步会晚于渲染
        })
          .catch((error)=>{
            console.log(error);
          });
      },
      drawLine(){
        let mychart=this.$echarts.init(this.$refs.main)

        mychart.setOption(
          {
            toolbox: {

              show: true,

              feature: {

                saveAsImage: {

                  show:true,

                  name:this.yearmonth+"运营折线图",

                  title:"下载",

                  excludeComponents :['toolbox'],

                  pixelRatio: 2

                }

              }

            },
            tooltip:{
              trigger:'axis'
            },
            legend: {
              data:['订单数','订单总金额']
            },

            xAxis: {
              name: '日期',
              type: 'category',
              data:this.date//选择五个就好了

        // data: ["1","2"] //选择五个就好了
      },
        yAxis: [{
          type:'value',
          name:'订单金额',
          axisLabel:{
            formatter:'{value}元'
          }
        },
          {
            type:'value',
            name:'订单数',
            axisLable:{
              formatter:'{value}笔'
            }
          }

        ],
          series: [
          {
            name:'订单数',
            type:'line',
            smooth:0.2,
            yAxisIndex:1,
            data:this.count
        // data:["1","2"]

      },
        {
          name:'订单总金额',
            type:'line',
          smooth:0.2,
          data:this.sum
          // data:["2","3"]
        }]

          }
        );
      }
    }
  }

</script>

<style scoped>
  .app-container {
    margin-top: 40px;
    margin-left: 120px;
    margin-right: 120px;
  }

  .address-layout {
  }

  .total-layout {
    text-align: left;
    margin-top: 20px;
  }

  .total-frame {

    border: 1px solid #DCDFE6;
    padding: 20px;
    height: 100px;
  }

  .total-icon {
    color: #409EFF;
    width: 60px;
    height: 60px;
  }

  .total-title {
    position: relative;
    font-size: 16px;
    color: #909399;
    left: 70px;
    top: -50px;
  }

  .total-value {
    position: relative;
    font-size: 18px;
    color: #606266;
    left: 70px;
    top: -40px;
  }

  .un-handle-layout {
    margin-top: 20px;
    border: 1px solid #DCDFE6;
  }

  .layout-title {
    color: #606266;
    padding: 15px 20px;
    background: #F2F6FC;
    font-weight: bold;
  }

  .un-handle-content {
    padding: 20px 40px;
  }

  .un-handle-item {
    border-bottom: 1px solid #EBEEF5;
    padding: 10px;
  }

  .overview-layout {
    margin-top: 20px;
  }

  .overview-item-value {
    font-size: 24px;
    text-align: center;
  }

  .overview-item-title {
    margin-top: 10px;
    text-align: center;
  }

  .out-border {
    border: 1px solid #DCDFE6;
  }

  .statistics-layout {
    margin-top: 20px;
    border: 1px solid #DCDFE6;
  }
  .mine-layout {
    position: absolute;
    right: 140px;
    top: 107px;
    width: 250px;
    height: 235px;
  }
  .address-content{
    padding: 20px;
    font-size: 18px
  }
</style>
