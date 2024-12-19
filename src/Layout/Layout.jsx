import React from 'react'
import "../assets/global.css"
import { Header} from '../components/exports'
import Tabs from '../tabs/tabs.jsx'

function Layout() {
    return (
        <div className="flex h-screen justify-center items-center bg-slate-600">
            <main className="w-[320px] h-[450px] bg-blue-100 flex flex-col bg-gradient-to-r from-blue-500 via-sky-400 to-indigo-500">
                <Header />
                <Tabs  className="" />
            </main>
        </div>
    )
}

export default Layout
