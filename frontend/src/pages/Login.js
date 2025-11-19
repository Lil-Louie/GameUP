
function Login() {
  return (
    <div>
        <Header />

        <h1 className="flex justify-center text-3xl font-bold underline">
          Hello, welcome to GameUP!
        </h1>

        <div class="container">
            <label for="uname"><b>Username</b></label>
             <input type="text" placeholder="Enter Username" name="uname" required> </input>

            <label for="psw"><b>Password</b></label>
            <input type="password" placeholder="Enter Password" name="psw" required> </input>
            <button type="submit">Login</button>
            <label>
                <input type="checkbox" checked="checked" name="remember"> Remember me</input>
            </label>
        </div>
      

    </div>
  );
}

export default Login;