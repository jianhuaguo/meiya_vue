<template>
  <div class="app-container">
    <el-card class="filter-container" shadow="never">
      <div>
        <i class="el-icon-search"></i>
        <span>筛选搜索</span>
        <el-button
          style="float:right"
          type="primary"
          @click="handleSearchList()"
          size="small">
          查询搜索
        </el-button>
        <el-button
          style="float:right;margin-right: 15px"
          @click="handleResetSearch()"
          size="small">
          重置
        </el-button>
      </div>
      <div style="margin-top: 15px">
        <el-form :inline="true" :model="listQuery" size="small" label-width="140px">
          <el-form-item label="活动名称：">
            <el-input v-model="listQuery.keyword" class="input-width" placeholder="活动名称" clearable></el-input>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets"></i>
      <span>数据列表</span>
      <el-button size="mini" class="btn-add" @click="handleAdd()" style="margin-left: 20px">添加活动</el-button>
    </el-card>
    <div class="table-container">
      <el-table ref="flashTable"
                :data="list"
                style="width: 100%;"
                v-loading="listLoading" border>
        <el-table-column label="活动编号" width="100" align="center">
          <template slot-scope="scope">{{scope.row.id}}</template>
        </el-table-column>
        <el-table-column label="活动标题" align="center">
          <template slot-scope="scope">{{scope.row.name}}</template>
        </el-table-column>
        <el-table-column label="开始时间" width="140" align="center">
          <template slot-scope="scope">{{scope.row.start_time |formatDate }}</template>
        </el-table-column>
        <el-table-column label="结束时间" width="140" align="center">
          <template slot-scope="scope">{{scope.row.end_time |formatDate }}</template>
        </el-table-column>
        <el-table-column label="描述" width="140" align="center">
          <template slot-scope="scope">{{scope.row.description }}</template>
        </el-table-column>
        <el-table-column label="上线/下线" width="200" align="center">
          <template slot-scope="scope">
            <el-switch
              @change="handleStatusChange(scope.$index, scope.row)"
              :active-value="1"
              :inactive-value="0"
              v-model="scope.row.status">
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="180" align="center">
          <template slot-scope="scope">
            <el-button size="mini"
                       type="text"
                       @click="handleUpdate(scope.$index, scope.row)">
              编辑
            </el-button>
            <el-button size="mini"
                       type="text"
                       @click="handleDelete(scope.$index, scope.row)">删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination-container">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        layout="total, sizes,prev, pager, next,jumper"
        :current-page.sync="listQuery.pageNum"
        :page-size="listQuery.pageSize"
        :page-sizes="[5,10,15]"
        :total="total">
      </el-pagination>
    </div>
    <el-dialog
      title="添加活动"
      :visible.sync="dialogVisible"
      width="40%">
      <el-form :model="flashPromotion"
               ref="flashPromotionForm"
               label-width="150px" size="small">
        <el-form-item label="活动标题：">
          <el-input v-model="flashPromotion.name" style="width: 250px"></el-input>
        </el-form-item>
        <el-form-item label="开始时间：">
          <el-date-picker
            v-model="flashPromotion.start_time"
            type="datetime"
            format="yyyy-MM-dd HH:mm:ss"
            placeholder="请选择时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="结束时间：">
          <el-date-picker
            v-model="flashPromotion.end_time"
            type="datetime"
            format="yyyy-MM-dd HH:mm:ss"
            placeholder="请选择时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="具体描述">
          <el-input  type="textarea" v-model="flashPromotion.description" style="width: 250px"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false" size="small">取 消</el-button>
        <el-button type="primary" @click="handleDialogConfirm()" size="small">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import {formatDate} from '@/utils/date';

  const defaultListQuery = {
    pageNum: 1,
    pageSize: 5,
    keyword: ""
  };
  const defaultFlashPromotion = {
    id: null,
    name: "",
    start_time: "",
    end_time: "",
    status: 1,
    description:"",
  };


  export default {
    name: 'seckillrelease',

    data(){
      return {
        listQuery:{//查询框
          pageNum: 1,
          pageSize: 5,
          keyword: ""
        },
        list: null,//活动列表
        total: null,//总的数据条数
        listLoading: false,
        dialogVisible: false,//增加活动的弹框可不可见
        isEdit: false,//增加和编辑活动通用一个框
        flashPromotion: {//增加活动的弹框
          id: null,
          name: "",
          start_time: "",
          end_time: "",
          status: 1,
          description:"",
        },
      }
    },
    created () {
      //从后面得所有活动的数据
      this.$ajax.post('http://localhost:6925/seckill/selectall',{currentPage:this.listQuery.pageNum,searchname:this.listQuery.keyword,pagesize:this.listQuery.pageSize}).then((response)=>{
       console.log(response)
        // for(var i=0;i<response.data.eventsdata.length;i++)
        // {
        //   response.data.eventsdata[i].start_time=response.data.eventsdata[i].start_time.substring(0,19)//只截取到秒
        //   response.data.eventsdata[i].end_time=response.data.eventsdata[i].end_time.substring(0,19)
        // }
       this.list=response.data.eventsdata
        this.total=response.data.number
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
      handleUpdate(index, row) {
        console.log(index)
        console.log(row)
        this.dialogVisible = true;
        this.isEdit = true;
        this.flashPromotion = Object.assign({},row);
      },
      //跳出弹窗 进行增加
      handleAdd(){
        this.dialogVisible = true;
        this.isEdit = false;
        this.flashPromotion = Object.assign({},defaultFlashPromotion);
      },
      //重置
      handleResetSearch() {
        this.listQuery = Object.assign({}, defaultListQuery);
      },
      handleSearchList() {
        this.listQuery.pageNum = 1;
        this.getList();
      },
      handleSizeChange(val) {
        this.listQuery.pageNum = 1;
        this.listQuery.pageSize = val;
        this.getList();
      },
      handleCurrentChange(val) {
        this.listQuery.pageNum = val;
        this.getList();
      },
      getList() {
        this.listLoading = true;
        this.$ajax.post('http://localhost:6925/seckill/selectall',{currentPage:this.listQuery.pageNum,searchname:this.listQuery.keyword,pagesize:this.listQuery.pageSize}).then((response)=>{
          // for(var i=0;i<response.data.eventsdata.length;i++)
          // {
          //   response.data.eventsdata[i].start_time=response.data.eventsdata[i].start_time.substring(0,19)//只截取到秒
          //   response.data.eventsdata[i].end_time=response.data.eventsdata[i].end_time.substring(0,19)
          // }
          this.listLoading = false;
          this.list=response.data.eventsdata
          this.total=response.data.number
        })
          .catch((error)=>{
            console.log(error);
          });

      },
      handleDialogConfirm() {
        this.$confirm('是否要确认?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          if (this.isEdit) {
            this.$ajax.post('http://localhost:6925/event/edited',{
              id:this.flashPromotion.id,
              name:this.flashPromotion.name,
              start_time:this.flashPromotion.start_time,
              end_time:this.flashPromotion.end_time,
              description:this.flashPromotion.description,
            }).then((response)=>{
              this.$message({
                message: '修改成功！',
                type: 'success'
              });
              this.dialogVisible =false;
            })
              .catch((error)=>{
                console.log(error);
              });
          } else {
            this.$ajax.post('http://localhost:6925/seckill/add',{
              name:this.flashPromotion.name,
              start_time:this.flashPromotion.start_time,
              end_time:this.flashPromotion.end_time,
              description:this.flashPromotion.description,

            }).then((response)=>{
              this.$message({
                message: '修改成功！',
                type: 'success'
              });
              this.dialogVisible =false;
            })
              .catch((error)=>{
                console.log(error);
              });
          }
        })
      },


    }
  }
</script>

<style scoped>

</style>
