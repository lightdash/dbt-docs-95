import {
    AppWrapper,
    Container, DocsWindow,
    GlobalStyles,
    LogoWrapper, SidebarContent, SidebarWindow,
    SideBarWindow, WhitePane,
    WindowsThemeProvider
} from "./styles";
import {
    AppBar, Button, Cutout, Divider, Fieldset,
    List,
    ListItem, Tab, TabBody,
    Table, TableBody, TableDataCell,
    TableHead,
    TableHeadCell,
    TableRow, Tabs,
    Toolbar,
    Window, WindowContent,
    WindowHeader
} from "react95";
import logoImage from './sad-start.png';
import dbtManifest from './manifest.json';
import {useState} from "react";

const models = Object.values(dbtManifest.nodes).filter(node => node.resource_type === 'model');

const Logo = () => (
    <LogoWrapper>
        <img src={logoImage} height={24} />
        <span>
            DataWin95
        </span>
    </LogoWrapper>
)


function App() {
  const [activeModelId, setActiveModelId] = useState();
  const activeModel = activeModelId && dbtManifest.nodes[activeModelId];
  const [activeTab, setActiveTab] = useState('details');
  return (
      <AppWrapper>
        <GlobalStyles />
        <WindowsThemeProvider>
            <AppBar>
                <Toolbar>
                    <Logo />
                </Toolbar>
            </AppBar>
            <Container>
                <SidebarWindow>
                    <WindowHeader active={false}>
                        <span>models.exe</span>
                    </WindowHeader>
                    <SidebarContent>
                        <Cutout>
                            <p>
                                Select a dbt model to view docs
                            </p>
                        </Cutout>
                        <Table>
                            <TableHead>
                                <TableRow head>
                                    <TableHeadCell>Name</TableHeadCell>
                                    <TableHeadCell>Type</TableHeadCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {models.map(model => (
                                    <TableRow key={model.unique_id} onClick={() => setActiveModelId(model.unique_id)}>
                                        <TableDataCell>{model.name}</TableDataCell>
                                        <TableDataCell>model</TableDataCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </SidebarContent>
                </SidebarWindow>
                <DocsWindow>
                    <WindowHeader active={true}>
                        <span>docs.exe</span>
                    </WindowHeader>
                    <WindowContent>
                        <Tabs value={activeTab} onChange={(e, value) => setActiveTab(value)}>
                            <Tab value={'details'}>Details</Tab>
                        </Tabs>
                        {activeModel && (
                            <TabBody>
                                {activeTab === 'details' && (
                                    <Fieldset label={'Description'}>
                                        {activeModel.description}
                                    </Fieldset>
                                )}
                            </TabBody>
                        )}
                    </WindowContent>
                </DocsWindow>
            </Container>
        </WindowsThemeProvider>
      </AppWrapper>
  );
}

export default App;
