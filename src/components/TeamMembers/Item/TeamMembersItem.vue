<template>
  <q-card flat 
    class="item"
    :class="setRowClass()"
    >
    <q-item 
      clickable 
      @click="onShowInfo()"
      >
      <q-item-section avatar>
        <AvatarPresentation :entity="teamMember.avatar"/>
      </q-item-section>

      <q-item-section class="item-info__wrapper">
        <InfoPresentation :entity="teamMember" :gridType="gridType"/>        
      </q-item-section>
    </q-item>

    <q-card-section class="items-skills__wrapper" horizontal>
      <SkillsPresentation :entity="teamMember.skills"/>
    </q-card-section>

    <!-- <div class="item-bottom"></div> -->
  </q-card>
</template>

<script setup lang="ts">
import { ref, computed, watch } from "vue";
import { TeamMember } from '@/types/teamMembers';
import { useStore } from "vuex";
import AvatarPresentation from "@/components/TeamMembers/Presentations/AvatarPresentation.vue"
import SkillsPresentation from "@/components/TeamMembers/Presentations/SkillsPresentation.vue";
import InfoPresentation from "@/components/TeamMembers/Presentations/InfoPresentation.vue";

interface Props {
  teamMember: TeamMember;
}

const props = withDefaults(defineProps<Props>(), {
  teamMember: () => ({} as TeamMember),
});

const emit = defineEmits<{
  (e: "show-info", teamMember: TeamMember): void;
}>();

const store = useStore();

const gridType = computed<string>(() => {
  return store?.state.teamMembers.gridType
});

const setRowClass = (): string => {
  return gridType.value === 'list' ? 'flex justify-between items-center' : '';
}

const onShowInfo = (): void => {
  emit("show-info", props.teamMember);
}

</script>
<style lang="scss">
@import '../styles/scss/teamMember.scss';
</style>
