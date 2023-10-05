import { onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";
import React, { useState, useEffect, ChangeEvent } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { auth, googleProvider } from "../firebase";

const Nav = () => {
  const localUserData = localStorage.getItem("userData");
  const initialUserData =
    localUserData !== null ? JSON.parse(localUserData) : null;

  const [show, setShow] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [userData, setUserData] = useState(initialUserData);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const onScroll = () => {
    if (window.scrollY > 50) {
      setShow(true);
    } else {
      setShow(false);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
    navigate(`search?q=${e.target.value}`);
  };
  const handleAuth = () => {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        setUserData(result.user);
        localStorage.setItem("userData", JSON.stringify(result.user));
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        setUserData(null);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigate("/");
      } else if (user && pathname === "/") {
        navigate("/main");
      }
    });
    window.addEventListener("scroll", onScroll);

    return () => {
      unsubscribe();
      window.removeEventListener("scroll", onScroll);
    };
  }, [auth, navigate, pathname]);

  return (
    <NavWrapper $show={show}>
      <Logo>
        <img src="/images/logo.svg" alt="Disney Plus Logo" />
      </Logo>
      {pathname === "/" ? (
        <Login onClick={handleAuth}>Login</Login>
      ) : (
        <>
          <Input
            type="text"
            placeholder="영화를 검색해주세요."
            value={searchValue}
            onChange={handleChange}
          />
          <SignOut>
            <UserImg
              src={userData?.photoURL !== null ? userData?.photoURL : ""}
            />
            <DropDown onClick={handleSignOut}>
              <span>Sign Out</span>
            </DropDown>
          </SignOut>
        </>
      )}
    </NavWrapper>
  );
};

export default Nav;

const Login = styled.a`
  background-color: rgba(0, 0, 0, 0.6);
  padding: 8px 16px;
  border: 1px solid #f9f9f9;
  border-radius: 4px;
  transition: all 0.2s ease 0s;
  letter-spacing: initial;
  cursor: pointer;
  &:hover {
    background-color: #f9f9f9;
    color: #000;
    border-color: transparent;
  }
`;

const Input = styled.input`
  position: fixed;
  left: 50%;
  transform: translate(-50%, 0);
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 5px;
  color: white;
  padding: 5px;
  border: 1px solid lightgray;
`;

const NavWrapper = styled.nav<{ $show: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 70px;
  background-color: ${(props) => (props.$show ? "#090b13" : "transparent")};
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 36px;
  letter-spacing: 16px;
  z-index: 3;
  transition: background-color 0.3s;
`;

const Logo = styled.a`
  padding: 0;
  width: 80px;
  margin-top: 4px;
  max-height: 70px;
  font-size: 0;
  display: inline-block;

  img {
    display: block;
    width: 100%;
  }
`;

const DropDown = styled.div`
  position: absolute;
  top: 48px;
  right: 0px;
  background: rgb(19, 19, 19);
  border: 1px solid rgba(151, 151, 151, 0.34);
  border-radius: 4px;
  padding: 10px;
  font-size: 14px;
  letter-spacing: 3px;
  width: 100px;
  opacity: 0;
`;

const SignOut = styled.div`
  position: relative;
  height: 48px;
  width: 48px;
  display: flex;
  cursor: pointer;
  align-items: center;
  justify-content: center;

  &:hover {
    ${DropDown} {
      opacity: 1;
      transition-duration: 1s;
    }
  }
`;

const UserImg = styled.img`
  height: 100%;
  border-radius: 50%;
`;
