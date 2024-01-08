import axios from 'axios';


axios.get('http://localhost:3013/', { withCredentials: true }).then(res => {
  console.log(res.data);
  if (!res.data.user) {
    document.querySelector('.main').innerHTML = `
    <div class="signin-container">
    <h2>Sign in</h2>
    <button id="sign-in-with-google">Sign in with Google</button>
    </div>
    `;
    const signInWithGoogle = document.querySelector('#sign-in-with-google');

    signInWithGoogle.addEventListener('click', () => {
      window.open('http://localhost:3013/auth/login', '_blank', 'location=yes,height=570,width=520,scrollbars=yes,status=yes');
    });
  } else {
    document.querySelector('.main').innerHTML = `
    <div class="welcome-container">
      <h2>Welcome, ${res.data.user.displayName}</h2>
      <button id="sign-out">Sign out</button>
    </div>
    `;
    document.querySelector('#sign-out').addEventListener('click', () => {
      axios.post('http://localhost:3013/auth/logout', {}, { withCredentials: true }).then(res => {
        console.log(res.data);
        window.location.reload();
      });
    });
  }
}).catch(err => {
  if (err.response.status === 401) {
    document.querySelector('.main').innerHTML = `
    <div class="signin-container">
    <h2>Sign in</h2>
    <button id="sign-in-with-google">Sign in with Google</button>
    </div>
    `;
    const signInWithGoogle = document.querySelector('#sign-in-with-google');

    signInWithGoogle.addEventListener('click', () => {
      window.open('http://localhost:3013/auth/login', '_blank', 'location=yes,height=570,width=520,scrollbars=yes,status=yes');
    });
  }
});