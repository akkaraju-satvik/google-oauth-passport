import axios from 'axios';


axios.get('http://localhost:2023/', { withCredentials: true }).then(res => {
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
      window.open('http://localhost:2023/auth/oauth/google', '_blank', 'location=yes,height=570,width=520,scrollbars=yes,status=yes');
    });
  } else {
    document.querySelector('.main').innerHTML = `
    <div class="welcome-container">
      <h2>Welcome, ${res.data.user.displayName}</h2>
      <button id="sign-out">Sign out</button>
    </div>
    `;
    document.querySelector('#sign-out').addEventListener('click', () => {
      axios.post('http://localhost:2023/auth/oauth/logout', {}, { withCredentials: true }).then(res => {
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
      const authWindow = window.open('http://localhost:2023/auth/login', '_blank', 'location=yes,height=570,width=520,scrollbars=yes,status=yes');
      // poll using recursion
      const pollAuthWindow = () => {
        setTimeout(() => {
          if (authWindow.closed) {
            window.location.reload();
          } else {
            pollAuthWindow();
          }
        }, 5000);
      };
      pollAuthWindow();
    });
  }
});