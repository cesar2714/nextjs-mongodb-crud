import { Button, Container, MenuItem, MenuMenu, Menu } from "semantic-ui-react";
import {router} from 'next/router' //<-- Da la propiedad de navegar entre páginas
import Link from 'next/link'


export const Navbar = () => {
  return (
    <div>
      <Menu inverted borderless attached>
        <Container >
          <Menu.Item >
            <Link href="/" >
            <img src="/favicon.ico" height="30px" alt="" />
            </Link>
          </Menu.Item>
        <Menu.Menu >
            <Menu.Item >
              <Button primary size="mini" onClick={() => router.push('/tasks/new')} >
                New Task
                </Button>
            </Menu.Item>
          </Menu.Menu>
        </Container>
      </Menu>
    </div>
  );
};