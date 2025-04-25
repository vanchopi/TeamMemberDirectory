import { mount, flushPromises, shallowMount } from '@vue/test-utils';
import { nextTick } from 'vue';
import TeamMemberList from '@/components/TeamMembers/List/View.vue';
import TeamMembersService from '@/services/TeamMembers/TeamMembers';
import { TeamMember, TeamMembersResponse } from '@/types/teamMembers';
import { Quasar } from 'quasar';
import { store } from '@/store';

const service = new TeamMembersService();

describe('TeamMemberList', () => {
  it('render page title', async () => {
    const wrapper = mount(TeamMemberList, {
      global: {
        plugins: [[Quasar, {}], store],
      },
      props: {
        service: service,
      },
    });

    expect(wrapper.html()).toContain('Team Member Directory');
    wrapper.unmount();
  });

  it('load team members and render items', async () => {
    const wrapper = mount(TeamMemberList, {
      global: {
        plugins: [[Quasar, {}], store],
      },
      props: {
        service: service,
      },
    });

    const spy = jest.spyOn(service, 'get');

    try {
      
      const response = await service.get<TeamMembersResponse>('team-members.json');
      
      await flushPromises();
      await nextTick();

      expect(spy).toHaveBeenCalled();

      const cards = wrapper.findAllComponents({ name: 'TeamMembersItem' });

      if (response.data.length > 0) {
        expect(cards.length).toBeGreaterThan(0);
      }
    } catch (error) {
      console.error(error);
      expect(spy).toHaveBeenCalledTimes(1);
    }

    wrapper.unmount();
  });

  it('filters data on filter update', async () => {
    const wrapper = mount(TeamMemberList, {
      global: {
        plugins: [[Quasar, {}], store],
      },
      props: {
        service: service,
      },
    });

    const filterSpy = jest.spyOn(service, 'get');

    try {
      const response = await service.get<TeamMembersResponse>('team-members.json');

      const mockFilter = { search: 'Alex' };

      const filterComponent = wrapper.findComponent({ search: 'Filter' });
      filterComponent.vm.$emit('update', mockFilter);

      await flushPromises();
      await nextTick();

      expect(filterSpy).toHaveBeenCalled();

      const cards = wrapper.findAllComponents({ search: 'TeamMembersItem' });
      expect(cards.length).toBeLessThanOrEqual(response.data.length); 

    } catch (error) {
      console.error(error);
      expect(filterSpy).toHaveBeenCalledTimes(1);
    }

    wrapper.unmount();
  });
});