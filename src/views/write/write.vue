<template>
  <div>
    <mavon-editor ref="mdedit" v-model="ruleForm.content" style="height: 80vh">
    </mavon-editor>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ruleForm: {
        content: ''
      }
    }
  }
}
</script>

<style>
</style>