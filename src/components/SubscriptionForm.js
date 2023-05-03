import { useState, useRef } from 'react';
import hitToast from '../helpers/hitToast';

export default function SubscriptionForm() {
  let [email, setEmail] = useState('');
  let [alertClass, setAlertClass] = useState('');

  //? should be const instead of using var for prevent potential issue relate to variable hoisting
  const parentComp = useRef();


  // const handleSubmit = (e) => {
  //   e.preventDefault();

  //   if (!validate(email)) {
  //     setAlertClass('alert-validate');
  //     return;
  //   }
  //   fetch('https://103.108.146.90:5000/sendemail', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify({ email })
  //   }).then(res => res.text())
  //     .then(data => JSON.parse(`${data}`))
  //     .then(data => hitToast(data.message, data.success ? 'success' : 'error'))
  //     .catch(() => hitToast('Something went wrong. Please try again.', 'error'))

  //   setAlertClass('');
  //}

  const handleSubmit = async (e) => {
  e.preventDefault();

  if (!validate(email)) {
    setAlertClass('alert-validate');
    return;
  }

  try {
    const response = await fetch('http://103.108.146.90:5000/sendemail', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email })
    });
    const data = await response.json();
    hitToast(data.message, data.success ? 'success' : 'error');
  } catch (error) {
    hitToast('Something went wrong. Please try again.', 'error');
  }
  setAlertClass('');
  }

  //? here the error is in string.trim() method. Trim() method can't take any parameter
  // const validate = (email) => {
  //   if (email.trim(/^([a-zA-Z0-9_\-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/).match() == null) {
  //     return false;
  //   } else if (email.trim() === '') {
  //     return false;
  //   }

  //   return true;
  // }

  const validate = (email) => {
    if (!email.trim()) {
    // check if email is empty after trimming
    return false;
  } else {
    // check if email is in valid format using regex
    const regex = /^([a-zA-Z0-9_\-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/;
    return regex.test(email);
  }
};

  return (
    <form className="w-full flex-w flex-c-m validate-form"
      onSubmit={handleSubmit}
    >
      <div ref={parentComp} className={`wrap-input100 validate-input where1 ${alertClass}`} data-validate="Valid email is required: user@email.domain">
        <input className="input100 placeholder0 s2-txt2" type="text" name="email" placeholder="Enter Email Address" onChange={e => setEmail(e.target.value)} />
        <span className="focus-input100"></span>
      </div>

       {/* there should be button type="submit  which is required to trigger the form submission when clicked" */}
      <button type='submit' className="flex-c-m size3 s2-txt3 how-btn1 trans-04 where1">
        Subscribe
      </button>
    </form>
  );
}
