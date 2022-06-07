import {
    AppWrapper,
    Container, DetailFieldset, DocsWindow,
    GlobalStyles,
    LogoWrapper, SidebarContent, SidebarWindow,
     SqlPreview,
    WindowsThemeProvider
} from "./styles";
import {
    AppBar,  Cutout,  Fieldset,

     Radio, Tab, TabBody,
    Table, TableBody, TableDataCell,
    TableHead,
    TableHeadCell,
    TableRow, Tabs,
    Toolbar,
    WindowContent,
    WindowHeader
} from "react95";
import logoImage from './sad-start.png';
import dbtManifest from './manifest.json';
import {useState} from "react";

const models = Object.values(dbtManifest.nodes).filter(node => node.resource_type === 'model');

const Logo = () => (
    <LogoWrapper>
        <img alt='wind-no logo' src={logoImage} height={24}/>
        <span>
            DataWin95
        </span>
    </LogoWrapper>
)


function App() {
    const [activeModelId, setActiveModelId] = useState(models[0].unique_id);
    const activeModel = activeModelId && dbtManifest.nodes[activeModelId];
    const [activeTab, setActiveTab] = useState('details');
    const [sqlOption, setSqlOption] = useState('compiled_sql');
    const metrics = Object.values(dbtManifest.metrics).filter(metric => metric.refs?.[0]?.[0] === activeModel.name)
    const hasMetrics = metrics.length > 0;
    const handleSqlOptionChange = e => setSqlOption(e.target.value);
    return (
        <AppWrapper>
            <GlobalStyles/>
            <WindowsThemeProvider>
                <AppBar>
                    <Toolbar>
                        <Logo/>
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
                                        <TableRow key={model.unique_id}
                                                  onClick={() => setActiveModelId(model.unique_id)}
                                                  style={model.unique_id === activeModelId ? {
                                                      background: 'rgb(6, 0, 132)',
                                                      color: 'rgb(254, 254, 254)'
                                                  } : undefined}>
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
                                <Tab value={'sql'}>SQL</Tab>
                                <Tab value={'columns'}>Columns</Tab>
                                {hasMetrics && <Tab value={'metrics'}>Metrics</Tab>}
                            </Tabs>
                            {activeModel && (
                                <TabBody>
                                    {activeTab === 'details' && (
                                        <>
                                            <DetailFieldset label={'Name'}>
                                                {activeModel.name}
                                            </DetailFieldset>
                                            {activeModel.description && (
                                                <DetailFieldset label={'Description'}>
                                                    {activeModel.description}
                                                </DetailFieldset>
                                            )}
                                            <DetailFieldset label={'Database'}>
                                                {activeModel.database}
                                            </DetailFieldset>
                                            <DetailFieldset label={'Schema'}>
                                                {activeModel.schema}
                                            </DetailFieldset>
                                            {activeModel.tags.length > 0 && (
                                                <DetailFieldset label={'Tags'}>
                                                    {activeModel.tags}
                                                </DetailFieldset>
                                            )}
                                            {activeModel.config.materialized && (
                                                <DetailFieldset label={'Type'}>
                                                    {activeModel.config.materialized}
                                                </DetailFieldset>
                                            )}
                                            <Fieldset label={'Created at'}>
                                                {new Date(activeModel.created_at).toUTCString()}
                                            </Fieldset>
                                        </>
                                    )}
                                    {activeTab === 'columns' && (
                                        <Table>
                                            <TableHead>
                                                <TableRow head>
                                                    <TableHeadCell>Name</TableHeadCell>
                                                    <TableHeadCell>Type</TableHeadCell>
                                                    <TableHeadCell>Description</TableHeadCell>
                                                    <TableHeadCell>Tags</TableHeadCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {Object.values(activeModel.columns).map(col => (
                                                    <TableRow>
                                                        <TableDataCell>{col.name}</TableDataCell>
                                                        <TableDataCell>{col.data_type}</TableDataCell>
                                                        <TableDataCell>{col.description}</TableDataCell>
                                                        <TableDataCell>{col.tags}</TableDataCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    )}
                                    {activeTab === 'sql' && (
                                        <>
                                            <Fieldset label='SQL'>
                                                <Radio
                                                    checked={sqlOption === 'compiled_sql'}
                                                    onChange={handleSqlOptionChange}
                                                    value='compiled_sql'
                                                    label='Compiled'
                                                    name='SQL'
                                                />
                                                <br/>
                                                <Radio
                                                    checked={sqlOption === 'raw_sql'}
                                                    onChange={handleSqlOptionChange}
                                                    value='raw_sql'
                                                    label='Raw'
                                                    name='SQL'
                                                />
                                            </Fieldset>
                                            <SqlPreview>
                                                {activeModel[sqlOption]}
                                            </SqlPreview>
                                        </>
                                    )}
                                    {activeTab === 'metrics' && hasMetrics && (
                                        <Table>
                                            <TableHead>
                                                <TableRow head>
                                                    <TableHeadCell>Name</TableHeadCell>
                                                    <TableHeadCell>Type</TableHeadCell>
                                                    <TableHeadCell>Description</TableHeadCell>
                                                    <TableHeadCell>Sql</TableHeadCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {
                                                    metrics.map((metric) => (
                                                                <TableRow key={metric.name}>
                                                                    <TableDataCell>{metric.label}</TableDataCell>
                                                                    <TableDataCell>{metric.type}</TableDataCell>
                                                                    <TableDataCell>{metric.description}</TableDataCell>
                                                                    <TableDataCell>{metric.sql}</TableDataCell>
                                                                </TableRow>
                                                            ))
                                                }
                                            </TableBody>
                                        </Table>
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
