export interface TeamMemberDto {
  _id: string;
  slug: string;
  name: {
    first: string;
    last: string;
  };
  title: string;
  bio?: string;
  biography?: string;
  image?: { _id: string; path: string } | string;
  order?: number;
  socialMedia?: Record<string, string>;
  status?: string;
}

