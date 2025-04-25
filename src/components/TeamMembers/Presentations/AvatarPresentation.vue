<template>
  <q-avatar>
    <img :src="entity">
  </q-avatar>
</template>

<script setup lang="ts">
interface Props {
  entity: string;
  mode?: string;
}

const props = withDefaults(defineProps<Props>(), {
  entity: "",
  mode: "",
});
</script>
<style lang="scss">
  
</style>
