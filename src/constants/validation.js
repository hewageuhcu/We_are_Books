import { jwtDecode } from "jwt-decode";

export const extractIdFromToken = () => {
  const token = localStorage.getItem("readerlyJWTstorageitem");

  if (!token) {
    return null;
  }

  try {
    const decoded = jwtDecode(token); 
    const id = decoded.sub; 
    return id;
  } catch (error) {
    console.error("Error decoding token:", error);
    return null;
  }
};

export const storeToken = (token) => {
  localStorage.setItem("readerlyJWTstorageitem", token);
}

export const extractNameFromToken=()=>{
  const token = localStorage.getItem("readerlyJWTstorageitem");

  if (!token) {
    return null;
  }

  try {
    const decoded = jwtDecode(token); 
    const name = decoded.name; 
    return name;
  } catch (error) {
    console.error("Error decoding token:", error);
    return null;
  }
}

export const logingOut=()=>{
  localStorage.removeItem("readerlyJWTstorageitem");
}

