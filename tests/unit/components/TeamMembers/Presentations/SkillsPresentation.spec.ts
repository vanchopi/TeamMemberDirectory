import { mount } from "@vue/test-utils";
import SkillsPresentation from "@/components/TeamMembers/Presentations/SkillsPresentation.vue";
import { TeamMember } from "@/types/teamMembers";
import { mockTeamMembers } from "tests/unit/__mocks__/TeamMembersService";
import { Quasar } from "quasar";

async function mountWrapper() {
  const wrapper = mount(SkillsPresentation, {
    global: {
      plugins: [[Quasar, {}]],
    },
    props: {
      entity: mockTeamMembers[0].skills,
    },
  });

  return wrapper;
}

describe("SkillsPresentation", () => {
  it("render", async () => {
    const wrapper = await mountWrapper();
    expect(wrapper.html()).toContain(mockTeamMembers[0].skills[0]);
    wrapper.unmount();
  });
});
