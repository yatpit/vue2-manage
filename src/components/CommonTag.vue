<template>
  <div class="tabs">
      <el-tag
        v-for="(tag, index) in tags"
        :key='tag.name'
        :closable="tag.name !== 'home'"
        :effect="$route.name === tag.name ? 'dark' : 'plain'"
        @click="changeMenu(tag)"
        @close='handleClose(tag, index)'
        size="small"
      >
        {{tag.label}}
      </el-tag>
  </div>
</template>

<script>
import {mapState,mapMutations} from 'vuex'
export default {
    name: 'CommonTag',
    data() {
        return {

        }
    },
    computed: {
        ...mapState({
            tags: state => state.tab.tabsList
        }),
    },
    methods: {
        ...mapMutations({
            close: 'closeTag'
        }),
        changeMenu(tag) {
            this.$router.push({name: tag.name})
        },
        handleClose(tag, index) {
            const length = this.tags.length - 1
            // 如果点击的面包屑标签不是最后一个，则无需改变高亮
            this.close(tag)
            if(tag.name !== this.$route.name) {
                return
            }
            // 如果点击的面包屑标签是最后一个，则将高亮往前移动一位
            if(index === length) {
                this.$router.push({
                    name: this.tags[index - 1].name
                })
            }else{
                this.$router.push({
                    name: this.tags[index].name
                })
            }
        }
    }
}
</script>

<style lang="less" scoped>
.tabs{
    padding: 20px;
    .el-tag {
        margin-right: 15px;
        cursor: pointer;
    }
}

</style>