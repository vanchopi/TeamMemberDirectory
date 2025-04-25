export interface TeamMember {
  id: number;
  name: string;
  position: string;
  department: string;
  email: string;
  skills: string[];
  avatar: string;
  bio: string;
}

export interface TeamMembersResponse {
  data: TeamMember[];
}

export interface TeamMembersFilter {
  search: string;
  department: string;
}