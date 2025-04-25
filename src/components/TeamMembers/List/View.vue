<template>
  <div class="page-title">
    <div class="text-h5">
      Team Member Directory
    </div>
  </div>
  <div class="page-content">
    <Filter 
      :service="service"
      :data="teamMembersList"
      :loading="filterLoading"
      @update="onFilterUpdate"
    />
    <transition
      appear
      enter-active-class="animated fadeIn"
      leave-active-class="animated fadeOut"
    >
      <div v-show="!loading">
        <q-virtual-scroll
          :items="chunkedTeamMembers"
          :virtual-scroll-item-size="gridType === 'grid' ? itemHeight : 90"
          class="page-items"
          :class="gridType"
          style="height: calc(100vh - 195px); overflow-y: auto;"
        >
          <template #default="{ item, index }">
            <div v-if="gridType === 'grid'" class="row q-col-gutter-md q-mb-md">
              <div class="col-md-4 col-sm-6 col-xs-12" v-for="member in item" :key="member.id">
                <TeamMembersItem
                  :teamMember="member"
                  @show-info="onShowInfo"
                />
              </div>
            </div>
            <div v-else>
              <q-item class="page-items__header flex justify-start items-center" v-if="index === 0">
                <div 
                  v-for="name in tableNames"
                  :key="`th-${name}`"
                  class="th"
                >
                  {{ name }}
                </div>
              </q-item>
              <TeamMembersItem
                :teamMember="item"
                :key="item.id"
                @show-info="onShowInfo"
              />
            </div>
          </template>
        </q-virtual-scroll>
      </div>
    </transition>
    <q-inner-loading :showing="loading">
      <q-spinner-gears size="50px" color="primary" />
    </q-inner-loading>
  </div>
  <TeamMemberInfo 
    :show="showInfo"
    :teamMember="activeTeamMember"
    @close="showInfo = false"
  />
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onBeforeUnmount } from "vue";
import { useStore } from "vuex";
import { TeamMember, TeamMembersFilter } from '@/types/teamMembers';
import TeamMembersService from "@/services/TeamMembers/TeamMembers";
import Filter from "@/components/TeamMembers/Filter/TeamMembersFilter";
import TeamMembersItem from "@/components/TeamMembers/Item/TeamMembersItem";
import TeamMemberInfo from "@/components/TeamMembers/PopUps/TeamMemberInfo.vue";
import { useResponsiveGrid } from '@/composables/useResponsiveGrid';
import { filterBy } from "@/utils/filter";

const { columnsPerRow, itemHeight } = useResponsiveGrid();

const service = new TeamMembersService();
const store = useStore();

const teamMembersList = computed<TeamMember[]>(() => {
  return store?.state.teamMembers.teamMembers;
});

const chunkedTeamMembers = computed(() => {
  return gridType.value === 'grid'
    ? chunkArray(filteredteamMembers.value, columnsPerRow.value)
    : filteredteamMembers.value;
});

const gridType = computed<string>(() => {
  return store?.state.teamMembers.gridType
});

const showInfo = ref<boolean>(false);
const activeTeamMember = ref<TeamMember>({});
const filteredteamMembers = ref<TeamMember[]>([]);
const tableNames: string[] = ["", "Name", "Position", "Department", "Skills"];
const loading = ref<boolean>(false);
const filterLoading = ref<boolean>(false);

const chunkArray = <T,>(arr: T[], chunkSize: number): T[][] => {
  const result: T[][] = [];
  for (let i = 0; i < arr.length; i += chunkSize) {
    result.push(arr.slice(i, i + chunkSize));
  }
  return result;
};

const onShowInfo = (teamMember: TeamMember): void => {
  showInfo.value = true;
  activeTeamMember.value = teamMember;
}

const onFilterUpdate = (filter: TeamMembersFilter): void => {
  filterLoading.value = true;
  filterBy<TeamMembersFilter, TeamMember>(filter, teamMembersList.value)
    .then((filtered) => {
      filteredteamMembers.value = filtered;
    })
    .catch((e) => {
      console.log(e);
    }).finally(() => {
      filterLoading.value = false;
    })  
}

const getTeamMemebrs = async (): any => {
  loading.value = true;
  try {
    await store?.dispatch("teamMembers/getTeamMembers");
    filteredteamMembers.value = teamMembersList.value;
  } catch (e) {      
    console.log(e);
  } finally {
    loading.value = false;
  }
};

const setDefautData = ((): void => {
  getTeamMemebrs();
})();


defineExpose({
  getTeamMemebrs,
  onFilterUpdate
});
</script>
<style lang="scss">
@import '@/assets/scss/variables.scss';
.page-title{
  background-color: $page-block-bg;
  text-align: left;
  padding: 18px 35px;
  border: 1px solid $table-border-color;
}
.page-content{
  padding: 0 20px;
}
.page-items{
  display: grid;
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar { 
    display: none; 
  }
  &.list{
    grid-template-columns: repeat(1, 1fr);
    gap: 0px;
  }
}
.page-items__header{
  background-color: $table-header-color;
  border: 1px solid $table-border-color;
  border-radius: 4px;
  &.q-item{
    min-height: 40px;
    padding-top: 0;
    padding-bottom: 0;
  }
  .th{
    width: calc(100% / 5);
    font-style: italic;
    letter-spacing: -1px;
    text-align: left;
    color: $dark-grey;
    padding: 0 5px;
    &:nth-child(1){
      width: 40px;
    }
    &:nth-child(2){
      width: 29%;
    }
    &:nth-child(3){
      width: 24%;
    }
    &:nth-child(4){
      width: 15%;
    }
    &:nth-child(5){
      width: 20%;
    }
  }
}
</style>
