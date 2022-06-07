import styled, {createGlobalStyle, ThemeProvider} from "styled-components";
import original from "react95/dist/themes/original";
import ms_sans_serif from "react95/dist/fonts/ms_sans_serif.woff2";
import ms_sans_serif_bold from "react95/dist/fonts/ms_sans_serif_bold.woff2";
import {Cutout, Window, WindowContent} from "react95";

export const GlobalStyles = createGlobalStyle`
  @font-face {
    font-family: 'ms_sans_serif';
    src: url('${ms_sans_serif}') format('woff2');
    font-weight: 400;
    font-style: normal
  }
  @font-face {
    font-family: 'ms_sans_serif';
    src: url('${ms_sans_serif_bold}') format('woff2');
    font-weight: bold;
    font-style: normal
  }
  body {
    font-family: 'ms_sans_serif';
  }
`

export const WindowsThemeProvider = ({ children }) => (
    <ThemeProvider theme={original}>
        {children}
    </ThemeProvider>
)

export const AppWrapper = styled.div`
    height: 100vh;
    display: flex;
    flex-direction: column;
`

export const Container = styled.div`
  flex: 1;
  padding: 15px;
  margin-top: 36px;
  background-color: rgb(0, 128, 128);
  display: flex;
  flex-direction: row;
  gap: 30px;
`
export const LogoWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 5px;
`

export const SidebarWindow = styled(Window)`
  width: 300px;
  height: 600px;
`

export const DocsWindow = styled(Window)`
  flex: 1;
`

export const WhitePane = styled(Cutout)`
    background-color: white;
`

export const SidebarContent = styled(WindowContent)`
display: flex;
flex-direction: column;
gap: 15px;
`
