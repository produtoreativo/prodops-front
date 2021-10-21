import { styled } from '@mui/material/styles';
import CircularProgress from "@mui/material/CircularProgress";

const Root = styled('div')({
  position: "fixed",
    left: 0,
    right: 0,
    top: "calc(50% - 20px)",
    margin: "auto",
    height: "40px",
    width: "40px",
    "& img": {
      position: "absolute",
      height: "25px",
      width: "auto",
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      margin: "auto"
    }
});

function Loading() {
  return (
    <Root>
      <img src="/assets/images/pin.png" alt="" />
      <CircularProgress />
    </Root>
  )
}

export default Loading;