<template>
  <div class="app-container">
<!--    去掉的设计-->
    <div class="address-layout">
<!--      <el-row :gutter="20">-->
<!--        <el-col :span="6">-->
<!--          <div class="out-border">-->
<!--            <div class="layout-title">GitHub地址</div>-->
<!--            <div class="color-main address-content">-->
<!--              <a href="https://github.com/macrozheng/mall">项目地址</a>-->
<!--            </div>-->
<!--          </div>-->
<!--        </el-col>-->
<!--        <el-col :span="6">-->
<!--          <div class="out-border">-->
<!--            <div class="layout-title">码云地址</div>-->
<!--            <div class="color-main address-content">-->
<!--              <a href="https://gitee.com/macrozheng/mall">项目地址</a>-->
<!--            </div>-->
<!--          </div>-->
<!--        </el-col>-->
<!--        <el-col :span="6">-->
<!--          <div class="out-border">-->
<!--            <div class="layout-title">学习教程</div>-->
<!--            <div class="color-main address-content">-->
<!--              <a href="https://github.com/macrozheng/mall-learning">项目地址</a>-->
<!--            </div>-->
<!--          </div>-->
<!--        </el-col>-->
<!--      </el-row>-->
    </div>
    <div class="total-layout">
      <el-row :gutter="20"><!--每一个栅栏之间的间隔-->
        <el-col :span="6"><!--宽度-->
          <div class="total-frame">
            <img :src="img_home_order" class="total-icon">
            <div class="total-title">今日订单总数</div>
            <div class="total-value">{{part1.todaycount}}</div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="total-frame">
            <img :src="img_home_today_amount" class="total-icon">
            <div class="total-title">今日销售总额</div>
            <div class="total-value">{{part1.todaysum}}</div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="total-frame">
            <img :src="img_home_order" class="total-icon">
            <div class="total-title">昨日订单总数</div>
            <div class="total-value">{{part1.yesterdaycount}}</div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="total-frame">
            <img :src="img_home_today_amount" class="total-icon">
            <div class="total-title">昨日销售总额</div>
            <div class="total-value">{{part1.yesterdaysum}}</div>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="overview-layout">
      <el-row :gutter="20">
        <el-col :span="12">
          <div class="out-border">
            <div class="layout-title">商家总览</div>
            <div style="padding: 40px">
              <el-row>
                <el-col :span="6" class="color-danger overview-item-value">{{part2.monthstore}}</el-col>
                <el-col :span="6" class="color-danger overview-item-value">{{part2.freestore}}</el-col>
                <el-col :span="6" class="color-danger overview-item-value">{{part2.unfreestore}}</el-col>
                <el-col :span="6" class="color-danger overview-item-value">{{part2.countstore}}</el-col>
              </el-row>
              <el-row class="font-medium">
                <el-col :span="6" class="overview-item-title">本月注册</el-col>
                <el-col :span="6" class="overview-item-title">冻结</el-col>
                <el-col :span="6" class="overview-item-title">在运营</el-col>
                <el-col :span="6" class="overview-item-title">全部商家</el-col>
              </el-row>
            </div>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="out-border">
            <div class="layout-title">用户总览</div>
            <div style="padding: 40px">
              <el-row>
                <el-col :span="6" class="color-danger overview-item-value">{{part3.todayuser}}</el-col>
                <el-col :span="6" class="color-danger overview-item-value">{{part3.yesterdayuser}}</el-col>
                <el-col :span="6" class="color-danger overview-item-value">{{part3.monthuser}}</el-col>
                <el-col :span="6" class="color-danger overview-item-value">{{part3.countuser}}</el-col>
              </el-row>
              <el-row class="font-medium">
                <el-col :span="6" class="overview-item-title">今日新增</el-col>
                <el-col :span="6" class="overview-item-title">昨日新增</el-col>
                <el-col :span="6" class="overview-item-title">本月新增</el-col>
                <el-col :span="6" class="overview-item-title">会员总数</el-col>
              </el-row>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="total-layout">
    <div class="layout-title" >今日优秀商家</div>
    <el-table
      :data="tableData"
      style="width: 100%"
      :default-sort = "{prop: 'sumpay', order: 'descending'}"
    >
      <el-table-column
        prop="categoryname"
        label="菜系"

        width="180">
      </el-table-column>
      <el-table-column
        prop="storename"
        label="最佳商家"

        width="180">
      </el-table-column>
      <el-table-column
        prop="sumpay"
        label="成交总额"
        sortable
        >
      </el-table-column>
      <el-table-column
        prop="countpay"
        label="成交笔数"
        sortable
      >
      </el-table-column>
    </el-table>
    </div>
    <div class="overview-layout">
      <el-row :gutter="20">
        <el-col :span="12">
          <div class="out-border">
            <div class="layout-title">今日最受好评商家</div>
            <div style="padding: 40px">
              <el-table
                :data="tableDatabest"
                style="width: 100%"
              >
                <el-table-column
                  prop="storename"
                  label="店家"

                  >
                </el-table-column>
                <el-table-column
                  prop="score"
                  label="评分"

                 >
                </el-table-column>
                <el-table-column
                  prop="count"
                  label="成交笔数"
                >
                </el-table-column>
              </el-table>
            </div>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="out-border">
            <div class="layout-title">今日口碑不佳商家</div>
            <div style="padding: 40px">
              <el-table
                :data="tableDataworst"
                style="width: 100%"
              >
                <el-table-column
                  prop="storename"
                  label="店家"
                 >
                </el-table-column>
                <el-table-column
                  prop="score"
                  label="评分"
                >
                </el-table-column>
                <el-table-column
                  prop="count"
                  label="成交笔数"
                >
                </el-table-column>
              </el-table>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>

</template>

<script>
  // 导入三张图片
  import img_home_order from '@/assets/images/home_order.png';
  import img_home_today_amount from '@/assets/images/home_today_amount.png';
  import img_home_yesterday_amount from '@/assets/images/home_yesterday_amount.png';
  export default {
    name: 'homepage',
    data(){
      return{
        tableData:[],
        part1:{
          todaycount:0,
          todaysum:0,
          yesterdaycount:0,
          yesterdaysum:0
        },
        part2:{
          monthstore:0,
          freestore:0,
          unfreestore:0,
          countstore:0
        },
        part3:{
          todayuser:0,
          yesterdayuser:0,
          monthuser:0,
          countuser:0
        },
        tableDatabest:[],
        tableDataworst:[],
        img_home_order,
        img_home_today_amount,
        img_home_yesterday_amount
      }
    },
    created () {
      this.$ajax('http://localhost:6925/homepage1').then(res => {
        this.part1=res.data
      }).catch(function (error) {
        console.log(error);
      });
      this.$ajax('http://localhost:6925/homepage2').then(res => {
        this.part2=res.data
      }).catch(function (error) {
        console.log(error);
      });
      this.$ajax('http://localhost:6925/homepage3').then(res => {
        this.part3=res.data
      }).catch(function (error) {
        console.log(error);
      });

      this.$ajax('http://localhost:6925/homepage4').then(res => {
        this.tableData=res.data
      }).catch(function (error) {
        console.log(error);
      });
      this.$ajax('http://localhost:6925/homepage5').then(res => {
        this.tableDatabest=res.data
      }).catch(function (error) {
        console.log(error);
      });
      this.$ajax('http://localhost:6925/homepage6').then(res => {
        this.tableDataworst=res.data
      }).catch(function (error) {
        console.log(error);
      });
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
