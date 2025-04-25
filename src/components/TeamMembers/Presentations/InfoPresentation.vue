<template>
  <div class="item-name__wrapper">
    <q-item-label class="title">{{entity.name}}</q-item-label>
    <q-item-label caption v-if="gridType === 'list'">{{entity.email}}</q-item-label>
  </div>
  <q-item-label class="department" caption>{{entity.position}}</q-item-label>
  <q-item-label class="thumbnail">{{entity.department}}</q-item-label>
</template>

<script setup lang="ts">
import { TeamMember } from '@/types/teamMembers';
interface Props {
  entity: TeamMember;
  gridType?: string;
  mode?: string;
}

const props = withDefaults(defineProps<Props>(), {
  entity: () => ({} as TeamMember),
  mode: "",
  gridType: "",
});
</script>
<style lang="scss">
  
</style>
