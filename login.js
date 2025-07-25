const signInBtn = document.getElementById('signInBtn');
const signUpBtn = document.getElementById('signUpBtn');
const signInForm = document.getElementById('signInForm');
const signUpForm = document.getElementById('signUpForm');
const toSignUp = document.getElementById('toSignUp');
const toSignIn = document.getElementById('toSignIn');

function showForm(isSignIn) {
  
  signInForm.classList.remove('active');
  signUpForm.classList.remove('active');
  setTimeout(() => {
    if(isSignIn) {
      signInForm.classList.add('active');
      signInBtn.classList.add('active');
      signUpBtn.classList.remove('active');
    } else {
      signUpForm.classList.add('active');
      signUpBtn.classList.add('active');
      signInBtn.classList.remove('active');
    }
  }, 150);
}
signInBtn.onclick = () => showForm(true);
signUpBtn.onclick = () => showForm(false);
if(toSignUp) toSignUp.onclick = () => showForm(false);
if(toSignIn) toSignIn.onclick = () => showForm(true);
