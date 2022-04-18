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

`;

export default Spinner;