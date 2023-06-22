export type Props = {
  children: string | JSX.Element | JSX.Element[] | (() => JSX.Element);
};

export interface Header {
  title: string;
  url: string;
}
