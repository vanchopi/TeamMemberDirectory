import { mount, flushPromises } from "@vue/test-utils";
import { nextTick } from "vue";
import InfoPresentation from "@/components/TeamMembers/Presentations/InfoPresentation.vue";
import { TeamMember } from "@/types/teamMembers";
import { mockTeamMembers } from "tests/unit/__mocks__/TeamMembersService";
import { Quasar } from "quasar";

async function mountWrapper() {
  const wrapper = mount(InfoPresentation, {
    global: {
      plugins: [[Quasar, {}]],
    },
    props: {
      entity: mockTeamMembers[0],
      gridType: "",
    },
  });

  return wrapper;
}

describe("InfoPresentation", () => {
  it("render", async () => {
    const wrapper = await mountWrapper();
    expect(wrapper.html()).toContain(mockTeamMembers[0].name);
    expect(wrapper.html()).toContain(mockTeamMembers[0].position);
    expect(wrapper.html()).toContain(mockTeamMembers[0].department);
    await wrapper.setProps({
      gridType: "list",
    } as Partial<typeof wrapper.vm.$props>);
    await flushPromises();
    await nextTick();
    expect(wrapper.html()).toContain(mockTeamMembers[0].email);
    wrapper.unmount();
  });
});
