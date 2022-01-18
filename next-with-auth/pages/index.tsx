import type { NextPage } from "next";
import { useSession, signIn, signOut } from "next-auth/react";
import styled from "@emotion/styled";
import { Session } from "next-auth";

interface SessionProps {
  data: Session | null;
  status: string;
}

const Home: NextPage = () => {
  const { data }: SessionProps = useSession();

  if (data) {
    return (
      <Wrapper style={{ flexDirection: "column" }}>
        <div>Signed in as {data?.user?.email}</div>
        <Button onClick={() => signOut()} data-type="signout">
          Sign out
        </Button>
      </Wrapper>
    );
  }
  return (
    <Wrapper>
      <Button onClick={() => signIn("google")} data-type="google">
        Google Sign in
      </Button>
      <Button onClick={() => signIn("kakao")} data-type="kakao">
        Kakao Sign in
      </Button>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Button = styled.div`
  width: 200px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  cursor: pointer;

  & ~ & {
    margin-left: 10px;
  }

  &[data-type="google"] {
    background: #d63c28;
    color: #fff;
  }

  &[data-type="kakao"] {
    background: #fbe503;
  }

  &[data-type="signout"] {
    margin-top: 10px;
    border: 1px solid #000;
  }
`;

export default Home;
