import { useState } from "react";
import FormAction from "./FormAction";
import Input from "./Input";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, storage, db } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";

export default function Signup() {
  const [err, setErr] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const username = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const confirmPassword = e.target[3].value;
    const file = e.target[4].files[0];

    if (password !== confirmPassword) {
      alert("Password tidak sama");
      return;
    }

    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);

      const storageRef = ref(storage, username);

      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        (error) => {
          setErr(true);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateProfile(res.user, {
              displayName: username,
              photoURL: downloadURL,
            });
            await setDoc(doc(db, "users", res.user.uid), {
              uid: res.user.uid,
              displayName: username,
              email,
              photoURL: downloadURL,
            });

            await setDoc(doc(db, "userChats", res.user.uid), {});
          });
        }
      );
      navigate("/");
    } catch (err) {
      setErr(true);
    }
  };

  return (
    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
      <div>
        <Input
          labelText="Username"
          labelFor="username"
          id="username"
          name="username"
          type="text"
          autoComplete="username"
          isRequired={true}
          placeholder="Username"
        />
        <Input
          labelText="Email address"
          labelFor="email"
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          isRequired={true}
          placeholder="Email address"
        />
        <Input
          labelText="Password"
          labelFor="password"
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          isRequired={true}
          placeholder="Password with minimum 8 characters"
        />
        <Input
          labelText="Confirm Password"
          labelFor="confirm-password"
          id="confirm-password"
          name="confirm-password"
          type="password"
          autoComplete="confirm-password"
          isRequired={true}
          placeholder="Confirm Password"
        />
        <Input
          labelText="File"
          labelFor="file"
          id="file"
          name="file"
          type="file"
          autoComplete=""
          isRequired={true}
          // customClass={"hidden"}
        />

        <FormAction handleSubmit={handleSubmit} text="Signup" />
      </div>
      {err && alert("Try again")}
    </form>
  );
}
