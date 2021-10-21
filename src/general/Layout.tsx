import { AppBar, Toolbar } from '@mui/material'
import { PropsWithChildren } from 'react'

export default function Layout(props: PropsWithChildren<{}>) {
  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <div>logo</div>
        </Toolbar>
      </AppBar>
      {props.children}
    </div>
  )
}
