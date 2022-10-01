import { createGlobalStyle } from 'styled-components'

const StyledGlobalStyle = createGlobalStyle`
    * {
        font-family: 'Lato', sans-serif;
        list-style-type: none;
        text-decoration: none;
    }
    body {
        margin: 0;
        background-color: #e0e0e0;
    }
`

function GlobalStyle() {
    return <StyledGlobalStyle />
}

export default GlobalStyle