import { mount } from "@vue/test-utils";
import TeamMembersItem from "@/components/TeamMembers/Item/TeamMembersItem.vue";
import { TeamMember } from "@/types/teamMembers";
import { mockTeamMembers } from "tests/unit/__mocks__/TeamMembersService";
import { Quasar } from "quasar";

async function mountWrapper() {
  const wrapper = mount(TeamMembersItem, {
    global: {
      plugins: [[Quasar, {}]],
    },
    props: {
      entity: mockTeamMembers[0],
    },
  });

  return wrapper;
}

describe("TeamMembersItem", () => {
  it("render", async () => {
    const wrapper = await mountWrapper();
    expect(wrapper.find(".item").exists()).toBe(true);
    wrapper.unmount();
  });
});
