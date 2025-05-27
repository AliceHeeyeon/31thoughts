const Footer = () => {

  return (
    <footer className="bg-pink-500 dark:bg-gray-800 text-white dark:text-gray-300 p-4 text-center">
      <p>copyright©2024 31Thoughts</p>
      <div className="developer flex items-center justify-center mt-2">
        <p className="mr-2">Developed by</p>
        <a href="https://www.linkedin.com/in/alice-heeyeon-kim/">
          <img
          src='/face-alice.png'
          alt="face-alice"
          className="cursor-pointer w-8 h-8 rounded-full"
          />
        </a>
      </div>

    </footer>
  )
}

export default Footer
