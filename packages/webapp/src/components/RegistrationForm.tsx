import React, {FC, useCallback, useState} from 'react'
import {User} from "../store/reducer";
import {connect} from "react-redux";
import {Dispatch} from "redux"

interface RegistrationFormProps {
    registerUser: (user: User) => void
}

const RegistrationFormComp: FC<RegistrationFormProps> = ({registerUser}) => {
    const [user, setUser] = useState<User>({
        nickName: '',
        city: '',
        country: '',
    })

    const register = useCallback((event) => {
            event.preventDefault()
            console.log('before', user)
            registerUser(user)
            console.log('after', user)
        },
        [user, registerUser]
    )

    const setNickName = useCallback(
        (event) => setUser({...user, nickName: event.target.value}),
        [user]
    )
    const setCountry = useCallback(
        (event) => setUser({...user, country: event.target.value}),
        [user]
    )
    const setCity = useCallback(
        (event) => setUser({...user, city: event.target.value}),
        [user]
    )

    return (
        <form onSubmit={register}>
            <label>
                nickName
                <input type='text' value={user.nickName} onChange={setNickName} />
            </label>
            <label>
                country
                <input type='text' value={user.country} onChange={setCountry} />
            </label>
            <label>
                city
                <input type='text' value={user.city} onChange={setCity} />
            </label>
            <input type="submit" value="Register" />
        </form>
    )

}

const mapDispatchToProps = (dispatch: Dispatch) => ({
    registerUser: (user: User) => dispatch({ type: 'REGISTER_USER', payload: user })
})

export const RegistrationForm = connect(null, mapDispatchToProps)(RegistrationFormComp)