<template>
  <div>
    <label :value="yearmonth"></label>
    <div>当月总收入{{allsum}}   当月总单数{{allcount}}</div>
  <div class="block">
    <span class="demonstration">年月</span>
    <el-date-picker
      v-model="yearmonth"
      type="month"
      value-format="yyyy-MM"
      placeholder="选择月">
    </el-date-picker>
  </div>
    <el-button type="primary" @click.native="selectmonth()">查询</el-button>
  <div ref="main" style="width: 600px;height: 400px;"></div>
  </div>
</template>

<script>
  export default {
    name: 'orderchart',
    data () {
      return {
        yearmonth:"",
        allsum:0,
        allcount:0,
        sum:[],
        count:[],
        date:[]
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

</style>
