# 31Thoughts <img src="https://github.com/AliceHeeyeon/31thoughts/assets/131927244/d7da7104-af26-4638-8a5a-4219bc526c00" align=left width=150>

> An advice-sharing platform 💬
>
> Personal project (29.04.24 - 06.05.24)

<br />

## 💭 Introduction

> Have you ever been inspired or moved by a quote you saw on the internet?
>
> Share the best advice you know.
>
> No Login or Sign in required!
>
> It could really make a difference and be of great help to others.

<br />

## ✨ Key Features

| Create new posts and engage with comments.                                                                               | Share posts effortlessly with social media icons.                                                                        |
| ------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------ |
| <img width="375" src="https://github.com/AliceHeeyeon/31thoughts/assets/131927244/8c4898b4-6899-4e40-a03f-620ca90bf84a"> | <img width="375" src="https://github.com/AliceHeeyeon/31thoughts/assets/131927244/e30da27b-1245-4c3b-bdb8-5863e049ee71"> |

<br />

## 💻 Code Snippet

Post schema with comment and like features

```javascript
const postSchema = new Schema(
  {
    subject: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    linkedin: {
      type: String,
    },
    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
    likes: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);
```

When clicking 👍 on posts, the number will be updated in the backend, and then the posts will be sorted by their assigned state.

```javascript
const handleLike = async (postId) => {
  try {
    const response = await axios.post(`${baseUrl}/posts/${postId}/like`);
    setPosts((prevPosts) => {
      if (sortBy === "date") {
        return prevPosts
          .map((post) => {
            if (post._id === postId) {
              return { ...post, likes: response.data.likes };
            }
            return post;
          })
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .slice(0, 31);
      }
      if (sortBy === "likes") {
        return prevPosts
          .map((post) => {
            if (post._id === postId) {
              return { ...post, likes: response.data.likes };
            }

            return post;
          })
          .sort((a, b) => b.likes - a.likes)
          .slice(0, 31);
      }
    });
  } catch (err) {
    console.error("Error liking post:", err);
  }
};
```

</br>

## 📚 Language ∙ Frameworks ∙ Libraries ∙ Database

| Category   | Name         | Tag      |
| ---------- | ------------ | -------- |
| Language   | JavaScript   |          |
| Frameworks | React        | Frontend |
|            | Node.js      | Backend  |
|            | Express.js   | Backend  |
| Libraries  | Material-UI  |          |
|            | Tailwind CSS |          |
| Database   | MongoDB      |          |

</br>

## 🗂 Folder structure

```
📦Backend
 ┣ 📂controllers
 ┣ 📂models
 ┣ 📂routes
 ┗ 📄server.js
📦Frontend
 ┣ 📂public
 ┗ 📂src
   ┣ 📂components
   ┗ 📂pages
```
