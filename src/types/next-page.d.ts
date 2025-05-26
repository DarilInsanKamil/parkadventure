import { NextPage } from 'next';

// Define the Page component type for pages with route params
declare module 'next' {
  export type NextPageWithParams<P = {}, IP = P> = NextPage<P, IP> & {
    getInitialProps?(context: any): Promise<IP>;
  };
}

// Explicitly type the params for page components
declare global {
  type PageParams = {
    params: {
      [key: string]: string;
    };
    searchParams?: {
      [key: string]: string | string[] | undefined;
    };
  };
} 