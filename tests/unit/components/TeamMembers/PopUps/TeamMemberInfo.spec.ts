import TeamMemberInfo from "@/components/TeamMembers/PopUps/TeamMemberInfo.vue";
import { mockTeamMembers } from "tests/unit/__mocks__/TeamMembersService";
import { DOMWrapper, mount, flushPromises } from "@vue/test-utils";
import { Quasar } from "quasar";

const node = document.createElement("div");
node.setAttribute("id", "app");
document.body.appendChild(node);

const wrapper = mount(TeamMemberInfo, {
  global: {
    plugins: [[Quasar, {}]],
  },
  props: {
    show: false,
    entity: mockTeamMembers[0],
  },
  attachTo: "#app",
});

describe("TeamMemberInfo", () => {
  it("render", async () => {
    const documentWrapper = new DOMWrapper(document.body);
    await wrapper.setProps({
      modelValue: true,
    } as Partial<typeof wrapper.vm.$props>);
    const dialog = documentWrapper.find("q-dialog");
    await flushPromises();
    expect(dialog.exists()).toBe(true);
  });

  it("render title", async () => {
    const documentWrapper = new DOMWrapper(document.body);
    await wrapper.setProps({
      modelValue: true,
    } as Partial<typeof wrapper.vm.$props>);
    await flushPromises();
    expect(documentWrapper.find("q-dialog").html()).toContain(
      "Team Member Details"
    );
  });
});
