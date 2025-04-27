import { Module } from "vuex";
import { RootState } from "../index";
import TeamMembersService from "@/services/TeamMembers/TeamMembers";
import { TeamMember, TeamMembersResponse } from "@/types/teamMembers";
import { reviewData } from "@/utils/helpers";

const service = new TeamMembersService();

export interface TeamMembersState {
  teamMembers: TeamMember[];
  gridType: string;
  gridTypes: string[];
}

const state: TeamMembersState = {
  teamMembers: [],
  gridTypes: ["grid", "list"],
  gridType: "",
};

const mutations = {
  SET_TEAM_MEMBERS(state: TeamMembersState, payload: TeamMember[]) {
    state.teamMembers = payload;
  },
  SET_GRID_TYPE(state: TeamMembersState, value: string) {
    state.gridType = value;
  },
};

const actions = {
  async getTeamMembers({ commit }: any): Promise<void> {
    try {
      const result = await service.get<TeamMembersResponse>(
        "team-members.json"
      );
      commit("SET_TEAM_MEMBERS", reviewData<TeamMember>(result.data));
    } catch (e) {
      console.error(e);
    }
  },
  setGridType({ commit }: any, value: string): void {
    commit("SET_GRID_TYPE", value);
  },
};

const teamMembersModule: Module<TeamMembersState, RootState> = {
  namespaced: true,
  state,
  mutations,
  actions,
};

export default teamMembersModule;
