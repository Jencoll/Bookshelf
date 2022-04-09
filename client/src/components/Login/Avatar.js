import styled from "styled-components";

const Avatar = () => {
  return (
    <Imgwrapper>
      <img alt="A woman reading, surrounded by piles of books" src="https://images.unsplash.com/photo-1568822617270-2c1579f8dfe2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1160&q=80"></img>
    </Imgwrapper>
  );
};

const Imgwrapper = styled.div`
    width: 45px;
    height: 45px;
    
    img {
        width: 100%;
        border-radius: 50%;
    }
`;

export default Avatar;
