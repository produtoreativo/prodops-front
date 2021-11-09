import { PropsWithChildren } from 'react';
import TopBar from './TopBar';

export default function Layout(props: PropsWithChildren<{}>) {
  return (
    <div>
      <TopBar />
      {props.children}
    </div>
  );
}
