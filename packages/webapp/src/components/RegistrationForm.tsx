import React, {FC, useCallback, useState} from 'react'
import {User} from "../store/reducer";

export const RegistrationForm: FC = () => {
    const [user, setUser] = useState<User>({
        nickName: '',
        city: '',
        country: '',
    })

    const register = useCallback((event) => {
            event.preventDefault()
            console.log(user)
        },
        [user]
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