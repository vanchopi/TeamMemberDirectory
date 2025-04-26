<template>
  <TeamMembersList :service="service" />
</template>

<script setup lang="ts">
import TeamMembersList from "@/components/TeamMembers/List/View.vue";
import TeamMembersService from "@/services/TeamMembers/TeamMembers";

const service: TeamMembersService = new TeamMembersService();
</script>
<style lang="scss"></style>
