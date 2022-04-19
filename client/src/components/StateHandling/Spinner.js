import styled from "styled-components";
import { ImSpinner2 } from "react-icons/im";

const Spinner = () => {

    return (
        <SpinnerWrapper>
            <ImSpinner2 />
        </SpinnerWrapper>
    )
};

const SpinnerWrapper = styled.div`
    position: relative;
    top: 100px;
    animation: spin 1s linear infinite;

    @keyframes spin {
        0% {
            transform: rotate(0deg);
        }

        100% {
            transform: rotate(360deg);
        }
    };
`;

export default Spinner;