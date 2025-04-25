<template>
  <div class="item-chips__wrapper">
    <q-chip 
      v-for="skill in entity"
      :key="skill"
      size="12px"           
      color="secondary" 
      text-color="primary"
      >
        {{skill}}
    </q-chip>
  </div>
</template>

<script setup lang="ts">
interface Props {
  entity: string[];
  mode?: string;
}

const props = withDefaults(defineProps<Props>(), {
  entity: () => [],
  mode: "",
});
</script>
<style lang="scss"></style>
