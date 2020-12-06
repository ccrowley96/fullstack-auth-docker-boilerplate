import GoogleLogin from 'react-google-login';
import './App.scss';

function App() {


  const responseGoogle = async (response) => {
    console.log(response);

    let googleLoginResponse = await fetch(`/api/googleLogin`, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({tokenId: response.tokenId})
    });

    let parsedgoogleLoginResponse = await googleLoginResponse.json();
    console.log(parsedgoogleLoginResponse);

  }

  return (
    <div className="App">
      <h1>Login with Google</h1>
      <GoogleLogin
        clientId="10363954666-veq3jlluet0her48ntgbcvoqk8fdkof7.apps.googleusercontent.com"
        buttonText="Login with Google"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={'single_host_origin'}
      />
    </div>
  );
}

export default App;
