import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";

const blogSlice = createSlice({
  name: "blogs",
  initialState: [],
  reducers: {
    create(state, action) {
      const blog = action.payload;
      state.push(blog);
    },
    setBlogs(state, action) {
      return action.payload;
    },
    edit(state, action) {
      const updatedBlog = action.payload;
      return state.map((item) =>
        item.id === updatedBlog.id ? updatedBlog : item
      );
    },

    remove(state, action) {
      const id = action.payload;
      return state.filter((blogs) => blogs.id !== id);
    },
  },
});

export const { create, setBlogs, edit, remove } = blogSlice.actions;

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    dispatch(setBlogs(blogs));
  };
};
export const createBlog = (blog) => {
  return async (dispatch) => {
    const newBlog = await blogService.create(blog);
    dispatch(create(newBlog));
  };
};

export const updateBlog = (blog) => {
  const updatedBlog = {
    ...blog,
    likes: blog.likes + 1,
  };
  console.log(updatedBlog);
  return async (dispatch) => {
    const updatedBlog1 = await blogService.update(updatedBlog);
    dispatch(edit(updatedBlog1));
  };
};

export const deleteBlog = (id) => {
  return async (dispatch) => {
    const response = await blogService.remove(id);
    dispatch(remove(id));
  };
};

export default blogSlice.reducer;
