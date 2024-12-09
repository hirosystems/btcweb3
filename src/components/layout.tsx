import { Outlet } from 'react-router-dom';

import { Box, Flex } from 'leather-styles/jsx';

import { Footer } from './footer';
import { Navbar } from './navbar';
import { PoxDisabledLayout } from './pox-disabled-layout';

export function Layout() {
  return (
    <>
      <Flex minH="100vh" flexDirection="column">
        <Navbar />
        <PoxDisabledLayout />
        <Box flexGrow={1}>
          <Outlet />
        </Box>
        <Footer />
      </Flex>
    </>
  );
}
