<template>
  <div>
    <div align="center">
      选择秒杀场次
      <el-select
        v-model="eventid"
        @change="selectchange"
        placeholder="请选择秒杀活动">
        <el-option v-for= "ca in events"  :value="ca.id"  :label="ca.name" :key="ca.id">{{ca.name}}</el-option>
      </el-select>
    </div>
    <el-table
              :data="thisevent"
              style="width: 100%;"
               border>
      <el-table-column label="活动标题" width="140" align="center">
        <template slot-scope="scope">{{scope.row.name}}</template>
      </el-table-column>
      <el-table-column label="开始时间" width="140" align="center">
        <template slot-scope="scope">{{scope.row.start_time |formatDate }}</template>
      </el-table-column>
      <el-table-column label="结束时间" width="140" align="center">
        <template slot-scope="scope">{{scope.row.end_time |formatDate }}</template>
      </el-table-column>
      <el-table-column label="描述"  align="center">
        <template slot-scope="scope">{{scope.row.description }}</template>
      </el-table-column>
    </el-table>
    <el-card style="width: 225px; height: 280px;float:left; margin: 5px;"
             bodyStyle="padding:5px" shadow="hover" v-for="item in foods" :key="item.id">
      <el-image style="height: 200px; width: 100%;" :src="item.photo" alt="封面" fit="cover"></el-image>
      <div style="padding: 14px;">
        <span>{{item.name}}</span>
        <div class="bottom clearfix">
          <span>秒杀价格{{item.seckill_price}}</span>
          <el-button type="text" class="button" @click="examine(item.seckillid)" >审核通过</el-button>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
  import {formatDate} from '@/utils/date';
  export default {
    inject: ['reload'],

    name: 'seckillexamine',
    data(){
      return{
        eventid:"",
        events: [],
        thisevent: [],
        foods:[]
      }
    },
    created () {
      this.$ajax('http://localhost:6925/event/future').then((response)=>{
        console.log(response.data)
        this.events=response.data
      })
        .catch((error)=>{
          console.log(error);
        });
    },
    filters:{
      formatDate(time) {
        if (time == null || time === '') {
          return 'N/A';
        }
        let date = new Date(time);
        return formatDate(date, 'yyyy-MM-dd hh:mm:ss')
      }
    },
    methods:{
      //下拉框的值改变时触发事件
      selectchange(selected){
        this.$ajax.post('http://localhost:6925/event/selectid',{id:selected}).then((response)=>{
              this.thisevent=response.data
        })
          .catch((error)=>{
            console.log(error);
          });

        this.$ajax.post('http://localhost:6925/event/foods',{id:selected}).then((response)=>{
          this.foods=response.data
          console.log(response.data)
        })
          .catch((error)=>{
            console.log(error);
          });
      },
      examine(id){
        this.$ajax.post('http://localhost:6925/events/updatefoodstatus',{id:id}).then((response)=>{
          console.log(response.data)
        })
          .catch((error)=>{
            console.log(error);
          });

        setTimeout(() =>{
          this.reload();
        },1000);
      }
    }
  }
</script>

<style scoped>
  .time {
    font-size: 13px;
    color: #999;
  }

  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .button {
    padding: 0;
    float: right;
  }

  .image {
    width: 100%;
    display: block;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }

  .clearfix:after {
    clear: both
  }
</style>
