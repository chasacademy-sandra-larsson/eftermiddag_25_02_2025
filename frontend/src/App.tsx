
import { useForm, SubmitHandler } from "react-hook-form"


interface IFormInput {
  username: string;
  password: string;
}


export default function App() {

  const { register, handleSubmit } = useForm<IFormInput>()
  const onSubmit: SubmitHandler<IFormInput> =  async (data) => {

      try {
        //https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
        const response = await fetch("http://localhost:3000/users", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data)
        });
        const responeseData = await response.json();
        console.log("Serversvar", responeseData);

      } 
      catch(error) {
        console.log(error);

      }



  }


  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>Username</label>
      <input {...register("username")} />
      <label>Password</label>
      <input {...register("password")} />
      <input type="submit" />
    </form>
  )
}