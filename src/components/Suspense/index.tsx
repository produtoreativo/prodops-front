import { Suspense, PropsWithChildren } from "react";
import Loading from 'components/Loading';

const ConncreteSuspense = (props: PropsWithChildren<{}>) => {
  return <Suspense fallback={<Loading />}>{props.children}</Suspense>;
};

export default ConncreteSuspense;