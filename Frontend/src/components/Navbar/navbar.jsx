import React from "react";
import "../../../img/usericondefault.png";
import { Grid, Input, Paper, Popover, Button } from "@mantine/core";
import UserDropdown from "./UserDropdown";
import SearchBar from "./NavSearch";

const Navbar = () => {

    return (
        <Paper shadow="xl" radius="xl" withBorder p="xs" style={{ borderRadius: '20px', boxShadow: '0px 3px 6px #00000029', backgroundColor: 'lightgray' }}>
            <Grid justify="flex-start" align="stretch">
                <Grid.Col span={3}>
                    <SearchBar/>
                </Grid.Col>
                <Grid.Col span={3}>
                    <Popover width={200} position="bottom" withArrow shadow="md" color="rgba(117, 117, 117, 1)">
                        <Popover.Target>
                            <Button variant="transparent" >Contact</Button>
                        </Popover.Target>
                        <Popover.Dropdown  >

                            <Button justify="center" fullWidth variant="filled" color="rgba(117, 117, 117, 1)" mt="md">
                                Contact 1
                            </Button>

                            <Button justify="center" fullWidth variant="filled" color="rgba(117, 117, 117, 1)" mt="md">
                                Contact 2
                            </Button>

                            <Button justify="center" fullWidth variant="filled" color="rgba(117, 117, 117, 1)" mt="md">
                                Contact 3
                            </Button>
                            <Button justify="center" fullWidth variant="filled" color="rgba(117, 117, 117, 1)" mt="md">
                                Contact 4
                            </Button>
                        </Popover.Dropdown>
                    </Popover></Grid.Col>
                <Grid.Col span={3} offset={3}><UserDropdown /></Grid.Col>
            </Grid>
        </Paper>
    );
};

export default Navbar;
