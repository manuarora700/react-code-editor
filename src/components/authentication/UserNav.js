import Dropdown from 'react-bootstrap/Dropdown';
import { useGoogleAuth } from '../../hooks/useGoogleAuth';

function UserNav(user) {
  const { logout } = useGoogleAuth();

  return (
      <Dropdown navbar={true}>
        <Dropdown.Toggle id="dropdown-basic">
          Hello, {user.displayName}
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item onClick={logout}>
            Logout
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
  );
}

export default UserNav;