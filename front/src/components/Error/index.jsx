import styled from "styled-components"
import colors from '../../utils/style/colors'

const ErrorTitle = styled.h1`
    display: flex;
    justify-content: center;
    color: ${colors.primary};
    font-size: 62px;
    `
const ErrorText = styled.h2`
    text-align: center;
    color: ${colors.tertiary};  
    `

function Error() {
    return (
    <div>
        <ErrorTitle>Erreur 404</ErrorTitle>
            <ErrorText>La page que vous souhaitez est introuvable</ErrorText>
    </div>
    )
}

export default Error