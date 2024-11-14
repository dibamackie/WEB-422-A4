import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useRouter } from 'next/router';

function MainNav() {
  const router = useRouter();
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const searchField = e.target.elements.search.value;
    router.push(`/artwork?title=true&q=${searchField}`);
  };

  return (
    <>
      <Navbar className="fixed-top navbar-dark bg-primary">
        <Navbar.Brand className='ms-3'>Diba Makki</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link href="/search">Advanced Search</Nav.Link>
        </Nav>
        <Form className="d-flex" onSubmit={handleSubmit}>
          <Form.Control type="text" name="search" placeholder="Search" className="me-2" />
          <Button className='me-3' type="submit" variant="outline-light">Search</Button>
        </Form>
      </Navbar>
      <br />
      <br />
    </>
  );
}

export default MainNav;
