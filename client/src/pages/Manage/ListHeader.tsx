import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { QueryObserverResult, RefetchOptions, RefetchQueryFilters } from 'react-query';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { switchList } from '../../redux/slices/siteSlice';

type Props = {
  sortFn: (arg0: 'popular' | 'price' | 'alphabet', arg1?: boolean | undefined) => void;
  filterFn: (ar0: string) => void;
  refetch: <TPageData>(
    options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined
  ) => Promise<QueryObserverResult<any, unknown>>;
};

export default function ListHeader({ sortFn, filterFn, refetch }: Props) {
  const dispatch = useAppDispatch();

  const type = useAppSelector((state) => state.site.listType);
  const role = useAppSelector((state) => state.users.user!.role);

  const switchListType = () => {
    dispatch(switchList());
    refetch();
  }; // TODO:
  // IF owner, include the switchListType function

  const [searchQuery, setSearchQuery] = useState('');
  const [reverseData, setReverseData] = useState(false);

  console.log('reversed Val', reverseData);
  // Add useEffect to sort on searcchQuery, reverseData change
  useEffect(() => {
    if (searchQuery !== '') filterFn(searchQuery);
  }, [searchQuery]);

  return (
    <div>
      <Navbar bg="light" expand="lg">
        <Container fluid>
          <Navbar.Brand>{type === 'pizza' ? 'Pizzas' : 'Toppings'}</Navbar.Brand>
          <Nav.Link>{`Add ${type === 'pizza' ? 'Pizza' : 'Topping'}`}</Nav.Link>
          {role === 'owner' && (
            <Nav.Link onClick={switchListType}>
              {type === 'topping' ? 'Pizzas' : 'Toppings'}
            </Nav.Link>
          )}
          {/* <Navbar.Toggle aria-controls="navbarScroll">Filter</Navbar.Toggle> */}
          <NavDropdown title="Filter" id="navbarScrollingDropdown">
            <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: '100px' }} navbarScroll>
              {/* <Navbar.Collapse id="navbarScroll"> */}
              <NavDropdown.Item onClick={() => sortFn('price', reverseData)}>
                Price
              </NavDropdown.Item>
              <NavDropdown.Item onClick={() => sortFn('alphabet', reverseData)}>
                A - Z
              </NavDropdown.Item>
              <NavDropdown.Item onClick={() => sortFn('popular', reverseData)}>
                Most Popular
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.ItemText>
                <input type="checkbox" onClick={() => setReverseData((prevState) => !prevState)} />
                Reverse
              </NavDropdown.ItemText>
              {/* </Navbar.Collapse> */}
            </Nav>
          </NavDropdown>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button variant="outline-success">Search</Button>
          </Form>
        </Container>
      </Navbar>
    </div>
  );
}
