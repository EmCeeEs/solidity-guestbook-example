import React, { FC } from 'react';
import { connect } from 'react-redux';
import * as R from 'ramda';

import { getUsers } from '../store/selectors'
import { User } from '../store/reducer';


interface UsersProps {
  users: User[]
}

const UserComp: FC<User> = ({nickName, city, country}) => (
    <li>
        <p>{nickName}, {city}, {country}</p>
    </li>
)

const UsersComp: FC<UsersProps> = ({ users }) => {
  return (<div style={{textAlign: 'center'}}>
      <h3>Guests:</h3>
      <ul>
          {users.map((user, index) => <UserComp key={index} {...user} />)}
      </ul>
    </div>)
}


const mapStateToProps = R.applySpec({
  users: getUsers,
})

export const Users = connect(mapStateToProps)(UsersComp)
