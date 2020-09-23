import React, { FC } from 'react';
import { connect } from 'react-redux';
import * as R from 'ramda';

import { getUsers } from '../store/selectors'
import { User } from '../store/reducer';


interface UsersProps {
  users: User[]
}

const UserComp: FC<User> = ({nickName, city, country}) => <p>nic: {nickName}, city: {city} , country: {country}</p>

const UsersComp: FC<UsersProps> = ({ users }) => {
  return (<>
    {users.map(user => <UserComp key={user.nickName} {...user} />)}
    </>)
}


const mapStateToProps = R.applySpec({
  users: getUsers,
})

export const Users = connect(mapStateToProps)(UsersComp)
