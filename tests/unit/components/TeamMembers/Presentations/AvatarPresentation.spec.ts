import { mount } from "@vue/test-utils";
import AvatarPresentation from "@/components/TeamMembers/Presentations/AvatarPresentation.vue";
import { TeamMember } from "@/types/teamMembers";
import { mockTeamMembers } from "tests/unit/__mocks__/TeamMembersService";
import { Quasar } from "quasar";

async function mountWrapper() {
  const wrapper = mount(AvatarPresentation, {
    global: {
      plugins: [[Quasar, {}]],
    },
    props: {
      entity: mockTeamMembers[0].avatar,
    },
  });

  return wrapper;
}

describe("AvatarPresentation", () => {
  it("render", async () => {
    const wrapper = await mountWrapper();
    expect(wrapper.html()).toContain(mockTeamMembers[0].avatar);
    wrapper.unmount();
  });
});
