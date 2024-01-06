import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
//Making the function
export default function Form(props) {
    const { Submit, setSubmit } = props.setSubmit
    const [data, Setdata] = useState([])
    const [acceptedTerms, setAcceptedTerms] = useState(false);
    //Destructuring of the data
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors, isSubmitSuccessful },
    } = useForm();
    useEffect(() => {
        const storedData = localStorage.getItem("FormData");
        if (storedData) {
            Setdata(JSON.parse(storedData));
        }
    }, []);
    const specialCharacters = (password) => {
        return password && /[!@#$%^&*(),.?":{}|<>]/.test(password);
    };

    const formSubmitHandler = (Formdata) => {
        // Applying the logic logic and set the submitted state to true
        if (acceptedTerms) {
            setSubmit(true);
            const newData = [...data, Formdata];
            localStorage.setItem("FormData", JSON.stringify(newData));
            Setdata(newData);
            showToastMessage()
            // showToastMessage()

        } else if (!acceptedTerms) {
            ShowWarningMessage()
        }
        else {
            alert("Please accept the terms and conditions to proceed.");
        }
    };
    const showToastMessage = () => {
        toast.success("Congratulations! You've successfully signed up!", {
            position: toast.POSITION.TOP_RIGHT,
        });
    };
    const ShowWarningMessage = () => {
        toast.warning("Please accept the Terms and conditions", {
            position: toast.POSITION.TOP_RIGHT,
        });
    }

    console.log(Submit)
    return (

        <div className='form-container'>
            <fieldset>
                <legend>Sign up</legend>
                <form
                    onSubmit={handleSubmit((Formdata) => {
                        formSubmitHandler(Formdata);
                    })}
                >
                    <label style={{ color: 'black' }}>First Name:</label>
                    <input
                        type='text'
                        name='firstName'
                        {...register('firstName', {
                            required: 'Please provide the name',
                            minLength: {
                                value: 4,
                                message: 'Minimum four characters required',
                            },
                            maxLength: {
                                value: 30,
                                message: 'Maximum 30 characters required',
                            },
                        })}
                    />
                    {errors.firstName && <p className='err'>{errors.firstName.message}</p>}

                    <label style={{ color: 'black' }}>Last Name:</label>
                    <input
                        type='text'
                        name='lastName'
                        {...register('lastName', {
                            required: 'Fill last name',
                            minLength: {
                                value: 4,
                                message: 'Minimum 4 characters are required.',
                            },
                        })}
                    />
                    {errors.lastName && <p className='err'>{errors.lastName.message}</p>}

                    <label style={{ color: 'black' }}>Email:</label>
                    <input
                        type='email'
                        name='email'
                        {...register('email', {
                            required: 'Enter email',
                            minLength: {
                                value: 1,
                                message: 'Type valid email',
                            },
                        })}
                    />
                    {errors.email && <p className='err'>{errors.email.message}</p>}

                    <label style={{ color: 'black' }}>Password:</label>
                    <input
                        type='password'
                        name='password'
                        {...register('password', {
                            required: 'Enter password',
                            minLength: {
                                value: 10,
                                message: 'Minimum 10 characters are required',
                            },
                            validate: {
                                containsSpecialChar: (password) =>
                                    specialCharacters(password) || 'Password must contain special characters',
                            },
                        })}
                    />
                    {errors.password && <p className='err'>{errors.password.message}</p>}

                    <label style={{ color: 'black' }}>Confirm Password:</label>
                    <input
                        type='password'
                        name='confirmPassword'
                        {...register('confirmPassword', {
                            required: 'Enter Confirm password',
                            validate: (value) =>
                                value === watch('password') || 'Passwords do not match',
                        })}
                    />

                    {errors.confirmPassword && <p className='err'>{errors.confirmPassword.message}</p>}
                    <div><input type="checkbox" id='termsCheakbox'{...register("termsCheakbox", { required: true })}
                        onChange={(e) => setAcceptedTerms(e.target.checked)}

                    />
                        <label htmlFor="termsCheckbox">
                            I accept the <a href="https://www.termsfeed.com/blog/sample-terms-and-conditions-template/" target='blank'>terms and conditions</a> .
                        </label>
                        {errors.termsCheckbox && (<p className='err'>Please Acept the terms and condititons</p>)}
                    </div>


                    <input type='submit' value={'Sign-Up'} />
                    <ToastContainer />
                </form>

            </fieldset>
            {Submit && (<Link to={"/"}><button className='Backbutton'>Main Page</button></Link>)}
        </div>

    );
}
