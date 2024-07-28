import './App.css';
import {useState, useEffect} from "react"
function App({ initialData = {
  name : "sourabh",
  phone : "+91-9009024988"
} }) {
  const [name, setName] = useState(initialData.name || '');
    const [phone, setPhone] = useState(initialData.phone || '+91-');
    const [isFormValid, setIsFormValid] = useState(false);
    const [nameError, setNameError] = useState('');
    const [phoneError, setPhoneError] = useState('');

    useEffect(() => {
        validateForm();
    }, [name, phone]);

    const validateForm = () => {
        let valid = true;

        if (name.trim().length === 0) {
            setNameError('Please enter a valid name.');
            valid = false;
        } else {
            setNameError('');
        }

        if (!/^\+91-[6-9]\d{9}$/.test(phone)) {
            setPhoneError('Please enter a valid Indian phone number.');
            valid = false;
        } else {
            setPhoneError('');
        }

        setIsFormValid(valid);
    };

    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    const handlePhoneChange = (e) => {
        setPhone(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isFormValid) {
            const formData = {
                name: name,
                phone: phone
            };
            console.log(formData);
        }
    };

    return (
        <div className="main">
            <form onSubmit={handleSubmit} aria-labelledby="user-form-title" className='form'>
            <h1 id="user-form-title">User Form Validation and Refilling</h1>
            <div>
                <label htmlFor="name">Name:</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={name}
                    onChange={handleNameChange}
                    required
                    aria-invalid={nameError ? 'true' : 'false'}
                    aria-describedby="name-error"
                />
                {nameError && (
                    <span id="name-error" role="alert" style={{ color: 'red' }}>
                        {nameError}
                    </span>
                )}
            </div>
            <div>
                <label htmlFor="phone">Phone Number (India):</label>
                <input
                    type="text"
                    id="phone"
                    name="phone"
                    value={phone}
                    onChange={handlePhoneChange}
                    required
                    aria-invalid={phoneError ? 'true' : 'false'}
                    aria-describedby="phone-error"
                />
                {phoneError && (
                    <span id="phone-error" role="alert" style={{ color: 'red' }}>
                        {phoneError}
                    </span>
                )}
            </div>
            <div>
                <button type="submit" disabled={!isFormValid}>
                    Submit
                </button>
            </div>
            { isFormValid && (<p>Your data will print check into console after submitting form </p>)}
        </form>
        </div>
        
    );
}

export default App;
