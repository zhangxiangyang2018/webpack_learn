<template>
  <div id="logs">
    <div id="head">
      <el-row :gutter="2">
        <el-col :span="7">
          <el-input
            placeholder="请输入内容 "
            v-model="searchContent"
            style="width:90%"
            size="small"
          ></el-input>
        </el-col>
        <el-col :span="4">
          <el-button
            type="primary"
            class="btn_theme"
            size="small"
            @click="search"
            >搜索</el-button
          >
        </el-col>
      </el-row>
    </div>
    <el-table
      :data="tableData"
      :max-height="height"
      border
      style="width: 100%;margin:20px 0 10px 0;border-radius: 10px;"
    >
      <el-table-column
        label="序号"
        type="index"
        width="80"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="username"
        label="用户名"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="ip"
        label="用户IP"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="operation"
        label="操作类型"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="createTime"
        label="操作时间"
        align="center"
      ></el-table-column>
      <el-table-column label="操作" align="center" width="120">
        <template slot-scope="scope">
          <el-button
            type="primary"
            class="btn_theme"
            @click="deleteRow(scope.row)"
            size="small"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      style="float:right"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[10, 15, 20]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
  </div>
</template>
<script>
import url from "@/api/system.js";
export default {
  data() {
    return {
      height: Number(window.screen.availHeight) * 0.7,
      tableData: [],
      searchContent: "", //搜索内容
      currentPage: 1, //当前页
      pageSize: 10,
      total: 0
    };
  },

  mounted() {
    this.getLogs();
  },
  methods: {
    getLogs() {
      let that = this;
      let params = {
        pageNum: this.currentPage,
        pageSize: this.pageSize,
        keyWord: this.searchContent
      };
      this.$axios.get(url.getAlllog, { params: params }).then(res => {
        if (res.status == 200) {
          that.tableData = res.data.data.records;
          that.total = Number(res.data.data.total);
        } else {
          this.$message({
            type: "warning",
            message: res.data.message
          });
        }
      });
    },
    deleteRow(data) {
      let that = this;
      this.$confirm("此操作将永久删除此条日志, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        cancelButtonClass: "btn-custom-cancel",
        type: "warning"
      })
        .then(() => {
          this.$axios.delete(url.deleteLog + data.id).then(res => {
            if (res.status == 200) {
              this.$message({
                type: "success",
                message: "操作成功"
              });
              that.currentPage = 1;
              that.getLogs();
            } else {
              this.$message({
                type: "warning",
                message: res.data.message
              });
            }
          });
        })
        .catch(() => {
          that.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    search() {
      this.currentPage = 1;
      this.getLogs();
    },

    //2. 改变当前请求几条数据
    handleSizeChange(val) {
      this.pageSize = val;
      this.currentPage = 1;
      this.getLogs();
    },
    //3.改变当前请求第几页
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getLogs();
    }
  }
};
</script>

<style lang="scss" scoped>
#logs {
  .el-scrollbar__wrap {
    overflow-x: hidden;
  }
  .el-table {
    width: 99.99% !important;
  }
  width: 100%;
}
</style>
