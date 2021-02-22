<template>
  <div :class="{ hidden: hidden }" class="pagination-container">
    <el-pagination
      :background="background"
      :current-page="currPageIndex"
      :page-size="currPageSize"
      :layout="layout"
      :page-sizes="pageSizes"
      :total="currTotal"
      v-bind="$attrs"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script>
import { scrollTo } from '@/utils/scroll-to'

export default {
  name: 'Pagination',
  props: {
    pageIndex: {
      type: Number,
      default: 1
    },
    pageSize: {
      type: Number,
      default: 20
    },
    total: {
      required: true,
      type: Number,
      default: 0
    },
    pageSizes: {
      type: Array,
      default() {
        return [10, 20, 30, 50]
      }
    },
    layout: {
      type: String,
      default: 'total, sizes, prev, pager, next, jumper'
    },
    background: {
      type: Boolean,
      default: true
    },
    autoScroll: {
      type: Boolean,
      default: true
    },
    hidden: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    currPageIndex() {
      return this.pageIndex
    },
    currPageSize() {
      return this.pageSize
    },
    currTotal() {
      return this.total
    },
    page() {
      const { pageIndex, pageSize, total } = this
      return { pageIndex, pageSize, total }
    }
  },
  watch: {
    page: {
      immediate: true,
      deep: true,
      handler(newValue, oldValue) {
        // 发生了查询数量不够分页的情况
        if (
          newValue.pageIndex !== 1 &&
          newValue.total <= (newValue.pageIndex - 1) * newValue.pageSize
        ) {
          // 直接跳转至第一页
          this.handleCurrentChange(1)
        }
      }
    }
  },
  methods: {
    handleSizeChange(val) {
      this.$emit('pagination', { pageIndex: 1, pageSize: val })
      if (this.autoScroll) {
        scrollTo(0, 800)
      }
    },
    handleCurrentChange(val) {
      this.$emit('pagination', { pageIndex: val, pageSize: this.currPageSize })
      if (this.autoScroll) {
        scrollTo(0, 800)
      }
    }
  }
}
</script>

<style scoped>
.pagination-container {
  background: #fff;
  padding: 32px 16px;
}
.pagination-container.hidden {
  display: none;
}
</style>
