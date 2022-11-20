import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { QueryObserverResult, RefetchOptions, RefetchQueryFilters } from 'react-query';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { switchList } from '../../redux/slices/siteSlice';
import { RootState } from '../../redux/store';

type Props = {
  sortFn: (arg0: 'popular' | 'price' | 'alphabet', arg1?: boolean | undefined) => void;
  filterFn: (ar0: string) => void;
  refetch: <TPageData>(options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined) => Promise<QueryObserverResult<any, unknown>>
};

export default function ListHeader({ sortFn, filterFn }: Props) {
  const useDispatch = useAppDispatch();

  const type = useAppSelector((state) => state.site.listType);
  const role = useAppSelector((state) => state.users.user!.role);


  const switchListType = () => useDispatch(switchList());
  // IF owner, include the switchListType function

  const [searchQuery, setSearchQuery] = useState('');
  const [reverseData, setReverseData] = useState(false);

  return (
    <div>
      {/* <Navbar bg="light" expand="lg">
        <Container fluid>
          <Navbar.Brand>{type === 'pizza' ? 'Pizzas' : 'Toppings'}</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: '100px' }} navbarScroll>
              <Nav.Link>{`add ${type}`}</Nav.Link>  
              {role === 'owner' && <Nav.Link onClick={switchListType}>Switch Tables</Nav.Link>}
              <NavDropdown title="Link" id="navbarScrollingDropdown">
                <NavDropdown.Item onClick={() => sortFn('price', reverseData)}>Price</NavDropdown.Item>
                <NavDropdown.Item onClick={() => sortFn('alphabet', reverseData)}>{'A - Z'}</NavDropdown.Item>
                <NavDropdown.Item onClick={() => sortFn('popular', reverseData)}>{'Most Popular'}</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item><input type="checkbox" onClick={() => setReverseData(prevState => !prevState)} />Reverse</NavDropdown.Item>
              </NavDropdown>
              <Nav.Link href="#" disabled>
                Link
              </Nav.Link>
            </Nav>
            <Form className="d-flex">
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
              />
              <Button variant="outline-success">Search</Button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar> */}
    </div>
  );
}
