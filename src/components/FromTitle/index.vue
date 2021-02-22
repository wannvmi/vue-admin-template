<template>
  <div class="from-title">
    <span>{{ infoTitle }}</span>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: null
    }
  },
  computed: {
    infoTitle() {
      return this.title
    }
  }
}
</script>

<style lang="scss" scoped>
.from-title {
  padding-left: 10px;

  > span {
    display: block;
    position: relative;

    font-size: 14px;
    font-weight: bold;
    color: #333333;
    line-height: 40px;

    &::before {
      content: '';
      @extend %vertical-center;
      left: -10px;

      width: 3px;
      height: 10px;
      background-color: #999999;
    }
  }
}
</style>
