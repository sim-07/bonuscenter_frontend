import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ ml: 1 }}>
                    {children}
                </Box>
            )}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}

interface TabData {
    title: string;
    icon?: React.ReactNode;
    content: React.ReactNode;
}

interface VerticalTabsProps {
    tabs: TabData[];
}

export default function VerticalTabs({ tabs }: VerticalTabsProps) {
    const [value, setValue] = React.useState(0);

    const handleChange = (_: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex' }}>
            <Tabs
                orientation="vertical"
                variant="scrollable"
                value={value}
                onChange={handleChange}
                aria-label="Vertical tabs"
                sx={{ borderRight: 1, borderColor: 'divider', minWidth: 200 }}
            >
                {tabs.map((tab, index) => (
                    <Tab
                        key={index}
                        label={tab.title}
                        iconPosition="start"
                        {...a11yProps(index)}
                    />
                ))}
            </Tabs>

            {tabs.map((tab, index) => (
                <Box
                    key={index}
                    sx={{
                        flexGrow: 1,
                        width: '100%',
                        display: value === index ? 'block' : 'none'
                    }}
                >
                    <TabPanel value={value} index={index}>
                        {tab.content}
                    </TabPanel>
                </Box>
            ))}
        </Box>
    );
}