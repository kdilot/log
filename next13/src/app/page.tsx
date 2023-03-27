import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <main className={`${inter.className} w-full h-[1200px] overflow-auto`}>
        <div className="p-3 text-red-600 text-[30px]">TESTETETSET</div>
        <h1 className="text-4xl text-bg-red-600 font-bold underline">Hello world!</h1>
        <div>sadfasdfads</div>
        <p>sdfasdfasd</p>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-4 rounded">Button</button>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="username">
            Username
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-[0.9rem] px-4 text-gray-700 focus:outline-none focus:shadow-outline"
            id="username"
            type="text"
            placeholder="Username"
          />
        </div>
        <div className="flex flex-row space-x-4">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-4 rounded">Button</button>
          <input
            className="shadow appearance-none border rounded w-full py-[0.9rem] px-4 text-gray-700 focus:outline-none focus:shadow-outline"
            id="username"
            type="text"
            placeholder="Username"
          />
        </div>
      </main>
      <div className="flex justify-center items-center fixed bottom-[2rem] w-[calc(100%-4rem)] sm:w-[calc(100%-40%)] lg:w-[calc(100%-60%)]">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-6 px-6 rounded w-full">Button</button>
      </div>
    </>
  )
}
