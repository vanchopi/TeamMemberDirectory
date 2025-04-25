<template>
  <BasePopUp 
    :show="show"
    @close="onClose"
    >
    <template #title>
      Team Member Details
    </template>
    <template #content>
      <div class="item">
        <q-item class="pd-0">
          <q-item-section avatar>
            <AvatarPresentation :entity="teamMember.avatar"/>
          </q-item-section>
          <q-item-section class="item-info__wrapper">
            <InfoPresentation :entity="teamMember"/>        
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section class="justify-start">
            <div class="flex justify-start items-start q-mt-sm q-mb-sm">
              <div class="name">Email:</div>
              <div class="option">{{teamMember.email}}</div>
            </div>
            <div class="q-mb-sm">
              <div class="name bold">Bio</div>
              <q-separator />
              <div class="option">{{teamMember.bio}}</div>
            </div>
            <div class="q-mb-sm">
              <div class="name bold">Skills</div>
              <q-separator />
              <SkillsPresentation :entity="teamMember.skills"/>
            </div>
          </q-item-section>
        </q-item> 
      </div> 
    </template>
  </BasePopUp>
</template>

<script setup lang="ts">
import { ref, computed, watch } from "vue";
import { TeamMember } from '@/types/teamMembers';
import BasePopUp from "@/components/PopUps/BasePopUp.vue";
import AvatarPresentation from "@/components/TeamMembers/Presentations/AvatarPresentation.vue"
import SkillsPresentation from "@/components/TeamMembers/Presentations/SkillsPresentation.vue";
import InfoPresentation from "@/components/TeamMembers/Presentations/InfoPresentation.vue";

interface Props {
  show: boolean;
  teamMember: TeamMember;
}

const props = withDefaults(defineProps<Props>(), {
  show: false,
  teamMember: () => ({} as TeamMember),
});

const emit = defineEmits<{
  (e: "close"): void;
}>();

const onClose = (): void => {
  emit("close");
};

</script>
<style lang="scss">
@import '../styles/scss/teamMember.scss';
.base-dialog{
  .item {
    height: auto;
    &:after{
      content: none;
    }
    .q-item{
      align-items: flex-start;
      &.pd-0{
        padding: 10px 0;
      }
      .q-item__section--side{
        padding-right: 30px;
        &>.q-avatar{
          font-size: 80px;
        }
      }
      .q-item__label{
        &.title{
          font-size: 22px;
        }
        &.text-caption{
          font-size: 16px;
          margin-top: 6px;
        }
        &.thumbnail{
          font-size: 14px;
        }
      }
      .item-info__wrapper{
        &.justify-center{
          align-self: stretch;
          justify-content: space-between;
        }
      }
      .name{
        color: $dark-grey;
        font-size: 14px;
        font-style: italic;
        margin-right: 15px;
        &.bold{
          font-weight: 600;
          font-size: 16px;
        }
      }
      .option{
        color: $dark-grey;
        font-size: 14px;
      }
      .q-separator{
        margin: 7px 0 5px;
        line-height: 1px;
      }
      .q-chip{
        height: 25px;
      }
    }
    .item-chips__wrapper{
      padding: 5px 0px;
      width: calc(100% + 8px);
      margin-left: -4px;
    }
  }
}
</style>
