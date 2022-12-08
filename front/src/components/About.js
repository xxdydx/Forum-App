import BlogFooter from "./BlogFooter";
const About = () => {
  return (
    <div className="">
      <main className="pt-8 pb-16 lg:pt-16 lg:pb-24 bg-white dark:bg-gray-900 min-h-screen">
        <div className="flex justify-between px-4 mx-auto max-w-6xl ">
          <article className="mx-auto w-full max-w-6xl	 format format-sm sm:format-base lg:format-lg format-blue dark:format-invert">
            <header className="mb-4 lg:mb-6 not-format">
              <h1 className="mb-4 text-3xl font-extrabold leading-tight text-gray-900 lg:mb-6 lg:text-4xl dark:text-white">
                <span class="text-transparent bg-clip-text bg-gradient-to-br from-pink-500 to-orange-400">
                  About This Website
                </span>
              </h1>
              <address className="flex items-center mb-6 not-italic"></address>
            </header>
          </article>
        </div>
      </main>

      <BlogFooter />
    </div>
  );
};

export default About;
