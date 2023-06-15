import Link from 'next/link'
import React from 'react'

type Props = {}
const style = {
  header: 'fixed inset-0 z-50 flex h-14 bg-[#343434]',
  wrapper: 'flex flex-1 items-center space-x-4 border-b border-[#343536] px-5',
  leftHeader: 'flex flex-1 items-center space-x-4',
  rightHeader: 'flex items-center space-x-4',
  headerTitle:
    'text-2xl font-extrabold tracking-tight text-white sm:text-[2rem]',
  accountButton: 'text-[#343434] bg-slate-50 hover:bg-slate-300 font-bold rounded-full text-lg px-4 py-1.5 text-center mr-2 my-2 ',
  headerLink: 'text-slate-50 bg-transparent font-bold text-lg px-4 py-1.5 text-center mr-2 my-2 ',
}

const Header = (props: Props) => {
  return (
    <header className={style.header}>
      <div className={style.wrapper}>
        <div className={style.leftHeader}>
          <div>Logo </div>
          <h1 className={style.headerTitle}>
            <span className="text-slate-50 font-extrabold">Fit</span> Connect
          </h1>
        </div>
        <div className={style.rightHeader}>
          <Link href={'/about'} className={style.headerLink}>About</Link>
          <Link href={'/log-in'} className={style.headerLink}>Log In</Link>
          <Link href={'/'} className={style.accountButton}>Sign Up</Link>
        </div>
      </div>
    </header>
  )
}

export default Header