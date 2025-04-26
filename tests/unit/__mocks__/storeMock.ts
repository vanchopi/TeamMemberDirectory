import { TeamMember } from "@/types/teamMembers";

export const storeMock: any = {
  perPageArr: [5, 10, 25, 50, 100, 200, 500, 1000],
  pagination: {
    page: 1,
    rowsPerPage: 100,
    itemsOnPage: 15,
  },
  delimiter: "##",
  teamMembers: {
    teamMembers: [] as TeamMember[],
    gridTypes: ["grid", "list"],
    gridType: "list",
  },
};
