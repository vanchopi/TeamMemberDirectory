import { createStore } from 'vuex';
import teamMembers from './modules/teamMembers';

export interface RootState {
  perPageArr: number[];
  pagination: {
    page: number;
    rowsPerPage: number;
    itemsOnPage: number;
  };
  delimiter: string;
}

export const store = createStore({
  state: <RootState>{
    perPageArr: [5, 10, 25, 50, 100, 200, 500, 1000],
    pagination: {
      page: 1,
      rowsPerPage: 100,
      itemsOnPage: 15,
    },
    delimiter: '##',
  },
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    teamMembers,
  },
});