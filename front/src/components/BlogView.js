import { Spinner, Footer } from "flowbite-react";

const BlogView = ({ blog }) => {
  if (blog === undefined) {
    return <Spinner aria-label="Default status example" />;
  }
  return (
    <div>
      <section class="bg-white dark:bg-gray-900 flex flex-col h-screen">
        <div class="py-20 px-0 mx-auto w-2/3	 lg:py-20">
          <h2 class="mb-4 text-5xl font-extrabold text-gray-900 dark:text-white">
            {blog.title}
          </h2>
          <h2 class="mb-1 items-center text-lg font-semibold text-gray-900 dark:text-white">
            added by {blog.user.name}
          </h2>
          <h2 class="mb-8 text-lg font-semibold text-gray-900 dark:text-white">
            {blog.likes} likes
          </h2>

          <p class="lead text-gray-500 dark:text-gray-400">
            Flowbite is an open-source library of UI components built with the
            utility-first classes from Tailwind CSS. It also includes
            interactive elements such as dropdowns, modals, datepickers.
          </p>
          <p class=" text-gray-500 dark:text-gray-400">
            Before going digital, you might benefit from scribbling down some
            ideas in a sketchbook. This way, you can think things through before
            committing to an actual design project.
          </p>
          <p class=" text-gray-500 dark:text-gray-400">
            But then I found a{" "}
            <a href="https://flowbite.com">
              component library based on Tailwind CSS called Flowbite
            </a>
            . It comes with the most commonly used UI components, such as
            buttons, navigation bars, cards, form elements, and more which are
            conveniently built with the utility classes from Tailwind CSS.
          </p>
        </div>
      </section>
    </div>
  );
};

export default BlogView;
