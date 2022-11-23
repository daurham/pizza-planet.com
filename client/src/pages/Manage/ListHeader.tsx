import React, { SetStateAction, useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { QueryObserverResult, RefetchOptions, RefetchQueryFilters } from 'react-query';
import { EntriesT } from '../../../../@types';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { switchList } from '../../redux/slices/siteSlice';
import { capFirstChar } from '../../utils';
import AddPizzaForm from './Forms/AddPizzaForm';
import AddToppingForm from './Forms/AddToppingForm';

type Props = {
  sortFn: (arg0: 'popular' | 'price' | 'alphabet', arg1?: boolean | undefined) => void;
  filterFn: (ar0: string) => void;
  dumpEntries: React.Dispatch<SetStateAction<EntriesT>>;
  refetch: <TPageData>(
    options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined
  ) => Promise<QueryObserverResult<any, unknown>>;
};

export default function ListHeader({ sortFn, filterFn, refetch, dumpEntries }: Props) {
  const dispatch = useAppDispatch();

  const type = useAppSelector((state) => state.site.listType);

  const [searchQuery, setSearchQuery] = useState('');
  const [reverseData, setReverseData] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);
  const role = useAppSelector((state) => state.user.user!.role);

  const switchListType = () => {
    dumpEntries([]);
    dispatch(switchList());
    setShowModal(false);
    refetch();
  };

  const getOtherType = () => (type === 'pizza' ? 'topping' : 'pizza');

  // console.log('reversed Val', reverseData);
  // Add useEffect to sort on searcchQuery, reverseData change
  useEffect(() => {
    filterFn(searchQuery);
  }, [searchQuery]);

  return (
    <div>
      <Navbar variant="dark" bg="dark" expand="lg">
        <Container fluid>
          <Navbar.Brand>{`${capFirstChar(type)}s`}</Navbar.Brand>
          <Nav.Link onClick={handleShow}>{`Add ${capFirstChar(type)}`}</Nav.Link>
          {role === 'owner' && (
            <Nav.Link onClick={switchListType}>{`${capFirstChar(getOtherType())}s`}</Nav.Link>
          )}
          {/* <Navbar.Toggle aria-controls="navbarScroll">Filter</Navbar.Toggle> */}
          <NavDropdown title="Filter" id="navbarScrollingDropdown">
            <Nav
              className="navbar-custom me-auto my-3 my-lg-0"
              style={{ maxHeight: '100px' }}
              navbarScroll
            >
              {/* <Navbar.Collapse id="navbarScroll"> */}
              <NavDropdown.Item onClick={() => sortFn('alphabet', reverseData)}>
                A - Z
              </NavDropdown.Item>
              <NavDropdown.Item onClick={() => sortFn('price', reverseData)}>
                Price
              </NavDropdown.Item>
              {type === 'pizza' && (
                <NavDropdown.Item onClick={() => sortFn('popular', reverseData)}>
                  Most Popular
                </NavDropdown.Item>
              )}
              <NavDropdown.Divider />
              <NavDropdown.ItemText>
                <Form.Check
                  type="checkbox"
                  onClick={() => setReverseData((prevState) => !prevState)}
                />
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

      {type === 'pizza' && (
        <AddPizzaForm showModal={showModal} refetch={refetch} handleClose={handleClose} />
      )}
      {type === 'topping' && (
        <AddToppingForm showModal={showModal} refetch={refetch} handleClose={handleClose} />
      )}
    </div>
  );
}
