import React, { forwardRef, useContext } from 'react';
import { Group, Avatar, Text, Menu, UnstyledButton, Paper } from '@mantine/core';
import { UserContext } from '../../Data/UserContext';

const UserButton = forwardRef((props, ref) => {
    const { image, name, email, icon, ...others } = props;

    return (
        <UnstyledButton
            ref={ref}
            style={{
                padding: 'var(--mantine-spacing-md)',
                color: 'var(--mantine-color-text)',
                borderRadius: 'var(--mantine-radius-sm)',
            }}
            {...others}
        >
            <Group>
                <Avatar src={image} radius="xl" />

                <div style={{ flex: 1 }}>
                    <Text size="sm" fw={500}>
                        {name}
                    </Text>

                    <Text c="dimmed" size="xs">
                        {email}
                    </Text>
                </div>

               
            </Group>
        </UnstyledButton>
    );
});

function UserDropDown() {
    const { dispatch } = useContext(UserContext); 

    const handleLogout = () => {
        
        dispatch({ type: 'LOGOUT' });

        
        window.location.href = '/user-login';
         };
        return (
        <Menu>
           
            <Menu.Target>
                <UserButton/>
            </Menu.Target>
            <Menu.Dropdown radius="xl">
            <Paper  bg={'#f0f0f0'}>
                <Menu.Item >
                <Text ta="center">{localStorage.getItem('email') || 'placeholder@placeholder.com'} </Text>
                
                
                </Menu.Item>
                <Menu.Item onClick={() => window.location.href='https://tahvel.edu.ee/#/'}>
                <Text ta="center"> Tahvel</Text>
                </Menu.Item>
                <Menu.Item onClick={() => window.location.href='/user-profile'} >
                <Text ta="center">Edit Profile</Text>
                </Menu.Item>



                <Menu.Item onClick={() => window.location.href='/user-application'}>
                <Text ta="center">My application</Text>
                </Menu.Item>
                <Menu.Item color="red" onClick={handleLogout}>
                <Text ta="center">Log out</Text>
                </Menu.Item>
                <Menu.Item onClick={() => window.location.href='/userdetails'}>
                <Text ta="center">@List Of students@</Text>
                </Menu.Item>
                </Paper>
            </Menu.Dropdown>
            
        </Menu>
    );
}
export default UserDropDown;