import TeamMembersService from "@/services/TeamMembers/TeamMembers";
import { TeamMember } from "@/types/teamMembers";

export const mockTeamMembers: TeamMember[] = [
  {
    id: 1,
    name: "Alex Johnson",
    position: "Frontend Developer",
    department: "Engineering",
    email: "email",
    skills: ["skill"],
    avatar: "testAvatar1",
    bio: "bio",
  },
  {
    id: 2,
    name: "Jane Doe",
    position: "Designer",
    department: "UX",
    email: "",
    skills: [],
    avatar: "",
    bio: "",
  },
];

export default class MockTeamMembersService extends TeamMembersService {
  get<T = any>(): Promise<T> {
    return Promise.resolve({ data: mockTeamMembers } as any);
  }
}
