import colors from '../../utils/style/colors'
import styled from 'styled-components'
import { Link } from 'react-router-dom'


const NavLink = styled.nav`
  width: 100%;
  background-color: ${colors.tertiary};
  display: flex;
  justify-content: end;
  box-shadow: 1px 2px 2px 1px black;
`
const ListLog = styled.ul`
  display: flex;
  
`

const List = styled.li`
  padding: 20px;
  margin: 5px 25px 5px 5px;
  font-size: 20px;
  border: 2px solid ${colors.tertiary};
  border-radius: 20px;
  background-color: ${colors.primary};
  color: black;
  box-shadow: 1px 1px 1px 1px black;
  @media only screen and (max-width: 768px) {
    display: none;
  }
`


function Header() {
    return (
      <NavLink>
        <ListLog>
        <Link to="/"><List>Se connecter</List></Link>
        <Link to="/SignIn"><List>S'inscrire</List></Link>
        </ListLog>
      </NavLink> 
    )
  }

  
export default Header