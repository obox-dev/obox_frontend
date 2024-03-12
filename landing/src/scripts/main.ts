import '../styles/style.scss';
// import axios from '../../node_modules/axios';
// import { AuthService, confiureServices } from '@shared/services';

// axios.interceptors.request.use(
//   (config) => {
//     confiureServices(axios);
//     return config;
//   });


document.addEventListener('DOMContentLoaded', () => {
  const authForm = document.querySelector('#auth')!;
  const deleteForm = document.querySelector('#delete')!;

  authForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const target = event.target as HTMLFormElement;
    const formData = new FormData(target);

    const email = formData.get('email')!;
    const password = formData.get('password')!;
    const name = formData.get('name')!;
    const language = formData.get('language')!;

    try {

      await fetch('http://91.203.6.45:8080/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          password,
          language,
        }),
      });
      // await AuthService.signUp({
      //   email,
      //   password,
      //   name,
      //   language,
      // });
    } catch (e) {
      // console.error(error);
    }
  });

  deleteForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const target = event.target as HTMLFormElement;
    const formData = new FormData(target);

    const email = formData.get('email')!;

    try {
      await fetch(`http://91.203.6.45:8080/qa/user/email=${email}`, {
        method: 'DELETE',
      });
    } catch (error) {
      console.error(error);
    }
  });
});
