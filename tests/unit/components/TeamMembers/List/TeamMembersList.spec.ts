import { mount, flushPromises } from "@vue/test-utils";
import { ref, nextTick } from "vue";
import TeamMemberList from "@/components/TeamMembers/List/View.vue";
import TeamMembersFilter from "@/components/TeamMembers/Filter/TeamMembersFilter.vue";
import { TeamMember } from "@/types/teamMembers";
import MockTeamMembersService, {
  mockTeamMembers,
} from "tests/unit/__mocks__/TeamMembersService";
import { storeMock } from "tests/unit/__mocks__/storeMock";
import { Quasar } from "quasar";
import { useStore } from "vuex";

jest.mock("vuex");

const service = new MockTeamMembersService();
const teamMembers = ref<TeamMember[]>([]);

function createMockStore() {
  (useStore as jest.Mock).mockReturnValue({
    state: {
      ...storeMock,
      teamMembers: {
        ...storeMock.teamMembers,
        teamMembers,
      },
    },
    dispatch: jest.fn((action: string) => {
      if (action === "teamMembers/getTeamMembers") {
        return service.get().then((response) => {
          teamMembers.value = response.data;
        });
      }
      return Promise.resolve();
    }),
  });
}

async function mountTeamMemberList() {
  const wrapper = mount(TeamMemberList, {
    global: {
      plugins: [[Quasar, {}]],
      stubs: {
        transition: false,
        // RecycleScroller: {
        //   template: '<div><slot /></div>',
        // },
      },
    },
    props: { service },
  });

  await (wrapper.vm as any).getTeamMemebrs();
  await flushPromises();
  await nextTick();
  await flushPromises();
  await nextTick();
  return wrapper;
}

describe("TeamMemberList", () => {
  beforeEach(() => {
    teamMembers.value = [];
    Object.defineProperty(HTMLElement.prototype, "offsetHeight", {
      configurable: true,
      value: 9999,
    });
    createMockStore();
  });

  it("renders the page title", async () => {
    const wrapper = await mountTeamMemberList();
    expect(wrapper.html()).toContain("Team Member Directory");
    wrapper.unmount();
  });

  it("loads and renders team members", async () => {
    const wrapper = await mountTeamMemberList();

    const chunkedItems = (wrapper.vm as any).chunkedTeamMembers;

    await flushPromises();
    await nextTick();

    const vScroll = wrapper.findComponent({ name: "RecycleScroller" });

    const header = wrapper.find(".page-items__header");
    expect(header.exists()).toBe(true);

    const scrollerItems = vScroll.props("items");

    expect(scrollerItems.value.length).toBe(mockTeamMembers.length);
    expect(chunkedItems.value.length).toBeGreaterThan(0);
    expect(chunkedItems.value.length).toBe(mockTeamMembers.length);

    wrapper.unmount();
  });

  it("filters data on filter update", async () => {
    const wrapper = await mountTeamMemberList();

    const filterComponent = wrapper.findComponent(TeamMembersFilter);
    expect(filterComponent.exists()).toBe(true);

    const mockFilter = { search: "Alex", department: "" };
    await filterComponent.vm?.$emit("update", mockFilter);
    await flushPromises();
    await nextTick();

    const chunkedItems = (wrapper.vm as any).chunkedTeamMembers;

    expect(chunkedItems.value.length).toBeGreaterThan(0);
    expect(chunkedItems.value.length).toBeLessThanOrEqual(
      mockTeamMembers.length
    );

    wrapper.unmount();
  });
});
