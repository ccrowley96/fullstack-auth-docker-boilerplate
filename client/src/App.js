import {GoogleLogin, GoogleLogout} from 'react-google-login';
import './App.scss';

function App() {
  const responseGoogle = async (googleResponse) => {
    let response = await fetch(`/auth/googleLogin`, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({tokenId: googleResponse.tokenId})
    });

    let parsedResponse = await response.json();
    console.log(parsedResponse);
  }

  return (
    <div className="App">
      <h1>Login with Google</h1>
      <GoogleLogin
        clientId="10363954666-veq3jlluet0her48ntgbcvoqk8fdkof7.apps.googleusercontent.com"
        buttonText="Login with Google"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        isSignedIn={true}
        cookiePolicy={'single_host_origin'}
      />
    </div>
  );
}

export default App;
