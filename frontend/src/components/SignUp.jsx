import React, {useState} from 'react'

function SignUp() {
const [firstName, setFirstName] = useState("");
const [lastName, setLastName] = useState("");
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");

const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:5500/register", {
        method: "POST",
        crossDomain: true,
        headers: {
            "Content-Type":"application/json",
             Accept: "application/json",
            "Access-Control-Allow-Origin": "*"
        },
        body: JSON.stringify({
            fname: firstName,
            lname: lastName,
            email,
            password

        })
    }).then((res) => res.json())
    .then((data) => {
        console.log(data, "userRegistered");
    })

    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");

}

    return (
        <form onSubmit={handleSubmit} className=' w-11/12 max-w-[700px] px-10 py-20 rounded-3xl bg-white border-2 border-gray-100'>
                <h1 className='text-5xl font-semibold text-purple-600'>Schmooze</h1>
                <p className='font-medium text-lg text-gray-500 mt-4'>Create your account to get started!</p>
                <div className='mt-8'>
                    <div className='flex flex-col'>
                        <label className='text-lg font-medium'>First name</label>
                        <input 
                            className='w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent'
                            placeholder="First name"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            />
                    </div>
                    <div className='flex flex-col'>
                        <label className='text-lg font-medium'>Last name</label>
                        <input 
                            className='w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent'
                            placeholder="Last name"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            />
                    </div>
                    <div className='flex flex-col'>
                        <label className='text-lg font-medium'>Email</label>
                        <input 
                            className='w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent'
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            />
                    </div>
                    <div className='flex flex-col mt-4'>
                        <label className='text-lg font-medium'>Password</label>
                        <input 
                            className='w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent'
                            placeholder="Enter your password"
                            type={"password"}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className='mt-8 flex flex-col gap-y-4'>
                    <button type='submit' className='active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01]  ease-in-out transform py-4 bg-violet-500 rounded-xl text-white font-bold text-lg'>Create Account</button>
                    </div>
                    
                
                    <div className='mt-8 flex justify-center items-center'>
                        <p className='font-medium text-base'>Already registered??</p>
                        <a href='/login' 
    
                            className='ml-2 font-medium text-base text-violet-500'>Sign In</a>
                    </div>
                </div>
            </form>
      )
    }
    

export default SignUp