import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from 'styled-components';
import colors from '../../utils/style/colors';
import { Link } from 'react-router-dom';
import { BiLogOut } from 'react-icons/bi';

const NavLink = styled.nav`
    display: flex;
    justify-content: start;
    background-color: ${colors.tertiary};
    box-shadow: 1px 2px 1px 1px black;
`
const BlocLink = styled.ul`
    display: flex;
    justify-content: space-between;
`
const List = styled.li`
    padding: 15px 30px 10px 50px;
    font-size: 30px;
    color: ${colors.secondary};
    @media only screen and (max-width: 768px) {
      padding: 15px 5px 10px 30px;
    }
`


function Blog() {

    function logOut() {
        window.location = '/';
        localStorage.clear(); 
    }

  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.token) {
      navigate("/Unauthorized");
    } else {
        
    }
  }, [navigate]);

    return (
      <div>
        <NavLink>
            <BlocLink>       
            <Link onClick={() => logOut()} ><List><BiLogOut /></List></Link>
            <h1>Page d'Accueil</h1>
            </BlocLink>
        </NavLink>
        </div>
    )
  }
export default Blog