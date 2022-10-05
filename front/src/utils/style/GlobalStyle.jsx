import { createGlobalStyle } from 'styled-components'
import colors from '../../utils/style/colors'

const StyledGlobalStyle = createGlobalStyle`
    * {
        font-family: 'Lato', sans-serif;
        list-style-type: none;
        text-decoration: none;
    }
    body {
        margin: 0;
        background-color: ${colors.primary};
    }
`

function GlobalStyle() {
    return <StyledGlobalStyle />
}

export default GlobalStyle