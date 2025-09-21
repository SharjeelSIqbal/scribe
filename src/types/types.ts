import { ElementFormatType } from 'lexical';

type HeadingOption = {
  level: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  label: string;
  icon: JSX.Element;
  className: string;
};

type AlignOption = {
  value: ElementFormatType;
  label: string;
  icon: JSX.Element;
};

type UserRoles = 'admin' | 'editor' | 'viewer';

type UserRolesOptions = {
  value: UserRoles;
  label: string;
  icon: JSX.Element;
}[];

type HeadingTag = `h${1 | 2 | 3 | 4 | 5 | 6}`;

export type { HeadingOption, AlignOption, HeadingTag, UserRoles, UserRolesOptions };
