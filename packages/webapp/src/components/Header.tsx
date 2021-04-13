import React, { FC } from 'react'
import classNames from 'classnames'
import styles from './Header.module.css'

interface HeaderProps {
  title: string
}

export const Header: FC<HeaderProps> = ({ title }) => (
  <header className={classNames(styles.angledHeader)}>
    <h1>{title}</h1>
  </header>
)
