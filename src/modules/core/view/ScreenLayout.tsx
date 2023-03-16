import React, {PropsWithChildren} from "react";

type Props = PropsWithChildren<{
  header: string;
}>

const ScreenLayout: React.FC<Props> = ({header, children}) => (
  <main>
    <section>
      <header>{header}</header>
    </section>
    {children}
  </main>
)

export default ScreenLayout
