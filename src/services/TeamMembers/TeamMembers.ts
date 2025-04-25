import TeamMembersApi from "@/API/TeamMembers/TeamMembers";
import { TeamMembersFilter } from '@/types/teamMembers';

export default class TeamMembersService {
  api: TeamMembersApi;

  defaultFilter: TeamMembersFilter = {
    search: "",
    department: "",
  }

  readonly inputFields: string[] = ["search"];
  readonly dropdownFields: string[] = ["department"];
  readonly fieldwidth: Record<string, number> = {
    search: 6,
    department: 4,
  }
  readonly listName: Record<string, string> = {
    search: "Search by name or skill",
    department: "Department",
  }

  readonly fieldSettings: Record<string, unknown> = {
    options: <Record<string, string>> {
      department: "department",
    }
  }

  constructor() {
    this.api = new TeamMembersApi();
  }

  get<T = any>(url: string): Promise<T> {
    return this.api.get<T>(url);
  }
}
